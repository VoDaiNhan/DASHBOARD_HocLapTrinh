-- =====================================================
-- Import Students Data từ students_sample_v2.txt
-- Insert vào bảng class (danh sách học sinh trong lớp)
-- =====================================================

-- Xóa dữ liệu cũ trong bảng class (nếu muốn reset)
-- TRUNCATE TABLE public.class CASCADE;

-- Insert dữ liệu học sinh
INSERT INTO public.class (class_name, email, full_name, is_registered) VALUES
('22ct111', 'nguyenanhgiang@example.com', 'Nguyễn Anh Giang', FALSE),
('22ct111', 'buianhtrang@example.com', 'Bùi Anh Trang', FALSE),
('22ct111', 'phamquangbinh@example.com', 'Phạm Quang Bình', FALSE),
('22ct111', 'đangngoccuong@example.com', 'Đặng Ngọc Cường', FALSE),
('22ct111', 'vongocvy@example.com', 'Võ Ngọc Vy', FALSE),
('22ct111', 'huynhanhtu@example.com', 'Huỳnh Anh Tú', FALSE),
('22ct111', 'nguyenngoccuong@example.com', 'Nguyễn Ngọc Cường', FALSE),
('22ct111', 'vohuumy@example.com', 'Võ Hữu My', FALSE),
('22ct111', 'đangphucgiang@example.com', 'Đặng Phúc Giang', FALSE),
('22ct111', 'đangphucmy@example.com', 'Đặng Phúc My', FALSE),
('22ct111', 'buihaihung@example.com', 'Bùi Hải Hưng', FALSE),
('22ct111', 'lehaimy@example.com', 'Lê Hải My', FALSE),
('22ct111', 'phamminhquan@example.com', 'Phạm Minh Quân', FALSE),
('22ct111', 'hoangthanhkhanh@example.com', 'Hoàng Thanh Khánh', FALSE),
('22ct111', 'đangquangdung@example.com', 'Đặng Quang Dũng', FALSE),
('22ct111', 'buianhlan@example.com', 'Bùi Anh Lan', FALSE),
('22ct111', 'đoanhvy@example.com', 'Đỗ Anh Vy', FALSE),
('22ct111', 'buihuuha@example.com', 'Bùi Hữu Hà', FALSE),
('22ct111', 'buithitrang@example.com', 'Bùi Thị Trang', FALSE),
('22ct111', 'phamanhvy@example.com', 'Phạm Anh Vy', FALSE),
('22ct112', 'đohuucuong@example.com', 'Đỗ Hữu Cường', FALSE),
('22ct112', 'lethanhtu@example.com', 'Lê Thanh Tú', FALSE),
('22ct112', 'levanson@example.com', 'Lê Văn Sơn', FALSE),
('22ct112', 'nguyenthanhcuong@example.com', 'Nguyễn Thanh Cường', FALSE),
('22ct112', 'buiminhbinh@example.com', 'Bùi Minh Bình', FALSE),
('22ct112', 'đangminhnam@example.com', 'Đặng Minh Nam', FALSE),
('22ct112', 'đangvanphat@example.com', 'Đặng Văn Phát', FALSE),
('22ct112', 'hoangquangtrang@example.com', 'Hoàng Quang Trang', FALSE),
('22ct112', 'đanganhdung@example.com', 'Đặng Anh Dũng', FALSE),
('22ct112', 'tranphucdung@example.com', 'Trần Phúc Dũng', FALSE),
('22ct112', 'tranquangkhanh@example.com', 'Trần Quang Khánh', FALSE),
('22ct112', 'đohuuha@example.com', 'Đỗ Hữu Hà', FALSE),
('22ct112', 'đovanson@example.com', 'Đỗ Văn Sơn', FALSE),
('22ct112', 'đangquangha@example.com', 'Đặng Quang Hà', FALSE),
('22ct112', 'đangngocvy@example.com', 'Đặng Ngọc Vy', FALSE),
('22ct112', 'hoangngocson@example.com', 'Hoàng Ngọc Sơn', FALSE),
('22ct112', 'buithanhlan@example.com', 'Bùi Thanh Lan', FALSE),
('22ct112', 'lequangvy@example.com', 'Lê Quang Vy', FALSE),
('22ct112', 'buingocvy@example.com', 'Bùi Ngọc Vy', FALSE),
('22ct112', 'đangngocha@example.com', 'Đặng Ngọc Hà', FALSE),
('22ct113', 'huynhquangtu@example.com', 'Huỳnh Quang Tú', FALSE),
('22ct113', 'hoanghainam@example.com', 'Hoàng Hải Nam', FALSE),
('22ct113', 'nguyenanhtrang@example.com', 'Nguyễn Anh Trang', FALSE),
('22ct113', 'nguyenhuubinh@example.com', 'Nguyễn Hữu Bình', FALSE),
('22ct113', 'phamanhcuong@example.com', 'Phạm Anh Cường', FALSE),
('22ct113', 'đovanbinh@example.com', 'Đỗ Văn Bình', FALSE),
('22ct113', 'phamhaigiang@example.com', 'Phạm Hải Giang', FALSE),
('22ct113', 'nguyenminhcuong@example.com', 'Nguyễn Minh Cường', FALSE),
('22ct113', 'nguyenngoctu@example.com', 'Nguyễn Ngọc Tú', FALSE),
('22ct113', 'tranvanphat@example.com', 'Trần Văn Phát', FALSE),
('22ct113', 'buiphuchung@example.com', 'Bùi Phúc Hưng', FALSE),
('22ct113', 'lethanhson@example.com', 'Lê Thanh Sơn', FALSE),
('22ct113', 'vongockhanh@example.com', 'Võ Ngọc Khánh', FALSE),
('22ct113', 'huynhphuccuong@example.com', 'Huỳnh Phúc Cường', FALSE),
('22ct113', 'lequangvy@example.com', 'Lê Quang Vy', FALSE),
('22ct113', 'leanhquan@example.com', 'Lê Anh Quân', FALSE),
('22ct113', 'đoanhlan@example.com', 'Đỗ Anh Lan', FALSE),
('22ct113', 'hoangngocdung@example.com', 'Hoàng Ngọc Dũng', FALSE),
('22ct113', 'huynhthanhlan@example.com', 'Huỳnh Thanh Lan', FALSE),
('22ct113', 'lehaibinh@example.com', 'Lê Hải Bình', FALSE),
('22ct114', 'leminhlan@example.com', 'Lê Minh Lan', FALSE),
('22ct114', 'buianhnam@example.com', 'Bùi Anh Nam', FALSE),
('22ct114', 'nguyenngocphat@example.com', 'Nguyễn Ngọc Phát', FALSE),
('22ct114', 'vothanhnam@example.com', 'Võ Thanh Nam', FALSE),
('22ct114', 'buiphucha@example.com', 'Bùi Phúc Hà', FALSE),
('22ct114', 'tranvanmy@example.com', 'Trần Văn My', FALSE),
('22ct114', 'tranquangmy@example.com', 'Trần Quang My', FALSE),
('22ct114', 'hoangvanvy@example.com', 'Hoàng Văn Vy', FALSE),
('22ct114', 'nguyenthihung@example.com', 'Nguyễn Thị Hưng', FALSE),
('22ct114', 'tranphuchung@example.com', 'Trần Phúc Hưng', FALSE),
('22ct114', 'voquanggiang@example.com', 'Võ Quang Giang', FALSE),
('22ct114', 'nguyenhaidung@example.com', 'Nguyễn Hải Dũng', FALSE),
('22ct114', 'tranphucson@example.com', 'Trần Phúc Sơn', FALSE),
('22ct114', 'vophuckhanh@example.com', 'Võ Phúc Khánh', FALSE),
('22ct114', 'huynhhaian@example.com', 'Huỳnh Hải An', FALSE),
('22ct114', 'phamhaihung@example.com', 'Phạm Hải Hưng', FALSE),
('22ct114', 'đanghaigiang@example.com', 'Đặng Hải Giang', FALSE),
('22ct114', 'hoangquangquan@example.com', 'Hoàng Quang Quân', FALSE),
('22ct114', 'vohaicuong@example.com', 'Võ Hải Cường', FALSE),
('22ct114', 'huynhanhgiang@example.com', 'Huỳnh Anh Giang', FALSE),
('22ct115', 'phamngockhanh@example.com', 'Phạm Ngọc Khánh', FALSE),
('22ct115', 'vovanha@example.com', 'Võ Văn Hà', FALSE),
('22ct115', 'đanghuumy@example.com', 'Đặng Hữu My', FALSE),
('22ct115', 'nguyenthian@example.com', 'Nguyễn Thị An', FALSE),
('22ct115', 'buiquangan@example.com', 'Bùi Quang An', FALSE),
('22ct115', 'trananhbinh@example.com', 'Trần Anh Bình', FALSE),
('22ct115', 'hoangminhkhanh@example.com', 'Hoàng Minh Khánh', FALSE),
('22ct115', 'phamquangquan@example.com', 'Phạm Quang Quân', FALSE),
('22ct115', 'phamminhlan@example.com', 'Phạm Minh Lan', FALSE),
('22ct115', 'trananhson@example.com', 'Trần Anh Sơn', FALSE),
('22ct115', 'hoangthison@example.com', 'Hoàng Thị Sơn', FALSE),
('22ct115', 'vongockhanh@example.com', 'Võ Ngọc Khánh', FALSE),
('22ct115', 'đangphuccuong@example.com', 'Đặng Phúc Cường', FALSE),
('22ct115', 'buingockhanh@example.com', 'Bùi Ngọc Khánh', FALSE),
('22ct115', 'hoangngoclan@example.com', 'Hoàng Ngọc Lan', FALSE),
('22ct115', 'hoangthison@example.com', 'Hoàng Thị Sơn', FALSE),
('22ct115', 'vovantrang@example.com', 'Võ Văn Trang', FALSE),
('22ct115', 'leminhmy@example.com', 'Lê Minh My', FALSE),
('22ct115', 'lengocha@example.com', 'Lê Ngọc Hà', FALSE),
('22ct115', 'nguyenquangkhanh@example.com', 'Nguyễn Quang Khánh', FALSE)
ON CONFLICT (class_name, email, full_name) DO NOTHING;

-- Thông báo kết quả
DO $$
DECLARE
  total_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_count FROM public.class;
  RAISE NOTICE '✅ Import thành công!';
  RAISE NOTICE '📊 Tổng số học sinh trong database: %', total_count;
  RAISE NOTICE '📋 Danh sách lớp:';
  RAISE NOTICE '   - 22ct111: % học sinh', (SELECT COUNT(*) FROM public.class WHERE class_name = '22ct111');
  RAISE NOTICE '   - 22ct112: % học sinh', (SELECT COUNT(*) FROM public.class WHERE class_name = '22ct112');
  RAISE NOTICE '   - 22ct113: % học sinh', (SELECT COUNT(*) FROM public.class WHERE class_name = '22ct113');
  RAISE NOTICE '   - 22ct114: % học sinh', (SELECT COUNT(*) FROM public.class WHERE class_name = '22ct114');
  RAISE NOTICE '   - 22ct115: % học sinh', (SELECT COUNT(*) FROM public.class WHERE class_name = '22ct115');
END $$;


