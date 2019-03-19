document.addEventListener('DOMContentLoaded', function() {
	console.log('refreshed');
});

QUOTES = 'http://localhost:3000/quotes';

function getQuotes() {
	fetch(QUOTES)
		.then(function(response) {
			return response.json();
		})
		.then(function(quotes) {
			for (quote of quotes) {
				buildQuoteDisplay(quote);
			}
		});
}

function buildQuoteDisplay(quote) {
	//create quote elements in dom

	//li
	let li = document.createElement('li');
	li.classList = 'quote-card';
	//blockquote
	let blockQuote = document.createElement('blockquote');
	blockQuote.classList = 'blockquote';
	//paragraph
	let paragraph = document.createElement('p');
	paragraph.classList = 'mb-0';
	paragraph.textContent = quote.quote;
	//footer
	let footer = document.createElement('footer');
	footer.classList = 'blockquote-footer';
	footer.textContent = quote.author;
	//br
	let br = document.createElement('br');
	//like button
	let likeButton = document.createElement('button');
	likeButton.classList = 'btn-success';
	likeButton.textContent = 'Likes:';
	likeButton.addEventListener('click', function() {
		quote.likes++;
		likeQuote(quote, span);
	});

	//span
	let span = document.createElement('span');
	span.textContent = quote.likes;
	//delete button
	let deleteButton = document.createElement('button');
	deleteButton.classList = 'btn-danger';
	deleteButton.textContent = 'Delete';
	deleteButton.addEventListener('click', function() {
		li.remove();
		deleteQuote(quote);
	});

	//target quote list ul from dom
	let quoteList = document.getElementById('quote-list');

	//append elements to blockquote
	blockQuote.appendChild(paragraph);
	blockQuote.appendChild(footer);
	blockQuote.appendChild(br);
	likeButton.appendChild(span);
	blockQuote.appendChild(likeButton);
	blockQuote.appendChild(deleteButton);

	//append all to li
	li.appendChild(blockQuote);
	quoteList.appendChild(li);
}

function newQuote() {
	let form = document.getElementById('new-quote-form');

	form.addEventListener('submit', function(event) {
		event.preventDefault();
		let newQuote = document.getElementById('new-quote').value;
		let author = document.getElementById('author').value;
		fetch(QUOTES, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				quote: newQuote,
				likes: 0,
				author: author
			})
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(quote) {
				buildQuoteDisplay(quote);
			});
	});
}

function likeQuote(quote, span) {
	fetch(QUOTES + '/' + `${quote.id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id: quote.id,
			quote: quote.quote,
			likes: quote.likes + 1,
			author: quote.author
		})
	})
		.then(function(response) {
			return response.json();
		})
		.then(function(quote) {
			span.textContent = quote['likes'];
		});
}

function deleteQuote(quote) {
	fetch(QUOTES + '/' + `${quote.id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id: quote.id,
			quote: quote.quote,
			likes: quote.likes,
			author: quote.author
		})
	});
}

getQuotes();
newQuote();
