// const PRODUCT_INFO = {
//   products: [],
  
//   loadProductLocalStorage: function () {
//     const loadProduct = localStorage.getItem('admin');
//     this.products = loadProduct ? JSON.parse(loadProduct) : [];
//     this.renderProducts();
//   },
  
//   saveProduct: function () {
//     localStorage.setItem('admin', JSON.stringify(this.products));
//   },
  
//   addProduct: function (product) {
//     this.products.push(product);
//     this.saveProduct();
//     this.renderProducts();
//   },
  
  
  
//   validateForm: function() {
//     var fileupload = document.getElementById('fileupload')?.files[0];
//     var name = document.getElementById('name').value;
//     var sellingprice = document.getElementById('selling-price').value;
//     var originalprice = document.getElementById('original-price').value;
//     var rate = document.getElementById('rate').value;
//     var address = document.getElementById('address').value;
  

//     var imgUrl = fileupload ? URL.createObjectURL(fileupload) : '';
//     const product = {
//       fileupload: imgUrl, 
//       name,
//       sellingprice,
//       originalprice,
//       rate,
//       address
//     };

//     this.addProduct(product);     
//   },
  

//   renderProducts: function() {
//     const productContainer = document.querySelector('.products'); 
//     productContainer.innerHTML = '';
    
//     this.products.forEach(product => {
     
      
//       const productHTML = `
//         <div class="product">
//           <button class="item-ellip">
//             <i class="fa-solid fa-ellipsis"></i> 
//           </button>
//           <div class="product-img">
//              <img src="${product.fileupload}" alt="">
//           </div>
//           <h2 class="product-title">
//             ${product.name}
//           </h2>
//           <div class="price">
//             <span class="price-new-ol">${product.sellingprice }</span>
//             <span class="price-old"><del>${product.originalprice}</del></span>
//           </div>
//           <div class="star">
//             <i class="fa fa-star" aria-hidden="true"></i>
//             <p>${product.rate}</p>
//           </div>
//           <div class="address-form">
//             <i class="fa-solid fa-location-dot"></i>
//             <p id="address">${product.address}</p>
//           </div>
//         </div>
//       `;
      
//       productContainer.innerHTML += productHTML;     
//     });
//   },
 
  
// };

// // EvenListener

//   // UploadImg
//   function ListUploadImg() {
//     const fileupload = document.getElementById('fileupload');
//     fileupload.addEventListener('change', function () {

//       var img = document.createElement('img');
//       img.src = URL.createObjectURL(fileupload.files[0]);  
      

//       var uploadButton = document.querySelector('.upload-content'); 
//       uploadButton.innerHTML = ''; 
//       uploadButton.appendChild(img);
//     });
//   }


//   // Save Product
//   function listNewSave() {
//     var form = document.getElementById('save');
//     form.addEventListener('click', function (e) {
//       e.preventDefault();  
//       PRODUCT_INFO.validateForm();
//     });
//   }
  
//   function listAddProduct() {
//     const btnAdd = document.querySelectorAll('.form-add');
  
//     btnAdd.forEach(element => {
//       element.addEventListener('click', function() {
//         const formhome = document.querySelector('.formhome'); 
//         formhome.classList.add('active');
//       });
//     });
//   }
  



//   PRODUCT_INFO.loadProductLocalStorage();
//   listNewSave();
//   listAddProduct();
//   ListUploadImg();




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
  },

  validateForm: function () {
      const fileupload = document.getElementById('fileupload');
      const file = fileupload.files[0]; 
      const name = document.getElementById('name').value;
      const sellingprice = document.getElementById('selling-price').value;
      const originalprice = document.getElementById('original-price').value;
      const rate = document.getElementById('rate').value;
      const address = document.getElementById('address').value;

      const reader = new FileReader();
      reader.onloadend = () => {
          const product = {
              fileupload: reader.result, 
              name,
              sellingprice,
              originalprice,
              rate,
              address
          };

          this.addProduct(product); 
      };

      if (file) {
          reader.readAsDataURL(file); 
      } else {
          alert("Please upload an image file.");
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
                      <p>${product.address}</p>
                  </div>
              </div>
          `;

          productContainer.innerHTML += productHTML;
      });
  },
};

// Event listeners
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
      element.addEventListener('click', function () {
          formhome.classList.add('active'); 
      });
  });
}

PRODUCT_INFO.loadProductLocalStorage();
listNewSave();
listAddProduct();



document.getElementById('fileupload').addEventListener('change', function (event) {
  const file = event.target.files[0]; 
  const uploadArea = document.querySelector('.upload-area'); 
  const imgElement = document.createElement('img'); 

  
  uploadArea.querySelector('img')?.remove();

  if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
          imgElement.src = e.target.result; 
          imgElement.style.maxWidth = '100%'; 
          imgElement.style.height = 'auto'; 
          uploadArea.appendChild(imgElement); 
      };
      reader.readAsDataURL(file); 
  }
});

