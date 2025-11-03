import pkg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Tạo connection với Neon database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function importStudents() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Đang kết nối với Neon database...');
    
    // Test connection
    await client.query('SELECT 1');
    console.log('✅ Kết nối database thành công!\n');
    
    // Đọc file SQL
    console.log('📖 Đang đọc file import_students.sql...');
    const sqlFilePath = path.join(__dirname, 'import_students.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Chạy SQL
    console.log('⚙️  Đang import dữ liệu học sinh...\n');
    await client.query(sqlContent);
    
    // Lấy thống kê
    const statsResult = await client.query(`
      SELECT 
        class_name,
        COUNT(*) as student_count
      FROM public.class
      GROUP BY class_name
      ORDER BY class_name;
    `);
    
    const totalResult = await client.query('SELECT COUNT(*) as total FROM public.class');
    
    console.log('✅ Import thành công!');
    console.log('='.repeat(50));
    console.log(`📊 Tổng số học sinh trong database: ${totalResult.rows[0].total}`);
    console.log('\n📋 Danh sách lớp:');
    statsResult.rows.forEach(row => {
      console.log(`   - ${row.class_name}: ${row.student_count} học sinh`);
    });
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('❌ Lỗi khi import dữ liệu:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Chạy import
importStudents()
  .then(() => {
    console.log('\n✨ Hoàn tất!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Import thất bại:', error);
    process.exit(1);
  });

