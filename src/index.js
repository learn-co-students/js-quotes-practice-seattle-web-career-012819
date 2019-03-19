// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.
document.addEventListener('DOMContentLoaded', () => {
  getQuotes();
  handleNewQuote();
})

const quotesURL = "http://localhost:3000/quotes";

function getQuotes() {
  fetch(quotesURL)
  .then((results) => {
    return results.json();
  })
  .then((json) => {
    createQuotes(json);
  })
}

function createQuotes(data) {
  createQuoteContent(data);
}

function addQuote() {
  const newQuote = document.getElementById('new-quote').value;
  const newAuthor = document.getElementById('author').value;
  const body = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "quote": `${newQuote}`,
      "likes": 0,
      "author": `${newAuthor}`
    })
  };

  fetch(quotesURL, body)
  .then(results => {
    return results.json()
  })
  .then(json => {
    createQuotes([json]);
  })
}

function likeQuote(quote) {
  const button = document.getElementById(`${quote.id}`);
  const body = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": `${quote.likes++}`
    })
  }
  
  fetch(quotesURL + `/${quote.id}`, body)
  .then(results => {
    return results.json();
  })
  .then(json => {
    button.textContent = (`Likes: ${json.likes}`)
  })
}

function deleteQuote(quote) {
  const ul = document.getElementById('quote-list');
  const li = document.getElementById(`li-${quote.id}`);
  ul.removeChild(li);

  fetch(quotesURL + `/${quote.id}`, {method: 'DELETE'})
}

function createQuoteContent(data) {
  const ul = document.getElementById('quote-list');
  data.forEach((quote) => {
    //Create Elements
    const li = document.createElement('li');
    li.setAttribute('class', 'blockquote');
    li.setAttribute('id', `li-${quote.id}`)
    const blockquote = document.createElement('blockquote');
    const p = document.createElement('p');
    p.setAttribute('class', 'mb-0');
    p.textContent = quote.quote;
    const footer = document.createElement('footer');
    footer.setAttribute('class', 'blockquote-footer');
    footer.textContent = quote.author;
    const br = document.createElement('br');
    const likeButton = document.createElement('button');
    likeButton.setAttribute('class', 'btn-success');
    likeButton.setAttribute('id', quote.id);
    likeButton.textContent = "Likes: "
    const span = document.createElement('span');
    span.textContent = quote.likes;
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn-danger');
    deleteButton.textContent = 'Delete';

    //Append Elements
    ul.appendChild(li);
    li.appendChild(blockquote);
    blockquote.appendChild(p);
    blockquote.appendChild(footer);
    blockquote.appendChild(br);
    blockquote.appendChild(likeButton);
    likeButton.appendChild(span);
    blockquote.appendChild(deleteButton);

    //Create Event Listeners
    likeButton.addEventListener('click', () => {
      likeQuote(quote);
    })

    deleteButton.addEventListener('click', () => {
      deleteQuote(quote);
    });
  });
}

function handleNewQuote() {
  const form = document.getElementById('new-quote-form');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    addQuote();
  });
}

