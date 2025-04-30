// Lọc sách theo tiêu chí
// Yêu cầu: Lọc sách có trên 300 trang, kiểm tra xem có sách nào là sách bán chạy (best-seller), và đảm bảo tất cả sách đều có tác giả.

const books = [
    { title: "Book A", pages: 350, bestSeller: true, author: "Author A" },
    { title: "Book B", pages: 150, bestSeller: false, author: "Author B" },
    { title: "Book C", pages: 450, bestSeller: true, author: "Author C" },
  ];
  //Đảm bảo tất cả sách đều có tác
  const booksEvery = books.every(book => book.author)
  console.log(booksEvery);
  
  //Kiểm tra xem có sách nào bán chạy 
  const booksSome = books.some(book => book.bestSeller)
  console.log(booksSome);
  //Lọc sách có trên 300 trang 
  const booksFilet = books.filter(book => book.pages >= 300)
  console.log(booksFilet);

  