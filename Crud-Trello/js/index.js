var addAnother = document.querySelector('.btn-another')
var formHomeadd = document.querySelector('.form-homeadd'); 
var formCard = document.querySelector('.form-card')
var closeBtn = document.querySelector('.close');
var clickDots = document.querySelector('.dots')

addAnother.addEventListener('click', (e) => {
    e.preventDefault();
    formHomeadd.classList.add('active'); 
});

formAdd.addEventListener('click', (e) => {
    e.stopPropagation()
})

closeBtn.addEventListener('click', (e) => {
    formHomeadd.classList.remove('active');
});

formHomeadd.addEventListener('click', () => {
    formHomeadd.classList.remove('active'); 
});

