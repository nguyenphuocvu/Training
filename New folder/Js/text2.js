// Tìm số chẵn và số lẻ trong mảng
// Đề bài: Viết một hàm nhận vào một mảng số nguyên và trả về một object có:

// even: Danh sách các số chẵn.

// odd: Danh sách các số lẻ.

// Ví dụ:

// Kết quả mong muốn: { even: [8, 10, 2], odd: [1, 3] }
const numbers = [1, 3, 8, 10, 2];
//every 
const result = {even: [] , odd: []}
numbers.every(num => {
    if(num % 2 === 0){
        result
    }
})
//filter
const even = numbers.filter(num => num % 2 === 0);
const odd = numbers.filter(num => num % 2 !== 0)

const result = {even , odd}
console.log(result);

//reduce
let even = []
let odd = []

const result = numbers.reduce((acc, num) => {
    if(num % 2 === 0) {
        acc.even.push(num)
    }else{
        acc.odd.push(num)
    }
    return acc
}, {even : [] , odd : []})
console.log(result);

//for of
let even = []
let odd = []
for(const num of numbers){
    if(num % 2 === 0){
        even.push(num)
    }else{
        odd.push(num)
    }
}
const result = {even , odd}
console.log(result);

//do while
let even = []
let odd = []
let i = 0
do{
   if(numbers[i] % 2){
      even.push(numbers[i])
   }else{
      odd.push(numbers[i])
   }
   i++
}while(i < numbers.length)

    const result = {even , odd}
    console.log(result);
    
//while 
let even = []
let odd = []
let i = 0
while(i < numbers.length){
    if(numbers[i] % 2 === 0){
        even.push(numbers[i])
    }else{
        odd.push(numbers[i])
    }
    i++
}
const result = {even , odd}
console.log(result);

//forEach
function EventOdd(numbers){
let even = [];
let odd = [];

numbers.forEach(num => {
    if(num % 2 === 0){
        even.push(num)
    }else{
        odd.push(num)
    }
 
})
return {even , odd}
}
console.log(EventOdd(numbers));

//For
function EventOdd(numbers) {
let even = []
let odd = []
for(let i = 0 ; i < numbers.length ; i++){
    if(numbers[i] % 2  === 0){
       even.push(numbers[i])
    }else{
        odd.push(numbers[i])
    }
}
return {even, odd}
}


console.log(EventOdd(numbers));
