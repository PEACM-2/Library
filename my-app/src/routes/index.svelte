<script lang="ts">
    let books: { title: string, author: string, isbn: string, isAvailable: boolean }[] = [];
    let searchQuery = "";
    let borrowIsbn = "";
    let returnIsbn = "";

    // ฟังก์ชันดึงข้อมูลจาก API
    const getBooks = async () => {
        const res = await fetch('/api/books');
        books = await res.json();
    };

    const searchBooks = async () => {
        const res = await fetch(`/api/search?query=${searchQuery}`);
        books = await res.json();
    };

    const borrowBook = async () => {
        const res = await fetch('/api/borrow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isbn: borrowIsbn }),
        });

        if (res.ok) {
            alert('หนังสือถูกยืมสำเร็จ!');
        } else {
            alert('เกิดข้อผิดพลาดในการยืมหนังสือ');
        }
    };

    const returnBook = async () => {
        const res = await fetch('/api/return', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isbn: returnIsbn }),
        });

        if (res.ok) {
            alert('หนังสือคืนสำเร็จ!');
        } else {
            alert('เกิดข้อผิดพลาดในการคืนหนังสือ');
        }
    };

    // เรียกข้อมูลหนังสือเมื่อเริ่ม
    getBooks();
</script>

<h1>ห้องสมุด</h1>

<!-- ฟอร์มค้นหาหนังสือ -->
<h2>ค้นหาหนังสือ</h2>
<input type="text" bind:value={searchQuery} placeholder="ค้นหาหนังสือ" />
<button on:click={searchBooks}>ค้นหา</button>

<h2>รายการหนังสือ</h2>
<ul>
    {#each books as book}
        <li>
            {book.title} โดย {book.author} ({book.isbn}) - {book.isAvailable ? 'มีให้ยืม' : 'ถูกยืมแล้ว'}
        </li>
    {/each}
</ul>

<!-- ฟอร์มยืมหนังสือ -->
<h2>ยืมหนังสือ</h2>
<input type="text" bind:value={borrowIsbn} placeholder="กรอก ISBN ของหนังสือที่ต้องการยืม" />
<button on:click={borrowBook}>ยืมหนังสือ</button>

<!-- ฟอร์มคืนหนังสือ -->
<h2>คืนหนังสือ</h2>
<input type="text" bind:value={returnIsbn} placeholder="กรอก ISBN ของหนังสือที่ต้องการคืน" />
<button on:click={returnBook}>คืนหนังสือ</button>
