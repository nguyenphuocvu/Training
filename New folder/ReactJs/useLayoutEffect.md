
# useLayoutEffect
1 : Cập nhật lại state
2 : Cập nhât DOM (mutated)
3 : Gọi cleanup nếu dép thay đổi (sync)
4 : Gọi useLayoutEffect callback(sync)
5 : Render lại UI
 
Đặc điểm	                   useEffect	                                              useLayoutEffect
Thời điểm chạy	               Sau khi DOM đã vẽ xong và hiển thị lên màn hình	          Sau khi DOM được cập nhật, trước khi vẽ lên màn hình
Dùng cho	                   Tác vụ không ảnh hưởng đến layout:                         Tác vụ liên quan đến đo đạc hoặc thay đổi layout: đo kích thước, scroll, thay đổi CSS
                                gọi API, setTimeout, log...	
Gây chớp màn hình (flicker)?	Không chặn việc vẽ lại giao diện => có thể gây flicker	  Chặn việc vẽ lại cho tới khi chạy xong => tránh flicker
Giống như	                    componentDidMount, componentDidUpdate	                  componentDidMount, componentDidUpdate nhưng chạy sớm hơn

Chỉ dùng khi:

Bạn cần đo kích thước, vị trí của phần tử (getBoundingClientRect, offsetWidth, v.v.).

Bạn cần thay đổi style trước khi DOM hiển thị để tránh giật hình.

Bạn làm việc với animation, layout đồng bộ, hoặc thư viện DOM ngoài React (như D3, Chart.js...).

Nếu không cần mấy cái trên thì nên dùng useEffect để tránh chặn render và gây giảm hiệu năng.