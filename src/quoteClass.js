class Quote {
  constructor(quoteJson) {
    this.id = quoteJson.id;
    this.quote = quoteJson.quote;
    this.likes = quoteJson.likes;
    this.author = quoteJson.author;
    Quote.all.push(this);
  }

  quoteRender() {

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


    function likeQuote(ev) {

    }

    const likeButton = document.createElement('button');
    likeButton.className = 'btn-success';
    likeButton.textContent = 'Likes: '
    likeButton.id = `${this.id}`;


    const numberOfLikes = document.createElement('span');
    numberOfLikes.textContent = this.likes;
    likeButton.appendChild(numberOfLikes);

    function deleteQuote() {
    li.parentNode.removeChild(li);}


    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn-danger';
    deleteButton.textContent = 'Delete';
    deleteButton.id = `btn-danger-${this.id}`;
    deleteButton.addEventListener('click', (ev) => {
       deleteQuote(ev)});

    blockquote.appendChild(quote);
    blockquote.appendChild(author);
    blockquote.appendChild(lineBreak);
    blockquote.appendChild(likeButton);
    blockquote.appendChild(deleteButton);
    li.appendChild(blockquote);


    return li;

//     document.createElement("li")
//     return `
//     <li class='quote-card'>
//   <blockquote class="blockquote">
//     <p class="mb-0">${this.quote}</p>
//     <footer class="blockquote-footer">${this.author}</footer>
//     <br>
//     <button class='btn-success'>Likes: <span>${this.likes}</span></button>
//     <button class='btn-danger'>Delete</button>
//   </blockquote>
// </li>`;
  }
}
Quote.all = []
