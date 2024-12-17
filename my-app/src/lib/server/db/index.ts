import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// สร้าง MySQL connection pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '44Soup66!1',
  database: process.env.DB_NAME || 'librarydb',
  port: 3307, // หรือพอร์ตที่คุณใช้
});
