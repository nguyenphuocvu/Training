var add = document.querySelector('.btn-add');
var formAdd = document.querySelector('.form-add');
var formhome = document.querySelector('.formhome');
var closeBtn = document.querySelector('.close ');
var ellip = document.querySelector('.item-ellip')

add.addEventListener('click', function (event) {
    event.preventDefault();  
    formhome.classList.add('active');  
});
closeBtn.addEventListener('click', function () {
    formhome.classList.remove('active'); 
});
formhome.addEventListener('click', function () {
    formhome.classList.remove('active');
});

formAdd.addEventListener('click',function(e){
    e.stopPropagation();
})
ellip.addEventListener('click', function () {
    ellip.classList.remove('active')
})