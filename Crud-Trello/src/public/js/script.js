document.addEventListener('DOMContentLoaded', async () => {
    let trellos = [];
    let cards = [];

    const addAnother = document.querySelector('.btn-another');
    const formHomeadd = document.querySelector('.form-homeadd');
    const closeBtn = document.querySelector('.close');

    if (addAnother) {
        addAnother.addEventListener('click', (e) => {
            e.preventDefault();
            formHomeadd.classList.add('active');
        });
    }

    if (formHomeadd) {
        formHomeadd.addEventListener('click', (e) => {
            if (!e.target.closest('.form-add')) {
                formHomeadd.classList.remove('active');
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            formHomeadd.classList.remove('active');
        });
    }

        const titleListBtn = document.getElementById('title-list');
        if (titleListBtn) {
            titleListBtn.addEventListener('click', async function (e) {
                e.preventDefault();
    
                const titleInput = document.getElementById('title');
                const titleValue = titleInput.value;
    
                try {
                    const response = await fetch('/trello', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title: titleValue }) 
                    });
    
                    if (!response.ok) throw new Error('Không thể thêm danh sách!');
    
                    const { newTrello, trellos: updatedTrellos } = await response.json();
                    trellos = updatedTrellos;
                    renderTrello();
                    titleInput.value = '';
                } catch (error) {
                    alert('Lỗi: ' + error.message);
                }
            });
        }



    const addCardEvent = () => {
        const addCardButtons = document.querySelectorAll('.btn-card');
        addCardButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const cardForm = renderCard();
                const cardContainer = e.target.closest('.another-card').querySelector('.list-cards');
                cardContainer.appendChild(cardForm);
    
                const saveCardButton = cardForm.querySelector('.btn-save-card');
                saveCardButton.addEventListener('click', async () => {
                    const cardTitleInput = cardForm.querySelector('.new-card-title');
                    const cardTitle = cardTitleInput.value;
                    const trelloId = e.target.closest('.another-card').dataset.id;
    
                    try {
                  
                        const response = await fetch('/cards/card', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ title: cardTitle, trelloId: trelloId })
                        });
    
                        if (!response.ok) throw new Error('Không thể thêm card!');
    
                        const { newCard, cards: updatedCards } = await response.json();
                        cards = updatedCards;
    
                        renderTrello(); 
                    } catch (error) {
                        alert('Lỗi: ' + error.message);
                    }
                });
            });
        });
    };

    const renderTrello = () => {
        const trelloContainer = document.querySelector('.trello-column');
        trelloContainer.innerHTML = '';
    
        trellos.forEach((trello) => {
            const anotherCard = document.createElement('div');
            anotherCard.classList.add('another-card');
            anotherCard.dataset.id = trello._id;
    
            const filteredCards = cards.filter(card => card.trelloId === trello._id);
            const cardItems = filteredCards.map(card => `
                <div class="list-cart-item">
                    <input class="list-cart-item_title" value="${card.title}" data-card-id="${card._id}" />
                    <button class="delete-card" data-deletecard="${card._id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `).join('');
            
            anotherCard.innerHTML = `
            <button class="dots"><i class="fa-solid fa-ellipsis"></i></button>
            <div class="drop-menu">
                <button class="delete-btn" data-delete="${trello._id}">
                    <i class="fa-solid fa-trash"></i> Xóa
                </button>
                <div class="popover" id="popover-${trello._id}" style="display: none;">
                    <p>Bạn có chắc chắn xóa?</p>
                    <button class="confirm-delete">Xác nhận</button>
                    <button class="cancel-delete">Hủy</button>
                </div>
            </div>
            <input class="title-list" value="${trello.title}" data-id="${trello._id}" />
            <div class="icon-and-text">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="iconss-ss" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="#000" stroke-width="2" d="M12,18 L12,6 M6,12 L18,12"></path>
                </svg>
                <h2 class="btn-card">Add a card</h2>
            </div>
            <div class="list-cards">
                ${cardItems}
            </div>
        `;
            trelloContainer.appendChild(anotherCard);
        });
    
        eventDots();
        addCardEvent();
        eventDeleteTrello();
        eventDeleteCard();
        eventEdit();
     
    };
    

    const renderCard = () => {
        const formCard = document.createElement('div');
        formCard.classList.add('form-card');
        formCard.innerHTML = `
           <div class="form-card" >
                <textarea class="new-card-title" placeholder="Enter a title for this card"></textarea>
                <div class="control-cart">
                    <button class="btn-save-card">Add Card</button>
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

    const eventDots = () => {
        const clickDots = document.querySelectorAll('.dots');
        clickDots.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropMenu = button.nextElementSibling;
                document.querySelectorAll('.drop-menu').forEach(menu => {
                    if (menu !== dropMenu) {
                        menu.style.display = 'none';
                    }
                });
                dropMenu.style.display = dropMenu.style.display === 'block' ? 'none' : 'block';
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.drop-menu') && !e.target.closest('.dots')) {
                document.querySelectorAll('.drop-menu').forEach((menu) => {
                    menu.style.display = 'none';
                });
            }
        });

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                e.stopPropagation();
                const popover = e.target.nextElementSibling;
                document.querySelectorAll('.popover').forEach(p => {
                    p.style.display = 'none';
                });

                popover.style.display = 'block';
            }
        });
    };
    
    //Delete Trello
    const eventDeleteTrello = () => {
        document.querySelectorAll('.confirm-delete').forEach(button => {
            button.addEventListener('click', async (e) => {
                const card = e.target.closest('.another-card');
                const cardId = card.dataset.id;

                try {
                    const response = await fetch(`/trello/${cardId}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error('Xóa không thành công!');
                    trellos = trellos.filter(trello => trello._id !== cardId);
                    renderTrello();
                } catch (error) {
                    alert('Lỗi: ' + error.message);
                }
            });
        });

        document.querySelectorAll('.cancel-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                e.target.closest('.popover').style.display = 'none';
            });
        });
    };
    
    //Delete Card
    const eventDeleteCard = () => {
        document.querySelectorAll('.delete-card').forEach(button => {
            button.addEventListener('click', async (e) => {
                const cardId = e.target.closest('button').dataset.deletecard;
                if (!cardId) {
                    alert('Card ID is missing!');
                    return;
                }
                try {
                    const response = await fetch(`/cards/card/${cardId}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error('Xoá thất bại');
                    cards = cards.filter(card => card._id !== cardId);
                    renderTrello();
                } catch (error) {
                    alert('Error: ' + error.message);
                }
            });
        });
    };

    //Edit
    const eventEdit = () => {
        const editList = document.querySelectorAll('.title-list');
        editList.forEach((listElement) => {
           listElement.addEventListener('focus', (e) => {
              const target = e.target;
              const previousValue = target.value;
              target.setAttribute('data-previousValue', previousValue);
           });
           
           listElement.addEventListener('blur', async (e) => {
              const target = e.target;
              const previousValue = target.getAttribute('data-previousValue');
              const newValue = target.value;
              const trelloId = target.dataset.id;

              if (previousValue !== newValue) {
                  try {
                      const response = await fetch(`/trello/${trelloId}`, {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ title: newValue })
                      });

                      if (!response.ok) throw new Error('Không thể cập nhật danh sách!');

                      const { updatedTrello, trellos: updatedTrellos } = await response.json();
                      trellos = updatedTrellos;
                      renderTrello();
                  } catch (error) {
                      alert('Lỗi: ' + error.message);

                  }
              }
           });
        });

        const editCard = document.querySelectorAll('.list-cart-item_title');
        editCard.forEach((cardElement) => {
            cardElement.addEventListener('focus', (e) => {
                const target = e.target;
                const previousValue = target.value;
                target.setAttribute('data-previousValue', previousValue);
                
            })
            cardElement.addEventListener('blur', async (e) => {
                const target = e.target;
                const previousValue = target.getAttribute('data-previousValue')
                const newValue = target.value;
                const cardId = target.dataset.cardId;

                if(previousValue !==  newValue){
                    try{
                        const response = await fetch(`/cards/card/${cardId}`, {
                            method: 'PATCH', 
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({title: newValue})
                        })
                        if(!response.ok) throw new Error('Không thể cập nhật danh sách!')
                        const {updatedCard, cards: updatedCards} = await response.json();
                        cards = updatedCards;
                        renderTrello();
                    }
                    catch(error){
                        alert('Error:' + error.message);
                    }
                }
            })
        })

    };
 
    
});