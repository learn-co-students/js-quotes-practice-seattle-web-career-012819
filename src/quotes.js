class Quotes {
  constructor() {
    this.quotes = [];
  }

  async renderApp() {
    await this.getAllQUotes();
    
    const quotesContainer = document.getElementById("quote-list");
    while (quotesContainer.firstChild) quotesContainer.firstChild.remove();
  
    quotesContainer.appendChild(this.renderAllQuotes());
  
    return this;
  }

  async getAllQUotes() {
    const jsonQuotes = await QuotesRoutes.getQuotes();
    this.quotes = [];

    jsonQuotes.forEach(json => {
      const quote = new Quote(json.id,
                              json.quote,
                              json.likes,
                              json.author,
                              this)
      this.quotes.push(quote)
    });
  }

  renderAllQuotes() {
    const docFrag = new DocumentFragment;
    this.quotes.forEach(quote => {
      const quoteHTML = quote.render();
      docFrag.appendChild(quoteHTML);
    });
    
    return docFrag;
  }

  createNewQuote(event) {
    event.preventDefault();

    const quoteEl = document.getElementById("new-quote");
    const authorEl = document.getElementById("author");

    const quote = quoteEl.value;
    const author = authorEl.value;

    quoteEl.value = "";
    authorEl.value = "";

    const newQuote = new Quote(null, quote, 1, author, this);
    QuotesRoutes.postQuote(newQuote);
    
    const newQuoteCard = newQuote.render();
    
    const quotesContainer = document.getElementById("quote-list");
    quotesContainer.appendChild(newQuoteCard);
  }
}