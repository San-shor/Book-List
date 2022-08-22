// get element from html
let form = document.querySelector('#book-form');
let list = document.querySelector('#book-list');


class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

form.addEventListener('submit', newBook);
list.addEventListener('click', deleteBook);

function newBook(e) {
    let title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector("#isbn").value;



    if (title == '' || author === '' || isbn === '') {
        showBook.showAlert("Fill all fields", "error");
    }
    else {
        let book = new Book(title, author, isbn);


        showBook.addBook(book);
        showBook.clearBook();

        showBook.showAlert("Book Added", "success");


    }
    e.preventDefault();
}

function deleteBook(e) {

    showBook.delete(e.target);
    showBook.preventDefault();
}



class showBook {

    static addBook(book) {
        let list = document.querySelector("#book-list");
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`;
        list.appendChild(row);

    }
    static clearBook() {
        document.querySelector("#title").value = '',
            document.querySelector("#author").value = '',
            document.querySelector("#isbn").value = '';
    }
    static showAlert(message, className) {
        let div = document.createElement('div')
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static delete(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            showBook.showAlert('Book remove', "success");
        }

    }
}