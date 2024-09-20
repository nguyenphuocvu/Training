const LIST_USER = {
    users: [],

    // Object => JSON.stringify => localStorage => JSON.parse => Object
    // stringify chuyển đổi thành chuỗi Json
 
    // Hàm lấy dữ liệu Storage
    loadUsersFromLocalStorage: function() {
        const storedUsers = localStorage.getItem('adminUser');
        this.users = storedUsers ? JSON.parse(storedUsers) : [];
    
        // Lọc ra người dùng chưa bị xóa
        const activeUsers = this.users.filter(user => !user.isDeleted);
        this.users = activeUsers; 
    
        this.updatePagination(); 
    },
    
    init:function() {
        this.loadUsersFromLocalStorage();
        this.renderListUser();
        this.saveUsers(); 
    },
    //Lưu danh sách dữ liệu
    saveUsers: function() {
        localStorage.setItem('adminUser',JSON.stringify(this.users));
    },
   
    // Thêm User
    addUser: function(user) {
        user.isDeleted = false; 
        this.users.push(user);
        this.saveUsers();
        this.renderListUser();
        pagination(); 

        // Tính toán trang cuối
        const totalItems = this.users.filter(user => !user.isDeleted).length;
        const parPage = 5;
        const lastPage = Math.ceil(totalItems / parPage);  
    
        // Chuyển về trang cuối
        currentPage = lastPage;
        
    
        setTimeout(() => {
            const newRow = document.querySelector(`#table-user tbody tr:last-child`);
            newRow.classList.add('highlight');
          
            setTimeout(() => {
                newRow.classList.remove('highlight');
            }, 3000);
        }, 100);
    },
    
    //Hide User
    hideUser: function(id, hideUser){
        this.users[id] = hideUser;
        this.saveUsers();
        this.renderListUser();
    },
    // Sửa User
    editUser: function (id, updateUser) {
      this.users[id] = updateUser;
      this.saveUsers();
      this.renderListUser();  
 
    },

    // Xóa User
    deleteUser: function(id) {
        this.users[id].isDeleted = true;  
        this.saveUsers();
        this.updatePagination();
        this.renderListUser();
        pagination();
    },
    
    updatePagination: function() {
        const parPage = 5;
        const totalItems = this.users.filter(user => !user.isDeleted).length; 
        const totalPages = Math.ceil(totalItems / parPage);
    
        // Điều chỉnh currentPage nếu cần
        if (currentPage > totalPages && currentPage > 1) {
            currentPage--;
        }
    
        savePage(); // Lưu currentPage vào localStorage
    },
    
    //Hiển thị người dùng
    renderListUser: function() {
        const userListContainer = document.querySelector('#table-user tbody');
        userListContainer.innerHTML = '';
    
        // Lọc ra những người dùng chưa bị xóa
        const activeUsers = this.users.filter(user => !user.isDeleted);
    
        activeUsers.forEach((user, index) => {
            userListContainer.innerHTML += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.address}</td>
                    <td>${user.city}</td>
                    <td>${user.code}</td>
                    <td>${user.country}</td>
                    <td class="action">
                        <button class="btn-hide" data-hide="${index}"><i class="fa-regular fa-eye"></i></button> 
                        <button class="btn-update" data-edit="${index}"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button class="delete" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button> 
    
                        <!-- Popover xác nhận -->
                        <div class="popover-confirm" id="popover-${index}" style="display: none;">
                        <p>Bạn có chắc muốn xóa?</p>
                        <button class="confirm-delete" data-index="${index}">Xác nhận</button>
                        <button class="cancel-delete" data-index="${index}">Hủy</button>
                    </td>
                </tr>
            `;
        });
    
        listenUpdateUser();
        listenDeleteUser();
        listenHide();
        pagination();
    },
    //Xử lý form
    handleFormSubmit: function() {
        var lastName = document.getElementById('lastName').value;
        var name = document.getElementById('name').value;
        var address = document.getElementById('address').value;
        var city = document.getElementById('city').value;
        var code = document.getElementById('code').value;
        var country = document.getElementById('country').value;
        var index = document.getElementById('user-index').value;
    
        var hasError = false; 
    
        // Xóa các thông báo lỗi trước đó
        document.getElementById('error-last-name').innerText = "";
        document.getElementById('error-first-name').innerText = "";

    
        // Kiểm tra các trường
        if (!lastName) {
            document.getElementById('error-last-name').innerText = "Họ bắt buộc.";
            hasError = true;
        }
        if (!name) {
            document.getElementById('error-first-name').innerText = "Tên bắt buộc.";
            hasError = true;
        }
       
    
        // Nếu có lỗi, ngừng việc gửi biểu mẫu
        if (hasError) {
            return; 
        }

        const user = { lastName, name, address, city, code, country };
        if (index === '') {
            this.addUser(user); 
            this.resetForm();
        } else {
            this.editUser(index, user);  
            this.hideUser(index, user);  
        }
    
        this.renderListUser();
    },
    // Reset Form
    resetForm: function() {
        document.getElementById('lastName').value = "";
        document.getElementById('name').value = "";
        document.getElementById('address').value = "";
        document.getElementById('city').value = "";
        document.getElementById('code').value = "";
        document.getElementById('country').value = "";

        document.getElementById('save').style.display = 'block';
        document.getElementById('update').style.display = 'none';
        document.getElementById('user-index').value = "";  
    },
    //Hide
    hideUserForm: function (index) {
        const user = this.users[index];
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('name').value = user.name;
        document.getElementById('address').value = user.address;
        document.getElementById('city').value = user.city;
        document.getElementById('code').value = user.code;
        document.getElementById('country').value = user.country;

        document.getElementById('user-index').value = index;    
        document.getElementById('title-hide').style.display = 'block'; 
        document.getElementById('title-update').style.display = 'none'; 
        document.getElementById('title-add').style.display = 'none'; 
        document.getElementById('save').style.display = 'none';
        document.getElementById('reset').style.display = 'none';
        document.getElementById('update').style.display = 'none';
    },
    addUserForm:function () {
      document.getElementById('title-update').style.display = 'none';  
    },
    //  Form Edit
    editUserForm: function(index) {
        const user = this.users[index];
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('name').value = user.name;
        document.getElementById('address').value = user.address;
        document.getElementById('city').value = user.city;
        document.getElementById('code').value = user.code;
        document.getElementById('country').value = user.country;

        document.getElementById('user-index').value = index;
        document.getElementById('save').style.display = 'none';
        document.getElementById('update').style.display = 'block';
        document.getElementById('title-add').style.display = 'none';
        document.getElementById('title-update').style.display = 'block'; 
        document.getElementById('title-hide').style.display = 'none'; 
    },
    //Search
    searchUsers: function(query) {
        const valueSearch = query.toUpperCase();
        const filterUser = this.users.filter(user => {
            return (
                user.lastName?.toUpperCase().includes(valueSearch) ||
                user.name?.toUpperCase().includes(valueSearch) ||
                user.address?.toUpperCase().includes(valueSearch) ||
                user.city?.toUpperCase().includes(valueSearch) ||
                user.code?.toUpperCase().includes(valueSearch) ||
                user.country?.toUpperCase().includes(valueSearch)
            );
        });
        return filterUser;
    },
    
    //Tăng dần
    sortUp: function (key) {
        this.users.sort((a,b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        this.renderListUser;
    },
    //Giảm dần
    sortDown: function (key) {
        this.users.sort((a,b)=>{
            if (a[key] > b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        this.renderListUser();
    },

};


 // Sự kiện
//  Save User
 function listenNewUser(){
    var form = document.getElementById('save');
    form.addEventListener('click', function(e){ 
        e.preventDefault();
       LIST_USER.handleFormSubmit();
    });
    var update = document.getElementById('update');
    update.addEventListener('click', function(e){
        e.preventDefault();
        LIST_USER.handleFormSubmit();
    });
}
//Hide
function listenHide() {
    const Hide = document.querySelectorAll('.btn-hide');
    Hide.forEach(function (item) {
        item.addEventListener('click', function (){
            const index = this.getAttribute('data-hide');
            LIST_USER.hideUserForm(index);
        })
    });
    Hide.forEach(element => {
        element.addEventListener('click', function(){
            overflow.classList.add('active');
        });
    });
}
//Edit Form

function listenUpdateUser(){
    const btnUpdate = document.querySelectorAll('.btn-update');
    btnUpdate.forEach(function(item){
        item.addEventListener('click', function(){
            const index = this.getAttribute('data-edit');
           LIST_USER.editUserForm(index); 
        })
    });  
    btnUpdate.forEach(element => {
        element.addEventListener('click', function(){
            overflow.classList.add('active');
        });
    });
}

function listenAddUser(){
    const btnAdd = document.querySelectorAll('.form-add');
    btnAdd.forEach(function(item){
        item.addEventListener('click', function(){
           LIST_USER.addUserForm(index); 
        
        })
    });  
    btnAdd.forEach(element => {
        element.addEventListener('click', function(){
            overflow.classList.add('active');
        });
    });
}


//Delete User

function listenDeleteUser() {
    const deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach(function (deleteButton) {
        deleteButton.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const popover = document.getElementById(`popover-${index}`);

            // Show confirmation popover
            popover.style.display = 'block';

            // Handle the "Confirm" button click
            const confirmButton = popover.querySelector('.confirm-delete');
            confirmButton.addEventListener('click', function () {
                LIST_USER.deleteUser(index);  
                popover.style.display = 'none'; 
            });

            // Handle the "Cancel" button click
            const cancelButton = popover.querySelector('.cancel-delete');
            cancelButton.addEventListener('click', function () {
                popover.style.display = 'none'; 
            });
        });
    });
}



//Search User
function searchUsers() {
    const SearchUser = document.querySelector('#searchUsers');
    const SearchButton = document.querySelector('.search button');
    
    SearchButton.addEventListener('click', function () {
        LIST_USER.loadUsersFromLocalStorage();
        const query = SearchUser.value.trim();
        
        if (query === '') {
            LIST_USER.init();
        } else {
            const filterUser = LIST_USER.searchUsers(query);
            LIST_USER.users = filterUser;
            
            // Reset lại currentPage về 1 khi search
            currentPage = 1; 
            LIST_USER.renderListUser();
            pagination(); 
        }
    });
}
//Phân trang
function savePage() {
    localStorage.setItem('currentPage', currentPage);
}
//Phân trang
function loadPage() {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
        currentPage = parseInt(storedPage, 10);
    }
}

let currentPage = 1; //Phân trang

//Pagination
function pagination() {
    const parPage = 5;
    const listItem = document.querySelectorAll('tbody tr');

    function loadItem() {
        const beginGet = parPage * (currentPage - 1);
        const endGet = parPage * currentPage - 1;
        listItem.forEach((item, key) => {
            item.style.display = (key >= beginGet && key <= endGet) ? 'table-row' : 'none';
        });
        listPage();
    }

    function listPage() {
        let count = Math.ceil(listItem.length / parPage);
        document.querySelector('.pagination').innerHTML = '';

        if (currentPage != 1) {
            let prev = document.createElement('span');
            prev.innerHTML = '<<';
            prev.addEventListener('click', function () {
                changePage(currentPage - 1);
            });
            document.querySelector('.pagination').appendChild(prev);
        }

        for (let i = 1; i <= count; i++) {
            let newPage = document.createElement('span');
            newPage.innerText = i;
            if (i == currentPage) {
                newPage.classList.add('active');
            }
            newPage.addEventListener('click', function () {
                changePage(i);
            });
            document.querySelector('.pagination').appendChild(newPage);
        }

        if (currentPage != count) {
            let next = document.createElement('span');
            next.innerHTML = '>>';
            next.addEventListener('click', function () {
                changePage(currentPage + 1);
            });
            document.querySelector('.pagination').appendChild(next);
        }
    }

    function changePage(i) {
        currentPage = i;
        loadItem();
        savePage(); ///Phân trang
    }

    loadItem();
}

// Sort
function listenSort(){
    var sortTable = document.querySelectorAll('.sortable');
    sortTable.forEach(column => {
        const key = column.getAttribute('data-key');
        const SortUp = column.querySelector('.fa-sort-up');
        const SortDown = column.querySelector('.fa-sort-down');

        SortUp.addEventListener('click', function () {
            LIST_USER.sortUp(key);
            SortUp.classList.add('active-i');
            SortDown.classList.remove('active-i');
        });

        SortDown.addEventListener('click', function () {
            LIST_USER.sortDown(key);
            SortDown.classList.add('active-i');
            SortUp.classList.remove('active-i');
           
        });
    });

};

function listUsers() {
    LIST_USER.renderListUser();
    listenDeleteUser();
    listenUpdateUser();
    searchUsers();
    pagination();
    listenSort();
    listenHide();

}

function main() {
    loadPage(); //Phân trang
    LIST_USER.init();
    listUsers();
    listenNewUser();
}
main();




