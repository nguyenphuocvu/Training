

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

    addProduct: function (product) {
        this.products.push(product);
        this.renderProducts();
        this.saveProduct();
        this.resetForm();
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

    this.addProduct(product);
    URL.createObjectURL(file);

    const uploadText = document.querySelector('.uploadbutton');
    if (uploadText) {
        uploadText.style.display = 'block';
    }
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

        this.products.forEach((product,index) => {
            productContainer.innerHTML += `
                <div class="product">
                    <button class="item-ellip" data-index="${index}"><i class="fa-solid fa-ellipsis"></i></button>
                    <!-- Sửa and Xóa -->
                    <div class="dropdown-menu" style="display: none;">
                        <button class="edit-btn"><i class="fa-solid fa-pen"></i> Sửa</button>
                        <button class="delete-btn"><i class="fa-solid fa-trash"></i> Xóa</button>
                    </div>

                    <div class="product-img">
                        <img src="${product.fileupload}" alt="Product Image">
                    </div>
                    <h2 class="product-title">
                        ${product.name}
                    </h2>
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
    
    // Img Base64

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

    


PRODUCT_INFO.loadProductLocalStorage();
listNewSave();

