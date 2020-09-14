var star = 0
var bookList = []

document.getElementById('others').onchange = function() {
  document.getElementById('other-genre').disabled = !this.checked;
}

window.onload = function() {
  const button = document.querySelector( '#submit-button' )
  button.onclick = submit
  getAllBooks()
}

const starButtons = document.querySelectorAll('.star-button')
for(const button of starButtons) {
  button.addEventListener('mouseover', e => {
    lightStar(e.path[1].value, starButtons)
  })
  button.addEventListener('click', e => {
    e.preventDefault()
    star = e.path[1].value
    lightStar(star, starButtons)
  })
}

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const form = document.querySelector('form')
  const json = fetchForm()
  const body = JSON.stringify( json )

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // clean all fields
    if(response.status === 200) form.reset()
    getAllBooks()
    console.log(bookList)
  })

  return false
}

function fetchForm(){
  const author = document.querySelector( '#book-author' ).value
  const title = document.querySelector( '#book-title' ).value
  const isbn = document.querySelector( '#book-isbn' ).value
  const currentPage = document.querySelector( '#current-page' ).value
  const overallPage = document.querySelector( '#overall-page' ).value

  const genres = getGenres()
  const haveCopy = document.getElementsByName('have-copy')[0].checked ? true : false

  return { 
    title,
    author,
    isbn,
    genres,
    currentPage,
    overallPage,
    star,
    haveCopy
   }
}

function getGenres() {
  var genres = []

  document.getElementsByName('genre').forEach(checkbox => {
    if(checkbox.checked) genres.push(checkbox.value)
  })

  if(genres.includes('others')) {
    genres.splice(genres.indexOf('others'), 1)
    var otherGenres = document.querySelector('#other-genre').value.split(',')
    otherGenres = otherGenres.map(genre => genre.trim())
    genres = genres.concat(otherGenres)
  }

  return genres
}


function lightStar(starNumber, target){
  target.forEach(button => {
    if(button.value <= starNumber) {
      button.children[0].classList.add('fas')
    } else {
      button.children[0].classList.remove('fas')
    }
  })
  
}

function getAllBooks() {
  bookList = []
  fetch( '/results', {
    method:'GET'
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    data.forEach(book => {
      bookList.push(book)
    })
    const list = document.querySelector('#book-list')
    list.innerHTML = ''
    display(data)
  })
}

function display(books) {
  books.forEach(book => {
    const list = document.querySelector('#book-list')
    const row = document.createElement('tr')
    const starClass = `star-btn-${book.isbn}`
      
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td contenteditable='false'>${book.isbn}</td>
    <td>
      <span id="rating-table">
        <button class=${starClass} value="1"><i class="far fa-star" ></i><span class="tooltip-text">didn't like it</span></button>
        <button class=${starClass} value="2"><i class="far fa-star" ></i><span class="tooltip-text">it was okay</span></button>
        <button class=${starClass} value="3"><i class="far fa-star" ></i><span class="tooltip-text">liked it</span></button>
        <button class=${starClass} value="4"><i class="far fa-star" ></i><span class="tooltip-text">really liked it</span></button>
        <button class=${starClass} value="5"><i class="far fa-star" ></i><span class="tooltip-text">it was amazing</span></button>
      </span>
    </td>
    <td value=${book.progress}>${book.progress}</td>
    <td><button class="edit" name=${book.isbn}><i class="far fa-edit"></i></button> <button class="delete" name=${book.isbn}><i class="fas fa-trash-alt"></i></button></td>
  `
    row.setAttribute('contenteditable', false)
    list.appendChild(row)
    const starBtn = document.querySelectorAll(`.${starClass}`)
    lightStar(book.star, starBtn)
  })
}

document.body.addEventListener( 'click', function ( event ) {
  const targetISBN = event.path[1].name

  if(event.path[1].className === 'delete') {
    handleDelete(targetISBN) /** button.delete.name = book.isbn */
  }

  else if(event.path[1].className === 'edit') {
    const targetProgress = event.path[3].children[4].value
    const progressInput = `
    <span value=${targetProgress}>
      <input type='text' name="current-page" class='current-page' value="">
      /
      <input type='text' name="overall-page" class='overall-page' value="">
    </span>
    `
    const discardOrConfirm = `<button class="discard" name=${targetISBN}><i class="far fa-times-circle"></i></button> <button class="confirm" name=${targetISBN}><i class="far fa-check-circle"></i></button>`
    
    event.path[3].setAttribute('contenteditable', true)
    event.path[3].children[4].innerHTML = progressInput
    event.path[3].children[5].innerHTML = discardOrConfirm
  }

  else if(event.path[1].className === 'discard') {
    location.reload();
  }

  else if(event.path[1].className === 'confirm') { /** save changes */
    const targetRow = event.path[3]
    const title = targetRow.children[0].innerHTML
    const author = targetRow.children[1].innerHTML
    const isbn = targetRow.children[2].innerHTML

    const currentPage = targetRow.children[4].children[0].children[0].value
    const overallPage = targetRow.children[4].children[0].children[1].value

    const book = {
      title,
      author,
      isbn,
      currentPage,
      overallPage
    }

    handleEdit(book)
  }

})

function handleDelete(bookISBN) {
  const book = bookList.filter(book => book.isbn === bookISBN)
  const body = JSON.stringify(book)
  fetch('/delete', {
    method: 'POST',
    body
  })
  .then(function (response) {
    console.log(response)
    location.reload();
  })
 
}

function handleEdit(newBook) {
  const book = bookList.filter(book => book.isbn === newBook.isbn)
  newBook.genres = book.genres
  newBook.star = book.star
  newBook.createdAt = book.createdAt
  const body = JSON.stringify(newBook)
  fetch('/edit', {
    method: 'POST',
    body
  })
  .then(function(response) {
    location.reload()
  })

}