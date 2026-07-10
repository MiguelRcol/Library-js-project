const myLibrary = [];

const libraryContainer = document.getElementById("library-container");
const addBookForm = document.getElementById("add-book-form");
const newBookButton = document.getElementById("new-book-button");
const cancelButton = document.getElementById("cancel-button");
const bookDialog = document.getElementById("book-dialog");

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");

        bookCard.classList.add("book-card");

        if (book.read) {
            bookCard.classList.add("book-read");
        } else {
            bookCard.classList.add("book-unread");
        }

        bookCard.dataset.id = book.id;

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? "Read" : "Not read"}</p>

            <div class="book-buttons">
                <button
                    class="toggle-read-button"
                    data-id="${book.id}"
                    type="button"
                >
                    ${book.read ? "Mark as unread" : "Mark as read"}
                </button>

                <button
                    class="delete-button"
                    data-id="${book.id}"
                    type="button"
                >
                    Delete
                </button>
            </div>
        `;

        libraryContainer.appendChild(bookCard);
    });
}

newBookButton.addEventListener("click", () => {
    bookDialog.showModal();
});

cancelButton.addEventListener("click", () => {
    addBookForm.reset();
    bookDialog.close();
});

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = Number(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    addBookForm.reset();
    bookDialog.close();
});

libraryContainer.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const bookId = clickedElement.dataset.id;

    if (clickedElement.classList.contains("delete-button")) {
        const bookIndex = myLibrary.findIndex(
            (book) => book.id === bookId
        );

        if (bookIndex === -1) {
            return;
        }

        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }

    if (clickedElement.classList.contains("toggle-read-button")) {
        const book = myLibrary.find(
            (book) => book.id === bookId
        );

        if (!book) {
            return;
        }

        book.toggleRead();
        displayBooks();
    }
});

addBookToLibrary(
    "The Hobbit",
    "J.R.R. Tolkien",
    310,
    true
);

addBookToLibrary(
    "Dune",
    "Frank Herbert",
    412,
    false
);