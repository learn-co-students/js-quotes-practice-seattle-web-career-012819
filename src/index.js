// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

document.addEventListener('DOMContentLoaded', function() {getQuotes()})

const quotesUrl = 'http://localhost:3000/quotes'

function getQuotes() {
  fetch(quotesUrl)
  .then(response => response.json())
  .then(json => {
    json.forEach((quote => {
      createNewQuoteLi(quote)
    }))
  })
}

function postNewQuote(newQuote, newAuthor) {
  let data = {'quote': newQuote, 'author': newAuthor, 'likes': 0}
  fetch(quotesUrl, {
    method: 'POST',
    headers: {
      "Content-Type":'application/json'
    },
    body: JSON.stringify(data)
  })
}

function patchNewLike(quote, likeIncrement) {
  let data = {'likes': likeIncrement}
  fetch(quotesUrl + `/${quote.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data)
  })
}

function deleteQuote(quote) {
  fetch(quotesUrl + `/${quote.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

let newQuoteBtn = document.getElementById('new-quote-form')
newQuoteBtn.addEventListener('submit', function() {
  newQuoteHandler();
})

function createNewQuoteLi(quote) {

  let ul = document.getElementById('quote-list')
  let li = document.createElement('li')
  let blockquote = document.createElement('blockquote')
  blockquote.className = 'blockquote'
  let p = document.createElement('p')
  p.className = 'mb-0'
  p.textContent = quote.quote
  let footer = document.createElement('footer')
  footer.className = 'blockquote-footer'
  footer.textContent = quote.author
  let br = document.createElement('br')
  let btnSuccess = document.createElement('button')
  btnSuccess.className = 'btn-success'
  btnSuccess.textContent = 'Likes: ' + quote.likes
  btnSuccess.addEventListener('click', function() {
    let likeIncrement = (quote.likes + 1)
    patchNewLike(quote, likeIncrement)
    btnSuccess.textContent = 'Likes: '+ likeIncrement
  })

  let btnDanger = document.createElement('button')
  btnDanger.className = 'btn-danger'
  btnDanger.textContent = 'Delete'
  btnDanger.addEventListener('click', function() {
    ul.removeChild(li);
    deleteQuote(quote)
  })

  blockquote.appendChild(p)
  blockquote.appendChild(footer)
  blockquote.appendChild(br)
  blockquote.appendChild(btnSuccess)
  blockquote.appendChild(btnDanger)
  li.appendChild(blockquote)
  ul.appendChild(li)
}

function newQuoteHandler(){
  let newQuote = document.getElementById("new-quote").value
  let newAuthor = document.getElementById("author").value
  postNewQuote(newQuote, newAuthor)
}
