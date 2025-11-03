-- =====================================================
-- Schema cho Custom Authentication
-- Chỉ dùng PostgreSQL với bcrypt để hash password
-- =====================================================

-- BƯỚC 1: XÓA TẤT CẢ CŨ (nếu có)
-- =====================================================

-- Xóa tables (CASCADE sẽ xóa luôn foreign keys và indexes)
DROP TABLE IF EXISTS public.user_sessions CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.class CASCADE;
DROP TABLE IF EXISTS public.password_resets CASCADE;

-- Xóa functions (nếu có)
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.cleanup_expired_sessions() CASCADE;
DROP FUNCTION IF EXISTS public.generate_mssv() CASCADE;

-- Xóa trigger (nếu có)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- BƯỚC 2: TẠO TABLES MỚI
-- =====================================================

-- Tạo table class (danh sách học sinh trong lớp)
CREATE TABLE public.class (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name TEXT NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  is_registered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(class_name, email, full_name)
);

-- Tạo table users
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  mssv TEXT UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  class_id UUID REFERENCES public.class(id) ON DELETE SET NULL,
  role TEXT NOT NULL DEFAULT 'sinh_vien' CHECK (role IN ('sinh_vien', 'giang_vien', 'manage_nghanh')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo indexes cho class
CREATE INDEX idx_class_class_name ON public.class(class_name);
CREATE INDEX idx_class_email ON public.class(email);
CREATE INDEX idx_class_is_registered ON public.class(is_registered);

-- Tạo indexes cho users
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_mssv ON public.users(mssv);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_class_id ON public.users(class_id);

-- Tạo table user_sessions
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  refresh_token_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Tạo indexes cho user_sessions
CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_access_token ON public.user_sessions(access_token);
CREATE INDEX idx_user_sessions_refresh_token ON public.user_sessions(refresh_token);
CREATE INDEX idx_user_sessions_active ON public.user_sessions(user_id, is_active) WHERE is_active = TRUE;

-- Tạo table password_resets (cho chức năng quên mật khẩu)
CREATE TABLE public.password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo indexes cho password_resets
CREATE INDEX idx_password_resets_user_id ON public.password_resets(user_id);
CREATE INDEX idx_password_resets_token ON public.password_resets(token);
CREATE INDEX idx_password_resets_expires_at ON public.password_resets(expires_at);

-- BƯỚC 3: TẠO FUNCTIONS
-- =====================================================

-- Function để tự động tạo MSSV
CREATE OR REPLACE FUNCTION public.generate_mssv()
RETURNS TEXT AS $$
DECLARE
  current_year TEXT;
  max_num INTEGER;
  new_mssv TEXT;
BEGIN
  current_year := SUBSTRING(TO_CHAR(CURRENT_DATE, 'YYYY'), 3, 2);
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(mssv, 3) AS INTEGER)), 0)
  INTO max_num
  FROM public.users
  WHERE mssv LIKE current_year || '%'
    AND role = 'sinh_vien'
    AND mssv IS NOT NULL;
  
  max_num := max_num + 1;
  new_mssv := current_year || LPAD(max_num::TEXT, 5, '0');
  
  RETURN new_mssv;
END;
$$ LANGUAGE plpgsql;

-- BƯỚC 4: COMMENTS
-- =====================================================

COMMENT ON TABLE public.class IS 'Bảng danh sách học sinh trong lớp (pre-approved)';
COMMENT ON COLUMN public.class.class_name IS 'Tên lớp học (ví dụ: CNTT_2024_01)';
COMMENT ON COLUMN public.class.email IS 'Email của học sinh';
COMMENT ON COLUMN public.class.full_name IS 'Họ và tên học sinh';
COMMENT ON COLUMN public.class.is_registered IS 'Đã đăng ký tài khoản chưa';
COMMENT ON TABLE public.users IS 'Bảng lưu thông tin users với custom authentication';
COMMENT ON COLUMN public.users.password IS 'Password hash (bcrypt)';
COMMENT ON COLUMN public.users.mssv IS 'Mã số sinh viên (unique cho sinh viên)';
COMMENT ON COLUMN public.users.role IS 'Role của user: sinh_vien, giang_vien hoặc manage_nghanh';
COMMENT ON COLUMN public.users.address IS 'Địa chỉ (chủ yếu cho giảng viên)';
COMMENT ON COLUMN public.users.phone IS 'Số điện thoại (chủ yếu cho giảng viên)';
COMMENT ON COLUMN public.users.class_id IS 'ID lớp học mà sinh viên thuộc về';
COMMENT ON TABLE public.user_sessions IS 'Bảng lưu thông tin sessions và tokens của users';
COMMENT ON TABLE public.password_resets IS 'Bảng lưu token reset password';
COMMENT ON COLUMN public.password_resets.token IS 'Token reset password (unique)';
COMMENT ON COLUMN public.password_resets.expires_at IS 'Thời gian hết hạn token (15 phút)';
COMMENT ON COLUMN public.password_resets.is_used IS 'Token đã được sử dụng chưa';

-- HOÀN TẤT
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Schema custom authentication đã được tạo thành công!';
    RAISE NOTICE '📝 Tables: class, users, user_sessions, password_resets';
    RAISE NOTICE '📝 Function: generate_mssv()';
END $$;
