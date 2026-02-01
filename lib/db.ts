import { neon } from '@neondatabase/serverless';
import { Pool } from 'pg';

// Initialize the Neon database connection with fallback
const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Use Pool for parameterized queries
export const pool = new Pool({
  connectionString: databaseUrl,
});

// Keep neon for simple queries
export const sql = neon(databaseUrl);

// Database utility functions
export async function getCandidates(
  page: number = 1,
  limit: number = 5,
  filters?: {
    name?: string;
    location?: string;
    company?: string;
    role?: string;
    university?: string;
  }
) {
  const offset = (page - 1) * limit;
  
  let whereClause = '';
  const params: any[] = [];
  let paramIndex = 1;

  if (filters) {
    const conditions: string[] = [];
    
    if (filters.name) {
      conditions.push(`name ILIKE $${paramIndex}`);
      params.push(`%${filters.name}%`);
      paramIndex++;
    }
    
    if (filters.location) {
      conditions.push(`location ILIKE $${paramIndex}`);
      params.push(`%${filters.location}%`);
      paramIndex++;
    }
    
    if (filters.company) {
      conditions.push(`company ILIKE $${paramIndex}`);
      params.push(`%${filters.company}%`);
      paramIndex++;
    }
    
    if (filters.role) {
      conditions.push(`role ILIKE $${paramIndex}`);
      params.push(`%${filters.role}%`);
      paramIndex++;
    }
    
    if (filters.university) {
      // For now, skip university filter as it requires a join
      // TODO: Implement university filter with proper schema
    }
    
    if (conditions.length > 0) {
      whereClause = `WHERE ${conditions.join(' AND ')}`;
    }
  }

  // Add limit and offset to params
  params.push(limit);
  params.push(offset);

  const query = `SELECT * FROM candidates 
    ${whereClause}
    ORDER BY created_at DESC 
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;

  const countQuery = `SELECT COUNT(*) as count FROM candidates ${whereClause}`;

  const client = await pool.connect();
  try {
    const candidatesResult = await client.query(query, params);
    
    // For count query, remove limit and offset params
    const countParams = params.slice(0, -2);
    const totalCountResult = await client.query(
      countQuery,
      countParams.length > 0 ? countParams : undefined
    );

    return {
      candidates: candidatesResult.rows,
      totalCount: parseInt(totalCountResult.rows[0]?.count || '0'),
      currentPage: page,
      totalPages: Math.ceil(parseInt(totalCountResult.rows[0]?.count || '0') / limit)
    };
  } finally {
    client.release();
  }
}

export async function addCandidate(candidate: {
  name: string;
  role: string;
  company: string;
  location: string;
  linkedinUrl?: string;
}) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO candidates (name, role, company, location, linkedin_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [candidate.name, candidate.role, candidate.company, candidate.location, candidate.linkedinUrl]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateCandidateNextStep(candidateId: string, nextStep: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE candidates 
      SET next_step = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *`,
      [nextStep, candidateId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateCandidateStatus(candidateId: string, status: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE candidates 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *`,
      [status, candidateId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateEmailChainStatus(candidateId: string, status: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE candidates 
      SET email_chain_status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *`,
      [status, candidateId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function recordSearch(filters: {
  name?: string;
  location?: string;
  university?: string;
  company?: string;
  position?: string;
}, resultsCount: number, userId?: string) {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO search_history (name_query, location_query, university_query, company_query, position_query, results_count, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [filters.name, filters.location, filters.university, filters.company, filters.position, resultsCount, userId]
    );
  } finally {
    client.release();
  }
}

export async function getSearchQuota(userId?: string) {
  const client = await pool.connect();
  try {
    // Reset quota if it's a new day using the database function
    await client.query('SELECT reset_daily_search_quota()');
    
    if (userId) {
      // Get user-specific quota
      const result = await client.query(
        `SELECT total_searches, used_searches, total_searches - used_searches as remaining 
        FROM users 
        WHERE id = $1`,
        [userId]
      );
      
      if (result.rows.length > 0) {
        return result.rows[0];
      }
    }
    
    // Fallback to global search_quota table
    const result = await client.query(
      `SELECT total_searches, used_searches, total_searches - used_searches as remaining 
      FROM search_quota 
      LIMIT 1`
    );
    
    return result.rows[0] || { total_searches: 5, used_searches: 0, remaining: 5 };
  } finally {
    client.release();
  }
}

export async function useSearch(userId?: string) {
  const client = await pool.connect();
  try {
    if (userId) {
      // Update user-specific quota
      const result = await client.query(
        `UPDATE users 
        SET used_searches = used_searches + 1, updated_at = NOW()
        WHERE id = $1
        RETURNING total_searches - used_searches as remaining`,
        [userId]
      );
      
      if (result.rows.length > 0) {
        return result.rows[0].remaining;
      }
    }
    
    // Fallback to global search_quota table
    const result = await client.query(
      `UPDATE search_quota 
      SET used_searches = used_searches + 1, updated_at = NOW()
      RETURNING total_searches - used_searches as remaining`
    );
    
    return result.rows[0]?.remaining || 0;
  } finally {
    client.release();
  }
}

export async function searchCandidates(query: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM candidates 
      WHERE name ILIKE $1 OR role ILIKE $1 OR company ILIKE $1 OR location ILIKE $1
      ORDER BY created_at DESC
      LIMIT 20`,
      [`%${query}%`]
    );
    return result.rows;
  } finally {
    client.release();
  }
}

// User-related functions
export async function getUserById(userId: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, email, name, avatar_url, role, total_searches, used_searches, 
        total_searches - used_searches as remaining_searches, reset_date, company, 
        title, phone, bio, timezone, email_notifications, dark_mode, marketing_emails, 
        city, state, university, major, grad_year, created_at, updated_at
      FROM users 
      WHERE id = $1`,
      [userId]
    );
    return result.rows[0];
  }  finally {
    client.release();
  }
}

export async function getUserByEmail(email: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, email, name, avatar_url, role, total_searches, used_searches,
        total_searches - used_searches as remaining_searches, reset_date, company,
        title, phone, bio, timezone, email_notifications, dark_mode, marketing_emails, 
        city, state, university, major, grad_year, created_at, updated_at
      FROM users 
      WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateUser(userId: string, updates: {
  name?: string;
  company?: string;
  title?: string;
  phone?: string;
  bio?: string;
  timezone?: string;
  email_notifications?: boolean;
  dark_mode?: boolean;
  marketing_emails?: boolean;
  city?: string;
  state?: string;
  university?: string;
  major?: string;
  grad_year?: string;
}) {
  const client = await pool.connect();
  try {
    const setClause: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.name !== undefined) {
      setClause.push(`name = $${paramIndex}`);
      values.push(updates.name);
      paramIndex++;
    }
    if (updates.company !== undefined) {
      setClause.push(`company = $${paramIndex}`);
      values.push(updates.company);
      paramIndex++;
    }
    if (updates.title !== undefined) {
      setClause.push(`title = $${paramIndex}`);
      values.push(updates.title);
      paramIndex++;
    }
    if (updates.phone !== undefined) {
      setClause.push(`phone = $${paramIndex}`);
      values.push(updates.phone);
      paramIndex++;
    }
    if (updates.bio !== undefined) {
      setClause.push(`bio = $${paramIndex}`);
      values.push(updates.bio);
      paramIndex++;
    }
    if (updates.timezone !== undefined) {
      setClause.push(`timezone = $${paramIndex}`);
      values.push(updates.timezone);
      paramIndex++;
    }
    if (updates.email_notifications !== undefined) {
      setClause.push(`email_notifications = $${paramIndex}`);
      values.push(updates.email_notifications);
      paramIndex++;
    }
    if (updates.dark_mode !== undefined) {
      setClause.push(`dark_mode = $${paramIndex}`);
      values.push(updates.dark_mode);
      paramIndex++;
    }
    if (updates.marketing_emails !== undefined) {
      setClause.push(`marketing_emails = $${paramIndex}`);
      values.push(updates.marketing_emails);
      paramIndex++;
    }
    if (updates.city !== undefined) {
      setClause.push(`city = $${paramIndex}`);
      values.push(updates.city);
      paramIndex++;
    }
    if (updates.state !== undefined) {
      setClause.push(`state = $${paramIndex}`);
      values.push(updates.state);
      paramIndex++;
    }
    if (updates.university !== undefined) {
      setClause.push(`university = $${paramIndex}`);
      values.push(updates.university);
      paramIndex++;
    }
    if (updates.major !== undefined) {
      setClause.push(`major = $${paramIndex}`);
      values.push(updates.major);
      paramIndex++;
    }
    if (updates.grad_year !== undefined) {
      setClause.push(`grad_year = $${paramIndex}`);
      values.push(updates.grad_year);
      paramIndex++;
    }

    if (setClause.length === 0) {
      return null;
    }

    values.push(userId);
    const result = await client.query(
      `UPDATE users 
      SET ${setClause.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING *`,
      values
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function resetUserSearchQuota(userId: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE users 
      SET used_searches = 0, reset_date = CURRENT_DATE, updated_at = NOW()
      WHERE id = $1
      RETURNING total_searches - used_searches as remaining`,
      [userId]
    );
    return result.rows[0]?.remaining || 5;
  } finally {
    client.release();
  }
}

// Notes-related functions
export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export async function getNotes(userId?: string) {
  const client = await pool.connect();
  try {
    if (userId) {
      const result = await client.query(
        `SELECT id, user_id, title, content, tags, created_at, updated_at 
        FROM notes 
        WHERE user_id = $1 
        ORDER BY updated_at DESC`,
        [userId]
      );
      return result.rows;
    } else {
      const result = await client.query(
        `SELECT id, user_id, title, content, tags, created_at, updated_at 
        FROM notes 
        ORDER BY updated_at DESC`
      );
      return result.rows;
    }
  } finally {
    client.release();
  }
}

export async function getNoteById(noteId: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, user_id, title, content, tags, created_at, updated_at 
      FROM notes 
      WHERE id = $1`,
      [noteId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function createNote(note: {
  user_id: string;
  title: string;
  content: string;
  tags?: string[];
}) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO notes (user_id, title, content, tags)
      VALUES ($1, $2, $3, $4)
      RETURNING id, user_id, title, content, tags, created_at, updated_at`,
      [note.user_id, note.title, note.content, note.tags || []]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateNote(noteId: string, updates: {
  title?: string;
  content?: string;
  tags?: string[];
}) {
  const client = await pool.connect();
  try {
    const setClause: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.title !== undefined) {
      setClause.push(`title = $${paramIndex}`);
      values.push(updates.title);
      paramIndex++;
    }
    if (updates.content !== undefined) {
      setClause.push(`content = $${paramIndex}`);
      values.push(updates.content);
      paramIndex++;
    }
    if (updates.tags !== undefined) {
      setClause.push(`tags = $${paramIndex}`);
      values.push(updates.tags);
      paramIndex++;
    }

    if (setClause.length === 0) {
      return null;
    }

    values.push(noteId);
    const result = await client.query(
      `UPDATE notes 
      SET ${setClause.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING id, user_id, title, content, tags, created_at, updated_at`,
      values
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function deleteNote(noteId: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM notes 
      WHERE id = $1
      RETURNING id`,
      [noteId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function searchNotes(query: string, userId?: string) {
  const client = await pool.connect();
  try {
    if (userId) {
      const result = await client.query(
        `SELECT id, user_id, title, content, tags, created_at, updated_at 
        FROM notes 
        WHERE user_id = $1 AND (title ILIKE $2 OR content ILIKE $2)
        ORDER BY updated_at DESC`,
        [userId, `%${query}%`]
      );
      return result.rows;
    } else {
      const result = await client.query(
        `SELECT id, user_id, title, content, tags, created_at, updated_at 
        FROM notes 
        WHERE title ILIKE $1 OR content ILIKE $1
        ORDER BY updated_at DESC`,
        [`%${query}%`]
      );
      return result.rows;
    }
  } finally {
    client.release();
  }
}

// Outbox-related functions
export interface OutboxThread {
  id: string;
  user_id: string;
  recipient_name: string;
  recipient_email: string;
  recipient_role: string;
  recipient_company: string;
  recipient_location: string;
  subject: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface OutboxEmail {
  id: string;
  thread_id: string;
  sender_type: string;
  body: string;
  body_html?: string;
  attachments: any;
  created_at: Date;
}

export async function getOutboxThreads(userId?: string) {
  const client = await pool.connect();
  try {
    let query: string;
    let params: any[] = [];
    
    if (userId) {
      query = `
        SELECT 
          t.*,
          (SELECT body FROM outbox_emails WHERE thread_id = t.id ORDER BY created_at DESC LIMIT 1) as latest_email_preview
        FROM outbox_threads t
        WHERE t.user_id = $1
        ORDER BY t.updated_at DESC
      `;
      params = [userId];
    } else {
      query = `
        SELECT 
          t.*,
          (SELECT body FROM outbox_emails WHERE thread_id = t.id ORDER BY created_at DESC LIMIT 1) as latest_email_preview
        FROM outbox_threads t
        ORDER BY t.updated_at DESC
      `;
    }
    
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getOutboxThreadById(threadId: string) {
  const client = await pool.connect();
  try {
    const threadResult = await client.query(
      `SELECT id, user_id, recipient_name, recipient_email, recipient_role, recipient_company, recipient_location, subject, status, created_at, updated_at 
      FROM outbox_threads 
      WHERE id = $1`,
      [threadId]
    );
    
    if (threadResult.rows.length === 0) {
      return null;
    }
    
    const emailsResult = await client.query(
      `SELECT id, thread_id, sender_type, body, body_html, attachments, created_at 
      FROM outbox_emails 
      WHERE thread_id = $1
      ORDER BY created_at ASC`,
      [threadId]
    );
    
    return {
      ...threadResult.rows[0],
      emails: emailsResult.rows
    };
  } finally {
    client.release();
  }
}

export async function createOutboxThread(thread: {
  user_id: string;
  recipient_name: string;
  recipient_email: string;
  recipient_role: string;
  recipient_company: string;
  recipient_location: string;
  subject: string;
  status?: string;
  first_email: {
    sender_type: string;
    body: string;
    body_html?: string;
    attachments?: any;
  };
}) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const threadResult = await client.query(
      `INSERT INTO outbox_threads (user_id, recipient_name, recipient_email, recipient_role, recipient_company, recipient_location, subject, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, user_id, recipient_name, recipient_email, recipient_role, recipient_company, recipient_location, subject, status, created_at, updated_at`,
      [
        thread.user_id,
        thread.recipient_name,
        thread.recipient_email,
        thread.recipient_role,
        thread.recipient_company,
        thread.recipient_location,
        thread.subject,
        thread.status || 'draft'
      ]
    );
    
    const newThread = threadResult.rows[0];
    
    await client.query(
      `INSERT INTO outbox_emails (thread_id, sender_type, body, body_html, attachments)
      VALUES ($1, $2, $3, $4, $5)`,
      [
        newThread.id,
        thread.first_email.sender_type,
        thread.first_email.body,
        thread.first_email.body_html || null,
        JSON.stringify(thread.first_email.attachments || [])
      ]
    );
    
    await client.query('COMMIT');
    return newThread;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function addOutboxEmail(email: {
  thread_id: string;
  sender_type: string;
  body: string;
  body_html?: string;
  attachments?: any;
}) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const result = await client.query(
      `INSERT INTO outbox_emails (thread_id, sender_type, body, body_html, attachments)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, thread_id, sender_type, body, body_html, attachments, created_at`,
      [
        email.thread_id,
        email.sender_type,
        email.body,
        email.body_html || null,
        JSON.stringify(email.attachments || [])
      ]
    );
    
    await client.query(
      `UPDATE outbox_threads 
      SET updated_at = NOW()
      WHERE id = $1`,
      [email.thread_id]
    );
    
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteOutboxThread(threadId: string) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    await client.query(
      `DELETE FROM outbox_emails WHERE thread_id = $1`,
      [threadId]
    );
    
    const result = await client.query(
      `DELETE FROM outbox_threads WHERE id = $1 RETURNING id`,
      [threadId]
    );
    
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function searchOutboxThreads(query: string, userId?: string) {
  const client = await pool.connect();
  try {
    const searchPattern = `%${query}%`;
    
    if (userId) {
      const result = await client.query(
        `SELECT 
          t.*,
          (SELECT body FROM outbox_emails WHERE thread_id = t.id ORDER BY created_at DESC LIMIT 1) as latest_email_preview
        FROM outbox_threads t
        WHERE t.user_id = $1 AND (
          t.recipient_name ILIKE $2 OR 
          t.recipient_email ILIKE $2 OR 
          t.recipient_role ILIKE $2 OR 
          t.recipient_company ILIKE $2 OR 
          t.recipient_location ILIKE $2 OR 
          t.subject ILIKE $2 OR
          EXISTS (SELECT 1 FROM outbox_emails e WHERE e.thread_id = t.id AND e.body ILIKE $2)
        )
        ORDER BY t.updated_at DESC`,
        [userId, searchPattern]
      );
      return result.rows;
    } else {
      const result = await client.query(
        `SELECT 
          t.*,
          (SELECT body FROM outbox_emails WHERE thread_id = t.id ORDER BY created_at DESC LIMIT 1) as latest_email_preview
        FROM outbox_threads t
        WHERE 
          t.recipient_name ILIKE $1 OR 
          t.recipient_email ILIKE $1 OR 
          t.recipient_role ILIKE $1 OR 
          t.recipient_company ILIKE $1 OR 
          t.recipient_location ILIKE $1 OR 
          t.subject ILIKE $1 OR
          EXISTS (SELECT 1 FROM outbox_emails e WHERE e.thread_id = t.id AND e.body ILIKE $1)
        ORDER BY t.updated_at DESC`,
        [searchPattern]
      );
      return result.rows;
    }
  } finally {
    client.release();
  }
}

// Resume-related functions
export interface Resume {
  id: string;
  user_id: string;
  filename: string;
  file_size: number;
  file_type: string;
  file_data: Buffer;
  file_url: string | null;
  is_starred: boolean;
  created_at: Date;
  updated_at: Date;
}

export async function getResumes(userId?: string) {
  const client = await pool.connect();
  try {
    if (userId) {
      const result = await client.query(
        `SELECT id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at 
        FROM resumes 
        WHERE user_id = $1 
        ORDER BY is_starred DESC, updated_at DESC`,
        [userId]
      );
      return result.rows;
    } else {
      const result = await client.query(
        `SELECT id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at 
        FROM resumes 
        ORDER BY updated_at DESC`
      );
      return result.rows;
    }
  } finally {
    client.release();
  }
}

export async function getResumeById(resumeId: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at 
      FROM resumes 
      WHERE id = $1`,
      [resumeId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function getStarredResume(userId: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at 
      FROM resumes 
      WHERE user_id = $1 AND is_starred = true 
      LIMIT 1`,
      [userId]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function createResume(resume: {
  user_id: string;
  filename: string;
  file_size: number;
  file_type: string;
  file_data?: Buffer;
  file_url?: string;
  is_starred?: boolean;
}) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO resumes (user_id, filename, file_size, file_type, file_data, file_url, is_starred)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at`,
      [
        resume.user_id,
        resume.filename,
        resume.file_size,
        resume.file_type,
        resume.file_data || null,
        resume.file_url || null,
        resume.is_starred || false
      ]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// S3-compatible version - stores only URL, no file_data
export async function createResumeS3(resume: {
  user_id: string;
  filename: string;
  file_size: number;
  file_type: string;
  file_url: string;
  is_starred?: boolean;
}) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO resumes (user_id, filename, file_size, file_type, file_data, file_url, is_starred)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at`,
      [
        resume.user_id,
        resume.filename,
        resume.file_size,
        resume.file_type,
        null, // No file_data for S3 resumes
        resume.file_url,
        resume.is_starred || false
      ]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateResume(resumeId: string, updates: {
  filename?: string;
  file_size?: number;
  file_type?: string;
  file_data?: Buffer;
  file_url?: string;
  is_starred?: boolean;
}) {
  const client = await pool.connect();
  try {
    const setClause: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.filename !== undefined) {
      setClause.push(`filename = $${paramIndex}`);
      values.push(updates.filename);
      paramIndex++;
    }
    if (updates.file_size !== undefined) {
      setClause.push(`file_size = $${paramIndex}`);
      values.push(updates.file_size);
      paramIndex++;
    }
    if (updates.file_type !== undefined) {
      setClause.push(`file_type = $${paramIndex}`);
      values.push(updates.file_type);
      paramIndex++;
    }
    if (updates.file_data !== undefined) {
      setClause.push(`file_data = $${paramIndex}`);
      values.push(updates.file_data);
      paramIndex++;
    }
    if (updates.file_url !== undefined) {
      setClause.push(`file_url = $${paramIndex}`);
      values.push(updates.file_url);
      paramIndex++;
    }
    if (updates.is_starred !== undefined) {
      setClause.push(`is_starred = $${paramIndex}`);
      values.push(updates.is_starred);
      paramIndex++;
    }

    if (setClause.length === 0) {
      return null;
    }

    values.push(resumeId);
    const result = await client.query(
      `UPDATE resumes 
      SET ${setClause.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at`,
      values
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function deleteResume(resumeId: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM resumes 
      WHERE id = $1
      RETURNING id`,
      [resumeId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function starResume(resumeId: string, userId: string) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // First, unstar all other resumes for this user
    await client.query(
      `UPDATE resumes 
      SET is_starred = false, updated_at = NOW()
      WHERE user_id = $1 AND id != $2`,
      [userId, resumeId]
    );
    
    // Then, star the specified resume
    const result = await client.query(
      `UPDATE resumes 
      SET is_starred = true, updated_at = NOW()
      WHERE id = $1
      RETURNING id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at`,
      [resumeId]
    );
    
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function unstarResume(resumeId: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE resumes 
      SET is_starred = false, updated_at = NOW()
      WHERE id = $1
      RETURNING id, user_id, filename, file_size, file_type, file_url, is_starred, created_at, updated_at`,
      [resumeId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Email-related functions
export interface Email {
  id: string;
  user_id: string;
  recipient_email: string;
  recipient_name: string | null;
  subject: string;
  content: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export async function getEmails(userId?: string) {
  const client = await pool.connect();
  try {
    if (userId) {
      const result = await client.query(
        `SELECT id, user_id, recipient_email, recipient_name, subject, content, status, created_at, updated_at 
        FROM emails 
        WHERE user_id = $1 
        ORDER BY created_at DESC`,
        [userId]
      );
      return result.rows;
    } else {
      const result = await client.query(
        `SELECT id, user_id, recipient_email, recipient_name, subject, content, status, created_at, updated_at 
        FROM emails 
        ORDER BY created_at DESC`
      );
      return result.rows;
    }
  } finally {
    client.release();
  }
}

export async function getEmailById(emailId: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, user_id, recipient_email, recipient_name, subject, content, status, created_at, updated_at 
      FROM emails 
      WHERE id = $1`,
      [emailId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function createEmail(email: {
  user_id: string;
  recipient_email: string;
  recipient_name?: string;
  subject: string;
  content: string;
  status?: string;
}) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO emails (user_id, recipient_email, recipient_name, subject, content, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, user_id, recipient_email, recipient_name, subject, content, status, created_at, updated_at`,
      [
        email.user_id,
        email.recipient_email,
        email.recipient_name || null,
        email.subject,
        email.content,
        email.status || 'draft'
      ]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateEmail(emailId: string, updates: {
  recipient_email?: string;
  recipient_name?: string;
  subject?: string;
  content?: string;
  status?: string;
}) {
  const client = await pool.connect();
  try {
    const setClause: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.recipient_email !== undefined) {
      setClause.push(`recipient_email = $${paramIndex}`);
      values.push(updates.recipient_email);
      paramIndex++;
    }
    if (updates.recipient_name !== undefined) {
      setClause.push(`recipient_name = $${paramIndex}`);
      values.push(updates.recipient_name);
      paramIndex++;
    }
    if (updates.subject !== undefined) {
      setClause.push(`subject = $${paramIndex}`);
      values.push(updates.subject);
      paramIndex++;
    }
    if (updates.content !== undefined) {
      setClause.push(`content = $${paramIndex}`);
      values.push(updates.content);
      paramIndex++;
    }
    if (updates.status !== undefined) {
      setClause.push(`status = $${paramIndex}`);
      values.push(updates.status);
      paramIndex++;
    }

    if (setClause.length === 0) {
      return null;
    }

    values.push(emailId);
    const result = await client.query(
      `UPDATE emails 
      SET ${setClause.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING id, user_id, recipient_email, recipient_name, subject, content, status, created_at, updated_at`,
      values
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function deleteEmail(emailId: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM emails 
      WHERE id = $1
      RETURNING id`,
      [emailId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}
