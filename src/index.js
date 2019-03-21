document.addEventListener('DOMContentLoaded', main);

const quoteListUl = document.getElementById('quote-list');

function main() {
	fetchQuotes();
}

function fetchQuotes() {
	fetch('http://localhost:3000/quotes')
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			renderQuotes(json);
		});
}

function renderQuotes(quoteJson) {
	quoteJson.forEach((quote) => {
		let li = buildQuote(quote);
		quoteListUl.appendChild(li);
	});
}

function buildQuote(quoteObj) {
	let li = buildHtmlElement('li', '', '', quoteObj.id);
	let blockQuote = buildHtmlElement('blockquote', 'blockquotes', '', '');
	let p = buildHtmlElement('p', 'mb-0', quoteObj.quote, '');
	let footer = buildHtmlElement('footer', 'blockquote-footer', quoteObj.author, '');
	let likeBtn = buildHtmlElement('button', 'btn-success', 'Likes: ', '');
	let deleteBtn = buildHtmlElement('button', 'btn-danger', 'Delete', '');
	let likeSpan = buildHtmlElement('span', '', quoteObj.likes, `${quoteObj.id} like`);

	deleteBtn.addEventListener('click', () => {
		deleteQuote(quoteObj);
	});

	likeBtn.addEventListener('click', () => {
		likeQuote(quoteObj);
	});

	likeBtn.appendChild(likeSpan);
	blockQuote.append(p, footer, likeBtn, deleteBtn);
	li.appendChild(blockQuote);
	return li;
}

function buildHtmlElement(tag = '', className = '', textContent = '', id = '') {
	let element = document.createElement(tag);
	element.className = className;
	element.textContent = textContent;
	element.id = id;
	return element;
}

function deleteQuote(quoteObj) {
	let li = document.getElementById(quoteObj.id);
	li.remove();
	deleteQuoteFromDb(quoteObj);
}

function likeQuote(quoteObj) {
	let span = document.getElementById(`${quoteObj.id} like`);
	let newLikes = parseInt(span.textContent) + 1;
	span.textContent = newLikes;
	IncrementLikeInDb(quoteObj, newLikes);
}

function deleteQuoteFromDb(quoteObj) {
	fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
		method: 'DELETE'
		// headers: { 'Content-Type': 'application/json' },
		// body: JSON.stringify(quoteObj)
	});
}

function IncrementLikeInDb(quoteObj, newLikes) {
	fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ likes: newLikes })
	});
}

// populate page with quotes using get request to
// http://localhost:3000/quotes

// each quote should have the following structure

// <li class='quote-card'>
//       <blockquote class="blockquote">
//         <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
//         <footer class="blockquote-footer">Someone famous</footer>
//         <br>
//         <button class='btn-success'>Likes: <span>0</span></button>
//         <button class='btn-danger'>Delete</button>
//       </blockquote>
//     </li>

// submitting form adds a new quote
// clicking delete button should remove from the database and remove it from page
// clik like will increase likes in db and update page
