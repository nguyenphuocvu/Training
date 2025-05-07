// Bài toán:
// Cho một mảng số nguyên, hãy tìm tất cả các số chẵn và tăng giá trị của chúng lên 1. Sau đó, tính tổng của các số đã được tăng.

// Ví dụ:
// Kết quả mong muốn:
// Lọc ra số chẵn: [2, 4, 6, 8]
// Tăng mỗi số chẵn lên 1: [3, 5, 7, 9]
// Tính tổng: 3 + 5 + 7 + 9 = 24
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
//for of + do while 
const evenNumbers = [];
for (const num of numbers) {
    if (num % 2 === 0) {
        evenNumbers.push(num);
    }
}

let i = 0;
do {
    evenNumbers[i] = evenNumbers[i] + 1;
    i++;
} while (i < evenNumbers.length);

let sum = 0;
for (const num of evenNumbers) {
    sum += num;
}

console.log(sum); 

//map filter reduce
const evenNumbers = numbers.filter(num => num % 2 === 0)
const increasedNumbers =  evenNumbers.map(num => num + 1)
const sum = increasedNumbers.reduce((acc, num) => acc + num , 0)
console.log(sum);

//every 
let sum = 0
const evenNumbers = []
numbers.every(num => {
    if (num % 2 === 0) {
        evenNumbers.push(num + 1);
    }
    return true; 
});

evenNumbers.every(num => {
    sum += num;
    return true; 
});

console.log(sum);


//some
let sum = 0
const evenNumbers = []
numbers.some(num => {
    if(num % 2 === 0){
        evenNumbers.push(num + 1)
    }
})

evenNumbers.some( num => {
    sum +=  num
})
console.log(sum);

//forEach
let sum = 0
const evenNumbers = []
numbers.forEach(num => {
    if(num % 2 === 0){
      evenNumbers.push(num + 1)
    }
})

evenNumbers.forEach( num => {
    sum += num
})
console.log(sum);

//While
let sum = 0
let i = 0
const evenNumbers = []

while(i < numbers.length){
    if(numbers[i] % 2 === 0){
        evenNumbers.push(numbers[i] + 1);
    }
    i++
}
 i= 0;
while(i < evenNumbers.length){
    sum += evenNumbers[i]
    i++
}
console.log(sum);

//For

let sum = 0;
const evenNumbers = [];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        evenNumbers.push(numbers[i] + 1);
    }
}

for (let i = 0; i < evenNumbers.length; i++) {
    sum += evenNumbers[i];
}

console.log(sum); 


