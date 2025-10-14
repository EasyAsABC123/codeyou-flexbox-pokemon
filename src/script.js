// function findPokemonByName(name) {
//   let items = document.getElementsByClassName('pokemon-card')

//   for (let i = 0; i < items.length; i++) {
//     let names = items[i].getElementsByClassName('name')

//     for (let j=0; j < names.length; j++) {
//       if (name === names[j].innerText) {
//         return items[i]
//       }
//     }
//   }

//   return null
// }

// function onContactSubmit(event) {
//   event.preventDefault()
//   console.log("we called this function")
// }

document.addEventListener(
  "DOMContentLoaded",
  function () {
    let element = findPokemonByName("Charmander");
    // create a new div element
    const newDiv = document.createElement("div");
    // and give it some content
    const newContent = document.createTextNode("Hi there and greetings!");
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    element.appendChild(newDiv);

    const submit = document.getElementById("contact");
    submit.addEventListener("submit", onContactSubmit);
  },
  false
);

const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";

function createPokecard(data) {
  const pokemonCard = `
  <div class="pokemon-card">
    <h2 class="name">${data.name}</h2>
    <img
      class="pokemon-image"
      alt="${data.name}"
      src= "${data.sprites.front_default}"
    />
    <p>Type: ${data.types.map((type) => type.type.name)}</p>
    <p>Height: ${data.height}</p>
    <p>Weight: ${data.weight}</p>
  </div>`;

  return pokemonCard;
}

function getPokemonList() {
  fetch(pokemonUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Not a good endpoint");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.results.forEach((pokemon) => {
        console.log(pokemon);
        getPokemonInfo(pokemon.url);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function getPokemonInfo(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Not a good endpoint");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const pokemonCard = createPokecard(data);
      console.log(pokemonCard);

      const pokemonContainer = document.getElementById("pokemon-container");
      pokemonContainer.innerHTML += pokemonCard;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

console.log(getPokemonList());
