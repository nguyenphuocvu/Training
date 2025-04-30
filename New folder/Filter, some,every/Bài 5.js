// Phân tích danh sách đơn hàng
// Yêu cầu: Lọc các đơn hàng đã hoàn thành, kiểm tra xem có đơn hàng nào có tổng tiền trên 1 triệu, và đảm bảo mọi đơn hàng đều có mã đơn hàng.

const orders = [
    { id: 1, total: 1200, completed: true },
    { id: 2, total: 800, completed: false },
    { id: 3, total: 600, completed: true },
  ];
  //Đảm bảo mọi đơn hàng đều có mã đơn hàng
  const orderId = orders.every(order => order.id)
  console.log(orderId);
  
//Kiểm tra xem có đơn hàng nào có tổng tiền tren 1 triệu
const orderSome = orders.some(order => order.total > 1000)
console.log(orderSome);

//Lọc các đơn hàng đã hoàn thành 
const ordersFilter = orders.filter( order => order.completed)
console.log(ordersFilter);

