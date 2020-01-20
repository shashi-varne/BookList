//Book class:  represents a book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class store{
    static getBooks(){
        let books; 
        if(localStorage.getItem('books') == null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books
    }

    static addBook(book){
        const books = store.getBooks();
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = store.getBooks();
        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}

//UI class: Handle UI tasks
class UI{
    static displayBooks(){
        const storedBooks = store.getBooks();
        const books = storedBooks;
        
        books.forEach(book =>{
            UI.addBookToList(book);
        })
    }

    static addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>
        `;

        list.appendChild(row)
    }
    static alertMessage(message, className){
        const divElement = `<div class='alert alert-${className}'>${message}</div>`    
        const h2 = document.getElementById('h2');
        h2.insertAdjacentHTML('afterend',divElement)
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000)
    }
    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    
    static deleteBook(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }
}

//Display Books 
document.addEventListener('DOMContentLoaded',UI.displayBooks)

//Listen to form input
document.getElementById('book-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if(title ==''|| author == '' || isbn == ''){
        UI.alertMessage('Please fill in all the forms','danger')
    }else{
    const book = new Book(title, author, isbn);
    UI.addBookToList(book)
    UI.clearFields();
    UI.alertMessage('Book Added','success')
    store.addBook(book)
    }
}); 


//Remove a book
document.getElementById('book-list').addEventListener('click',(event)=>{
    UI.deleteBook(event.target)
    UI.alertMessage('Book Removed','success')
})