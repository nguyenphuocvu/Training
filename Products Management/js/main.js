var add = document.querySelector('.btn-add');
var formAdd = document.querySelector('.form-add');
var formhome = document.querySelector('.formhome');
var closeBtn = document.querySelector('.close ');
var sronly = document.querySelector('.sr-only')
var closeImg = document.querySelector('.close-img')
// var upDate = document.querySelector('btn-update');

add.addEventListener('click', function (event) {
    event.preventDefault();  
    formhome.classList.add('active');  
});
closeBtn.addEventListener('click', function () {
    formhome.classList.remove('active'); 
});
closeImg.addEventListener('click', function () {
     sronly.classList.remove('active')
})
formhome.addEventListener('click', function () {
    formhome.classList.remove('active');
});

formAdd.addEventListener('click',function(e){
    e.stopPropagation();
})

