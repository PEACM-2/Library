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

export async function GET() {
  try {
    console.log('Connecting to database...');
    const [rows] = await pool.execute('SELECT * FROM user');
    console.log('Fetched borrowers: ', rows);
    return json(rows);
  } catch (error) {
    console.error('Error fetching borrowers: ', error);
    // ตรวจสอบว่า error เป็น instance ของ Error หรือไม่
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    return json({ error: 'ไม่สามารถดึงข้อมูลผู้ยืมได้', details: errorMessage }, { status: 500 });
  }
}