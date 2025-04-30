// Kiểm tra danh sách email
// Yêu cầu: Lọc email hợp lệ, kiểm tra xem có email nào chứa tên miền "gmail", và đảm bảo mọi email đều có ký tự "@".

const emails = ["nguyen@gmail.com", "lan@yahoo.com", "invalidemail.com"];

//Đảm bảo mọi email đều có ký tự @
const emailEvery = emails.every(email => email.includes('@'))
console.log(emailEvery);

//Kiểm tra xem có email nào chứa tên miền gmail 
const emailSome = emails.some( email => email.includes('gmail'))
console.log(emailSome);

//Lọc email hợp lệ 
const emailFilter = emails.filter(email => email.includes('@'))
console.log(emailFilter);
 