
const products = [
    {
      imgSrc: 'https://opencart4.magentech.com/themes/so_emarket/layout3/image/cache/catalog/demo/product/index2/10-270x270.jpg',
      title: 'Doenpuis consuat',
      priceNew: '$45.00',
      priceOld: '$49.00',
      rating: 5.0,
      address: 'Đà Nẵng'
    },
    {
      imgSrc: 'https://opencart4.magentech.com/themes/so_emarket/layout3/image/cache/catalog/demo/product/index2/12-270x270.jpg',
      title: 'Consuat Product',
      priceNew: '$50.00',
      priceOld: '$60.00',
      rating: 4.5,
      address: 'Hà Nội'
    }

  ];
  

  function renderProducts() {
    const productContainer = document.querySelector('.products'); 
    productContainer.innerHTML = '';
    
    products.forEach(product => {
      const productHTML = `
        <div class="product">
          <button class="item-ellip">
            <i class="fa-solid fa-ellipsis"></i> 
          </button>
          <div class="product-img">
            <img src="${product.imgSrc}" alt="">
          </div>
          <h2 class="product-title">
            ${product.title}
          </h2>
          <div class="price">
            <span class="price-new-ol">${product.priceNew}</span>
            <span class="price-old"><del>${product.priceOld}</del></span>
          </div>
          <div class="star">
            <i class="fa fa-star" aria-hidden="true"></i>
            <p>${product.rating}</p>
          </div>
          <div class="address-form">
            <i class="fa-solid fa-location-dot"></i>
            <p id="address">${product.address}</p>
          </div>
        </div>
      `;
      
      productContainer.innerHTML += productHTML;
    });
  }

  
  renderProducts();