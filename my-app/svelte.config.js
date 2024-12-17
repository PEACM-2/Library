import adapter from '@sveltejs/adapter-auto';  // ใช้ adapter-auto ที่จะเลือก adapter อัตโนมัติ
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';  // ใช้ preprocess สำหรับการแปลง Svelte code

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),  // ใช้ vitePreprocess ในการ preprocess code

  kit: {
    // ตัวเลือก adapter สำหรับโปรเจกต์นี้
    adapter: adapter(),  // เลือก adapter ที่เหมาะสมโดยอัตโนมัติ
  }
};

export default config;
