import { json } from '@sveltejs/kit';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// เชื่อมต่อฐานข้อมูล
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '44Soup66!1',
  database: process.env.DB_NAME || 'librarydb',
  port: 3307,
});

export async function GET({ url }) {
  try {
    const query = url.searchParams.get('query') || '';
    
    // Query แบบค้นหา title และ author
    const [rows] = await pool.execute(
      `SELECT * FROM books 
      WHERE title LIKE ? OR author LIKE ?`, 
      [`%${query}%`, `%${query}%`] // ค้นหาในทั้ง title และ author
    );

    return json(rows);
  } catch (error) {
    console.error('Error during searchBooks', error);
    return json({ error: 'ไม่สามารถค้นหาหนังสือได้' }, { status: 500 });
  }
}