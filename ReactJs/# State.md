# State
useState sẽ trả về một mảng 2 phần tử
phần tử đầu tiên là state hiện tại
phần tử thứ 2 là set State
đọc phần tử thứ nhất và set state là phần tử thứ 2 sẽ thay đổi
gọi useState() nhiều lần để các state được độc lập với nhau tránh conflict

có thể trả về 1 string 1 array không cần là một object 
# useEffect 

có 2 tham số 
quản lý side effects bằng method useEffect
tham số đầu tiên là một funtion
tham số thứ 2 là array rỗng tham số không được gọi lại nữa và sẽ khong bị vòng lăp vô hạng nữa
