//Đề bà Cho một mảng số nguyên, hãy tìm số lẻ lớn nhất trong mảng.

const numbers = [3, 7, 2, 8, 5, 1, 10];
// Kết quả mong muốn: 7

//map reduce filter


//for of
let maxOdd = 0
for(const num of numbers){
    if(num % 2 !== 0){
        if(maxOdd === 0 || num > maxOdd){
            maxOdd = num
        }
    }
}
console.log(maxOdd);


//while 
let maxOdd = 0
let i = 0
while(i < numbers.length){
    if(numbers[i] % 2 !== 0 ){
        if(maxOdd === 0|| numbers[i] > maxOdd){
            maxOdd = numbers[i]
        }
    }
    i++
}
console.log(maxOdd);


//forEach
let maxOdd = 0

numbers.forEach(number => {
    if(number % 2 !== 0){
       if(maxOdd === 0 || number > maxOdd){
          maxOdd = number;
       }
    }
})
console.log(maxOdd);

//For
let maxOdd = 0
for(let i = 0 ; i < numbers.length ; i++){
    if(numbers[i] % 2 !== 0 && numbers[i] > maxOdd ){
        maxOdd = numbers[i]
    }
}
console.log(maxOdd);
