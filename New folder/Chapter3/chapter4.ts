//lesson 27 functions
function sum(a: number, b: number) {
  return a + b;
}

console.log(sum(6, 9));

//anonymous function
const sum2 = (a: number, b: number) => {
  return a + b;
};

//lesson 28

const sum3 = (x: number, y: number): number => {
  return x + y;
};

console.log(sum3(1, 10));

let a = 10; //number
a = sum3(1, 10);

//lesson 29 : optional parameters Không bắt buộc
//js
let sum4 = (x, y, z) => {
  return x + y + z;
};

console.log(sum4(1, 2)); //NaN : not a number;; null / undefind
//ts
const sum5 = (x: number, y: number, z?: number) => {
  if (z) return x + y + z;
  return x + y;
};

console.log(sum5(1, 2, 4), sum(2, 5));
// z? ? có thể là number || undefined

// check số lương phần tử sau đó check tới kiểu giá trị

//lesson 30
//js
let sum6 = (x, y, z = 0) => {
  if (z === false) {
    return x + y;
  }
  if (z) {
    return x - y;
  }
};
console.log(sum6(1, 2));
// sum6(1,2) => z = undefined => 0
// sum6(1,2,3) => z = 3

//TS
let sum7 = (x: number, y: number, z = false) => {
  if (z === false) {
    return x + y;
  }
  if (z) {
    return x - y;
  }
};
console.log(sum7(1, 2), sum7(1, 2, true));

//lesson 31 Rest  Parameters
// 1 function chir có 1 tham số duy nhất
// phải là tham số cuối cùng trong danh sách tham số
// phải sử dụng với array type

//spread syntax vs rest => copy all
function getTotal(...numbers: number[]): number {
  let total = 0;
  numbers.forEach((num) => (total += num));
  return total;
}

console.log(getTotal());
console.log(getTotal(10, 20));
console.log(getTotal(10, 20, 30));

//lesson 32

function addNumbers(a: number, b: number): number {
  return a + b;
}
function addStrings(a: string, b: string): string {
  return a + b;
}

//2 Function làm nhiệm vụ tương tự nhau +> có thể gôm thành 1 với union type
function add111(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") return a + b;
  if (typeof a === " string " && typeof b === "string") return a + b;
}

//overloading
function addNew(a: number, b: number): number;

function addNew(a: string, b: string): string;

function addNew(a: any, b: any) {
  return a + b;
}
// cần 1 hàm tổng để cộng gộp lại 
console.log(addNew(6, 9), addNew("IT", "Eric"));

//method overloading

class Counter {
  private current : number = 0
  count() : number;
  count(target : number) : number[];
  count(target? : number) : number | number[] {
    if(target){
      let values : number[ ] = []
      for(let start = this.current; start <= target; start++){
        values.push(start)
      }
      return values;
    }
    return ++this.current;
  }
}

