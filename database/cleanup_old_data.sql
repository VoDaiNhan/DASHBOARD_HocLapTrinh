-- =====================================================
-- Script để xóa hết dữ liệu và cấu trúc cũ
-- Chạy SQL này TRƯỚC khi chạy schema.sql
-- =====================================================

-- XÓA TẤT CẢ DỮ LIỆU
-- =====================================================

-- Xóa dữ liệu trong các table (nếu có)
-- Lưu ý: TRUNCATE phải chạy trước khi DROP TABLE
DO $$ 
BEGIN
    -- Xóa dữ liệu user_sessions (nếu table tồn tại)
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_sessions') THEN
        TRUNCATE TABLE public.user_sessions CASCADE;
    END IF;
    
    -- Xóa dữ liệu users (nếu table tồn tại)
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
        TRUNCATE TABLE public.users CASCADE;
    END IF;
    
    -- Xóa dữ liệu class (nếu table tồn tại)
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'class') THEN
        TRUNCATE TABLE public.class CASCADE;
    END IF;
    
    -- Xóa dữ liệu password_resets (nếu table tồn tại)
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'password_resets') THEN
        TRUNCATE TABLE public.password_resets CASCADE;
    END IF;
END $$;

-- XÓA TẤT CẢ TRIGGERS
-- =====================================================

-- Xóa trigger cũ (nếu có)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- XÓA TẤT CẢ FUNCTIONS
-- =====================================================

-- Xóa function cũ (nếu có)
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.cleanup_expired_sessions() CASCADE;
DROP FUNCTION IF EXISTS public.generate_mssv() CASCADE;

-- XÓA TẤT CẢ POLICIES (RLS)
-- =====================================================

-- Xóa các policies cũ từ table users
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Service role can insert users" ON public.users;

-- Xóa các policies cũ từ table user_sessions
DROP POLICY IF EXISTS "Users can view own sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can delete own sessions" ON public.user_sessions;

-- XÓA TẤT CẢ TABLES
-- =====================================================

-- Xóa table user_sessions (nếu có)
DROP TABLE IF EXISTS public.user_sessions CASCADE;

-- Xóa table users (nếu có)
DROP TABLE IF EXISTS public.users CASCADE;

-- Xóa table class (nếu có)
DROP TABLE IF EXISTS public.class CASCADE;

-- Xóa table password_resets (nếu có)
DROP TABLE IF EXISTS public.password_resets CASCADE;

-- XÓA TẤT CẢ INDEXES
-- =====================================================

-- Xóa indexes (nếu table bị xóa thì indexes tự động xóa, nhưng để chắc chắn)
DROP INDEX IF EXISTS idx_class_class_name;
DROP INDEX IF EXISTS idx_class_email;
DROP INDEX IF EXISTS idx_class_is_registered;
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_mssv;
DROP INDEX IF EXISTS idx_users_role;
DROP INDEX IF EXISTS idx_users_class_id;
DROP INDEX IF EXISTS idx_user_sessions_user_id;
DROP INDEX IF EXISTS idx_user_sessions_access_token;
DROP INDEX IF EXISTS idx_user_sessions_refresh_token;
DROP INDEX IF EXISTS idx_user_sessions_active;
DROP INDEX IF EXISTS idx_password_resets_user_id;
DROP INDEX IF EXISTS idx_password_resets_token;
DROP INDEX IF EXISTS idx_password_resets_expires_at;

-- =====================================================
-- HOÀN TẤT
-- =====================================================

-- Thông báo
DO $$
BEGIN
    RAISE NOTICE '✅ Đã xóa hết dữ liệu và cấu trúc cũ!';
    RAISE NOTICE '📝 Bây giờ chạy schema.sql để tạo schema mới';
END $$;

