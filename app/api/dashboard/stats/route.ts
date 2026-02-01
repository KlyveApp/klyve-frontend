import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "1"; // Default to first user
    
    const client = await pool.connect();
    
    try {
      // Get total candidates count
      const candidatesResult = await client.query(
        "SELECT COUNT(*) as count FROM candidates"
      );
      
      // Get candidates added this week
      const candidatesThisWeekResult = await client.query(
        `SELECT COUNT(*) as count FROM candidates 
         WHERE created_at >= NOW() - INTERVAL '7 days'`
      );
      
      // Get active outbox threads count
      const outboxResult = await client.query(
        `SELECT COUNT(*) as count FROM outbox_threads 
         WHERE status IN ('sent', 'conversation_active')`
      );
      
      // Get pending replies count (threads waiting for response)
      const pendingRepliesResult = await client.query(
        `SELECT COUNT(*) as count FROM outbox_threads 
         WHERE status = 'sent'`
      );
      
      // Get total notes count
      const notesResult = await client.query(
        "SELECT COUNT(*) as count FROM notes"
      );
      
      // Get notes created today
      const notesTodayResult = await client.query(
        `SELECT COUNT(*) as count FROM notes 
         WHERE created_at >= CURRENT_DATE`
      );
      
      // Get recent outbox threads (last 5)
      const recentThreadsResult = await client.query(
        `SELECT 
          t.id,
          t.recipient_name,
          t.subject,
          t.status,
          t.updated_at,
          (SELECT body FROM outbox_emails WHERE thread_id = t.id ORDER BY created_at DESC LIMIT 1) as latest_email_preview
        FROM outbox_threads t
        ORDER BY t.updated_at DESC
        LIMIT 5`
      );
      
      // Get recent notes (last 5)
      const recentNotesResult = await client.query(
        `SELECT id, title, content, tags, created_at, updated_at 
         FROM notes 
         ORDER BY updated_at DESC 
         LIMIT 5`
      );
      
      // Get user info
      const userResult = await client.query(
        `SELECT name FROM users WHERE id = $1`,
        [userId]
      );
      
      return NextResponse.json({
        stats: {
          networkSize: parseInt(candidatesResult.rows[0]?.count || "0"),
          networkGrowth: parseInt(candidatesThisWeekResult.rows[0]?.count || "0"),
          activeOutbox: parseInt(outboxResult.rows[0]?.count || "0"),
          pendingReplies: parseInt(pendingRepliesResult.rows[0]?.count || "0"),
          storedNotes: parseInt(notesResult.rows[0]?.count || "0"),
          notesToday: parseInt(notesTodayResult.rows[0]?.count || "0"),
        },
        recentThreads: recentThreadsResult.rows,
        recentNotes: recentNotesResult.rows,
        userName: userResult.rows[0]?.name || "User",
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
