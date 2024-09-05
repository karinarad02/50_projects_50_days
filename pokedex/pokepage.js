// Path: pokemon.html
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const pokemon_info_container = document.getElementById('pokemon-info-container')

const getPokemon = async (id) => {
    const number=parseInt(id)
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    createPokemonInfo(data)
}

const createPokemonInfo = (pokemon) => {
    const name = pokemon.forms[0].name[0].toUpperCase() + pokemon.forms[0].name.slice(1);
    const id = pokemon.id;
    const poke_types = pokemon.types.map((type) => type.type.name);
    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    const color = colors[type];

    const title = document.querySelector('title');
    title.innerHTML = name;

    const poke_info_title = document.querySelector('.poke-info-title');
    poke_info_title.textContent = name;

    const pokemonInfo = document.createElement('div');
    pokemonInfo.classList.add('pokemon-info');

    const pokemonInfoInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
            <p class="ability">Abilities: ${pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
            <p class="hidden-ability">Hidden Ability: ${pokemon.abilities.find((ability) => ability.is_hidden).ability.name}</p>
            <p class="height">Height: ${pokemon.height} decimetres</p>
            <p class="types">Types: ${pokemon.types.map((type) => type.type.name).join(', ')}</p>
            <p class="weight">Weight: ${pokemon.weight / 10} kilograms</p>
            <p class="past-types">Past Types: ${pokemon.past_types.map((type) => type.type.name).join(', ')}</p>
            <p class="species">Species: <a href="${pokemon.species.url}" target="_blank">${pokemon.species.name}</a></p>
        </div>
    `;

    pokemonInfo.innerHTML = pokemonInfoInnerHTML;

    pokemon_info_container.appendChild(pokemonInfo);
};



getPokemon(id)
