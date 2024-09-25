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
    this.saveProduct();
    this.renderProducts();
  },
  validateForm: function() {
    var fileupload = document.getElementById('fileupload');
    var name = document.getElementById('name').value;
    var sellingprice = document.getElementById('selling-price').value;
    var originalprice = document.getElementById('original-price').value;
    var rate = document.getElementById('rate').value;
    var address = document.getElementById('address').value;
  

    if (fileupload && fileupload.files && fileupload.files[0]) {
      var img = document.createElement('img');
      img.src = URL.createObjectURL(fileupload.files[0]);
  
 
      var uploadArea = document.querySelector('.upload-content');
      uploadArea.innerHTML = ''; 
      uploadArea.appendChild(img);
  
      const product = {
        fileupload: URL.createObjectURL(fileupload.files[0]), 
        name, sellingprice, originalprice, rate, address
      };
  
      this.addProduct(product);
    } else {
      const product = {
        fileupload: '',
        name, sellingprice, originalprice, rate, address
      };
      this.addProduct(product);
    }
  },
  
  
  renderProducts: function () {
    const productContainer = document.querySelector('.products'); 
    productContainer.innerHTML = '';
    
    this.products.forEach(product => {
      const productHTML = `
        <div class="product">
          <button class="item-ellip">
            <i class="fa-solid fa-ellipsis"></i> 
          </button>
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
            <p id="address">${product.address}</p>
          </div>
        </div>
      `;
      productContainer.innerHTML += productHTML;     
    });
  },
};

// EvenListener
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('fileupload').addEventListener('change', function (e) {
    var img = document.createElement('img');
    img.src = URL.createObjectURL(e.target.files[0]);
    
    var uploadArea = document.querySelector('.upload-content');
    uploadArea.innerHTML = ''; 
    uploadArea.appendChild(img);
  });

  // Save Product
  function listNewSave() {
    var form = document.getElementById('save');
    form.addEventListener('click', function (event) {
      event.preventDefault();  
      PRODUCT_INFO.validateForm();
    });
  }

  function listAddProduct() {
    const btnAdd = document.querySelectorAll('.form-add');
    btnAdd.forEach(element => {
      element.addEventListener('click', function() {
        const formhome = document.querySelector('.form-home'); 
        formhome.classList.add('active');
      });
    });
  }

  PRODUCT_INFO.loadProductLocalStorage();
  listNewSave();
  listAddProduct();
});
