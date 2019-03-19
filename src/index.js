window.addEventListener('load', main);

async function main() {
  let quotes = new Quotes();
  await quotes.renderApp()

  const newQuoteSubmitBtn = document.querySelector("#new-quote-form button");
  newQuoteSubmitBtn.addEventListener('click', quotes.createNewQuote.bind(quotes));
}