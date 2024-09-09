var add = document.querySelector('.btn-add');
var formAdd = document.querySelector('.form-add');
var close = document.querySelector('.close')
var overflow = document.querySelector('.overflow');
var update = document.querySelector('.btn-update');
var hide = document.querySelector('.btn-hide');
    add.addEventListener('click', function(){
        overflow.classList.add('active');
    });
    close.addEventListener('click', function() {
        overflow.classList.remove('active');
    });
    overflow.addEventListener('click',function(){
        overflow.classList.remove('active')
    });
    formAdd.addEventListener('click', function(e){
        e.stopPropagation();
    });