const PRODUCT_INFO = {
    products: [],

    loadProductLocalStorage: function () {
        const loadProduct = localStorage.getItem('admin');
        this.products = loadProduct ? JSON.parse(loadProduct) : [];
        this.renderProducts();
    },

    saveProduct: function () {
        localStorage.setItem('admin', JSON.stringify(this.products));
    },

    //Thêm sản phẩm
    addProduct: function (product) {
        this.products.push(product);
        this.renderProducts();
        this.saveProduct();
        this.resetForm();
    },

    // Xóa sản phẩm
    deleteProduct: function(id){
      this.products.splice(id, 1);
      this.saveProduct();
      this.renderProducts();
      pagination();
    },
    // Sửa sản phẩm
    editButton: function (id) {
        this.products(id);
        this.saveProduct();
        this.renderProducts();
    },
    

    validateForm: function () {
        const fileupload = document.getElementById('fileupload');
        const file = fileupload.files[0];
        const imgUrl = file ? URL.createObjectURL(file) : ''; 
        const name = document.getElementById('name').value;
        const sellingprice = document.getElementById('selling-price').value;
        const originalprice = document.getElementById('original-price').value;
        const rate = document.getElementById('rate').value;
        const address = document.getElementById('address').value;

        const product = {
            fileupload: imgUrl, 
            name,
            sellingprice,
            originalprice,
            rate,
            address
        };
        URL.createObjectURL(file);

        const uploadText = document.querySelector('.uploadbutton');
        if (uploadText) {
            uploadText.style.display = 'block';
        }
        this.resetForm();
        this.addProduct(product);
        this.renderProducts();

    // if (index === ''){
    //     this.addProduct(product);
    //     this.resetForm();
    // }else{
    //     this.editButton( index , product);
    //     this.deleteProduct (index , product);
    // }
    },

    resetForm: function () {
        document.getElementById('fileupload').value = '';
        document.getElementById('name').value = '';
        document.getElementById('selling-price').value = '';
        document.getElementById('original-price').value = '';
        document.getElementById('rate').value = '';
        document.getElementById('address').value = '';

        const uploadArea = document.querySelector('.upload-area');
        uploadArea.querySelector('img')?.remove();
    },
  
    renderProducts: function () {
        const productContainer = document.querySelector('.products');
        productContainer.innerHTML = '';
    
        this.products.forEach((product, index) => {
            productContainer.innerHTML += `
                <div class="product">
                      <!-- Nút ba chấm -->
                    <button class="item-ellip" data-index="${index}"><i class="fa-solid fa-ellipsis"></i></button>

                    <!-- Sửa và Xóa -->
                    <div class="dropdown-menu">
                        <button class="edit-btn" data-edit="${index}"><i class="fa-solid fa-pen"></i> Sửa</button>
                        <button class="delete-btn" data-delete="${index}"><i class="fa-solid fa-trash"></i> Xóa</button>
    
                        <div class="popover-confirm" id="popover-${index}" style="display: none;">
                            <p>Bạn có chắc muốn xóa?</p>
                            <button class="confirm-delete" data-delete="${index}">Xác nhận</button>
                            <button class="cancel-delete" data-delete="${index}">Hủy</button>
                        </div>
                    </div>
    
                    <!--Form Render -->
                    <div class="product-img">
                        <img src="${product.fileupload}" alt="Product Image">
                    </div>
                    <h2 class="product-title">${product.name}</h2>
                    <div class="price">
                        <span class="price-new-ol">${product.sellingprice}</span>
                        <span class="price-old"><del>${product.originalprice}</del></span>
                    </div>
                    <div class="star">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <p>${product.rate}</p>
                    </div>
                    <div class="address-form">
                        <i class="fa-solid fa-location-dot"></i>
                        <p>${product.address}</p>
                    </div>
                </div>
            `;
        });
        listEllipButtons();
        listDeleteProduct();
        listEditProduct();
        // pagination();
    },
    editProductForm: function (index) {
        const product = this.products[index];
    
        document.getElementById('name').value = product.name;
        document.getElementById('selling-price').value = product.sellingprice;
        document.getElementById('original-price').value = product.originalprice;
        document.getElementById('rate').value = product.rate;
        document.getElementById('address').value = product.address;
    
        const uploadArea = document.querySelector('.upload-area');
        uploadArea.querySelector('img')?.remove();
        const img = document.createElement('img');
        img.src = product.fileupload ? product.fileupload : '';
        uploadArea.appendChild(img);
    
        document.getElementById('save').style.display = 'none';
        document.getElementById('update').style.display = 'block';
        document.getElementById('title-add').style.display = 'none';
        document.getElementById('title-update').style.display = 'block';
    
        document.getElementById('update').onclick = (e) => {
            e.preventDefault()
            const fileupload = document.getElementById('fileupload');
            const file = fileupload.files[0];
    
            const imgUrl = file ? URL.createObjectURL(file) : product.fileupload;
    
            const updatedProduct = {
                fileupload: imgUrl,  
                name: document.getElementById('name').value,
                sellingprice: document.getElementById('selling-price').value,
                originalprice: document.getElementById('original-price').value,
                rate: document.getElementById('rate').value,
                address: document.getElementById('address').value
            };
    
        
            this.products[index] = updatedProduct;
            this.saveProduct();
            this.renderProducts();
            pagination();
        };
    },
    
    sortLeft: function () {
        
    },

    sortRight: function () {
        
    }
};

   // Event listeners

    // Save
    function listNewSave() {
    var form = document.getElementById('save');
    form.addEventListener('click', function (event) {
        event.preventDefault();
        PRODUCT_INFO.validateForm(); 
    });
    };

    // Hàm xử lý img ảnh
    document.getElementById('fileupload').addEventListener('change', function (e) {
        const file = e.target.files[0]; 
        const uploadArea = document.querySelector('.upload-area'); 
        const img = document.createElement('img'); 
        const uploadText = document.querySelector('.uploadbutton'); 

        uploadArea.querySelector('img')?.remove();

        if (file) {
    
            img.src = URL.createObjectURL(file);
            uploadArea.appendChild(img); 
            if (uploadText) {
                uploadText.style.display = 'none';
            }
        }
    });

    //Nút ba chấm
    function listEllipButtons() {
        const ellipButtons = document.querySelectorAll('.item-ellip');
        ellipButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation();
                const dropdown = this.nextElementSibling;
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            });
        });
    
        // Đóng dropdown khi nhấn ra ngoài
        document.addEventListener('click', () => {
            ellipButtons.forEach(button => {
                const dropdown = button.nextElementSibling;
                if (dropdown) {
                    dropdown.style.display = 'none'; 
                }
            });
        });
    }
    

    //Delete Product
    function listDeleteProduct() {
        // Xử lý sự kiện xóa sản phẩm
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.stopPropagation(); 
                const index = this.getAttribute('data-delete');
                const popover = document.getElementById(`popover-${index}`);
                popover.style.display = 'block'; 
                
                // Xử lý xác nhận xóa
                const confirmDeleteButton = popover.querySelector('.confirm-delete');
                confirmDeleteButton.addEventListener('click', function () {
                    PRODUCT_INFO.deleteProduct(index); 
                    popover.style.display = 'none';  
                });
                
                // Xử lý hủy xóa
                const cancelDeleteButton = popover.querySelector('.cancel-delete');
                cancelDeleteButton.addEventListener('click', function () {
                    popover.style.display = 'none'; 
                });
            });
        });
    }
    //Sửa sản phẩm
    function listEditProduct() {
       //Xử lý phần sửa sản phẩm
        const editButton = document.querySelectorAll('.edit-btn');
        editButton.forEach(item => {
            item.addEventListener('click', function (e){
                e.preventDefault();
                const index = this.getAttribute('data-edit');
                PRODUCT_INFO.editProductForm(index);
            })
        }); 
        editButton.forEach(e => {
            e.addEventListener('click', function () {
                formhome.classList.add('active')
            })
        })
    }
    //Phân trang 
    // let currentPage = 1;

    // function pagination() {
    //     let perPage = 8; 
    //     const listItem = document.querySelectorAll('.product');
        
    //     // Làm hiển  thị trên trang
    //     function loadItems() {
    //         const beginGet = (currentPage - 1) * perPage;
    //         const endGet =  beginGet + perPage; 
            
    //         listItem.forEach((item, key) => {
    //             item.style.display = (key >= beginGet && key < endGet) ? 'block' : 'none';
    //         });
 
    //         listPage();
    //     }
    //     //Làm các nút khi chọn trang
    //     function listPage() {
    //         const totalItems = listItem.length;         
    //         const pageCount = Math.ceil(totalItems / perPage);  
    
    //         const paginationContainer = document.querySelector('.pagination');
    //         paginationContainer.innerHTML = ''; 
    
    //         for (let i = 1; i <= pageCount; i++) {
    //             let newPage = document.createElement('span');
    //             newPage.innerText = i;
    //             newPage.classList.add('page-number'); 
    //             if (i === currentPage) {
    //                 newPage.classList.add('active');  
    //             }
    
    //             // Xử lý khi nhấn vào số trang
    //             newPage.addEventListener('click', function () {
    //                 currentPage = i;
    //                 loadItems();  
    //             });
    
    //             paginationContainer.appendChild(newPage);
    //         }
    //     }
        
      
    //     loadItems();
      
    // }
    

PRODUCT_INFO.loadProductLocalStorage();
listNewSave();
listEditProduct();
listDeleteProduct();
// pagination();



