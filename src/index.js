// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const URL = "http://localhost:3000/quotes"

fetch(URL)
.then(resp => resp.json())
.then(json => {
  loadQuoteCards(json)
})

const quoteList = document.getElementById('quote-list')

function loadQuoteCards(json) {
  for (let i = 0; i < json.length; i++){
    createQuote(json[i])
  }
}

function createQuote(quote){
  let li = document.createElement('li')
  li.classList.add("quote-card")
  li.setAttribute("id", quote.id)
  let blockquote = document.createElement('blockquote')
  blockquote.classList.add("blockquote")
  let p = document.createElement("p")
  p.classList.add("mb-0")
  p.innerText = quote.quote
  let footer = document.createElement("footer")
  footer.classList.add("blockquote-footer")
  footer.innerText = quote.author
  let br = document.createElement("br")
  let likeButton = document.createElement("button")
  likeButton.classList.add("btn-success")
  likeButton.innerText = "Likes: "
  let span = document.createElement("span")
  span.innerText = quote.likes
  let deleteButton = document.createElement("button")
  deleteButton.classList.add("btn-danger")
  deleteButton.innerText = "Delete"
  li.appendChild(blockquote)
  blockquote.appendChild(p)
  blockquote.appendChild(footer)
  blockquote.appendChild(br)
  blockquote.appendChild(likeButton)
  likeButton.appendChild(span)
  blockquote.appendChild(deleteButton)
  quoteList.appendChild(li)
  likeButtonAttachListeners(likeButton, span, li)
  deleteButtonAttachListeners(deleteButton, li)
}

function likeButtonAttachListeners(likeButton, span, li) {
  likeButton.addEventListener("click", ()=>{
    let likes = parseInt(span.innerText) + 1
    let id = li.getAttribute("id")
    let likeObject = {}
    likeObject.likes = likes
    fetch(URL+ `/${id}`, {
      method: "PATCH",
      headers:{ "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(likeObject)
    })
    .then(resp => resp.json())
    .then(json => span.innerText = json.likes)
  })
}

function deleteButtonAttachListeners(deleteButton, li) {
  deleteButton.addEventListener("click", ()=> {
    let id = li.getAttribute("id")
    fetch(URL+ `/${id}`, {
      method: "DELETE",
      headers:{ "Content-Type": "application/json", Accept: "application/json" }
    })
    .then(
      li.remove()
    )
  })
}

let newQuoteForm = document.getElementById("new-quote-form")
let newQuoteText = document.getElementById("new-quote")
let newQuoteAuthor = document.getElementById("author")
newQuoteForm.addEventListener("submit", (ev) => {
  ev.preventDefault()
  let newQuote = {}
  newQuote.quote = newQuoteText.value
  newQuote.author = newQuoteAuthor.value
  newQuote.likes = 0
  fetch(URL, {
    method: "POST",
    headers:{ "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(newQuote)
  })
  .then(resp => resp.json())
  .then(json => {
    createQuote(json)
  })
})
