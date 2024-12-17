import { json } from '@sveltejs/kit';
import mysql, { type ResultSetHeader } from 'mysql2/promise';
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
    // Extract ISBN, userId, and dueDate from the request body
    const { isbn, userId, userName, dueDate } = await request.json();

    // Validate input
    if (!isbn || !userId || !dueDate) {
      return json({ error: 'กรุณากรอก ISBN, ID และ Due Date ให้ครบถ้วน' }, { status: 400 });
    }

    // Check if book exists in the database
    const [book] = await pool.execute<any[]>('SELECT * FROM books WHERE isbn = ?', [isbn]);

    if (!book.length) {
      return json({ error: 'ไม่พบหนังสือที่ระบุ' }, { status: 404 });
    }

    // Check if the book is already borrowed
    if (book[0].isAvailable === 0) {
      return json({ error: 'หนังสือนี้ถูกยืมอยู่แล้ว' }, { status: 400 });
    }

    // Perform the update to set the book as borrowed by the user
    const [updateResult] = await pool.execute<ResultSetHeader>(
      'UPDATE books SET isAvailable = 0, borrowedByid = ?, borrowedByName = ?,  borroweddate = CURDATE(), dueDate = ? WHERE isbn = ?',
      [userId, userName, dueDate, isbn]  // ใช้ dueDate ที่ได้รับมาจาก frontend
    );

    if (updateResult.affectedRows === 0) {
      return json({ error: 'เกิดข้อผิดพลาดในการยืมหนังสือ' }, { status: 500 });
    }

    return json({ message: 'ยืมหนังสือสำเร็จ', borrowedDate: new Date().toISOString(), dueDate });
  } catch (error) {
    console.error('Error during borrowBook', error);
    return json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}