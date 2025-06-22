//lesson 20 if else
let age : number = 25;

let name123 : string = 'eric' 
//convert to Boolean => Boolean(age)

if(age > 18){
    console.log("You");
}else {
    console.log("No");
}

let discount :  number;
let itemCount = 11;

if(itemCount > 0 && itemCount <= 5) {
    discount =5 //5% discount
}else if(itemCount > 5 && itemCount <= 10){
    discount = 10;
}else {
    discount = 15;
}
console.log(`You ${discount}`);


