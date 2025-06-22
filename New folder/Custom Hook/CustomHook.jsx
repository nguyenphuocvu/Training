// Custom Hook là hàm JavaScript bắt đầu bằng use dùng để tái sử dụng logic dùng hook giữa các component

// Khi bạn có nhiều component dùng chung một logic (ví dụ gọi API, xử lý form, debounce...), thay vì copy-paste, bạn gói nó vào một custom hook để dễ tái sử dụng và bảo trì.

// 📌 Lưu ý khi viết Custom Hook
// Tên phải bắt đầu bằng use

// Có thể dùng các hook khác bên trong (như useState, useEffect, ...)

// Không chứa JSX (chỉ logic)

// Phải tuân thủ rules of hooks (gọi hook ở đầu hàm, không trong điều kiện)


// 🧠 Một số ví dụ hay gặp
// Tên Hook	Mục đích
// useFetch	Gọi API và trả dữ liệu
// useDebounce	Trì hoãn giá trị thay đổi
// useToggle	Chuyển đổi true/false
// useLocalStorage	Lưu và lấy dữ liệu từ localStorage