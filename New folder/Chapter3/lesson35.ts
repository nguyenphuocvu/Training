//readonly 
chỉ đọc => không modify(update/delete)

ts cung cấp công cụ readonly để đánh dấu 1 thuộc tính immutable

class Person {
    readonly birthDate : Date;

    constructor(birthDate : Date){
        this.birthDate = birthDate
    }
}

let person = new Person(new Date(100,12,234))
person.birthDate = new Date(12,23,234)
2 Readonly const 
readonly sử dụng cho thuộc tính của class
const sử dụng cho variables

