class QuotesRoutes {

  static getQuotes() {
    return fetch('http://localhost:3000/quotes')
      .then(request => request.json());
  }

  static async postQuote(quote) {
    const strippedQuoteNoID = {
      quote: quote.quote,
      likes: quote.likes,
      author: quote.author
    };

    const init = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(strippedQuoteNoID)
    };
    
    return await fetch(`http://localhost:3000/quotes`, init)
  }

  static async patchQuote(quote) {
    const strippedQuote = {
      id: quote.id,
      quote: quote.quote,
      likes: quote.likes,
      author: quote.author
    };
    console.log(quote);
    const init = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(strippedQuote)
    };
    
    return await fetch(`http://localhost:3000/quotes/${quote.id}`, init)
  }

  static async deleteQuote(quote) {
    const init = { method: 'DELETE' };
    
    return await fetch(`http://localhost:3000/quotes/${quote.id}`, init)
  }
}