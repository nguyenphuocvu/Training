// React Router là một thư viện phổ biến trong việc xử lý định tuyến (routing) và điều hướng (navigation) trong các ứng dụng React.
//  Nó cho phép bạn định nghĩa các đường dẫn (routes) và liên kết chúng với các component tương ứng. 
//  React Router cung cấp một API được định nghĩa rõ ràng, giúp cho việc xử lý định tuyến và hiển thị các component dựa trên đường dẫn URL 
// hiện tại trở nên dễ dàng hơn.


# II. Các Components trong React Router

` 1. BrowserRouter trong react router js `
Nếu bạn muốn định tuyến ứng dụng của mình trong ReactJS, bạn cần sử dụng một số thành phần quan trọng, bao gồm BrowserRouter.

BrowserRouter là một thành phần chính của React Router, giúp đồng bộ hóa địa chỉ URL của ứng dụng với trạng thái của ứng dụng.
Về cơ bản, nó là một thành phần bao bọc cho toàn bộ ứng dụng ReactJS của bạn và quản lý việc định tuyến cho tất cả các trang trong ứng dụng.
<!-- 
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
); -->

Ở đây, App là component chính của ứng dụng của bạn, và nó được bọc trong BrowserRouter. Bây giờ, React Router sẽ quản lý định tuyến cho tất cả các Route của ứng dụng của bạn, sử dụng HTML5 history API để đồng bộ hóa địa chỉ URL với trạng thái của ứng dụng của bạn.

` 2  Route trong react router js : `
Route là một thành phần quan trọng trong React Router, cho phép bạn định nghĩa các tuyến đường và cách hiển thị nội dung của chúng. Route sẽ kiểm tra URL của trang web và hiển thị nội dung tương ứng với tuyến đường nào được khớp với URL đó.

Bạn có thể định nghĩa các tuyến đường bằng cách sử dụng Route component và truyền vào prop path để chỉ định đường dẫn của tuyến đường. Sau đó, bạn có thể truyền component hoặc render function vào prop component hoặc render, tương ứng với nội dung cần hiển thị cho tuyến đường đó.

import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
 
function App() {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
    </div>
  );
}
export default App;