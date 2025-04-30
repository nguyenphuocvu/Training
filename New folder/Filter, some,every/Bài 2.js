// Sản phẩm đang giảm giá
// Yêu cầu: Lọc sản phẩm đang giảm giá, kiểm tra xem có sản phẩm nào giá dưới 100k, và đảm bảo tất cả sản phẩm đều có tồn kho.

const products = [
    { name: "Áo", price: 200, onSale: true, inStock: true },
    { name: "Quần", price: 150, onSale: false, inStock: true },
    { name: "Giày", price: 90, onSale: true, inStock: true },
  ];
//Đảm bảo tất cả sản phẩm đều có tồn kho 
const productsInStock = products.every(product => product.inStock)
console.log(productsInStock);

//Kiểm tra xem sản phẩn nào dưới 100k 
const productsPrice = products.some(product => product.price < 100)
console.log(productsPrice);

//Lọc sản phẩm đang giảm giá

const productsSale = products.filter(product => product.onSale)
console.log(productsSale);
