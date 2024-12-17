<script lang="ts">
    import { onMount } from 'svelte';
  
    interface Book {
      idbooks: number;
      title: string;
      isbn: string;
      borrowedByid: string;
      borrowedByName: string;
      dueDate: string;
    }
  
    let borrowedBooks: Book[] = [];
    let errorMessage = '';
  
    // ดึงข้อมูลจาก Backend
    const fetchBorrowedBooks = async () => {
      try {
        const response = await fetch('/api/borrowedBooks');
        if (!response.ok) throw new Error('ไม่สามารถดึงข้อมูลได้');
        const data = await response.json();
        borrowedBooks = data; 
      } catch (error) {
        console.error('Error fetching data:', error);
        errorMessage = 'เกิดข้อผิดพลาดในการโหลดข้อมูล';
      }
    };
  
    // โหลดข้อมูลตอน mount
    onMount(() => {
      fetchBorrowedBooks();
    });
    const goBackToHome = () => {
    window.location.href = '/';
  };
  </script>
  
  <div>
    <h1>📚 ข้อมูลผู้ยืมหนังสือที่ต้องคืน</h1>
    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}
    {#if borrowedBooks.length > 0}
      <ul>
        {#each borrowedBooks as book}
          <li><h4>
            📖 {book.title} - {book.isbn} - 📅 {book.borrowedByid} - {book.borrowedByName} - วันที่ต้องคืน: {new Date(book.dueDate).toLocaleDateString('th-TH')}
            </h4>
          </li>
        {/each}
      </ul>
    {:else}
      <p>ยังไม่มีข้อมูลยืมหนังสือ</p>
    {/if}
      <!-- ปุ่มกลับหน้าหลัก -->
  <div>
    <button class="back-btn" on:click={goBackToHome}><h4>กลับหน้าหลัก</h4></button>
    
  </div>
  </div>
  