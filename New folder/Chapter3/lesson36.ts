//Getters and Setters 

class Person2 {
    private _age: number;
    public firstName : string;
    public lastName : string;

    constructor(_age: number, firstName: string , lastName: string){
        this._age = _age;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    //gettter
    get age(){
        return this._age;
    }

    //setter
    set age(age2: number){
        if(age2 < 0 || age2 > 150){
            throw Error ("Invalid age");
        }
        this._age = age2;
    }
}

let person2 = new Person2(25, 'IT' ,  'Eric');
person2.age = 30; //setter

// person2.setAge(69) //setter
console.log("check" , person2 ); //getter

// person.age = 25;
