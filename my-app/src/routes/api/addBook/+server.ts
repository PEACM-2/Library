import { json } from '@sveltejs/kit';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '44Soup66!1',
  database: process.env.DB_NAME || 'librarydb',
  port: 3307,
});

export async function POST({ request }) {
  try {
    const { title, author, isbn } = await request.json();

    if (!title || !author || !isbn) {
      return json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO books (title, author, isbn, isAvailable) VALUES (?, ?, ?, 1)',
      [title, author, isbn]
    );

    if ((result as any).affectedRows > 0) {
      return json({ message: 'เพิ่มหนังสือสำเร็จ' });
    }

    return json({ error: 'เกิดข้อผิดพลาดในการเพิ่มหนังสือ' }, { status: 500 });
  } catch (error) {
    console.error('Error: ', error);
    return json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}
