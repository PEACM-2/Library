<script lang="ts">
    import { onMount } from 'svelte';
    // Interface Definitions
    interface Book {
      title: string;
      author: string;
      isbn: string;
      isAvailable: boolean;
      dueDate?: string;
    }
    interface Borrower {
      id: number;
      name: string;
    }
    export let data: { books: Book[]; borrowers: Borrower[] };
    let userId = '';
    let userName = '';
    let isDataLoaded = false;
    let errorMessage = '';
    let searchTerm = ''; // คำค้นหา
    let filteredBooksList: Book[] = []; // ข้อมูลที่จะแสดงหลังจากค้นหา
    let numberOfDays = 1; // ค่าเริ่มต้นคือ 14 วัน

    // โหลดข้อมูลหนังสือ
    const loadBooks = async () => {
      try {
        const res = await fetch('/api/books');
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลหนังสือ');
        const books = await res.json();
        data.books = books as Book[];
        isDataLoaded = true;
      } catch (error) {
        console.error('Error loading books: ', error);
        errorMessage = 'เกิดข้อผิดพลาดในการโหลดข้อมูลหนังสือ';
      }
    };
    // โหลดข้อมูลผู้ยืม
    const loadBorrowers = async () => {
      try {
        const res = await fetch('/api/borrowers');
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลผู้ยืม');
        const borrowers = await res.json();
        data.borrowers = borrowers as Borrower[];
      } catch (error) {
        console.error('Error loading borrowers: ', error);
        errorMessage = 'เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ยืม';
      }
    };
    onMount(async () => {
      await Promise.all([loadBooks(), loadBorrowers()]);
    });
    const validateUser = () => {
      const user = data.borrowers.find(
        (borrower) => String(borrower.id) === userId.trim() && borrower.name.trim() === userName.trim()
      );
      if (user) {
        errorMessage = '';
        return true;
      }
      errorMessage = 'ไม่พบ ID และชื่อที่ตรงกัน';
      return false;
    };
    const borrowBook = async (isbn: string) => {
  if (!validateUser()) return;
  try {
    const borrowedDate = new Date().toISOString(); // วันที่ปัจจุบัน
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(numberOfDays)); // ใช้ numberOfDays ที่ผู้ใช้กรอก

    const res = await fetch('/api/borrowBook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isbn,
        userId,
        userName,
        borrowedDate,
        dueDate: dueDate.toISOString(), // ส่งค่า dueDate ไปยัง server
      }),
    });
    if (!res.ok) throw new Error('ไม่สามารถยืมหนังสือได้');
    alert(`ยืมหนังสือสำเร็จ! วันที่สิ้นสุดการยืมคือ ${dueDate.toLocaleDateString()}`);

  } catch (error) {
    console.error('Error borrowing book: ', error);
    alert('เกิดข้อผิดพลาดในการยืมหนังสือ');
  }
};

    const returnBook = async (isbn: string) => {
      if (!validateUser()) return;
      try {
        const res = await fetch('/api/returnBook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isbn, userId, userName }),
        });
        if (!res.ok) throw new Error('ไม่สามารถคืนหนังสือได้');
        alert('คืนหนังสือสำเร็จ');
      } catch (error) {
        console.error('Error returning book: ', error);
        alert('เกิดข้อผิดพลาดในการคืนหนังสือ');
      }
    };
    // ฟังก์ชันสำหรับการค้นหา
    const handleSearch = async () => {
  console.log('Search term:', searchTerm);
  if (!searchTerm.trim()) {
    alert('กรุณากรอกคำค้นหา');
    return;
  }

  try {
    const res = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`);
 // แก้ไขที่นี่
    if (!res.ok) {
      throw new Error('ไม่สามารถค้นหาได้');
    }

    const books = await res.json();
    console.log('Books found:', books);
    filteredBooksList = books;
  } catch (error) {
    console.error('Error during search:', error);
    alert('เกิดข้อผิดพลาด');
  }
};
  </script>
  <style>
    /* Global Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    /* General body styling */
    :global(body) {
      font-family: 'Arial', sans-serif;
      background-color: #f9f9f9;
    }
  
    /* Main container styling */
    .container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 20px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  
    /* Header Styling */
    h1 {
      text-align: center;
      margin-bottom: 20px;
      color: #004080;
    }
  
    /* Search UI Styling */
    .search-container {
      margin: 15px 0;
      text-align: center;
    }
  
    input[type="text"] {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
      transition: border-color 0.2s ease;
    }
  
    input[type="text"]:focus {
      border-color: #004080;
      outline: none;
    }
  
    button {
      margin-top: 10px;
      padding: 10px 20px;
      font-size: 16px;
      color: white;
      background-color: #004080;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
  
    button:hover {
      background-color: #002850;
    }
  
    /* Book List */
    .book-container {
      margin: 20px 0;
      padding: 10px;
    }
  
    ul {
      list-style: none;
      margin: 10px 0;
    }
  
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: 5px 0;
    }
  
    .error {
      color: red;
      font-size: 14px;
      text-align: center;
    }
  </style>
  <div class="container">
  <h1>📚 รายการหนังสือ</h1>
  <div>
    <!-- ปุ่มไปยังหน้าสำหรับเพิ่มหนังสือ -->
    <button on:click={() => window.location.href = '/addBook'}>ไปยังหน้าสำหรับเพิ่มหนังสือ</button>
    
    <!-- ปุ่มไปยังหน้าสำหรับเพิ่มผู้ใช้งาน -->
    <button on:click={() => window.location.href = '/addUser'}>👤 ไปยังหน้าสำหรับเพิ่มผู้ใช้งาน</button>
    
    <!-- ปุ่มดูข้อมูลผู้ยืม -->
    <button on:click={() => window.location.href = '/borrowedBooks'}>📄 ดูข้อมูลผู้ยืมหนังสือ</button>
  </div> 
  <!-- ช่องค้นหา + ปุ่ม -->
  <div class="search-container">
    <input
      type="text"
      bind:value={searchTerm}
      placeholder="🔎 ค้นหาหนังสือหรือผู้เขียน"
    />
    <button on:click={handleSearch}>ค้นหา</button>
  </div>
  <div>
    <label for="userName">กรอกชื่อของคุณ:</label>
    <input
      id="userName"
      type="text"
      bind:value={userName}
      placeholder="กรอกชื่อผู้ยืม"
    />
  </div>
  <div>
    <label for="userId">กรอก ID ของคุณ:</label>
    <input
      id="userId"
      type="text"
      bind:value={userId}
      placeholder="กรอก ID ผู้ยืม"
    />
  </div>
  <div>
    <label for="days">จำนวนวันที่ต้องการยืม:</label>
    <input
      id="days"
      type="number"
      min="1"
      bind:value={numberOfDays}
      placeholder="ใส่จำนวนวันยืม"
    />
  </div>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
  {#if isDataLoaded}
  <div class="book-container">
    {#if filteredBooksList.length > 0}
      <ul>
        {#each filteredBooksList as book}
          <li>
            📖 {book.title} - {book.author} - {book.isbn} - 
            {#if book.isAvailable}
              <button on:click={() => borrowBook(book.isbn)}>ยืม</button>
            {:else}
              <button on:click={() => returnBook(book.isbn)}>คืน</button>
            {/if}
            {#if book.dueDate}
            <p>📅 วันที่คืนที่คาดหวัง: {new Date(book.dueDate).toLocaleDateString('th-TH', {
              weekday: 'short', // วัน (อาทิตย์-เสาร์)
              day: '2-digit', // วันที่ (ตัวเลข 2 หลัก)
              month: '2-digit', // เดือน (ตัวเลข 2 หลัก)
              year: 'numeric' // ปี (ตัวเลข 4 หลัก)
            })}</p>
            {/if}
          </li>
        {/each}
      </ul>
    
    {:else}
      <p>ไม่พบหนังสือที่ตรงกับคำค้นหา</p>
    {/if}
   </div>
  {:else}
    <p>🔄 กำลังโหลดข้อมูล...</p>
  {/if}
</div>