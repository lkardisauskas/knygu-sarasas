const btnAddBook = document.getElementById("btnAddBook");
const submitNewBook = document.getElementById("submitNewBook");

window.addEventListener("load", () => {
  books = JSON.parse(localStorage.getItem("books")) || [];
  displayBooks();
});

btnAddBook.addEventListener("click", () => {
  const addBookInputs = document.getElementById("addBookInputs");
  addBookInputs.style.display =
    addBookInputs.style.display === "flex" ? "none" : "flex";
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

function displayBooks(searchTerm = "", authorFilter = null, sortType = null) {
  const bookshelf = document.getElementById("bookshelf");
  const books = JSON.parse(localStorage.getItem("books"));
  bookshelf.innerHTML = "";
  if (books) {
    let filteredBooks = books
      .filter((book) =>
        book.KnygosPavadinimas.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((book) => {
        if (authorFilter === null || authorFilter === "All books") {
          return true;
        }
        // return book.KnygosAutorius === authorFilter;
        return book.KnygosAutorius === authorFilter || (!authorFilter && book);
      });

    if (sortType === "lowToHigh") {
      filteredBooks = filteredBooks.sort((a, b) => a.Kaina - b.Kaina);
    } else if (sortType === "highToLow") {
      filteredBooks = filteredBooks.sort((a, b) => b.Kaina - a.Kaina);
    }

    for (let i = 0; i < filteredBooks.length; i++) {
      let cardHTML = `
        <div class="card" id="card${i}" style="width: 18rem">
          <img
            src="${filteredBooks[i].url}"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">${filteredBooks[i].KnygosPavadinimas}</h5>
            <p class="card-text">
            ${filteredBooks[i].KnygosAutorius}
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Kategorija: <b> ${filteredBooks[i].Kategorija} </b></li>
            <li class="list-group-item">Isleidimo metai: <b> ${filteredBooks[i].IsleidimoMetai} </b></li>
          </ul>
          <div class="card-body card-body-footer">
            <h5>${filteredBooks[i].Kaina}$</h5>
            <button class="btn btn-primary" data-book-index="${i}">Delete</button>
          </div>
        </div>
        `;
      bookshelf.innerHTML += cardHTML;
    }
  }

  const deleteButtons = document.querySelectorAll(".card button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookIndex = button.dataset.bookIndex;
      books.splice(bookIndex, 1);
      localStorage.setItem("books", JSON.stringify(books));
      displayBooks(searchTerm, authorFilter);
    });
  });
}

function createFilterMenu() {
  const books = JSON.parse(localStorage.getItem("books"));
  const filterMenu = document.getElementById("filterMenu");

  filterMenu.innerHTML = "";

  const allBooksOption = document.createElement("li");
  allBooksOption.innerHTML =
    '<button class="dropdown-item" type="button">All books</button>';
  filterMenu.appendChild(allBooksOption);

  allBooksOption.addEventListener("click", () => {
    displayBooks();
  });

  const knygosAutoriai = new Set();
  for (let book of books) {
    knygosAutoriai.add(book.KnygosAutorius);
  }
  for (let knygosAutorius of knygosAutoriai) {
    const option = document.createElement("li");
    option.innerHTML = `<button class="dropdown-item" type="button">${knygosAutorius}</button>`;
    filterMenu.appendChild(option);

    option.addEventListener("click", (e) => {
      const authorFilter = e.target.textContent;
      displayBooks("", authorFilter);
    });
  }
}

searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value;
  displayBooks(searchTerm);
});

sortLowHigh.addEventListener("click", (e) => {
  displayBooks("", null, "lowToHigh");
});

sortHighLow.addEventListener("click", (e) => {
  displayBooks("", null, "highToLow");
});

sortDefault.addEventListener("click", (e) => {
  displayBooks("", null);
});

const authorFilter = "s";
createFilterMenu();
displayBooks("", authorFilter);
