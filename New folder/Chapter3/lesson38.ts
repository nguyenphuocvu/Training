//Static Methods and Properties
Để truy cập 1 thuộc tính static <ClassName> <StaticMember>
chúng ta sử dụng class name và dot notation mà không cần tạo mới 1 object


class Circle {
   static pi : number = 3.14;
   public test: number = 69;
//method
    static calculateArea(radius: number){
        return this.pi * radius * radius;
    }
}

let t = new Circle()
console.log(Circle.calculateArea(10));
static là một biến động muốn sử dụng hàm static hoặc biến