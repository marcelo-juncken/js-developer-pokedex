const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151
const limit = 20
let offset = 0;

function convertPokemonToLi(pokemon) {
    const liElement = document.createElement("li");
    liElement.classList.add("pokemon", pokemon.type);
    liElement.addEventListener('click', () => loadPokemonDetails(pokemon));

    liElement.innerHTML = `
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
    `;

    return liElement;
}

async function loadPokemonItens(offset, limit) {
    const pokemons = await fetchPokemons(offset, limit);
    pokemons.forEach(pokemon => {
        const liElement = convertPokemonToLi(pokemon);
        pokemonList.appendChild(liElement);
    })
}

loadPokemonItens(offset, limit).then()

loadMoreButton.addEventListener('click', async () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        await loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        await loadPokemonItens(offset, limit)
    }
})


window.addEventListener('scroll', async () => {
    const scrolledHeight = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrolledHeight >= documentHeight){
        offset += limit
        const qtdRecordsWithNexPage = offset + limit

        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset

            await loadPokemonItens(offset, newLimit)
            loadMoreButton.parentElement.removeChild(loadMoreButton)
        } else {
            await loadPokemonItens(offset, limit)
        }
    }
})