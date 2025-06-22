# Các giao  đoạn của Lifecycle trong ReactJs
React chia thành 3 giai đoạn chính
1 Mounting( Giai đoạn khởi tạo ) Component được tạo và hiển thị trên UI
2 Updating(Giai đoạn cập nhật) Component thay đổi do props hoặc state cập nhật
3 Unmounting(Giai đoạn hủy): Component bị loại khỏi UI


Hiệu ứng có vòng đời khác với thành phần :
Thành phần có thể gắn kết , cập nhật hoặc hủy gắn kết .
Hiệu ứng chỉ có thể thực hiện hai việc : bắt đầu đồng bộ hóa một cái gì đó và sau đó dừng đồng bộ hóa nó .
Chu kỳ này có thể xảy ra nhiều lần nếu Hiệu ứng của bạn phụ thuộc vào các thuộc tính và trạng thái thay đổi theo thời gian. React cung cấp một quy tắc kiểm tra để kiểm tra xem bạn đã chỉ định đúng các phụ thuộc của hiệu ứng hay chưa .Điều này giúp hiệu ứng của bạn được đồng bộ hóa với các thuộc tính và trạng thái mới nhất

# Mounting : Khi component được khởi tạo các phương thức sau sẽ được gọi theo thứ tự 
<!-- class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("Constructor: Khởi tạo state");
  }

  componentDidMount() {
    console.log("componentDidMount: Component đã render xong");
  }

  render() {
    return <h1>Xin chào, React!</h1>;
  }
} -->
`constructor(): Khởi tạo state và props. 👉 componentDidMount(): Được gọi sau khi component đã render, thường dùng để gọi API hoặc thiết lập event listeners.`
# Updating : Khi state hoặc props thay đổi component sẽ được cập nhật 
<!-- class MyComponent extends React.Component {
  state = { count: 0 };

  componentDidUpdate(prevProps, prevState) {
    console.log(`componentDidUpdate: Count thay đổi từ ${prevState.count} ➝ ${this.state.count}`);
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Tăng</button>
      </div>
    );
  }
} -->
👉 `componentDidUpdate(): Được gọi sau khi component cập nhật, thường dùng để xử lý logic phụ thuộc vào state cũ.`
# Unmounting :  
<!-- class MyComponent extends React.Component {
  componentWillUnmount() {
    console.log("componentWillUnmount: Dọn dẹp trước khi component bị xoá");
  }

  render() {
    return <h1>Xin chào!</h1>;
  }
} -->
👉 `componentWillUnmount(): Dùng để dọn dẹp dữ liệu (xoá event listeners, huỷ gọi API, xoá bộ nhớ).`
Class Components dùng các phương thức như :
# componentDidmount
# componentDidUpdate 
# component WillUnmount

# Funciton Components dùng Hook(useEffect) để quản lý vòng đời

# Unmounting là thời điểm thích hợp để dọn dẹp dữ liệu