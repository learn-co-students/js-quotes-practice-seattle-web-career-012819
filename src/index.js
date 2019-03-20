// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const newQuoteForm = document.getElementById("new-quote-form")
let likeBtns = document.getElementsByClassName("btn-success");

document.addEventListener('DOMContentLoaded', () =>{
  const quoteList = document.getElementById("quote-list");
  const quoteDiv = document.createElement("div")

  fetch("http://localhost:3000/quotes")
    .then(res => {return res.json()})
    .then((quoteJson) => {
      quoteJson.forEach((quote) => {
        let quoteboy = new Quote(quote);
        let quoteVar = quoteboy.quoteRender();
        quoteList.appendChild(quoteVar)
    })
  })

  newQuoteForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const quoteInput = document.getElementById("new-quote").value
    const authorInput = document.getElementById("author").value
    fetch("http://localhost:3000/quotes", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quote: quoteInput,
        author: authorInput,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(quoteJson => {
      const newQuote = new Quote(quoteJson)
      quoteList.appendChild(newQuote.quoteRender())
    })
    event.target.reset()
  })

  arr = Array.from(likeBtns);

  arr.forEach((elt) => {elt.addEventListener("click", (ev) => {
    let foundQuote = Quote.all.find(x => x.id == 'elt.id');
    console.log(foundQuote)
    foundQuote.likes += 1;

    boll
  })
})



  // likeButton.addEventListener('click', () => {
  //   quote.likes++;
  //   fetch(QUOTES + `/${quote.id}`, {
  //     method: 'PATCH',
  //     headers: {'Content-Type': 'application/json', Accept: 'application/json'},
  //     body: JSON.stringify(quote)
  //   })
  //     span.textContent = quote.likes
  // })




});
