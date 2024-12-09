var add = document.querySelector('.btn-add');
var formAdd = document.querySelector('.form-add');
var formhome = document.querySelector('.formhome');
var closeBtn = document.querySelector('.close ');
var sronly = document.querySelector('.sr-only')
var closeImg = document.querySelector('.close-img')


add.addEventListener('click',(event) => {
    event.preventDefault();  
    formhome.classList.add('active');  
});
closeBtn.addEventListener('click',() => {
    formhome.classList.remove('active'); 
});
closeImg.addEventListener('click', () => {
     sronly.classList.remove('active')
})
formhome.addEventListener('click',  () => {
    formhome.classList.remove('active');
});

formAdd.addEventListener('click',(e) => {
    e.stopPropagation();
})

