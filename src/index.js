const ul = document.getElementById("quote-list");

const authorTextBox = document.getElementById("author");
const quoteTextBox = document.getElementById("new-quote");
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    addQuote(authorTextBox.value, quoteTextBox.value);
})

function populateQuotes(){
    getQuotesJson().then((json) => {
        for (var quote of json) {
            ul.appendChild(makeQuoteCard(quote));
        }
    })
}

async function getQuotesJson() {
    var response = await fetch("http://localhost:3000/quotes")
    var json =  response.json();
    return json;
}

function makeQuoteCard(quote) {
    var text = quote.quote;
    var author = quote.author;
    var likes = quote.likes;

    var li = document.createElement("li");
    var p = document.createElement("p");
    var blockquote = document.createElement("blockquote");
    var footer = document.createElement("footer");
    var br = document.createElement("br");
    var likeBtn = document.createElement("button");
    var span = document.createElement("span");
    var deleteBtn = document.createElement("button");

    li.className = "quote-card";
    blockquote.className = "blockquote";
    p.className = "mb-0";
    footer.className = "blockquote-footer";
    likeBtn.className = "btn-success";
    deleteBtn.className = "btn-danger";

    p.textContent = text;
    footer.textContent = author;

    span.textContent = likes;
    likeBtn.textContent = "Likes: ";
    deleteBtn.textContent = "Delete";

    likeBtn.addEventListener("click", (ev) => {
        likes = addLike(span, likes);

        var data = {"likes": likes}

        fetch(`http://localhost:3000/quotes/${quote.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        })
    })

    deleteBtn.addEventListener("click", (ev) => {
        // deleteFromDatabase(quote.id);
        ul.removeChild(ev.target.parentNode.parentNode);
    })

    li.appendChild(blockquote);
    blockquote.appendChild(p);
    blockquote.appendChild(footer);
    blockquote.appendChild(br);
    blockquote.appendChild(likeBtn);
    likeBtn.appendChild(span);
    blockquote.appendChild(deleteBtn);

    return li;
}

function addLike(span, likes) {
    likes++
    span.textContent = likes;
    return likes
}

function addQuote(author, quote) {
    var data = {
        "author": author,
        "quote": quote,
        "likes": 0
    }

    fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
        ul.appendChild(makeQuoteCard(json));
    })
}


//##########################################################
//End of helper functions
populateQuotes();