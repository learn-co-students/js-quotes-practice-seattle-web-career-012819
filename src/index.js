// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const QUOTES = "http://localhost:3000/quotes"
document.addEventListener("DOMContentLoaded", main());

function main() {
  fetch(QUOTES)
    .then(response => response.json())
    .then(json => {
      json.forEach((quote) => {
        createQuoteCard(quote)
      })
    })
}

const form = document.getElementById('new-quote-form')
form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  let newQuote = {
    quote: form[0].value,
    author: form[1].value,
    likes: 0
  }
  fetch(QUOTES, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify(newQuote)
  })
  .then(response => response.json())
  .then(quote => createQuoteCard(quote))
})

function createQuoteCard(quote) {
  const ul = document.getElementById('quote-list')
  const li = document.createElement('li')
  const blockquote = document.createElement('blockquote')
  const p = document.createElement('p')
  const footer = document.createElement('footer')
  const br = document.createElement('br')
  const likeButton = document.createElement('button')
  const deleteButton = document.createElement('button')
  const editButton = document.createElement('button')
  const span = document.createElement('span')
  li.className = "quote-card"
  blockquote.className = "blockquote"
  p.className = "mb-0"
  p.textContent = quote.quote
  footer.className = "blockquote-footer"
  footer.textContent = quote.author
  likeButton.className = "btn-success"
  likeButton.textContent = "Likes: "
  likeButton.addEventListener('click', () => {
    quote.likes++;
    fetch(QUOTES + `/${quote.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify(quote)
    })
      span.textContent = quote.likes
  })
  span.textContent = quote.likes
  deleteButton.className = "btn-danger"
  deleteButton.textContent = "Delete"
  deleteButton.addEventListener('click', () => {
    li.remove()
    fetch(QUOTES + `/${quote.id}`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: quote.id})
    })
  })
  editButton.className = "btn-info"
  editButton.textContent = "Edit"
  li.appendChild(blockquote)
  li.appendChild(p)
  li.appendChild(footer)
  li.appendChild(br)
  li.appendChild(likeButton)
  likeButton.appendChild(span)
  li.appendChild(deleteButton)
  li.appendChild(editButton)
  ul.appendChild(li)
}
