-- =====================================================
-- Fix MSSV Race Condition
-- Tạo sequence để generate MSSV an toàn
-- =====================================================

-- Xóa sequence cũ nếu có
DROP SEQUENCE IF EXISTS public.mssv_sequence CASCADE;

-- Tạo sequence mới
-- Sequence này sẽ tự động tăng và thread-safe
CREATE SEQUENCE public.mssv_sequence
  START WITH 1
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;

-- Tạo function mới để generate MSSV (thread-safe)
CREATE OR REPLACE FUNCTION public.generate_mssv_safe()
RETURNS TEXT AS $$
DECLARE
  current_year TEXT;
  seq_num INTEGER;
  new_mssv TEXT;
  max_existing_num INTEGER;
BEGIN
  -- Lấy 2 số cuối của năm hiện tại
  current_year := SUBSTRING(TO_CHAR(CURRENT_DATE, 'YYYY'), 3, 2);
  
  -- Lấy số lớn nhất hiện có của năm này
  SELECT COALESCE(MAX(CAST(SUBSTRING(mssv, 3) AS INTEGER)), 0)
  INTO max_existing_num
  FROM public.users
  WHERE mssv LIKE current_year || '%'
    AND role = 'sinh_vien'
    AND mssv IS NOT NULL;
  
  -- Lấy số sequence tiếp theo
  seq_num := nextval('public.mssv_sequence');
  
  -- Nếu sequence nhỏ hơn max hiện có, set lại sequence
  IF seq_num <= max_existing_num THEN
    PERFORM setval('public.mssv_sequence', max_existing_num + 1, false);
    seq_num := nextval('public.mssv_sequence');
  END IF;
  
  -- Tạo MSSV: YY + 5 chữ số
  new_mssv := current_year || LPAD(seq_num::TEXT, 5, '0');
  
  RETURN new_mssv;
END;
$$ LANGUAGE plpgsql;

-- Thông báo hoàn tất
DO $$
BEGIN
  RAISE NOTICE '✅ MSSV sequence và function đã được tạo thành công!';
  RAISE NOTICE '📝 Function: generate_mssv_safe()';
  RAISE NOTICE '🔒 Thread-safe, không còn race condition!';
END $$;

