// Tìm cặp số có tổng bằng một giá trị cho trước
// Output: [[2, 4], [1, 5]]
console.log(numberArray([1, 2, 3, 4, 5], 6)); 

// Yêu cầu 1 :  Kiểm tra từng cặp số trong mảng.
function numberArray(arr, target) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) { 
            if (arr[i] + arr[j] === target) {
                result.push([arr[i], arr[j]]);
            }
        }
    }
    return result;
}

console.log(numberArray([1, 2, 3, 4, 5], 6)); 

//forEach 

function numberArray(arr, target){
    let seen = new Set();
    let result = []

    arr.forEach(num => {
        let complement = target - num
        if(seen.has(complement)){
            result.push([complement, num])
        }
        seen.add(num)
    })

    return result;
}

console.log(numberArray([1, 2, 3, 4, 5], 6)); 
//While 
function numberArray(arr,target) {
    let result = []
    let i = 0

    while(i < arr.length){
        let j = i + 1
        while(j < arr.length){
            if(arr[i] + arr[j] === target){
                result.push([arr[i], arr[j]])
            }
            j++
        }
        i++
    }
    return result;
    
}
console.log(numberArray([1, 2, 3, 4, 5], 6)); 
//For of
function numberArray(arr, target){
    let result = []
    let seen = new Set();

    for( let num  of arr){
        let complement = target - num
        if(seen.has(complement)){
           result.push([complement, num])
        }
        seen.add(num)
    }

    return result;
}
console.log(numberArray([1, 2, 3, 4, 5], 6)); 

//Yêu cầu 2: 
