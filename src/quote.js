class Quote {
  constructor(id, quote, likes, author, quotesParent) {
    this.id = id;
    this.quote = quote;
    this.likes = likes;
    this.author = author;
    this.quotesParent = quotesParent
  }

  render() {
  // Container:
  // <ul id="quote-list">

  // Quote:
  // <li class='quote-card'>
  //     <blockquote class="blockquote">
  //       <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  //       <footer class="blockquote-footer">Someone famous</footer>
  //       <br>
  //       <button class='btn-success'>Likes: <span>0</span></button>
  //       <button class='btn-danger'>Delete</button>
  //     </blockquote>
  // </li>

    const docFrag = new DocumentFragment();

    const li = document.createElement('li');
    li.className = 'quote-card';
    li.id = `quote-id-${this.id}`;

    const blockquote = document.createElement('blockquote');
    blockquote.className = 'blockquote';

    const quote = document.createElement('p');
    quote.className = "mb-0";
    quote.textContent = this.quote;

    const author = document.createElement('footer');
    author.className = "blockquote-footer";
    author.textContent = this.author;

    const lineBreak = document.createElement('br');

    const likeButton = document.createElement('button');
    likeButton.className = 'btn-success';
    likeButton.textContent = 'Likes: '

    const numberOfLikes = document.createElement('span');
    numberOfLikes.textContent = this.likes;
    likeButton.appendChild(numberOfLikes);
    likeButton.addEventListener('click', this.likeQuote.bind(this));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn-danger';
    deleteButton.textContent = 'Delete'; 
    deleteButton.addEventListener('click', this.deleteQuote.bind(this));
    
    blockquote.appendChild(quote);
    blockquote.appendChild(author);
    blockquote.appendChild(lineBreak);
    blockquote.appendChild(likeButton);
    blockquote.appendChild(deleteButton);
    li.appendChild(blockquote);
    
    docFrag.appendChild(li);
    
    return docFrag;
  }

  async likeQuote(event) {
    this.likes++;
    await QuotesRoutes.patchQuote(this);
    event.target.childNodes[1].textContent = this.likes;
  }

  async deleteQuote(event) {
    await QuotesRoutes.deleteQuote(this);
    this.quotesParent.renderApp();
  }
}