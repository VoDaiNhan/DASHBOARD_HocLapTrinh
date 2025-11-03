-- =====================================================
-- Script để thêm table password_resets vào database hiện tại
-- KHÔNG XÓA DỮ LIỆU CŨ
-- =====================================================

-- Tạo table password_resets (cho chức năng quên mật khẩu)
-- Chỉ tạo nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS public.password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo indexes cho password_resets (chỉ tạo nếu chưa tồn tại)
CREATE INDEX IF NOT EXISTS idx_password_resets_user_id ON public.password_resets(user_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_token ON public.password_resets(token);
CREATE INDEX IF NOT EXISTS idx_password_resets_expires_at ON public.password_resets(expires_at);

-- Thêm comments
COMMENT ON TABLE public.password_resets IS 'Bảng lưu token reset password';
COMMENT ON COLUMN public.password_resets.token IS 'Token reset password (unique)';
COMMENT ON COLUMN public.password_resets.expires_at IS 'Thời gian hết hạn token (15 phút)';
COMMENT ON COLUMN public.password_resets.is_used IS 'Token đã được sử dụng chưa';

-- Thông báo thành công
DO $$
BEGIN
    RAISE NOTICE '✅ Đã thêm table password_resets thành công!';
    RAISE NOTICE '📝 Table: password_resets';
    RAISE NOTICE '📝 Indexes: idx_password_resets_user_id, idx_password_resets_token, idx_password_resets_expires_at';
END $$;

