So sánh nhanh:
Tiêu chí	    useCallback	                        useMemo
Ghi nhớ cái gì?	Hàm (function)	                    Giá trị (value)
Trả về cái gì?	Một hàm được memo hóa	            Một kết quả đã tính toán
Khi nào dùng?	Truyền callback xuống component con	Tính toán phức tạp, lọc, sắp xếp, phân trang…
Tránh việc gì?	Hàm mới gây re-render component con	Tính toán lại không cần thiết khi re-render


✅ Lưu trữ
`useMemo lưu trữ đệm giá trị trả về của một hàm.`

`useCallback lưu trữ đệm định nghĩa của chính hàm đó.`
✅ Sử dụng khi nào
`useMemo được sử dụng khi bạn có một phép tính tốn kém mà bạn muốn tránh tính lại ở mỗi lần render.`

`useCallback được sử dụng để lưu trữ đệm một hàm nhằm tránh phải tạo lại hàm đó sau mỗi lần render.`

✅ Tác dụng
`useMemo đảm bảo rằng một hàm tốn kém chỉ được gọi lại khi các dependencies thay đổi.`

`useCallback tạo ra các hàm ổn định, duy trì cùng một tham chiếu giữa các lần render – tránh render lại không cần thiết ở các component con nhận hàm đó làm prop.`


Và đây là một vài điều nữa cần nhớ. Chỉ sử dụng các hook này nếu bạn muốn ghi nhớ các phép tính tốn kém hoặc ngăn chặn việc kết xuất lại không cần thiết. Không sử dụng useMemovà useCallbackở mọi nơi.

Đối với các hàm thông thường, các hook này không tạo ra nhiều khác biệt. Việc sử dụng quá nhiều sẽ khiến mã của bạn không thể đọc được. Thay vào đó, bạn có thể tìm ra những cách khác để cải thiện hiệu suất ứng dụng.

Phần kết luận
useMemovà useCallbacklà những hook hữu ích trong React có thể giúp bạn tối ưu hóa hiệu suất của ứng dụng web. Điều quan trọng là phải hiểu sự khác biệt giữa hai cái này và cách sử dụng của chúng.

Trong bài viết này, chúng tôi đã thảo luận về cách thức hoạt động của cả hai hook. useMemolưu trữ kết quả của một phép tính tốn kém, trong khi useCallbacklưu trữ tham chiếu hàm. Chúng tôi cũng đã liệt kê các tình huống khi bạn nên sử dụng từng hook. Cả hai hook này cùng nhau có thể giúp trang web của bạn nhanh hơn.

