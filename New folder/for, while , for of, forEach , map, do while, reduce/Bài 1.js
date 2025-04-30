// Bài 1: Phân tích điểm số học sinh
// Đề bài: Cho một mảng điểm số của học sinh, thực hiện các yêu cầu sau:

// Yêu cầu 1:  Tính tổng điểm.
const scores = [85, 90, 78, 92, 88, 76, 95];
//do while
let total = 0
let i = 0
do{
    total += scores[i];
    i++;
}
while(i < scores.length)

console.log(total);

//reduce
const reduceTotal = scores.reduce((sum, scores) => sum + scores)
console.log( reduceTotal);
//map
let total = 0
scores.map(score => total += score)
console.log(total)
//Dùng For
const scores = [85, 90, 78, 92, 88, 76, 95];
let total = 0
for(let i = 0 ; i < scores.length ; i++){
     total += scores[i]
}
console.log( total);

//Dùng forEach
const scores = [85, 90, 78, 92, 88, 76, 95];
let total = 0

scores.forEach(scores => {
    total += scores
}) 
console.log(total);
//Dùng while
const scores = [85, 90, 78, 92, 88, 76, 95];
let total = 0
let i = 0 

while(i < scores.length){
    total += scores[i];
    i++;
}
console.log(total);
//Dùng for of
const scores =  [85, 90, 78, 92, 88, 76, 95];
let total = 0

for(const score of scores){
    total += score
}
console.log(total);

// Tính số học sinh đạt điểm trên trung bình.
const scores = [85, 90, 78, 92, 88, 76, 95];

// Yêu cầu 2: Tạo mảng mới chứa các điểm tăng thêm 5 điểm cho mỗi học sinh.
//For of
const scores = [85, 90, 78, 92, 88, 76, 95];

let newScores = []

for(let score of scores){
    newScores.push(score + 5)
}
console.log(newScores);

// For
const scores = [85, 90, 78, 92, 88, 76, 95];

let newScores = []

for(let i = 0 ; i < scores.length ; i++){
    newScores.push(scores[i] + 5)
}
console.log(newScores);
//While
const scores = [85, 90, 78, 92, 88, 76, 95];
let newScores = []
let i = 0
while (i < scores.length) {
    newScores.push(scores[i] + 5);
    i++
}
console.log(newScores);

//forEach
const scores = [85, 90, 78, 92, 88, 76, 95];
let newScores = []

scores.forEach(total => {
    
   newScores.push(total + 5)
})
console.log(newScores);

// Yêu cầu 3 : Tính số học sinh đạt điểm trên trung bình.
//For
const scores = [85, 90, 50, 92, 88, 56, 95];
let  newScores = 0

for(let i = 0 ; i < scores.length ; i++){
    if(scores[i] > 70){
       newScores++
    }
}
console.log(newScores);

//While
const scores = [85, 90, 50, 92, 88, 56, 95];
let  newScores = 0
let i = 0 
while(i < scores.length){
    if(scores[i] > 70){
       newScores++
    }
    i++
}
console.log(newScores);
//For of
const scores = [85, 90, 50, 92, 88, 56, 95];
let  newScores = 0

for(const score of scores){
    if(score > 70){
        newScores++;
    }
}
console.log(newScores);
//forEach
const scores = [85, 90, 50, 92, 88, 56, 95];
let  newScores = 0
scores.forEach(score => {
    if(score > 70){
        newScores++;
    }
})
console.log(newScores);




