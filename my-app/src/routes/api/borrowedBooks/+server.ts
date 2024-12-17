import { json } from '@sveltejs/kit';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '44Soup66!1',
  database: process.env.DB_NAME || 'librarydb',
  port: 3307,
});

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT idbooks, title, isbn, borrowedByid,borrowedByName, dueDate FROM books WHERE borrowedByid IS NOT NULL AND borrowedByid != ""'
    );

    return json(rows);
  } catch (error) {
    console.error('Error fetching borrowedBooks:', error);
    return json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}
