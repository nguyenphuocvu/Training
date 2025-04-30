// Bài 5: Phân tích danh sách sản phẩm
// Đề bài: Cho một danh sách sản phẩm với các thuộc tính (name, price), thực hiện:

// Yêu cầu 1 : Tính tổng giá trị các sản phẩm.
const products = [
    { name: "Laptop", price: 1500 },
    { name: "Phone", price: 800 },
    { name: "Tablet", price: 1200 },
    { name: "Headphones", price: 200 }
  ];
//For
let total = 0 
for(let i = 0 ;  i < products.length ; i++){
    total += products[i].price
}
console.log(total);
//While 
let total = 0
let i = 0
while (i < products.length) {
    total += products[i].price;
    i++
}
console.log(total);
//for of

let total = 0
for( const product of products){
    total += product.price
}
console.log(total);
//forEach
  let total = 0 

  products.forEach( product => {
    total += product.price
  })
  console.log(total);

// Yêu cầu 2: Sắp xếp danh sách sản phẩm theo giá giảm dần.
const products = [
  { name: "Laptop", price: 1500 },
  { name: "Phone", price: 800 },
  { name: "Tablet", price: 1200 },
  { name: "Headphones", price: 200 }
];

for(let i = 0 ; i < products.length - 1; i++){
    for(let j = 0; j < products.length - 1 - i; j++){
      if(products[j].price < products[j + 1].price){
        let temp = products[j]
        products[j] = products[j + 1]
        products[j+ 1] = temp
      }
    }
}
console.log(products);


const products = [
  { name: "Laptop", price: 1500 },
  { name: "Phone", price: 800 },
  { name: "Tablet", price: 1200 },
  { name: "Headphones", price: 200 }
];

products.sort((a, b) => b.price - a.price);
console.log(products);


// Yêu cầu 3: Tạo mảng chỉ chứa tên các sản phẩm.
const products = [
  { name: "Laptop", price: 1500 },
  { name: "Phone", price: 800 },
  { name: "Tablet", price: 1200 },
  { name: "Headphones", price: 200 }
];
//For of
let productNames = [];
for (const product of products) {
    productNames.push(product.name);
}
console.log(productNames);
//While 
let newProduct = []
let i = 0
while(i < products.length){
   newProduct.push(products[i])
   i++
}
console.log(products);

//forEach
let newProduct = []
products.forEach(product => {
  newProduct.push(product.name)
})
console.log(newProduct);

//For
let newProduct = []
for(let i = 0 ; i < products.length ; i++){
    newProduct.push(products[i].name)
}
console.log(newProduct);

//Map
const newProduct = products.map(product => product.name)
console.log(newProduct);

