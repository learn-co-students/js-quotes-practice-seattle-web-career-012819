// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded", () => {
    const ul= document.getElementById("quote-list")
    const form = document.getElementById('new-quote-form')
    form.addEventListener('submit', addNewQuote)

  function getQuotes(){
    fetch('http://localhost:3000/quotes')
    .then(response => response.json())
    .then(json => {
      const ALLQUOTES = json
      json.forEach((quote) => {
      createQuoteBlock(quote)
      })
    })
  }

function createQuoteBlock(data){
  const li = document.createElement('li')
    li.classList.add("quote-card")
  const blockQuote = document.createElement('blockquote')
    blockQuote.classList.add("blockquote")
  const paragraph = document.createElement('p')
    paragraph.classList.add('mb-0')
    paragraph.textContent = data.quote
  const footer = document.createElement('footer')
    footer.classList.add('blockquote-footer')
    footer.textContent = data.author
  const br = document.createElement('br')
  const successBtn = document.createElement('button')
    successBtn.classList.add('btn-success')
    successBtn.textContent = `Likes: ${data.likes}`
  const dangerBtn = document.createElement('button')
    dangerBtn.classList.add('btn-danger')
    dangerBtn.textContent = "Delete"

  blockQuote.appendChild(paragraph)
  blockQuote.appendChild(footer)
  blockQuote.appendChild(br)
  blockQuote.appendChild(successBtn)
  blockQuote.appendChild(dangerBtn)

  dangerBtn.addEventListener('click', deleteQuote)
  li.appendChild(blockQuote)
  ul.appendChild(li)
}

function addNewQuote(e){
  e.preventDefault();
  const quoteInput = document.getElementById('new-quote')
  const authorInput = document.getElementById('author')
   let newQuote = {
    "quote": `${quoteInput.value}`,
    "likes": 1,
    "author": `${authorInput.value}`
  }
  fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newQuote)
    }).then(response => response.json())
    .then(json => createQuoteBlock(json))
  }// end of addNewQuote function

  function deleteQuote(e){
    let quote = e.target.parentNode.parentNode
    quote.parentNode.removeChild(quote);
  }



  getQuotes();
})// end of dom content loaded event listener
