import { mysqlTable, int, varchar, tinyint, date } from 'drizzle-orm/mysql-core';

// ตาราง 'users'
export const users = mysqlTable('users', {
  iduser: int('iduser').primaryKey().autoincrement(), // กำหนดเป็นคีย์หลักและให้เพิ่มอัตโนมัติ
  id:  int('id'),
  name: varchar('name', { length: 255 }),
});

// ตาราง 'books'
export const books = mysqlTable('books', {
  idbooks: int('idbooks').primaryKey().autoincrement(), // กำหนดเป็นคีย์หลักและให้เพิ่มอัตโนมัติ
  title: varchar('title', { length: 255 }),
  author: varchar('author', { length: 255 }),
  isbn: varchar('isbn', { length: 20 }),
  isAvailable: tinyint('isAvailable'),
  borrowedBy: varchar('borrowedBy', { length: 255 }),
  borrowedate: date('borrowedate'),
  dueDate: date('dueDate'),
});
