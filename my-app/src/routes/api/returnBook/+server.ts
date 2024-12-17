import { json } from '@sveltejs/kit';
import mysql, { type ResultSetHeader } from 'mysql2/promise';
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
    const { isbn } = await request.json();
    console.log('Received ISBN from frontend:', isbn);

    const [updateResult] = await pool.execute<ResultSetHeader>(
      'UPDATE books SET isAvailable = 1, borrowedByid = NULL, borrowedByName = NULL, borroweddate = NULL,dueDate = NULL WHERE isbn = ?',
      [isbn]
    );

    console.log('Database result:', updateResult);

    if (updateResult.affectedRows === 0) {
      console.log('No matching book found');
      return json({ error: 'ไม่พบข้อมูลที่ตรงกัน' }, { status: 400 });
    }

    return json({ message: 'คืนหนังสือสำเร็จ' });
  } catch (error) {
    console.error('Error in POST /api/returnBook', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return json({ error: errorMessage }, { status: 500 });
  }
}
