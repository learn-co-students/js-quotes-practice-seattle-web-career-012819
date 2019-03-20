function editButtonToggle(quoteObj, authorElement, textElement){
  let editing = false;
  return function(event){
    editing = !editing;
    if (editing){ //just hit edit
      this.innerText = "Save";
      this.className = "btn-primary";
      authorElement.contentEditable = true;
      textElement.contentEditable = true;
    }else{
      this.innerText = "Edit";
      this.className = "brn-warning";
      authorElement.contentEditable = false;
      textElement.contentEditable = false;
      quoteObj.author = authorElement.innerText;
      quoteObj.quote = textElement.innerText;
      quoteObj.fetchUpdate();
    }
  }
}
//Classes

class Quote {
  constructor(quote,author,likes,id) {
    this.quote = quote;
    this.author = author;
    this.likes = likes;
    this.id = id;
  }

  renderOnto(list){
    // console.log('rendering quote')
    //all elements in a quote card
    let quoteCard = document.createElement('li');
    let blockQuote = document.createElement('blockquote');
    let text = document.createElement('p');
    let author = document.createElement('footer');
    let likeButton = document.createElement('button');
    let likes = document.createElement('span')
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');

    //editButton
    editButton.innerText = "Edit";
    editButton.className = "btn-warning";
    editButton.addEventListener('click', editButtonToggle(this, author, text));

    //delete button
    deleteButton.innerText = "Delete";
    deleteButton.classList.add('btn-danger');
    deleteButton.addEventListener('click',()=>{
      quoteCard.remove();
      console.log(`deleting ${this.quote}`)
      this.fetchDelete();
    });

    //like button
    likes.innerText = this.likes;
    likeButton.innerText = "Likes: ";
    likeButton.appendChild(likes);
    likeButton.classList.add('btn-success')
    likeButton.addEventListener('click',()=>{
      this.likes++;
      likes.innerText = this.likes;
      this.fetchUpdate();
    });

    //author
    author.innerText = this.author;
    author.classList.add('blockquote-footer');

    //quote text
    text.innerText = this.quote;
    text.classList.add('mb-0')

    //append all to blockQuote
    blockQuote.classList.add('blockquote');
    blockQuote.appendChild(text);
    blockQuote.appendChild(author);
    blockQuote.appendChild(likeButton);
    blockQuote.appendChild(deleteButton);
    blockQuote.appendChild(editButton);

    //append blockQuote to li (quoteCard)
    quoteCard.appendChild(blockQuote);
    quoteCard.classList.add('quote-card');

    //append li to ul
    list.appendChild(quoteCard);
  }

  get simpleObjectForm(){
    return {
       quote: this.quote,
       author: this.author,
       likes: this.likes,
       id: this.id
    }
  }

  fetchUpdate(){
    fetch(`http://localhost:3000/quotes/${this.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.simpleObjectForm)
    })
  }

  fetchDelete(id){
    fetch(`http://localhost:3000/quotes/${this.id}`, {method: 'DELETE'});
  }

  static inflate(simpleQuoteObj){
    return new Quote(simpleQuoteObj.quote,simpleQuoteObj.author,simpleQuoteObj.likes,simpleQuoteObj.id);
  }
}

class QuoteList {
  constructor(ul){
    this.ul = ul;
    this.quotes = new Array();
  }

  get sortedQuotes(){
    return this.quotes.slice().sort(((a,b) => (a.author > b.author) ? 1 : ((b.author > a.author) ? -1 : 0)))
  }

  addQuote(quoteObj){
    this.quotes.push(quoteObj);
    quoteObj.renderOnto(this.ul);
  }

  postNew(quote,author) {
    fetch("http://localhost:3000/quotes", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({quote: quote, author: author, likes: 0})
    })
    .then(response => {
      if (!response.ok){
        throw "Quote not persisted (probably because it already exists)"
      }else{
        return response.json()
      }
    })
    .then(json => {
      console.log('new quote response:', json)
      this.addQuote(Quote.inflate(json));
    });
  }

  render(){
    while (this.ul.firstChild) {
      console.log('removing',this.ul.firstChild)
      this.ul.removeChild(this.ul.firstChild);
      this.ul.firstChild.remove()
    }
    this.quotes.forEach((quote)=>{
      quote.renderOnto(this.ul);
    })
  }

  renderSorted(){
    while (this.ul.firstChild) {
      console.log('removing',this.ul.firstChild)
      this.ul.removeChild(this.ul.firstChild);
    }
    this.sortedQuotes.forEach((quote)=>{
      quote.renderOnto(this.ul);
    })
  }
}


const quoteList = new QuoteList(document.getElementById('quote-list'));
const quoteForm = document.getElementById('new-quote-form');
const sortButton = document.getElementById('render-sort');
window.addEventListener('DOMContentLoaded', getQuotes);

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const quote = document.getElementById('new-quote').value
  const author = document.getElementById('author').value
  quoteList.postNew(quote,author);
});

sortButton.addEventListener('click', (function(){
  let sorted = false;
  return function(ev){
    if (sorted){
      this.innerText = "Sort by Author Name";
      quoteList.render();
    }else{
      this.innerText = "Un-Sort";
      quoteList.renderSorted();
    }
    sorted = !sorted;
  }
})());

//fetchers

function getQuotes() {
  fetch("http://localhost:3000/quotes")
  .then(result => {
    return result.json();
  })
  .then(json => {
    json.forEach((simpleQuoteObj) => {
       quoteList.addQuote(Quote.inflate(simpleQuoteObj));
    });
  });
}
