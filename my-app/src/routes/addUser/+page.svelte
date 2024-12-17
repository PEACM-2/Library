<script lang="ts">
    let id = '';
    let userName = '';
    let errorMessage = '';
  
    const handleSubmit = async () => {
  try {
    const response = await fetch('/api/addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, id }),
    });

    const result = await response.json();
    console.log('Response:', result); // Debugging

    if (response.ok) {
      //alert(result.message);
      id = '';
      userName = '';
      
    } else {
      errorMessage = result.error || 'เกิดข้อผิดพลาด';
    }
  } catch (error) {
    console.error('Error:', error);
    errorMessage = 'เกิดข้อผิดพลาดในการติดต่อเซิร์ฟเวอร์';
  }
};

  
    const goBackToHome = () => {
      window.location.href = '/';
    };
  </script>
  
  <style>
    /* General reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  
    /* Body styles */
    :global(body) {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f9;
    color: #333;
  }
  
  
    /* Container wrapper */
    .container {
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    h1 {
      text-align: center;
      margin-bottom: 20px;
      color: #007bff;
    }
  
    /* Styling form */
    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  
    form label {
      font-weight: bold;
    }
  
    form input {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      transition: border-color 0.2s ease;
    }
  
    form input:focus {
      border-color: #007bff;
      outline: none;
    }
  
    button[type="submit"] {
      cursor: pointer;
      background-color: #007bff;
      color: #ffffff;
      border: none;
      padding: 12px 15px;
      border-radius: 5px;
      transition: background-color 0.2s ease;
      font-size: 16px;
    }
  
    button[type="submit"]:hover {
      background-color: #0056b3;
    }
  
    /* Error message */
    .error {
      color: red;
      font-size: 14px;
      text-align: center;
    }
  
    /* Back button */
    .back-btn {
      margin-top: 20px;
      padding: 10px 15px;
      cursor: pointer;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      transition: background-color 0.2s ease;
      text-align: center;
    }
  
    .back-btn:hover {
      background-color: #495057;
    }
  </style>
  
  <div class="container">
    <h1>📚 เพิ่มชื่อผู้ใช้</h1>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="id">ID:</label>
        <input id="id" type="text" bind:value={id} placeholder="กรอกID" required />
      </div>
      <div>
        <label for="name">ชื่อ:</label>
        <input id="name" type="text" bind:value={userName} placeholder="กรอกชื่อ" required />
      </div>

  
      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}

      <button type="submit">เพิ่มชื่อผู้ใช้</button>
    </form>
  
    <!-- ปุ่มกลับหน้าหลัก -->
    <div>
      <button class="back-btn" on:click={goBackToHome}>กลับหน้าหลัก</button>
    </div>
  </div>
  