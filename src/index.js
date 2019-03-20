// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const quoteUrl ="http://localhost:3000/quotes";

fetch(quoteUrl)
.then(response => response.json())
.then(json =>{
  json.forEach(quote =>{
    createQuote(quote);
  })
})

const quoteUl = document.getElementById("quote-list");

function createQuote(quote){
  const quoteLi = document.createElement("li");
  quoteLi.classList.add('quote-card');

  const quoteBlock = document.createElement("blockquote");
  quoteBlock.classList.add('blockquote');

  const quoteParagraph = document.createElement("p");
  quoteParagraph.classList.add('mb-0');

  const author = document.createElement("footer");

  const quoteSpan = document.createElement("span");

  const likeQuote = document.createElement("button");
  likeQuote.classList.add('btn-success');
  likeQuote.textContent = `Likes:${quote.likes}`;
  likeQuote.addEventListener('click', ()=>{
    quote.likes ++;
    fetch(quoteUrl + `/${quote.id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({likes: quote.likes})
    })
    .then(response => response.json())
    .then(quoteLike =>{
      likeQuote.textContent = `Likes:${quoteLike.likes}`;
    })

  })

  const deleteQuote = document.createElement("button");
  deleteQuote.classList.add('btn-danger');
  deleteQuote.textContent = "Delete!";
  deleteQuote.addEventListener('click', ()=>{
    quoteLi.remove();
    fetch(quoteUrl + `/${quote.id}`,{
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: quote.id})
    })
  })
  //const quoteUl = document.getElementById("quote-list");
  quoteParagraph.textContent = quote.quote;
  author.textContent = quote.author;
  quoteParagraph.appendChild(quoteBlock);
  quoteLi.appendChild(quoteParagraph);
  quoteLi.appendChild(author);
  quoteLi.appendChild(likeQuote);
  quoteLi.appendChild(deleteQuote);
  quoteUl.appendChild(quoteLi);
}

const quoteForm = document.getElementById("new-quote-form");
quoteForm.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const createPost = document.getElementById("new-quote");
  const createAuthor = document.getElementById("author");
  let newForm = {"quote": createPost.value, "author": createAuthor.value, "likes": 0};
  fetch(quoteUrl,{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(newForm)
  })
  .then(response => response.json())
  .then(quote =>{
    createQuote(quote)
  })
})
