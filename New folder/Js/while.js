//Tìm hiểu lại reduce some while do while map filter  

// While 

// điều kiện  sẽ được đối chiếu  trước khi thực hiện và vòng lặp sẽ tiếp diễn cho đến khi điều kiện đó bằng false
// while kết thúc khi điều kiện của nó thành false sẽ kết thúc như bài dưới khi i tăng dần lên tới 6 sau mỗi lần lặp thì nó sẽ bị không thỏa mãn điều kiện nữa và dừng lại
let i = 0 
while(i <= 5){
    console.log(i);
    i++;
    
}

Do While

do while khối lệnh trong do luôn chạy được 1 lần dù điều kiện nó là false 
nếu điều kiện đúng thì nó vẫn sẽ thực thi cho đến khi điều kiện bị false

let i = 1

do {
    console.log(i);
    i++
}while(i< 5)



Reduce 
// reduce() là một phương thức trong mảng JavaScript, dùng để thu gọn (reduce) một mảng thành một giá trị duy nhất (số, object, array, v.v.).

// Nó hoạt động bằng cách duyệt qua từng phần tử của mảng, thực hiện một hàm callback, và tích lũy kết quả vào một biến (acc - accumulator).

// acc giữ kết quả của các lần lặp trước
// array.reduce((acc, currentValue, index, array) => {
//     // Thực hiện tính toán hoặc xử lý dữ liệu
//     return acc;
//  }, initialValue);

//  acc (accumulator - tổng tích lũy): giữ kết quả của lần tính toán trước đó.
//  currentValue: phần tử hiện tại của mảng.
//  index (optional): chỉ mục của phần tử hiện tại.
//  array (optional): chính mảng mà reduce() đang xử lý.
//  initialValue: giá trị khởi tạo của acc (nếu không có, acc lấy giá trị đầu tiên của mảng). 

Filter

// Map vs Filter đều chạy hết mảng


// map() duyệt qua từng phần tử của mảng numbers và thực hiện một hàm callback trên từng phần tử.

// Tuy nhiên, map() thường được dùng để tạo ra một mảng mới dựa trên từng phần tử của mảng gốc.


// filter() thường được dùng để lọc ra các phần tử thỏa mãn điều kiện và tạo ra một mảng mới chứa các phần tử đó.

// Tuy nhiên, trong đoạn code này, filter() không hề trả về giá trị gì và cũng không sử dụng kết quả của nó.





