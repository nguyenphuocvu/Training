const LIST_USER = {
    users: [],

    // Object => JSON.stringify => localStorage => JSON.parse => Object
    // stringify chuyển đổi thành chuỗi Json

    // Hàm lấy dữ liệu Storage
    loadUsersFromLocalStorage: function () {
        const storedUsers = localStorage.getItem('user');
        this.users = storedUsers ? JSON.parse(storedUsers) : [];   
    },

    init:function() {
        this.loadUsersFromLocalStorage();
        this.renderListUser();
    },
    //Lưu danh sách dữ liệu
    saveUsers: function() {
        localStorage.setItem('user',JSON.stringify(this.users));
    },
    

    // Thêm User
    addUser: function(user) {
        this.users.unshift(user);
        this.saveUsers();
        this.renderListUser();
    },

    //Sửa User
    editUser: function (id, updateUser) {
      this.users[id] = updateUser;
      this.saveUsers();
      this.renderListUser();  
    },

    //Xóa User
    deleteUser: function(id){
        this.users.splice(id, 1);
        this.saveUsers();
        this.renderListUser();
        pagination()
    },

    //Hiển thị người dùng
    renderListUser: function(){
        const userListContainer = document.querySelector('#table-user tbody');
        userListContainer.innerHTML = '';
        this.users.forEach((user, index) => {
            userListContainer.innerHTML += `
                 <tr>
                        <td>${user.name}</td>
                        <td>${user.address}</td>
                        <td>${user.city}</td>
                        <td>${user.code}</td>
                        <td>${user.country}</td>
                        <td class="action">
                            <a href="${index}"><i class="fa-regular fa-eye"></i></a>
                            <button class="update" data-edit="${index}" ><i class="fa-regular fa-pen-to-square"></i></button>
                            <button class="delete " data-index="${index}" ><i class="fa-regular fa-trash-can"></i></button> 
                        </td>
                </tr> 
            `;
        });
        listenUpdateUser();
        listenDeleteUser();
        pagination();

    },

    //Xử lý form
    handleFormSubmit:function() {
        var lastName = document.getElementById('lastName').value;
        var name = document.getElementById('name').value;
        var address = document.getElementById('address').value;
        var city = document.getElementById('city').value;
        var code = document.getElementById('code').value;
        var country= document.getElementById('country').value;
        var index = document.getElementById('user-index').value;

        const user = { lastName, name, address, city, code,country};
        if (index === '') {
            this.addUser(user); 
            this.resetForm();
            
        } else {
            this.editUser(index, user);  
        }
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

    // Form Edit
    editUser: function() {
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
    },
    //Search
    searchUser: function(query) {
        const valueSearch = query.toLowerCase();
        const filterUser = this.users.filter(user =>{
            return (
              user.lastName.toLowerCase().includes(valueSearch) ||
              user.name.toLowerCase().includes(valueSearch) ||
              user.address.toLowerCase().includes(valueSearch) ||
              user.city.toLowerCase().includes(valueSearch) ||
              user.code.toLowerCase().includes(valueSearch) ||
              user.country.toLowerCase().includes(valueSearch) 
            );
        });
        return filterUser;
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

//Edit Form
function listenUpdateUser(){
    const Update = document.querySelectorAll('.update');
    Update.forEach(function(item){
        item.addEventListener('click', function(){
            const index = this.getAttribute('data-edit');
            STATE_USER.editUserForm(index); 
        })
    });
    Update.forEach(element => {
        element.addEventListener('click', function(){
            overflow.classList.add('active');
        });
    });
}

//Delete User
function listenDeleteUser(){
    const Delete = document.querySelectorAll('.delete');
    Delete.forEach(function(item){
        item.addEventListener('click', function(){
            const index = this.getAttribute('data-index');
            LIST_USER.deleteUser(index);        
        })
    });  
}
//Search User
function searchUser() {
    const SearchUser = document.querySelector('#searchUsers');
    const Search = document.querySelector('.search button')
    Search.addEventListener('click',function() {
        LIST_USER.loadUsersFromLocalStorage();
        const query = SearchUser.value.trim();
        if(query === ''){
            LIST_USER.init();
        }else{
            const filterUser = LIST_USER.searchUser(query);
            LIST_USER.users = filterUser;
            LIST_USER.renderListUser();
            pagination(); 
        }
    });
}
//Pagination
function pagination() {
    let currentPage = 1;
    const parPage = 5;
    const listItem = document.querySelectorAll('tbody tr');
    function loadItem() {
        const beginGet = parPage * (currentPage -1);
        const endGet= parPage * currentPage - 1;
        listItem.forEach((item,key)=>{
            if(key>= beginGet && key <= endGet){
                item.style.display = 'table-row';
            }else{
                item.style.display = 'none';
            }
        });
        listPage();
    }
    loadItem()
    function listPage() {
         let count = Math.ceil(listItem.length / parPage);
         document.querySelector('.pagination').innerHTML = '';
        if(currentPage != 1){
            let  prev = document.createElement('span');
            prev.innerHTML = '<<';
            prev.addEventListener('click', function () {
                changePage(currentPage - 1);
            });
            document.querySelector('.pagination').appendChild(prev);
        } 
        for (let i = 1; i <= count ; i++){
            let newPage = document.createElement('span');
            newPage.innerText = i;
            if(i == currentPage){ 
                 newPage.classList.add('active');
            }
            newPage.addEventListener('click', function () {
                changePage(i);
            });
            document.querySelector('.pagination').appendChild(newPage)
        }
        if(currentPage != count){
            let next = document.createElement('span');
            next.innerHTML = '>>';
            next.addEventListener('click', function(){
                changePage(currentPage + 1);
            });
            document.querySelector('.pagination').appendChild(next);
        }
    }
    function changePage(i){
        currentPage = i;
        loadItem();
    }
}

function listUsers() {
    LIST_USER.renderListUser();
    listenDeleteUser();
    listenUpdateUser();
    searchUser();
    pagination();
}

function main() {
    LIST_USER.init();
    listUsers();
    listenNewUser();
}
main();
