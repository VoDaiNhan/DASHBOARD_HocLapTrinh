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

async function fixMSSVSequence() {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Đang kết nối với Neon database...');
    
    // Test connection
    await client.query('SELECT 1');
    console.log('✅ Kết nối database thành công!\n');
    
    // Đọc file SQL
    console.log('📖 Đang đọc fix_mssv_sequence.sql...');
    const sqlFilePath = path.join(__dirname, 'fix_mssv_sequence.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Chạy SQL
    console.log('⚙️  Đang tạo sequence và function mới...\n');
    await client.query(sqlContent);
    
    console.log('✅ Fix MSSV race condition thành công!');
    console.log('='.repeat(50));
    console.log('📝 Đã tạo:');
    console.log('   - Sequence: public.mssv_sequence');
    console.log('   - Function: public.generate_mssv_safe()');
    console.log('\n🔒 Giờ đây MSSV sẽ được tạo thread-safe');
    console.log('   → Không còn bị trùng khi nhiều người đăng ký cùng lúc!');
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('❌ Lỗi khi fix MSSV sequence:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Chạy fix
fixMSSVSequence()
  .then(() => {
    console.log('\n✨ Hoàn tất!');
    console.log('💡 Bây giờ restart server và thử đăng ký lại nhé!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fix thất bại:', error);
    process.exit(1);
  });

