// // Data Type - Never
// Any - Trả về bất cứ thứ gì (áp dung cho function và variable)
// Void: không cần trả ra dữ liệu(thực chất vẫn trả ra) 
// không cần keyword return(áp dụng chủ yếu cho funtion )

// Never: 'Không bao giờ trả ra giá trị promise'

// Kiểu dữ liệu never được sử dụng khi chúng ta chắc chắn rằng một điều gì đấy
// không bao giờ xảy ra (không cần trả ra kết quả giống void ??? )


function handleException(errorMessage : string): never{
throw Error(errorMessage)
}
handleException("just a test error");

function runInfinity() : void {
    while (true) {  
        console.log("run infinity");    
    }
}
