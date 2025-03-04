document.addEventListener("DOMContentLoaded", function () {
    const btnAnother = document.querySelector(".btn-another");
    const formHomeAdd = document.querySelector(".form-homeadd");
    const closeForm = document.querySelector(".close");
    const addListBtn = document.getElementById("add-list-btn");
    const titleInput = document.getElementById("title");
    const trelloColumn = document.getElementById("trello-column");

    if (btnAnother) {
        btnAnother.addEventListener("click", (e) => {
            e.preventDefault();
            formHomeAdd.classList.add("active");
        });
    }

    if (formHomeAdd) {
        formHomeAdd.addEventListener("click", (e) => {
            if (!e.target.closest(".form-add")) {
                formHomeAdd.classList.remove("active");
            }
        });
    }

    if (closeForm) {
        closeForm.addEventListener("click", function () {
            formHomeAdd.classList.remove("active");
        });
    }

    async function ajaxRequest(url, method, data) {
        const options = {
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };
        if (data) options.body = JSON.stringify(data);

        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }

    async function loadTrellos() {
        
        try {
            const response = await ajaxRequest('/trello', 'GET');
            const trellos = response.trellos;
            trelloColumn.innerHTML = '';

            trellos.forEach(trello => {
                addTrelloToDOM(trello);
            });

        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    function addTrelloToDOM(trello) {
        const column = document.createElement('div');
        column.classList.add('another-card');
        column.dataset.id = trello._id;

        column.innerHTML = `
            <button class="dots"><i class="fa-solid fa-ellipsis"></i></button>
            <div class="drop-menu" style="display: none;">
                <button class="delete-btn" data-delete="${trello._id}">
                    <i class="fa-solid fa-trash"></i> Xóa
                </button>
                <div class="popover" style="display: none;">
                    <p>Bạn có chắc chắn xóa?</p>
                    <button class="confirm-delete">Xác nhận</button>
                    <button class="cancel-delete">Hủy</button>
                </div>
            </div>
            <input class="title-list" value="${trello.title}" data-id="${trello._id}" />
            <div class="icon-and-text">
                <svg class="iconss-ss" height="18" width="18">
                    <path fill="none" stroke="#000" stroke-width="2" d="M12,18 L12,6 M6,12 L18,12"></path>
                </svg>
                <h2 class="btn-card">Add a card</h2>
            </div>
            <div class="list-cards"></div>
        `;

        trelloColumn.appendChild(column);
        loadCards(trello._id, column.querySelector('.list-cards'));

        column.querySelector('.title-list').addEventListener('blur', async (e) => {
            const newTitle = e.target.value.trim();
            if (newTitle) {
                await updatedTrello(trello._id, newTitle);
            }
        });
    }

    async function loadCards(trelloId, cardContainer) {
        try {
            const response = await ajaxRequest(`/cards/card`, 'GET');
            const cards = response.cards;

            cardContainer.innerHTML = '';

            cards.forEach(card => {
                if (card.trelloId === trelloId) {
                    addCardToDOM(card, cardContainer);
                }
            });

        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    function addCardToDOM(card, cardContainer) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card._id;
        cardElement.innerHTML = `
            <div class="list-cart-item">
                <input class="list-cart-item_title" value="${card.title}" data-card-id="${card._id}" />
                <button class="delete-card" data-card-id="${card._id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        cardContainer.appendChild(cardElement);

        cardElement.querySelector('.delete-card').addEventListener('click', async () => {
            await deleteCard(card._id);
        });

        cardElement.querySelector('.list-cart-item_title').addEventListener('blur', async (e) => {
            const newTitle = e.target.value.trim();
            if (newTitle) {
                await updatedCard(card._id, newTitle);
            }
        });
    }

    addListBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const titleValue = titleInput.value.trim();

        if (!titleValue) {
            alert("Vui lòng nhập tên danh sách!");
            return;
        }

        try {
            const newTrello = await ajaxRequest('/trello', 'POST', { title: titleValue });
            titleInput.value = '';
            addTrelloToDOM(newTrello); // Thêm Trello mới vào giao diện
        } catch (error) {
            alert("Error: " + error.message);
        }
    });

    async function postCard(cardTitle, trelloId, cardContainer) {
        try {
            const newCard = await ajaxRequest('/cards/card', 'POST', { title: cardTitle, trelloId: trelloId });
            addCardToDOM(newCard, cardContainer); // Chỉ thêm card mới vào giao diện
        } catch (error) {
            alert("Error: " + error.message);
        }
    }

    async function deleteTrello(trelloId) {
        try {
            await ajaxRequest(`/trello/${trelloId}`, 'DELETE');
            document.querySelector(`.another-card[data-id="${trelloId}"]`).remove();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    async function deleteCard(cardId) {
        try {
            await ajaxRequest(`/cards/card/${cardId}`, 'DELETE');
            document.querySelector(`.card[data-id="${cardId}"]`).remove();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    async function updatedTrello(trelloId, title) {
        try {
            await ajaxRequest(`/trello/${trelloId}`, 'PATCH', { title });
        } catch (error) {
            alert('Error:' + error.message);
        }
    }

    async function updatedCard(cardId, title) {
        try {
            await ajaxRequest(`/cards/card/${cardId}`, 'PATCH', { title });
        } catch (error) {
            alert('Error:' + error.message);
        }
    }

    window.onload = loadTrellos;
});
