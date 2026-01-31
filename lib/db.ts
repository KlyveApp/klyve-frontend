import { neon } from '@neondatabase/serverless';
import { Pool } from 'pg';

// Initialize the Neon database connection with fallback
const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EFWkTr60tGzY@ep-cold-smoke-ahfq9uwr-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Use Pool for parameterized queries
const pool = new Pool({
  connectionString: databaseUrl,
});

// Keep neon for simple queries
const sql = neon(databaseUrl);

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
        title, phone, bio, timezone, email_notifications, dark_mode, marketing_emails, created_at, updated_at
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
        title, phone, bio, timezone, email_notifications, dark_mode, marketing_emails, created_at, updated_at
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
