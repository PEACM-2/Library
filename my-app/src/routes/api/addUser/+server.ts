import { json } from '@sveltejs/kit';
import mysql, { type RowDataPacket, type ResultSetHeader } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
// Create database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '44Soup66!1',
  database: process.env.DB_NAME || 'librarydb',
  port: 3307,
});
export async function POST({ request }) {
  try {
    const { userName, id } = await request.json();
    if (!userName || !id) {
      return json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }
    // ตรวจสอบ ID ซ้ำ
    const [existingById] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM user WHERE id = ?',
      [id]
    );
    if (existingById.length > 0) {
      return json({ error: 'ID นี้มีอยู่แล้ว' }, { status: 409 });
    }
    // Insert ข้อมูล
    const [result] = await pool.execute(
      'INSERT INTO user (id, name) VALUES (?, ?)',
      [id, userName]
    );
    return json({ message: 'เพิ่มผู้ใช้งานสำเร็จ' });
  } catch (error) {
    console.error('Database error:', error);
    return json({ error: 'เกิดข้อผิดพลาดที่ไม่คาดคิด' }, { status: 500 });
  }
}