# 🏆 Top 3 Ranking System - Configuration Guide

## 📋 Logic Hiện Tại

### BƯỚC 1: FILTER (Lọc sinh viên đủ điều kiện)
```javascript
const eligibleStudents = students.filter(s => 
  s.progress >= 70 && s.gpa >= 7.0
);
```

**Điều kiện:**
- ✅ Tiến độ ≥ 70%
- ✅ GPA ≥ 7.0

**Mục đích:** Loại bỏ sinh viên lười và điểm thấp

### BƯỚC 2: RANK (Xếp hạng)
```javascript
const rankingCriteria = 'gpa'; // Mặc định

sortedEligible.sort((a, b) => {
  if (rankingCriteria === 'gpa') {
    return b.gpa - a.gpa; // GPA cao nhất trước
  } else {
    return b.progress - a.progress; // Progress cao nhất trước
  }
});
```

**Tiêu chí xếp hạng:**
- **Option A (Mặc định):** Sort theo GPA ↓
- **Option B:** Sort theo Progress ↓

---

## ⚙️ Cấu Hình Trong "Cấu hình chuyên ngành"

### Các Tham Số Có Thể Cấu Hình

```javascript
{
  // 1. Điều kiện lọc
  minProgress: 70,        // % tiến độ tối thiểu (mặc định: 70)
  minGPA: 7.0,           // GPA tối thiểu (mặc định: 7.0)
  
  // 2. Tiêu chí xếp hạng (CHỈ CHỌN 1)
  rankingCriteria: 'gpa', // 'gpa' hoặc 'progress'
  
  // 3. Số lượng hiển thị
  topCount: 3             // Số sinh viên top (mặc định: 3)
}
```

### Ví Dụ Cấu Hình

**Cấu hình 1: Ưu tiên chất lượng (GPA)**
```json
{
  "minProgress": 70,
  "minGPA": 7.0,
  "rankingCriteria": "gpa",
  "topCount": 3
}
```
→ Lấy sinh viên có Progress ≥70% và GPA ≥7.0, xếp theo GPA cao nhất

**Cấu hình 2: Ưu tiên số lượng bài làm (Progress)**
```json
{
  "minProgress": 70,
  "minGPA": 7.0,
  "rankingCriteria": "progress",
  "topCount": 3
}
```
→ Lấy sinh viên có Progress ≥70% và GPA ≥7.0, xếp theo Progress cao nhất

**Cấu hình 3: Tiêu chuẩn cao hơn**
```json
{
  "minProgress": 80,
  "minGPA": 8.0,
  "rankingCriteria": "gpa",
  "topCount": 5
}
```
→ Lấy sinh viên có Progress ≥80% và GPA ≥8.0, xếp theo GPA, hiển thị top 5

---

## 🎯 Ví Dụ Cụ Thể

### Data Mẫu
```
SV A: Progress 95%, GPA 6.5 ❌ (GPA < 7.0)
SV B: Progress 80%, GPA 8.5 ✅
SV C: Progress 75%, GPA 7.5 ✅
SV D: Progress 65%, GPA 9.0 ❌ (Progress < 70%)
SV E: Progress 85%, GPA 8.0 ✅
```

### Sau Filter (Progress ≥70% và GPA ≥7.0)
```
SV B: Progress 80%, GPA 8.5 ✅
SV C: Progress 75%, GPA 7.5 ✅
SV E: Progress 85%, GPA 8.0 ✅
```

### Ranking Option A (Sort theo GPA)
```
#1 SV B: 80% - GPA 8.5
#2 SV E: 85% - GPA 8.0
#3 SV C: 75% - GPA 7.5
```

### Ranking Option B (Sort theo Progress)
```
#1 SV E: 85% - GPA 8.0
#2 SV B: 80% - GPA 8.5
#3 SV C: 75% - GPA 7.5
```

---

## 💡 UI Display

### Top 3 Card
```
┌─────────────────────────────────────────┐
│ 👍 Top 3 sinh viên    [3 đủ điều kiện] │
├─────────────────────────────────────────┤
│ Điều kiện: Tiến độ ≥70% và GPA ≥7.0     │
│ Xếp hạng theo: GPA cao nhất             │
├─────────────────────────────────────────┤
│ #1 Sinh viên B        80%  GPA: 8.5     │
│ #2 Sinh viên E        85%  GPA: 8.0     │
│ #3 Sinh viên C        75%  GPA: 7.5     │
└─────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────────┐
│ 👍 Top 3 sinh viên    [0 đủ điều kiện] │
├─────────────────────────────────────────┤
│ Điều kiện: Tiến độ ≥70% và GPA ≥7.0     │
│ Xếp hạng theo: GPA cao nhất             │
├─────────────────────────────────────────┤
│     Chưa có sinh viên đủ điều kiện      │
└─────────────────────────────────────────┘
```

---

## 🔧 Implementation Plan

### Phase 1: Hardcoded (✅ Done)
- Filter: Progress ≥70% và GPA ≥7.0
- Ranking: GPA (mặc định)
- Hiển thị điều kiện trong UI

### Phase 2: Config từ Database (Future)
```javascript
// Lấy config từ database
const config = await fetchDepartmentConfig(departmentId);

const eligibleStudents = students.filter(s => 
  s.progress >= config.minProgress && 
  s.gpa >= config.minGPA
);

const sorted = [...eligibleStudents].sort((a, b) => {
  if (config.rankingCriteria === 'gpa') {
    return b.gpa - a.gpa;
  } else {
    return b.progress - a.progress;
  }
});

const top = sorted.slice(0, config.topCount);
```

### Phase 3: UI Cấu hình (Future)
Trang "Cấu hình chuyên ngành" có form:
```
┌─────────────────────────────────────┐
│ Cấu hình Top 3 Sinh viên            │
├─────────────────────────────────────┤
│ Tiến độ tối thiểu:  [70] %          │
│ GPA tối thiểu:      [7.0]           │
│                                     │
│ Xếp hạng theo:                      │
│ ○ GPA cao nhất (khuyến nghị)       │
│ ○ Tiến độ cao nhất                 │
│                                     │
│ Số lượng hiển thị:  [3]             │
│                                     │
│ [Lưu cấu hình]                      │
└─────────────────────────────────────┘
```

---

## 📊 So Sánh 2 Options

| Tiêu chí | Option A (GPA) | Option B (Progress) |
|----------|----------------|---------------------|
| **Ưu tiên** | Chất lượng | Số lượng bài làm |
| **Phù hợp** | Học bổng, khen thưởng | Động viên làm bài |
| **Ưu điểm** | Công nhận sinh viên giỏi | Khuyến khích chăm chỉ |
| **Nhược điểm** | Có thể bỏ qua SV chăm | Có thể bỏ qua SV giỏi |

---

## ✅ Best Practices

### DO ✅
- Hiển thị rõ điều kiện filter
- Hiển thị số sinh viên đủ điều kiện
- Hiển thị tiêu chí xếp hạng
- Cho phép cấu hình linh hoạt
- Empty state khi không có SV đủ điều kiện

### DON'T ❌
- Không giải thích điều kiện
- Thay đổi logic mà không thông báo
- Xếp hạng không công bằng
- Quên xử lý empty state

---

**Status**: ✅ Implemented (Phase 1)
**Last Updated**: 2026-05-03
**Next**: Phase 2 - Config từ Database
