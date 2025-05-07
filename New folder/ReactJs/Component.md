
Dòng đầu tiên định nghĩa một hàm có tên là Square. exportTừ khóa JavaScript làm cho hàm này có thể truy cập được bên ngoài tệp này. 
default Từ khóa cho các tệp khác sử dụng mã của bạn biết rằng đó là hàm chính trong tệp của bạn.
# Component
-- Đặt tên
-- js function

## Nguyên tắc đặt tên : Bắt đầu với chữ cái đầu tiên in Hoa

VD Đúng: `Profile` `Avatar` `HeroSection`
VD Sai: avatar , profile

- Sử dụng : `<Profile/>`
- Parent component ( cha) and child component (con)

```tsx
<App> -- Parent
    -- Child
   <Profile><Profile/>
<App/>
```

- Bad practice

```tsx
const App = () => {
// Không nên khai báo funtion bên trong funtion
  function Profile() {
    return (
      //JSX
      <img
        src="https://media.istockphoto.com/id/2153340295/vi/anh/take-care-chrysanthemum-flowers.jpg?s=612x612&w=is&k=20&c=COV0eQEk-a_tiKYeRU7hBq27EODvZnNDQmCgl8Ls4c0="
        alt="profile"
      />
    );
  }
  return (
    <div>
      <h2>Function Arrow Component</h2>
      <Profile />
    </div>
  );
};
```

- Đừng quên export component khi tạo để có thể sử dụng ở chỗ khác
# Import và export

- Default export : Khi import thì có thể đổi tên của component . Trong một file thì chỉ có thể export default 1 component duy nhất
- Named export : Có thể export nhiều trong 1 file . CŨng có thể đổi tên khi import với ` as `

# JSX
- Khi code Component trong React và sử dụng return thì phải có ít nhát 1 thẻ cha bọc lại
- Nếu không muốn dùng thêm thẻ để bọc lại thì có thể dung `<> </>` hoặc `Fragment`
- Khi sử dụng JSX thì các thuộc tinh sẽ sử dụng theo cấu trúc là camelCase Đối với 1 từ thì viết bình thường ví dụ: `id` `type` . Đối với 2 từ trở lên thì sẽ là camelCase Ví dụ `className`
`onChange` `onClick`
- Có một số thuộc tính đặt biệt thì vẫn viết như bình thường. Ví dụ `aria-label` chứ không cần phải viết là arialLabel
- Ví dụ thuộc tính svg là stroke-width(HTML) -> `strokeWidth`
- Tất cả thẻ trong JSX phải đóng . Ví dụ <img> -> <img/>  <div/> -> <div>react </div>
- Khi sử dụng JSX trong React nếu viết sai thì cũng sẽ được IDE hoặc code Editor gợi ý để chỉnh sửa


