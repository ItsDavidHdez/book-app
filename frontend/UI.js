import BookService from "./services/BookService";
const bookService = new BookService();
import { format } from "timeago.js";

class UI {
  async renderBooks() {
    const books = await bookService.getBook();
    const bookCardContainer = document.getElementById("books-cards");
    bookCardContainer.innerHTML = "";
    books.forEach((book) => {
      const div = document.createElement("div");
      div.className = "";
      div.innerHTML = `
        <div class="card m-2">
        <div class="card-body">
          <div class="row">
                <div class="col-md-4">
                    <img src="${book.imagePath}" alt="${
        book.title
      }" class="img-fluid"/>
                </div>
                <div class="col-md-8">
                    <div class="card-block pd-2">
                        <h4 class="card-title pd-2">${book.title}</h4>
                        <p class="card-text">${book.author}</p>
                        <a href="#" class="btn btn-danger delete" _id="${
                          book._id
                        }">X</a>
                    </div>
                </div>
            </div>
        </div>
            <div class="card-footer">
                ${format(book.created_at)}
            </div>
        </div>
      `;
      bookCardContainer.appendChild(div);
    });
  }

  async addNewBook(book) {
    await bookService.postBook(book);
    this.clearBookForm();
    this.renderBooks();
  }

  clearBookForm() {
    document.getElementById("book-form").reset();
  }

  renderMessage(message, colorMessage, secondsToRemove) {
    const div = document.createElement("div");
    div.className = `alert alert-${colorMessage} message`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".col-md-4");
    const bookForm = document.querySelector("#book-form");
    container.insertBefore(div, bookForm);
    setTimeout(() => {
      document.querySelector(".message").remove();
    }, secondsToRemove);
  }

  async deleteBook(id) {
    await bookService.deleteBook(id);
    this.renderBooks();
  }
}
export default UI;
