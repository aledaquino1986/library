const table = document.querySelector("table");
const addNewBookButton = document.querySelector(".add-new-book");
let numIdBook = 0;

function Book(title, author, pages, read, deleteBook = "No") {
  const capitalizeTheFirstLetter = function(string) {
    return string.toLowerCase().replace(/\b\w/g, firstLetterOfEachWord => firstLetterOfEachWord.toUpperCase());
  }

  this.title = capitalizeTheFirstLetter(title);
  this.author = capitalizeTheFirstLetter(author);
  this.pages = pages;
  this.read = read;
  this.deleteBook = deleteBook;
}


let library = [];
let libraryPermanent = [];

const addBookToLibrary = function (book) {
  library.push(book);
  libraryPermanent.push(book);
};

const generateTableHead = function (table, library) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  let tbody = table.createTBody();
  table.appendChild(tbody);

  for (let book of library) {
    for (let bookItem in book) {
      if (bookItem === "read") {
        bookItem = "Have you read it?";
      } else if (bookItem == "deleteBook") {
        bookItem = "Delete book";
      } else {
        bookItem = bookItem.charAt(0).toUpperCase() + bookItem.slice(1);
      }
      let th = document.createElement("th");
      let text = document.createTextNode(bookItem);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
};

const setAttribute = function(element, attribute, attributeName) {
  element.setAttribute(attribute, attributeName);
}

const generateTable = function (library) {
  const tbodyElement = document.querySelector("tbody");

  library.forEach((book) => {
    let row = tbodyElement.insertRow();
    row.classList = `row-number-${numIdBook}`;

    for (bookItem in book) {
      if (bookItem === "read" || bookItem === "deleteBook") {
        if (bookItem === "deleteBook") {
          let cell = row.insertCell();
          let button = document.createElement("button");
          button.innerText = "Delete book";
          button.classList = `delete-book row-number-${numIdBook}`;
          cell.appendChild(button);
        } else if (bookItem === "read") {
          let cell = row.insertCell();
          let select = buildSelectFunction("have-you-read-it");

          select.setAttribute("id", "select-option-table" + numIdBook);

          cell.appendChild(select);

          let selectOption = document.querySelector(
            "#select-option-table" + numIdBook
          );

          for (let i = 0; i < selectOption.length; i++) {
            if (selectOption[i].hasAttribute("selected")) {
              selectOption[i].removeAttribute("selected");
            }

            if (book[bookItem] === "Yes" && selectOption[i].value === "Yes") {
              
              setAttribute(selectOption[i], "selected", "selected")
              break;
            } else if (
              book[bookItem] === "No" &&
              selectOption[i].value === "No"
            ) {
              setAttribute(selectOption[i], "selected", "selected")
             
              break;
            } else if (
              book[bookItem] === "Currently reading" &&
              selectOption[i].value === "Currently reading"
            ) {
              setAttribute(selectOption[i], "selected", "selected")
              
              break;
            }
          }
        }
      } else {
        let cell = row.insertCell();
        let text = document.createTextNode(book[bookItem]);
        cell.appendChild(text);
      }
    }
  });
  
  
};

const deleteFromLibrary = function (library) {
  library.pop();
}

const addNumBook = function() {
  numIdBook++;
}

const buildSelectFunction = function (name) {
  const select = document.createElement("select");
  const options = ["Yes", "No", "Currently reading"];
  for (let i = 0; i < options.length; i++) {
    let option = document.createElement("option");
    option.value = options[i];
    option.text = options[i];

    select.appendChild(option);

    if (options[i] === "No") {
      option.setAttribute("selected", "selected");
    }
  }

  select.setAttribute("name", name);
  return select;
};


const createAddBookForm = function (form) {
  let select;
  for (let i = 0; i <= 3; i++) {
    const labelTitle = document.createElement("label");
    let input;

    if (i < 3) {
      input = document.createElement("input");
    }

    switch (i) {
      case 0:
        labelTitle.innerText = "Add title:";
        setAttribute(input, "type", "text");
        setAttribute(input, "placeholder", "The Lord of The Flies");
        setAttribute(input, "id", "title");
        break;
      case 1:
        labelTitle.innerText = "Add author:";
        setAttribute(input, "type", "text");
        setAttribute(input, "placeholder", "Wiliam Golding");
        setAttribute(input, "id", "author");

        break;
      case 2:
        labelTitle.innerText = "Add number of pages:";

        setAttribute(input, "type", "number");
        setAttribute(input, "placeholder", "359");
        setAttribute(input, "id", "pages");
        setAttribute(input, "min", "1");
        break;
      case 3:
        labelTitle.innerText = "Have you read it?";
        select = buildSelectFunction("have-you-read-it");
        setAttribute(select, "id", "have-you-read-it");
        

        break;
    }

    form.appendChild(labelTitle);

    if (i < 3) {
      form.appendChild(input);
    } else {
      form.appendChild(select);
    }
  }
};


const createForm = function(addBookToLibraryButton) {
  const addNewBookSection = document.querySelector(".add-new-book-section");
  const form = document.querySelector(".add-new-book-form");
  const addNewBookTitle = document.createElement("h2");
  

  if (form.children.length > 0) {
    return;
  }

  addBookToLibraryButton.classList = "add-book-to-library";

  addBookToLibraryButton.innerText = "Add this book to your library!";
  addNewBookTitle.innerText = "Add a book to your library!";
  addNewBookSection.appendChild(addNewBookTitle);
  addNewBookSection.insertBefore(addNewBookTitle, form);
  
  createAddBookForm(form);
  form.appendChild(addBookToLibraryButton);
}



const removeTable = function(tbody) {
 console.log(tbody);
}



addNewBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  const addBookToLibraryButton = document.createElement("button");
  createForm(addBookToLibraryButton);



  addBookToLibraryButton.addEventListener("click", (e) => {
    e.preventDefault();
    let titleInput = document.querySelector("#title").value;
    let authorInput = document.querySelector("#author").value;
    let pagesInput = document.querySelector("#pages").value;
    let readInput = document.querySelector("#have-you-read-it").value;
    const main = document.querySelector("main");

    
    if (!titleInput) {
       alert("Please, do not leave any form inputs empty.")
    } else {
      const userBook = new Book(titleInput, authorInput, pagesInput, readInput);

      addBookToLibrary(userBook);

      if (!(table.children.length > 0)) {
        generateTableHead(table, library);
      }

      let selectChildren = document.querySelector("select").children;

      for (let i = 0; i < selectChildren.length; i++) {
        if (selectChildren[i] === "Yes") {
          selectChildren[i].setAttribute("selected", "selected");
        }
      }

      generateTable(library);
      deleteFromLibrary(library);
      addNumBook();
      main.classList.add("grid-main");


      const deleteBookButton = document.querySelectorAll(".delete-book");
     
      
      deleteBookButton.forEach((button) => {
      
        button.addEventListener("click", function (e) {
         
          const buttonParentElement = button.parentElement.parentElement;
          buttonParentElement.remove();
          const tbody = document.querySelector("tbody");
          const thead = document.querySelector("thead")
          if (tbody && tbody.children.length == 0) {
            
            tbody.remove();
            thead.remove();
            main.classList.remove("grid-main");
           }
        });

       
      });

      
    }
  });

  addNewBookButton.classList.add("invisible");
});


