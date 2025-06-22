
# 1 Callback luôn được goi sau khi component mounted
# 2 Clearup function luôn được gọi trước khi component unmounted
# 3 Clearup function luôn được gọi trước khi callback được gọi ( trừ lần mounted )

# useState
//Mouted / unmounted

- Remove listener / Unsubscribe
- Clear timer
# 1 Update DOM
# 2 Call API

# 1 useEffect(callback )
`Goi callback mỗi khi component re-render`
`Goi callback sau khi component thêm element`
# 2 useEffect(callback , [] )
`Chỉ gọi callback 1 lần sau khi component ,mounted`
# 3 useEffect(callback , [deps] )
`Callback sẽ được gọi lại mỗi lần deps thay đổi`
# 3 Listen DOM events
`Scroll`
`Resize`


React useEffect() dùng để làm gì?
Chúng ta đã nhắc đến useEffect là một nơi quản lý các side-effect bên trong một React Components.

side-effect có thể hiệu là một khái niệm miêu tả các tính toán bên trong một hàm ảnh hưởng đến các đối tượng bên ngoài không thông qua đối số. Mình cho một ví dụ như thế này

Quay trở lại với useEffect, cũng tương tự như vậy, chứa các tính toán có phạm vi ảnh hưởng nằm ngoài React components của nó.

Bởi tính chất của nó, thường được sử dụng cho các mục đích như:

# Gọi API để lấy các thông tin bổ sung cho Components
# Thay đổi tiêu đề cho trang
# Cập nhật các state của components.
....
Và vô số các hành động side-effect khác.
React useEffect sử dụng thế nào?
Trước khi đi vào cách sử dụng, chúng ta cần biết nó hoạt động khi nào.

useEffect được kích hoạt sau khi quá trình render của React component hoàn tất. Nó sẽ được gọi và thực hiện tính toán các hành động bên trong nó trong một callback.

Thử lấy một ví dụ đơn giản thay đổi tiêu đề của trang nhé:

import React, {useEffect} from 'react'

function Example() {
	// Sử dụng useEffect
	useEffect(() => {
		document.title = "Tieu De";
	}, [])

	return (
		<h1>Example</h1>
	); 
}
React.useEffect chấp nhận 2 đối số
useEffect(callback, dependencies);

Callback: sẽ được gọi trong useEffect sau khi return thực thi nhiệm vụ kết xuất giao diện của nó.
Dependencies: Là một mảng chứa các đối số mà useEffect sẽ phụ thuộc vào đó để thực thi. Trong ví dụ trên là một mảng trống, nó đồng nghĩa với việc chỉ thực hiện một lần duy nhất sau khi component render.
Dependencies trong useEffect()
Dependencies là một đối số bên trong useEffect(callback, dependencies); để chúng ta có thể quản lý được cách hoạt động của useEffect.

Các dependencies trong các trường hợp:

# 1. Không cung cấp
Trong trường hợp bạn không cung cấp bất kỳ đôi số nào. useEffect sẽ được gọi thực thi các tính toán bên trong nó môi khi thành phần render.
# 2. Một mảng trống []
Khi bạn truyền một mảng trống vào, nó sẽ chỉ thực thi một lần duy nhất sau khi thành phần đó render lần đầu tiên, cách hoạt động tương tự như componentDidMount của Class Component
# 3. Khi truyền các Props, State
Khi dependencies là các props, state bên trong một mảng [props1, props2,.. stateA]. React useEffect sẽ dựa vào giá trị props, state. Trong lần render tiếp theo, nó sẽ kiểm tra giá trị của props, state mới với giá trị props, state trước đó. Nếu khác nhau sẽ thực hiện useEffect callback sẽ được gọi. Ngược lại thì không có gì xảy ra

Cơ chế này tương tự như bạn sử dụng Life Cycle componentDidUpdate và shouldComponentUpdate của Class Component.

import React, {useEffect, useState} from 'react'

function Example() {
		const [count, setCount] = useState(0);

		// useEffect sẽ thực thi vì hàm này làm count thay đổi giá trị so với trước đó
		const increment = () => {
			setCount(count + 1);
		}
		
		// useEffect sẽ không thực thi khi hàm này được gọi vì nó không thay đổi count
		const nothing = () => {
			setCount(count);
		}

		// useEffect callback được gọi khi state thay đổi so với giá trị trước đó
		useEffect(() => {
			console.log("useEffect được gọi");
		}, [count])
	
		return (
			<section>
				<h1>{count}</h1>

				<button onClick={increment}>Tăng thêm</button>
				<button onClick={nothing}>Không có gì xảy ra</button>
			</section>
		); 
	}
# Clean up useEffect
# 4 Cleanup
` Cleanup function thường được dùng để dọn dẹp các hiệu ứng phụ như subscription, event listener, hoặc timer, không phải cho các thao tác fetch.`
# Events : Add / remove event listener
# Observer pattern : Subscribe / unsubscribe
# Closure
# Timers : setInterval , setTimeout , clearInterval , clearTimeout

Một vài side-effect hoặc hầu như chúng ta sẽ cần phải clean-up các side-effect để tránh các vấn đề về hiệu xuất như memory-leak. Vấn đề này thường thấy trong quá trình bạn phát triển React app.

function Example() {
		// Clean up
		useEffect(() => {
			// Khi bạn gọi các sự kiện cho một component như scroll 
			// Có thể gây leak-memory nếu không clean up
			// Ví dụ, bạn tạo 1 sự kiện scroll ở component A, 
			// Sau đó nhảy qua component B mà chưa remove sự kiện ở component A, 
			// Lúc này, sự kiện ở component A sẽ vẫn hoạt động và cộng dôn với sự kiện ở component B 
			window.addEventListener("scroll", () => {...});

			// Chúng ta sẽ cần clean up nó khi navigate sang các component khác.
			// Tránh memory leak
			return () => {
				window.removeEventListener("scroll", () => {...})
			}
		}, [])
	
		return (
			<section>
				
			</section>
		); 
	}
Kết luận
useEffect là một React hook quản lý side-effect trong các thành phần. Đối số callback là một hàm để đặt logic side-effect. Tất cả sẽ hoạt động hoặc không đều phụ thuộc vào đối số thứ 2 là các dependency

useEffect sẽ gọi callback trong lần đầu thực thi sau quá trình kết xuất và tiếp tục gọi lại nếu thỏa mãn yêu cầu của dependency.