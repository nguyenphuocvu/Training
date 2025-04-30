// Bài 3: Phân tích mảng số nguyên
// Đề bài: Cho một mảng số nguyên, thực hiện:

// Tách riêng các số chẵn và số lẻ vào hai mảng.
const numbers = [12, -5, 8, 19, -3, 22, 7, 10];

let soChan = []
let soLe = []

for(let i = 0 ; i <  numbers.length ; i++){
   if(numbers[i] % 2 === 0){
    soChan.push(numbers[i])
   }else{
    soLe.push(numbers[i])
   }
}
console.log(soChan);
console.log(soLe);

//While
const numbers = [12, -5, 8, 19, -3, 22, 7, 10];
let soChan = []
let soLe = []
let i = 0
while(i < numbers.length){
   if(numbers[i] %  2){
    soChan.push(numbers[i])
   }else(
     soLe.push(numbers[i])
   )
   i++
}
console.log(soChan);
console.log(soLe);

//For of
const numbers = [12, -5, 8, 19, -3, 22, 7, 10];
let soChan = []
let soLe = []
for(const number of numbers){
      if(number % 2){
        soChan.push(number)
      }else{
        soLe.push(number)
      }
}
console.log(soChan);
console.log(soLe);
//forEach

const numbers = [12, -5, 8, 19, -3, 22, 7, 10];
let soChan = []
let soLe = []
numbers.forEach(number => {
    if(number % 2){
        soChan.push(number)
    }else{
        soLe.push(number)
    }
})
console.log(soChan);
console.log(soLe);
// Yêu cầu 2 : Tính tổng các số lẻ và tổng các số chẵn.

//For
const numbers = [12, -5, 8, 19, -3, 22, 7, 10];

let soChan = 0
let soLe = 0

for(let i = 0 ; i < numbers.length ; i++){
    if(numbers[i] % 2 === 0){
        soChan += numbers[i]
    }else{
        soLe += numbers[i]
    }
}

console.log(soChan);
console.log(soLe);
//While
const numbers = [12, -5, 8, 19, -3, 22, 7, 10];
let soChan = 0
let soLe = 0
let i = 0 

while(i < numbers.length){
    if(numbers[i] % 2 === 0){
        soChan += numbers[i]
    }else{
        soLe += numbers[i]
    }
    i++
}
console.log(soChan);
console.log(soLe);
//For of
const numbers = [12, -5, 8, 19, -3, 22, 7, 10];
let soChan = 0
let soLe = 0

for(const number of numbers){
    if(number % 2 === 0){
        soChan += number
    }else{
        soLe += number
    }
}
console.log(soChan);
console.log(soLe);
//forEach
const numbers = [12, -5, 8, 19, -3, 22, 7, 10];
let soChan = 0
let soLe = 0

numbers.forEach( num => {
    if(num % 2 === 0){
        soChan += num
    }else{
        soLe += num
    }
})
console.log(soChan);
console.log(soLe);
// Yêu cần 3 : Xóa các số âm trong mảng gốc.
const numbers = [12, -5, 8, 19, -3, 22, 7, 10];
 
//For
for(let i = 0 ; i < numbers.length ; i++){
    if(numbers[i] < 0){
        numbers.splice(i, 1);
        i--;
    }
}
console.log(numbers);
//While
const numbers = [12, -5, 8, 19, -3, 22, 7, 10];
let i  = 0 
while(i < numbers.length){
     if(numbers[i] < 0){
        numbers.splice(i, 1);
     }else{
        i++
     }
}
console.log(numbers);


//forEach
const numbers = [12, -5, 8, 19, -3, 22, 7, 10];

let newNumbers = [];
numbers.forEach(number => {
    if(number >= 0){
        newNumbers.push(number)
    }
})

console.log(newNumbers);
//Filter

const numbers = [12, -5, 8, 19, -3, 22, 7, 10];

const newNumbers = numbers.filter(num => num >= 0)

console.log(newNumbers);



