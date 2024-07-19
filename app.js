const form = document.querySelector('form');
const input = document.querySelector('input');
const errorMsg = document.querySelector('.error-msg');

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  if(input.value === "") {
    errorMsg.textContent = "Wops, veuillez remplir l'input";
    return;
  } else {
    errorMsg.textContent = "";
    wikiApiCall(input.value);
  }
}

async function wikiApiCall(searchInput) {
  const response = await(fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`))

  const data = await response.json();
  console.log(data);

  createCards(data.query.search);
}

const resultsDisplay = document.querySelector(".results-display");

function createCards(data) {
  if(!data.length) {
    errorMsg.textContent = "Oups, aucun résultat";
    return;
  }
  data.forEach(element => {
    const url = `https://en.wikipedia.org/?curid=${element.pageid}`
    const card = document.createElement('div');
    card.className = "result-item";
    card.innerHTML = `
      <h3 class="result-title">
        <a href="${url}" target="_blank">${element.title}</a>
      </h3>
      <a href="${url}" class="result-link" target="_blank">${url}</a>
      <span class="result-snippet">${element.snippet}</span>
      <br>
    `

    resultsDisplay.appendChild(card);
  });
}