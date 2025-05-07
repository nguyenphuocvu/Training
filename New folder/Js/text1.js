const xe = [
    {id: 4 , name : 'Execti' , hangxe : 'Yamaha'},
    {id: 3 , name: 'Vison' , hangxe: 'Honda'},
    {id: 1 , name : 'SH', hangxe : 'Honda'},
    {id: 2 , name : 'AB' , hangxe : 'Yamaha'},
    {id: 5 , name : 'Winner' , hangxe : 'Yamaha'},

]
// 

const xeMoi = xe.reduce((result, item) => {
  if(result[item.hangxe]){
    result[item.hangxe] = result[item.hangxe] + ', ' + item.name 
  }else{
    result[item.hangxe] =  item.name
  }
  return result
}, {})
console.log(xeMoi);


//Kết quả 

const data = {
    Honda : "Vison, SH",
    Yamaha : "Execti, AB , Winner"
}


console.log(data);


