const btnAddBook = document.getElementById("btnAddBook");
const submitNewBook = document.getElementById("submitNewBook");

window.addEventListener("load", () => {
  books = JSON.parse(localStorage.getItem("books")) || [];
  displayBooks();
});

btnAddBook.addEventListener("click", () => {
  const addBookInputs = document.getElementById("addBookInputs");
  addBookInputs.style.display =
    addBookInputs.style.display === "none" ? "flex" : "none";
});

submitNewBook.addEventListener("click", (e) => {
  e.preventDefault();
  const bookName = document.getElementById("bookName");
  const bookAuthor = document.getElementById("bookAuthor");
  const bookCategory = document.getElementById("bookCategory");
  const bookReleaseYear = document.getElementById("bookReleaseYear");
  const bookPrice = document.getElementById("bookPrice");
  const bookPicture = document.getElementById("bookPicture");

  const book = {
    KnygosPavadinimas: bookName.value,
    KnygosAutorius: bookAuthor.value,
    Kategorija: bookCategory.value,
    IsleidimoMetai: bookReleaseYear.value,
    Kaina: bookPrice.value,
    url: bookPicture.value,
  };
  books = JSON.parse(localStorage.getItem("books")) || [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));

  bookName.value = "";
  bookAuthor.value = "";
  bookCategory.value = "";
  bookReleaseYear.value = "";
  bookPrice.value = "";
  bookPicture.value = "";

  console.log("works");
  displayBooks();
});

function displayBooks() {
  const bookshelf = document.getElementById("bookshelf");
  books = JSON.parse(localStorage.getItem("books"));

  if (books) {
    for (let i = 0; i < books.length; i++) {
      let cardHTML = `    
      <div class="card" style="width: 18rem">
        <img
          src="${books[i].url}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${books[i].KnygosPavadinimas}</h5>
          <p class="card-text">
          ${books[i].KnygosAutorius}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Kategorija: <b> ${books[i].Kategorija} </b></li>
          <li class="list-group-item">Isleidimo metai: <b> ${books[i].IsleidimoMetai} </b></li>
        </ul>
        <div class="card-body">
          <h5>${books[i].Kaina}$</h5>
        </div>
      </div>
      `;
      bookshelf.innerHTML += cardHTML;
    }
  }
}
