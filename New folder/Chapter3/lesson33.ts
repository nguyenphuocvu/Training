// Classes
class Person {
    ssn: string;
    firstName: string;
    lastName: string;

    constructor(ssn: string , firstName: string , lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName
    }

    getFullName() : string {
        return `${this.firstName} ${this.lastName}`
    }
}

let it = new Person("1", "2" , "3")
// dùng new Nhân bảng class này lên thừa hưởng các method thuộc tính 