function findPokemonByName(name) {
  let items = document.getElementsByClassName('pokemon-card')

  for (let i = 0; i < items.length; i++) {
    let names = items[i].getElementsByClassName('name')

    for (let j=0; j < names.length; j++) {
      if (name === names[j].innerText) {
        return items[i]
      }
    }
  }

  return null
}

document.addEventListener('DOMContentLoaded', function() {
    let element = findPokemonByName('Charmander')
    // create a new div element
    const newDiv = document.createElement("div")
    // and give it some content
    const newContent = document.createTextNode("Hi there and greetings!")
    // add the text node to the newly created div
    newDiv.appendChild(newContent)
    element.appendChild(newDiv)
}, false);

