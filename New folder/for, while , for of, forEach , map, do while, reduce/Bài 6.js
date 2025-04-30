// Đề bài
// Cho một Array ví dụ 
const arr = ['a', 'b' , 'c', 'd', 'd', 'e' , ' b' , 'x', 'y', 'z']
// Yêu cầu tìm phần tử bị duplicate đầu tiên trong Array

//while
function processingArr(arr){
    let seen = new Set()
    let i = 0
    while(i < arr.length){
        if(seen.has(arr[i])){
            return arr[i]
        }
        seen.add(arr[i])
        i++
    }
    return null
}
console.log( processingArr(arr));

//for of
function processingArr(arr){
    let seen = new Set()

    for(let item of arr){
        if(seen.has(item)){
            return item
        }
        seen.add(item)
    }
    return null
}
console.log(processingArr(arr));

//For
function processingArr(arr){
    let seen = new Set()
  for(let i = 0 ; i < arr.length ; i++){
    if(seen.has(arr[i])){
        return arr[i]
    }
    seen.add(arr[i])
  }
  return null
}

console.log(processingArr(arr));





