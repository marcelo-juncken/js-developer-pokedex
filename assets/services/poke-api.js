const baseUrl = 'https://pokeapi.co/api/v2'
const getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

const fetchPokemons = (offset = 0, limit = 5) => {
    return fetch(`${baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
}

const getPokemonSpecies = (pokemon) => {
    return fetch(`${baseUrl}/pokemon-species/${pokemon.id}`)
        .then((response) => response.json())
        .then(data => {
            pokemon.genderRate = data.gender_rate;

            const filteredFlavorTextEntries = data.flavor_text_entries.filter(
                flavorText => flavorText.language.name === "en"
            );
            pokemon.description = filteredFlavorTextEntries[0]
                .flavor_text.replace(/[\n\f]/g, " ")
                .replace(/pokémon/gi, "pokemon");

            const filteredGeneraList = data.genera.filter(genera => genera.language.name === "en");
            pokemon.genus = filteredGeneraList[0].genus;

            pokemon.eggGroups = data.egg_groups
                .map(eggGroup => eggGroup.name.charAt(0).toUpperCase() + eggGroup.name.slice(1).toLowerCase())

            pokemon.growthRate = data.growth_rate.name
                .split('-')
                .map(part =>
                    part.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')
                )
                .join('-');

        })

}

const convertPokeApiDetailToPokemon = (pokeDetail) => {
    const {id, name, weight, height} = pokeDetail;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    const photo = pokeDetail.sprites.other.dream_world.front_default;

    const animatedPhoto = pokeDetail["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];

    const stats = pokeDetail.stats.map(stat => {
        const name = stat.stat.name;
        const value = stat.base_stat;
        let formattedName;

        switch (name.toUpperCase()) {
            case "HP":
                formattedName = "HP";
                break;
            case "SPECIAL-ATTACK":
                formattedName = "Sp. Atk";
                break;
            case "SPECIAL-DEFENSE":
                formattedName = "Sp. Def";
                break;
            default:
                formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        }

        return { value, name: formattedName };
    });

    return new Pokemon(
        id,
        name,
        type,
        types,
        photo,
        animatedPhoto,
        weight,
        height,
        stats
    )
}

