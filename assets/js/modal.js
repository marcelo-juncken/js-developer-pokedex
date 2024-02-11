const pokemonDetailsImage = document.getElementById('pokemonDetailsImage');
const pokemonDetailsTopCard = document.getElementById('topCard');
const pokemonDetailsTopCardName = document.getElementById('topCardName');
const pokemonDetailsTopCardNumber = document.getElementById('topCardNumber');
const pokemonDetailsTopCardTypes = document.getElementById('topCardTypes');
const topCardGenus = document.getElementById('topCardGenus');
const dataOptions = document.querySelector('[data-option]');
const lineSelected = document.querySelector('[data-line-selected]');
const contentContainer = document.querySelector('[data-contents-container]');
const cardAboutText = document.getElementById('aboutText');
const eggGroupFirstValue = document.getElementById('eggGroupFirstvalue');
const eggGroupSecondValue = document.getElementById('eggGroupSecondValue');
const growthRate = document.getElementById('growthRate');
const pokemonDetailsGenderMaleValue = document.getElementById('genderMaleValue');
const pokemonDetailsGenderFemaleValue = document.getElementById('genderFemaleValue');
const pokemonDetailsBottomCardHeightValue = document.getElementById('heightValue');
const pokemonDetailsBottomCardWeightValue = document.getElementById('weightValue');
const titleContainer = document.querySelector('.content-container.stats .title')
const valueContainer = document.querySelector('.content-container.stats .value')
const barValueContainer = document.querySelector('.content-container.stats .bar-value')
const valueBarContainer = document.querySelector('.content-container.stats .value-bar')

document.getElementById('closeBtn').addEventListener('click', function () {
    document.getElementById('modal').style.display = "none";
});

document.getElementById('modal').addEventListener('click', function (event) {
    const modalContent = document.getElementById('modalContent')
    if (event.target === this && event.target !== modalContent) {
        document.getElementById('modal').style.display = "none";
    }
});

dataOptions.addEventListener('click', function (event) {
    const isOption = event.target.matches('[data-option] span');
    if (isOption) {
        const selectedText = event.target.textContent;

        dataOptions.setAttribute('data-option',selectedText );
        contentContainer.setAttribute('data-contents-container', selectedText)
        lineSelected.setAttribute('data-line-selected', selectedText);

        if(selectedText !== "Base Stats"){
            console.log("SAD")
            valueBarContainer.classList.add("inactive");
        }
    }
});

const clearModal = () => {
    clearTopCard();

    dataOptions.setAttribute('data-option', 'About');
    lineSelected.setAttribute('data-line-selected', 'About');
    contentContainer.setAttribute('data-contents-container', 'About');
    clearAbout();
    clearBaseStats();
}

const clearTopCard = () => {
    pokemonDetailsTopCard.className = '';
    topCardGenus.className = '';

    pokemonDetailsTopCardName.innerHTML = ""
    pokemonDetailsTopCardNumber.innerHTML = ""
    pokemonDetailsTopCardTypes.innerHTML = ""
    topCardGenus.innerHTML = ""

    pokemonDetailsImage.src = "" // ToDo
}
const clearAbout = () => {
    cardAboutText.innerHTML = "";

    pokemonDetailsGenderMaleValue.innerHTML = "";
    pokemonDetailsGenderFemaleValue.innerHTML = "";
    eggGroupFirstValue.innerHTML = "";
    eggGroupSecondValue.innerHTML = "";
    growthRate.innerHTML = "";
    pokemonDetailsBottomCardHeightValue.innerHTML = "";
    pokemonDetailsBottomCardWeightValue.innerHTML = "";
}

const clearBaseStats =() => {
    titleContainer.innerHTML = "";
    valueContainer.innerHTML = "";
    barValueContainer.innerHTML = "";
}

const loadPokemonDetails = async (pokemon) => {
    clearModal();
    document.getElementById('modal').style.display = "flex";
    //TODO mover as opcoes puxando o mouse tb pros lados

    if (pokemon.description === undefined) {
        await getPokemonSpecies(pokemon);
    }

    topCardGenus.innerText = pokemon.genus;

    getTopCardDetails(pokemon);
    getAboutDetails(pokemon);
    getBaseStatsDetails(pokemon);
}

const getTopCardDetails = (pokemon) => {
    pokemonDetailsTopCard.classList.add(pokemon.type);

    topCardGenus.classList.add(pokemon.type);

    pokemonDetailsImage.src = pokemon.animatedPhoto || pokemon.photo;
    pokemonDetailsTopCardName.textContent = pokemon.name;
    pokemonDetailsTopCardNumber.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
    pokemonDetailsTopCardTypes.innerHTML = pokemon.types.map((type) => `<div class="type ${type}">${type}</div>`).join('')
}

const valueToInchesAndCmString = (value) => {
    let valueInCm = value * 10;

    let totalInches = valueInCm / 2.54;

    let foot = Math.floor(totalInches / 12);
    let inches = totalInches % 12;

    let inchesFormated = inches.toFixed(1);

    return `${foot}' ${inchesFormated}" (${valueInCm} cm)`;
}

const valueToLbsAndKgString = (value) => {
    let valueInKg = value / 10;
    let valueInLb = valueInKg * 2.20462;

    return `${valueInLb.toFixed(1)} lbs (${valueInKg.toFixed(1)} kg)`;
}

const fillGenderChances = (genderRate) => {
    if (genderRate === -1) {
        pokemonDetailsGenderMaleValue.innerText = "Genderless";
        pokemonDetailsGenderMaleValue.classList.add('genderless');
        pokemonDetailsGenderFemaleValue.innerText = "";
    } else {
        pokemonDetailsGenderMaleValue.classList.remove('genderless');

        const femaleChance = (genderRate / 8) * 100;
        const maleChance = 100 - femaleChance;

        pokemonDetailsGenderMaleValue.innerText = `♂ ${maleChance.toFixed(1)}%`;
        pokemonDetailsGenderFemaleValue.innerText = `♀ ${femaleChance.toFixed(1)}%`
    }
}

const getAboutDetails = (pokemon) => {
    cardAboutText.innerText = pokemon.description;

    pokemonDetailsBottomCardHeightValue.innerText = valueToInchesAndCmString(pokemon.height);
    pokemonDetailsBottomCardWeightValue.innerText = valueToLbsAndKgString(pokemon.weight);

    fillGenderChances(pokemon.genderRate);

    eggGroupFirstValue.innerText = pokemon.eggGroups[0] || "None";
    eggGroupSecondValue.innerText = pokemon.eggGroups[1] || "";

    growthRate.innerText = pokemon.growthRate;
}

const getBaseStatsDetails = (pokemon) => {
    pokemon.stats.forEach(stat => {
        const statNameSpan = document.createElement('span');
        const statValueSpan = document.createElement('span');
        const statTotalBarDiv = document.createElement('div');
        const statValueBarDiv = document.createElement('div');
        const statValue = stat.value

        statNameSpan.innerText = stat.name;
        titleContainer.appendChild(statNameSpan);

        statValueSpan.innerText = statValue;
        valueContainer.appendChild(statValueSpan);

        statTotalBarDiv.classList.add('total-bar');
        statValueBarDiv.classList.add('value-bar');
        statValueBarDiv.style.width = `${(statValue/2).toString()}%`
        statValueBarDiv.style.backgroundColor = statValue > 150 ? 'green' : statValue > 70 ? 'yellow' : 'red';

        statTotalBarDiv.appendChild(statValueBarDiv)
        barValueContainer.appendChild(statTotalBarDiv);
    })
}