
const saveLocalStorage = (trellos) => {
    localStorage.setItem('trellos', JSON.stringify(trellos));
};

const getFromLocalStorage = () => {
    const data = localStorage.getItem('trellos'); 
    return data ? JSON.parse(data) : [];
};

let trellos = getFromLocalStorage();

const addTrello = (trello) => {
    trello.isDelete = false;
    trellos.push(trello);
    saveLocalStorage(trellos); 
    renderTrello();
};
const addCard = (id, newCard) => {
    const trello = trellos.find(t => t.id === +id)
    if(trello){
        trello.cards = trello.cards || [];
        trello.cards.push(newCard)
        saveLocalStorage(trellos);
        renderTrello();
    }
   
}
const deleteTrello = (id) => {
    const trello = trellos.find(t => t.id === +id);
    trello.isDelete = true;
    saveLocalStorage(trellos);
    renderTrello();
};
const deleteCard = (id, cardIndex) => {
    const trello = trellos.find(t => t.id === +id);
    if (trello && trello.cards && trello.cards.length > cardIndex) {
        trello.cards.splice(cardIndex, 1); 
        saveLocalStorage(trellos); 
        renderTrello();
    }
};
const editTrello = (id, newTitle) => {
    const trello = trellos.find(t => t.id === +id);
    trello.title = newTitle;
    saveLocalStorage(trellos);
    renderTrello();
};
const editCardTitle = (id, cardIndex, newValue) => {
    const trello = trellos.find(t => t.id === +id);
    if (trello && trello.cards && trello.cards[cardIndex]) {
        trello.cards[cardIndex].title = newValue;
        saveLocalStorage(trellos);
        renderTrello();
    }
};


const renderTrello = () => {
    const trelloContainer = document.querySelector('.trello-column');
    trelloContainer.innerHTML = '';
    
    const filteredTrellos = trellos.filter((trello) => !trello.isDelete);

    filteredTrellos.forEach((trello, index) => {
        const cardsHTML = trello.cards
            ? trello.cards.map((card, cardIndex) =>
                `<div class="list-cart-item">
                    <input 
                        class="list-cart-item_title" 
                        value="${card.title}" 
                        data-card-id="${index}" 
                        data-card-index="${cardIndex}" 
                    />
                    <button 
                       class="delete-card" 
                       data-deletecard="${trello.id}"
                    >
                       <i class="fa-solid fa-trash"></i>
                    </button>
                </div>`
              ).join('')
            : '';

        trelloContainer.innerHTML += `
            <div class="another-card" data-id="${trello.id}">
                <button class="dots"><i class="fa-solid fa-ellipsis"></i></button>
                <div class="drop-menu">
                    <button class="delete-btn" data-delete="${trello.id}"><i class="fa-solid fa-trash"></i>Xóa</button>
                    <div class="popover" id='popover-${trello.id}' style="display: none;">
                        <p>Bạn có chắc chắn xóa?</p>
                        <button class="confirm-delete">Xác nhận</button>
                        <button class="cancel-delete">Hủy</button>
                    </div>
                </div>
                <input class="title-list" value="${trello.title}" data-id="${trello.id}" />
                <div class="icon-and-text">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="iconss-ss" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="#000" stroke-width="2" d="M12,18 L12,6 M6,12 L18,12"></path>
                    </svg>
                    <h2 class="btn-card">Add a card</h2>
                </div>
                <div class="list-cards">${cardsHTML}</div> 
            </div>
        `;
    });

    editEvent();
    eventDelete();
    eventDeleteCard()
    eventCart();
    eventDots();
    eventDotsCard()
};

const renderCard = () => {
    const formCard = document.createElement('div');
    formCard.classList.add('form-card');
    formCard.innerHTML = `
       <div class = "form-card">
            <textarea class="new-card-title" placeholder="Enter a title for this card"></textarea>
            <div class = "control-cart">
                <button class="btn-save-card">Add Cart</button>
                <div class="closeCart">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
       </div>
    `;

    const closeBtn = formCard.querySelector('.closeCart');
    closeBtn.addEventListener('click', () => {
        formCard.remove();
    });

    return formCard;
};

const validateForm = () => {
    const  checkID = () => {
        if(trellos.length === 0){
            return 1;
        }
        return trellos[trellos.length - 1].id + 1;
    }
    const title = document.getElementById('title').value; 
    const trello = {
        id: checkID(),
        title,
        card: [],
        isDelete: false
    };
    addTrello(trello);
    renderTrello();
};


const eventAddColumn = () => {
    var addAnother = document.querySelector('.btn-another');
    addAnother.addEventListener('click', (e) => {
        e.preventDefault();
        formHomeadd.classList.add('active'); 
    });

    var formHomeadd = document.querySelector('.form-homeadd'); 
    formHomeadd.addEventListener('click', (e) => {
        if (!e.target.closest('.form-add')) {
            formHomeadd.classList.remove('active');
        }
    }); 

    var closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', (e) => {
        formHomeadd.classList.remove('active');
    });

    const clickAddColumn = document.getElementById('title-list');

    if (clickAddColumn) {
        clickAddColumn.addEventListener('click', (e) => {
            e.preventDefault();

            const newTrello = validateForm();
            if (newTrello) {
                addTrello(newTrello);
            }

            document.querySelector('.form-homeadd').classList.remove('active');
        });
    }
};

const eventAddCard = (button) => {
    const parentCard = button.closest('.another-card');
    const formCard = renderCard();

    const existingForm = parentCard.querySelector('.form-card');
    if (existingForm) {
        existingForm.remove();
    }

    parentCard.appendChild(formCard);

    const saveButton = formCard.querySelector('.btn-save-card');
    saveButton.addEventListener('click', () => {
        const title = formCard.querySelector('.new-card-title').value;
        const id = parentCard.getAttribute('data-id'); 

       if(title){
           const newCard = {title }
           addCard(id, newCard)
       }
        formCard.remove();
    });
};


const eventDots = () => {
    const clickDots = document.querySelectorAll('.dots');
    clickDots.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropMenu = button.nextElementSibling;
            dropMenu.style.display = dropMenu.style.display === 'block' ? 'none' : 'block';
        });
    });

    document.addEventListener('click', () => {
        const dropMenu = document.querySelectorAll('.drop-menu');
        dropMenu.forEach((menu) => {
            menu.style.display = 'none';
        });
    });
};

const eventDelete = () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = button.getAttribute('data-delete');
            const popover = document.getElementById(`popover-${index}`);
            if (popover) {
                popover.style.display = 'block';
            }

            const confirmDelete = popover.querySelector('.confirm-delete');
            const cancelDelete = popover.querySelector('.cancel-delete');

            confirmDelete.addEventListener('click', () => {
                deleteTrello(index);
            });

            cancelDelete.addEventListener('click', () => {
                popover.style.display = 'none';
            });
        });
    });
};
const eventDeleteCard = () => {
    const deleteButtonCards = document.querySelectorAll('.delete-card');
    deleteButtonCards.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const trelloId = button.getAttribute('data-deletecard');
            const cardIndex = button.closest('.list-cart-item').querySelector('input').getAttribute('data-card-index');

            if (trelloId && cardIndex !== null) {
                deleteCard(trelloId, cardIndex);
            }
        });
    });
};

const eventCart = () => {
    const addCartButton = document.querySelectorAll('.btn-card');
    addCartButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            eventAddCard(button);
        });
    });
};

const editEvent = () => {
    
    const editList = document.querySelectorAll('.title-list');
    editList.forEach((listElement) => {
        listElement.addEventListener('focus', (e) => {
            const target = e.target;
            const previousValue = target.value;
            target.setAttribute('data-previousValue', previousValue);
        });

        listElement.addEventListener('blur', (e) => {
            const target = e.target;
            const newValue = target.value;
            const previousValue = target.getAttribute('data-previousValue');
            const index = target.getAttribute('data-id');

            if (newValue !== previousValue) {
                editTrello(index, newValue);
            }
        });
    });

  
    const editCard = document.querySelectorAll('.list-cart-item_title');
    editCard.forEach((cardElement) => {
        cardElement.addEventListener('focus', (e) => {
            const target = e.target;
            const previousValue = target.value;
            target.setAttribute('data-previousValue', previousValue);
        });
    
        cardElement.addEventListener('blur', (e) => {
            const target = e.target;
            const newValue = target.value;
            const previousValue = target.getAttribute('data-previousValue');
            
            const parentCardElement = target.closest('.another-card'); 
            const parentId = parentCardElement.getAttribute('data-id'); 
            const cardIndex = Array.from(parentCardElement.querySelectorAll('.list-cart-item_title')).indexOf(target); 
    
            if (newValue !== previousValue) {
                editCardTitle(parentId, cardIndex, newValue);
            }
        });
    });
};


function main() {
    eventDelete();
    eventAddColumn();
    renderTrello();
    eventDots();
    eventDotsCard()
    eventDeleteCard()
}
main();