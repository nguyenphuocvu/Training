saveLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
}

getFromLocalStorage = () => {
    const data = localStorage.getItem('products');
    return data ? JSON.parse(data) : [];
}

let products = getFromLocalStorage();

addProduct = (product) => {
    products.push(product);
    saveLocalStorage(products);
    renderProduct();
    resetForm()
}

deleteProduct = (id) =>{
    products.splice(id, 1)
    saveLocalStorage(products)
    renderProduct()
}
editProduct = (id) => {
    products(id)
    saveLocalStorage(products)
    renderProduct()
}

renderProduct = () => {
    const productContainer = document.querySelector('.products');
    productContainer.innerHTML = '';

    products.forEach((product, index) => {
        productContainer.innerHTML += `
            <div class="product">
              
                 <button class="item-ellip" data-index="${index}"><i class="fa-solid fa-ellipsis"></i></button>

                <div class="dropdown-menu">
                    <button class="edit-btn" data-edit="${index}"><i class="fa-solid fa-pen"></i> Sửa</button>
                    <button class="delete-btn" data-delete="${index}"><i class="fa-solid fa-trash"></i> Xóa</button>

                    <div class="popover-confirm" id="popover-${index}" style="display: none;">
                        <p>Bạn có chắc muốn xóa?</p>
                        <button class="confirm-delete" data-delete="${index}">Xác nhận</button>
                        <button class="cancel-delete" data-delete="${index}">Hủy</button>
                    </div>
                </div>

            
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
  
    eventDelete()
    eventEdit()
    eventDots()
}

validateForm = () => {
     const fileupload = document.getElementById('fileupload');
     const file = fileupload.files[0]
     const imgUrl = file ? URL.createObjectURL(file) : '';
     const name = document.getElementById('name').value
     const sellingprice = document.getElementById('selling-price').value
     const originalprice = document.getElementById('original-price').value
     const rate = document.getElementById('rate').value
     const address = document.getElementById('address').value
    
    

    const product = {
        fileupload: imgUrl,
        name,
        sellingprice,
        originalprice,
        rate, 
        address
    }
    
    URL.createObjectURL(file)

    const uploadButton = document.querySelector('.uploadbutton')
    if(uploadButton){
        uploadButton.style.display = 'block'
    }
   
    addProduct(product)
    renderProduct()
    resetForm()
     
}

resetForm = () =>{
    document.getElementById('fileupload').value = '';
    document.getElementById('name').value = '';
    document.getElementById('selling-price').value = '';
    document.getElementById('original-price').value = '';
    document.getElementById('rate').value = '';
    document.getElementById('address').value = '';

    const uploadArea = document.querySelector('.upload-area')
    uploadArea.querySelector('img')?.remove()
}
editProductForm = (index) => {

    const product = products[index];

    document.getElementById('name').value = product.name;
    document.getElementById('selling-price').value = product.sellingprice;
    document.getElementById('original-price').value = product.originalprice;
    document.getElementById('rate').value = product.rate;
    document.getElementById('address').value = product.address;

    // Hiển thị hình ảnh hiện tại (nếu có) trong upload area
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
        e.preventDefault();

        // Lấy file từ input file upload
        const fileupload = document.getElementById('fileupload');
        const file = fileupload.files[0];

        // Nếu có file, tạo URL mới; nếu không, giữ hình ảnh cũ
        const imgUrl = file ? URL.createObjectURL(file) : product.fileupload;

        // Cập nhật thông tin sản phẩm
        const updatedProduct = {
            fileupload: imgUrl,
            name: document.getElementById('name').value,
            sellingprice: document.getElementById('selling-price').value,
            originalprice: document.getElementById('original-price').value,
            rate: document.getElementById('rate').value,
            address: document.getElementById('address').value
        };

        // Ghi đè sản phẩm tại vị trí index trong mảng products
        products[index] = updatedProduct;   
        saveLocalStorage(products); 
        renderProduct(); 

        document.querySelector('.formhome').classList.remove('active');
    };
};

const fileUpload = document.getElementById('fileupload')
fileUpload.addEventListener('change' , (e) => {    
        const file = e.target.files[0]
        const uploadArea = document.querySelector('.upload-area')
        const img =  document.createElement('img')
        const uploadButton = document.querySelector('.uploadbutton')

        uploadArea.querySelector('img')?.remove()

        if(file){
            img.src = URL.createObjectURL(file)
            uploadArea.appendChild(img)

            if(uploadButton){
                uploadButton.style.display = 'none'
            }
        }     
})

//Sự kiện click
eventSave = () =>{
   var clickSave = document.getElementById('save')
   clickSave.addEventListener("click", (event) =>{
       event.preventDefault()
       const newProduct = validateForm()

       if (newProduct) {
        addProduct(newProduct);
        resetForm();
        }

        document.querySelector('.formhome').classList.remove('active');
    })
}

eventDots = () => {
    const dotsButtons = document.querySelectorAll('.item-ellip'); 
    dotsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const dropdownMenu = button.nextElementSibling;
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    });

    document.addEventListener('click', () => {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(menu => {
            menu.style.display = 'none';
        });
    });
}

eventDelete = () =>{
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation()
            const index = button.getAttribute('data-delete');
            const popover = document.getElementById(`popover-${index}`);
            if(popover){
                popover.style.display = 'block';  
            }
            const confirmDelete = popover.querySelector('.confirm-delete');
            const cancelDelete = popover.querySelector('.cancel-delete');
            
                confirmDelete.addEventListener('click', () => {
                    deleteProduct(index); 
                });
            
                cancelDelete.addEventListener('click', () => {
                    popover.style.display = 'none'; 
                });
            
        })
    }) 
}
eventEdit = () =>{
    const clickEdit = document.querySelectorAll('.edit-btn')
    clickEdit.forEach(button => {
        button.addEventListener('click' , (e) =>{
            e.preventDefault()
            const index = getAttribute('data-edit')
            editProductForm(index)
        })
    })
    clickEdit.forEach(e => {
        e.addEventListener('click', () => {
             formhome.classList.add('active')
        })
    })
}
eventEdit = () => {
    const clickEdit = document.querySelectorAll('.edit-btn');
    clickEdit.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Lấy chỉ số sản phẩm từ thuộc tính data-edit
            const index = button.getAttribute('data-edit');
            
          
            editProductForm(index); 
            
            // Hiển thị form sửa (ẩn form thêm nếu cần)
            document.querySelector('.formhome').classList.add('active');
        });
    });
};





eventSave()
eventEdit()
eventDelete()
eventDots()
renderProduct();

