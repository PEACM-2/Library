export async function load({ fetch }) {
  try {
    const resBooks = await fetch('/api/books');
    if (!resBooks.ok) {
      throw new Error('ไม่สามารถดึงข้อมูลหนังสือ');
    }
    const books = await resBooks.json();

    const resBorrowers = await fetch('/api/borrowers');
    if (!resBorrowers.ok) {
      throw new Error('ไม่สามารถดึงข้อมูลผู้ยืม');
    }
    const borrowers = await resBorrowers.json();

    return {
      books,
      borrowers
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      books: [],
      borrowers: []
    };
  }
}
