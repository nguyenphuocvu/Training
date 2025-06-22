//Inheritance
// Một class có thể tái sử dụng lại thuộc tính(properties) và method của class khác
// Đây goi là kế thừa
// Tương tự viêc con cai thừa hưởng tài sản(properties/method) cha mẹ để lại

// Bằng cách sử dụng tính năng kế thừa chúng ta không cần phải code lại class đã có sẵn

class Person3 {
    firstName : string;
    lastName: string;

    constructor( firstName: string ,lastName: string){
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getFullName(): string{
        return `$(this.firstName) $(this.lastName)`
    }
    desribe(): string{
        return `This is ${this.firstName} ${this.lastName}`;
    }
}
// Để kế thừa 1 class chúng ta sử dụng keyword extends 
class Employee1 extends Person3{
    private jobTitle;
    constructor(
        firstName: string,
        lastName: string,
        jobTitle: string
    ){
        //call the constructor of the Person class:
        super(firstName, lastName);
        this.jobTitle = jobTitle

    }
    //overwrite
    desribe(): string{
        return `${super.desribe()} from`
    }
}