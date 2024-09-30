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

        this.addProduct(product);
        this.editProduct(index, product);
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
        this.EllipButtons();
    },
    editProductForm: function (index) {
        const product = this.products[index];
        document.getElementById('name').value = product.name;
    },
    
    EllipButtons: function () {
        // Nút ba chấm
        const ellipButton = document.querySelectorAll('.item-ellip');
        ellipButton.forEach(button => {
            button.addEventListener('click', function () {
                const dropdown = this.nextElementSibling;
                dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';
            });
        });


        //Xử lý phần sửa sản phẩm
        const editButton = document.querySelectorAll('.edit-btn');
        editButton.forEach(item => {
            item.addEventListener('click', function (){
                const index = this.getAttribute('data-edit');
                PRODUCT_INFO.editProductForm(index);
            })
        });


        // Xử lý sự kiện xóa sản phẩm
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
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
    },
    
    
 
    
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

    //Delete Product
    function listDeleteProduct() {
        
    }

    


PRODUCT_INFO.loadProductLocalStorage();
listNewSave();

