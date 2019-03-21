// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

window.addEventListener('DOMContentLoaded', function () {});
console.log('hey bitchhh')


fetch('http://localhost:3000/quotes')
  .then(response => response.json())
  .then(json => {
    addQuotesToCards(json)
  })

//build the quote cards
function buildQuoteCard(string){
  const quoteList = document.getElementById('quote-list')
  const li = document.createElement('li')
  li.class = 'quote-card'

  const blockquote = document.createElement('blockquote')
  blockquote.class = 'blockquote'

  const p = document.createElement('p')
  p.class = 'mb-0'
  p.textContent = string.quote

  const footer = document.createElement('footer')
  footer.class = 'blockquote-footer'
  footer.textContent = string.author

  const br = document.createElement('br')
  const likeButton = document.createElement('button')
  likeButton.class = 'btn-success'
  likeButton.textContent = 'Like Quote'
  likeButton.id = string.id
  likeButton.addEventListener('click', function (event) {
    const newLikes = string.likes + 1 
    event.srcElement.nextSibling.textContent = 'Likes:' + newLikes
    likeQuote(event, string.likes)
      // let newLikes = json
      // console.log(newLikes)

  })

  const span = document.createElement('span')
  span.textContent = 'Likes:' + string.likes

  const deleteButton = document.createElement('button')
  deleteButton.class = 'btn-danger'
  deleteButton.id = string.id
  deleteButton.textContent = 'Delete Quote'
  deleteButton.addEventListener('click', function (event) {
    li.remove();
    deleteQuote(event)

  })

  quoteList.appendChild(li)
  li.appendChild(blockquote)
  blockquote.appendChild(p)
  blockquote.appendChild(footer)

  blockquote.appendChild(br)
  blockquote.appendChild(likeButton)

  blockquote.appendChild(br)
  blockquote.appendChild(span)

  blockquote.appendChild(br)
  blockquote.appendChild(deleteButton)

}

//add quotes to cards

function addQuotesToCards(quotes){
  quotes.forEach((quote) => {
    buildQuoteCard(quote)
  })
}

//new quote form input
  const form = document.getElementById('new-quote-form')

  // const newQuote = document.getElementById('new-quote').value
  // const newQuoteAuthor = document.getElementById('author').value

  form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    const newQuote = ev.target[0].value
    const newQuoteAuthor = ev.target[1].value
    postQuote(newQuote, newQuoteAuthor)
    .then(response  => response.json())
    .then(quote => {
      buildQuoteCard(quote)
    });
    //post a new quote to db
  });

function postQuote(quote, author) {
  const newQuote = {
    id: null,
    quote: quote,
    author: author,
    likes: '0'
  }

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newQuote)
  }
  return fetch('http://localhost:3000/quotes', config)
}

//delete quote

function deleteQuote(event) {
  let targetId = event.srcElement.id
  fetch(`http://localhost:3000/quotes/${targetId}`, {method: 'DELETE'});
}


//like quote

function likeQuote(id, likes) {
  const targetId = id.srcElement.id
  const likeQuote = {
    likes: likes +1
  }
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(likeQuote)
  }
  return fetch(`http://localhost:3000/quotes/${targetId}`, config)
}
