// Bài toán: Đếm số từ, ký tự, và từ dài nhất trong văn bản
// Đề bài: Cho một đoạn văn bản bất kỳ, thực hiện các yêu cầu sau:

// Yêu cầu 1: Đếm tổng số từ trong đoạn văn bản.
//For
const text = "Học lập trình không khó nếu bạn chăm chỉ và thực hành thường xuyên.";
let numberTotal = 1;

for (let i = 0; i < text.length; i++) {
  if (text[i] === " ") {
    numberTotal++;
  }
}
console.log(numberTotal); 
// While
const text = "Học lập trình không khó nếu bạn chăm chỉ và thực hành thường xuyên.";
let numberTotal = 1
let i = 0
while(i < text.length){
  if(text[i] === " "){
    numberTotal++
  }
  i++;
}
console.log(numberTotal);

//For of
const text = "Học lập trình không khó nếu bạn chăm chỉ và thực hành thường xuyên.";
let numberTotal = 1;

for (const char of text) {
  if (char === " ") {
      numberTotal++; 
  } 
}
console.log(numberTotal);
//forEach
const text = "Học lập trình không khó nếu bạn chăm chỉ và thực hành thường xuyên.".split(""); 
let numberTotal = 1;
text.forEach(char => {
    if (char === " ") numberTotal++; 
});
console.log(numberTotal); 

// Yêu cầu 2 : Đếm tổng số ký tự (bao gồm cả khoảng trắng).
const text = "Học lập trình không khó nếu bạn chăm chỉ và thực hành thường xuyên.";

//forEach
let count = 0;
[...text].forEach(() => count++);
console.log(count);
//length
const totalCharacters = text.length;
console.log(totalCharacters);
//For
let count = 0
for(let i = 0 ; i < text.length ; i++){
  count ++;
}
console.log(count);

// Yêu cầu 3 :  Tìm từ dài nhất trong đoạn văn
const text = "Học lập trình không khó nếu bạn chăm chỉ và thực hành thường xuyên.";
// const longestWord = text.split(" ").reduce((longest, word) => 
//   word.length > longest.length ? word : longest, ""
// );

// console.log(longestWord); 

//for of
const words = text.split(" ");
let longestWord = "";

for(const word of words){
   if(word.length > longestWord.length){
      longestWord = word
   }
}
console.log(longestWord);

//forEach
const words = text.split(" ");
let longestWord = "";
words.forEach(word => {
  if(word.length > longestWord.length){
    longestWord = word
  }
})
console.log(longestWord);

//For
const words = text.split(" ");
let longestWord = "";
for(let i = 0 ; i < words.length ; i++){
  if(words[i].length > longestWord.length){
    longestWord = words[i]
  }
}
console.log(longestWord);


