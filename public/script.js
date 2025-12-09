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

// document.addEventListener(
//   "DOMContentLoaded",
//   function () {
//     let element = findPokemonByName("Charmander");
//     // create a new div element
//     const newDiv = document.createElement("div");
//     // and give it some content
//     const newContent = document.createTextNode("Hi there and greetings!");
//     // add the text node to the newly created div
//     newDiv.appendChild(newContent);
//     element.appendChild(newDiv);

//     const submit = document.getElementById("contact");
//     submit.addEventListener("submit", onContactSubmit);
//   },
//   false
// );

const ourAPIurl = "http://localhost:5000";
const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";

function createPokecard(data) {
  const pokemonCard = `
  <div class="pokemon-card">
    <h2 class="name">${data.name}</h2>
    <img
      class="pokemon-image"
      alt="${data.name}"
      src="${data.sprites.front_default}"
      crossorigin="anonymous"
    />
    <p>Type: ${data.types.map((type) => type.type.name)}</p>
    <p>Height: ${data.height}</p>
    <p>Weight: ${data.weight}</p>
    <div class="thumbs-container">
      <div class="thumbs-up" id="thumbs-up" data-pokemon-id=${data.id}>👍</div>
      <div class="thumbs-down" id="thumbs-down" data-pokemon-id=${
        data.id
      }>👎</div>
    </div>
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
      data.results.forEach((pokemon) => {
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
      const pokemonCard = createPokecard(data);

      const pokemonContainer = document.getElementById("pokemon-container");
      pokemonContainer.innerHTML += pokemonCard;

      const thumbsUp = document.querySelectorAll(".thumbs-up");
      const thumbsDown = document.querySelectorAll(".thumbs-down");

      // Thumbs up
      thumbsUp.forEach((thumbUp) => {
        thumbUp.addEventListener("click", async (event) => {
          console.log("Thumbs up clicked", event);

          let response = await fetch(
            `/pokemon/ratings/${event.target.dataset.pokemonId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ rating: "+" }),
            }
          );
        });
      });

      // Thumbs down
      thumbsDown.forEach((thumbDown) => {
        thumbDown.addEventListener("click", async (event) => {
          console.log("Thumbs down clicked", event);

          let response = await fetch(
            `/pokemon/ratings/${event.target.dataset.pokemonId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ rating: "-" }),
            }
          );
        });
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

async function getWelcomeMessage() {
  let response = await fetch(`${ourAPIurl}/hello_world`);
  let welcome_json = await response.json();
  let welcome_string = welcome_json.text;
  console.log(welcome_string);
  let header_welcome = document.getElementById("welcome_message");
  header_welcome.innerText = welcome_string;
}

getPokemonList();
getWelcomeMessage();
