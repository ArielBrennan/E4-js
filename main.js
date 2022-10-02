let pokecontainer = document.querySelector('#pokecontainer')
let input = document.querySelector("input[type='number']");
let btn = document.querySelector('button');
let msg1 = document.querySelector('.msg1');
let msg2 = document.querySelector('.msg2');



const renderPokemon = pokemon => { 
    const {name, sprites, height, weight, types } = pokemon
    if (pokemon.id !== undefined) { 
        pokecontainer.innerHTML = 
    `<h2>${name.toUpperCase()}</h2> 
    <div class="pokemon">
        <img src="${sprites.other.home.front_default}" alt="">
        <div class="datacontainer">
        <p>Tipo: ${types[0].type.name}</p>
        <p>Altura: ${height / 10} m.</p>
        <p>Peso: ${weight / 10} kg.</p>
        </div>
    </div>`;
    } else {
        pokecontainer.innerHTML = `<h2>POKEFINDER...</h2>`
    };
    }

const findPokemon = async pokemon => {
    try {
        const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
        const pokeJson = await pokemonData.json();
        return pokeJson;
    } catch(err) {
        input.classList.add("error")
        msg2.classList.add("errormsg")
        msg1.classList.remove("errormsg");
        input.value = "";
    }
}

async function checkPokemon(e) {
    e.preventDefault()
    const valorInput = input.value.trim();
        if (valorInput.length !== 0) {
        const findpokemon = await findPokemon(valorInput);
        console.log(findpokemon)
        renderPokemon(findpokemon);
        input.classList.remove("error")
        msg1.classList.remove("errormsg")
        msg2.classList.remove("errormsg")
    } else if (valorInput.length == 0) {
        input.classList.add("error")
        msg2.classList.remove("errormsg")
        msg1.classList.add("errormsg")
} 
input.value = "";
}


btn.addEventListener("click", checkPokemon);