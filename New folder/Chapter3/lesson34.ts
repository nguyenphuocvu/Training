//Access Modifiers 
// cung cấp công cụ về quyền truy cập và sử dụng biến/ function với class
// Typescript cung cấp 3 Access Modifiers
// - public
// - private
// - protected

// 1 Public modifier 
// Default tất cả mọi thứ (variables/ function) bên trong class là public
// chúng ta có thể truy câp chúng mà khong bị giới hạn 
// => không cần khai báo keyword public

class Employee {
    public empCode : string ;
    empName: string;
    constructor(empCode: string , empName: string){
        this.empCode = empCode
        this.empName = empName
    }
    //getter/setter
}
let emp = new Employee("aaa" , "bbb"); //immutable
emp.empCode = "123"
emp.empName = "345"


//2 Private không  thể sửa đổi trực tiếp 
class Employee {
    private empCode : string ;
    private empName : string;
    constructor(empCode: string , empName: string){
        this.empCode = empCode
        this.empName = empName
    }
    //getter/setter
}
let emp = new Employee("aaa" , "bbb"); //immutable

//3 Protected
//Giống private tuy nhiên lớp con(kế thừa) sẽ khong thể truy cập được

class Employee {
    public empName : string;
    protected empCode : number;

    constructor(name : string , code : number) {
        this.empName = name
        this.empCode = code
    }
}

