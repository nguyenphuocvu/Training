var add = document.querySelector('.btn-add');
var formAdd = document.querySelector('.form-add');
var formhome = document.querySelector('.formhome');
var closeBtn = document.querySelector('.close ');


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
