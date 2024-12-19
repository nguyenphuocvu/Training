const saveLocalStorage = (trellos) => {
    localStorage.setItem('trellos', JSON.stringify(trellos));
};

const getFromLocalStorage = () => {
    const data = localStorage.getItem('trellos'); 
    return data ? JSON.parse(data) : [];
};

let trellos = getFromLocalStorage();

const addTrello = (trello) => {
    trellos.push(trello);
    saveLocalStorage(trellos); 
    renderTrello();
};

const deleteTrello = (id) => {
    trellos.splice(id, 1);
    saveLocalStorage(trellos);
    renderTrello();
};

const editTrello = (id, newTitle) => {
    const trello = trellos[id].title = newTitle
    if(trello)
        trello.title = newTitle; 
        saveLocalStorage(trellos); 
        renderTrello(); 
};

const renderTrello = () => {
    const trelloContainer = document.querySelector('.trello-column');
    trelloContainer.innerHTML = '';

    trellos.forEach((trello, index) => {
        const cardsHTML = trello.cards
            ? trello.cards.map((card, cardIndex) =>
                `<div class="list-cart-item">
                    <input 
                        class="list-cart-item_title" 
                        value="${card.title}" 
                        data-parent-index="${index}" 
                        data-card-index="${cardIndex}" 
                    />
                </div>`
              ).join('')
            : '';

        trelloContainer.innerHTML += `
            <div class="another-card">
                <button class="dots"><i class="fa-solid fa-ellipsis"></i></button>
                <div class="drop-menu">
                    <button class="delete-btn" data-delete="${index}" ><i class="fa-solid fa-trash"></i>Xóa</button>
                    <div class="popover" id='popover-${index}' style="display: none;">
                        <p>Bạn có chắc chắn xóa?</p>
                        <button class="confirm-delete">Xác nhận</button>
                        <button class="cancel-delete">Hủy</button>
                    </div>
                </div>
                <input 
                    class="title-list" 
                    value="${trello.title}" 
                    data-index="${index}"
                />
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
    eventCart();
    evenDots();
};

const validateForm = () => {
    const title = document.getElementById('title').value; 
    const trello = {
        title,
    };
    addTrello(trello);
    renderTrello();
};

const editEvent = () => {
    const editList = document.querySelectorAll('.title-list');

    editList.forEach((listElement) => {
        listElement.addEventListener('click', (e) => {
            const target = e.target;
            const previousValue = target.value;
            target.dataset.previousValue = previousValue;
        })
    })
    const editCard = document.querySelectorAll('.list-cart-item_title');
     editCard.forEach((createElement) => {
        createElement.addEventListener('click', (e) => {
            const target = e.target;
            const previousValue = target.value;
            target.dataset.previousValue = previousValue;
        })
     })

     editList.forEach((listElement) => {
        listElement.addEventListener('blur', (e) => {
            const target = e.target;
            const newValue = target.value;
            const previousValue = target.dataset.previousValue;
            const index = target.getAttribute('date-index');
            if(newValue !== previousValue){
                editTrello(index, newValue);

            }
        })
     })

     editCard.forEach((createElement) => {
        createElement.addEventListener('blur', (e) => {
            const target = e.target;
            const newValue = target.value;
            const previousValue = target.dataset.previousValue;
            const parentIndex  = target.getAttribute('data-parent-index');
            const cartIndex = target.getAttribute('data-card-index');
            if(newValue !== previousValue){
                trellos[parentIndex].cards[cartIndex].title =newValue;
                saveLocalStorage(trellos);
                renderTrello();

            }
        })
     })

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

const saveCard = (button) => {
    const parentCard = button.closest('.another-card');
    const formCard = renderCard();

    const existingForm = parentCard.querySelector('.form-card');
    if (existingForm) existingForm.remove();

    parentCard.appendChild(formCard);

    const saveButton = formCard.querySelector('.btn-save-card');
    saveButton.addEventListener('click', () => {
        const title = formCard.querySelector('.new-card-title').value;
        const index = Array.from(parentCard.parentNode.children).indexOf(parentCard);

        const newCard = { title };
        trellos[index].cards = trellos[index].cards || [];
        trellos[index].cards.push(newCard);

        saveLocalStorage(trellos);
        renderTrello();
        formCard.remove();
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

const eventCart = () => {
    const addCartButton = document.querySelectorAll('.btn-card');
    addCartButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            saveCard(button);
        });
    });
};

const evenAddColumn = () => {
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

const evenDots = () => {
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




eventDelete();
evenAddColumn();
renderTrello();
evenDots();
