// src/routes/api/books/+server.ts
import { json } from '@sveltejs/kit';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
// สร้างการเชื่อมต่อกับ MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '44Soup66!1',
    database: process.env.DB_NAME || 'librarydb',
    port: 3307,
  });

  interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    isAvailable: boolean;
    dueDate?: string;
  }
  
  // แปลง RowDataPacket เป็น Book[]
  function mapRowDataToBooks(rows: any[]): Book[] {
    return rows.map(row => ({
      id: row.id,
      title: row.title,
      author: row.author,
      isbn: row.isbn,
      isAvailable: !!row.isAvailable,
      
    }));
  }
  
  export async function GET() {
    try {
      // ดึงข้อมูลจาก MySQL
      const [rows] = await pool.execute<any[]>('SELECT * FROM books');
      
      // Map ข้อมูลที่ได้จาก MySQL ให้เป็น Book[]
      const books = mapRowDataToBooks(rows);
  
      return json(books);
    } catch (error) {
      console.error('Error during database operation', error);
      return json({ error: 'ไม่สามารถดึงข้อมูลได้' }, { status: 500 });
    }
  }