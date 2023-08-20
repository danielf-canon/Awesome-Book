document.addEventListener('DOMContentLoaded', () => {
    let booksList = [
      { 
        title: '', 
        author: '', 
      },
      { 
        title: '', 
        author: '', 
      },
    ];
  
    booksList = JSON.parse(localStorage.getItem('booksList')) || [];
  
    const $bookContainer = document.querySelector('.showLib');
  
    function showBooksSaved() {
      $bookContainer.innerHTML = '';
      booksList.forEach((book) => {
        const $idBook = document.createElement('div');
        const $title = document.createElement('h2');
        const $author = document.createElement('h4');
        const $remove = document.createElement('button');
        const $divLine = document.createElement('hr');
  
        $idBook.classList.add('cont-book');
        $title.classList.add('title');
        $author.classList.add('author');
        $remove.classList.add('delete');
  
        $title.innerText = book.title;
        $author.textContent = book.author;
        $remove.innerHTML = 'Delete';
        $remove.setAttribute('id', 'delete');
  
        $idBook.appendChild($title);
        $idBook.appendChild($author);
        $idBook.appendChild($remove);
        $idBook.appendChild($divLine);
        $bookContainer.appendChild($idBook);
      });
    }
  
    function update() {
      localStorage.setItem('booksList', JSON.stringify(booksList));
    }
  
    class MyBook {
      constructor(title, author) {
        this.title = title;
        this.author = author;
      }
    }
  
    function allBooks() {
      const $recTitulo = document.querySelector('#title');
      const $recAutor = document.querySelector('#author');
  
      const myBook = new MyBook($recTitulo.value, $recAutor.value);
      booksList.push(myBook);
      update();
      showBooksSaved();
    }
  
    function myEmptyForm() {
      const $form = document.querySelector('.Form');
      $form.reset();
    }
  
    const $form = document.querySelector('.Form');
    $form.addEventListener('submit', (e) => {
      e.preventDefault();
      allBooks();
      myEmptyForm();
    });
  
    function deleteBook(index) {
      booksList.splice(index, 1);
      update();
      showBooksSaved();
    }
  
    $bookContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete')) {
        const myInd = Array
          .from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
        deleteBook(myInd);
      }
    });
    showBooksSaved();
  });
