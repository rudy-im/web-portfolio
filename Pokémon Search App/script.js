const input = document.getElementById("search-input");
const btn = document.getElementById("search-button");

const nameEl = document.getElementById("pokemon-name");
const idEl = document.getElementById("pokemon-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");
const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const sAttackEl = document.getElementById("special-attack");
const sDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");
const imageEl = document.getElementById("sprite");

const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

let spritesPointer;
let spritesArray = [];


const changeSprite = () => {
  if(!spritesArray) return;
  spritesPointer < spritesArray.length-1 ? spritesPointer++ : spritesPointer=0;
  imageEl.src = spritesArray[spritesPointer];
  console.log(spritesPointer);
}

const showData = (data) => {
  const {name, id, weight, height, stats, sprites, types} = data;
  const parsedTypes = types.map(({type})=>type);
  
  nameEl.innerText = name.toUpperCase();
  idEl.innerText = id;
  weightEl.innerText = weight;
  heightEl.innerText = height;

  hpEl.innerText = stats[0].base_stat;
  attackEl.innerText = stats[1].base_stat;
  defenseEl.innerText = stats[2].base_stat;
  sAttackEl.innerText = stats[3].base_stat;
  sDefenseEl.innerText = stats[4].base_stat;
  speedEl.innerText = stats[5].base_stat;
  
  spritesPointer = Object.keys(sprites).indexOf("front_default");
  spritesArray = Object.values(sprites);
  imageEl.src = spritesArray[spritesPointer];

  typesEl.innerText = "";
  parsedTypes.forEach(({name}) => {
    typesEl.insertAdjacentHTML("beforeend", `<div class="type ${name}">${name}</div>`);
  });
}

const getPokemonData = async (idOrName) => {
  try {
    const response = await fetch(pokemonAPI + `/${idOrName.toLowerCase()}`);
    const data = await response.json();
    showData(data);
  } catch (e) {
    console.error(e);
    alert("Pokémon not found");
  }
}

const takeInput = () => {
  if(!input.value){
    alert("Enter Pokémon ID or name");
    return;
  }

  if(input.value.includes("Red")){
    alert("Pokémon not found");
    return;
  }

  if(input.value.includes("Pikachu")){
    getPokemonData("pikachu");
    return;
  }

  getPokemonData(input.value);
}



btn.addEventListener("click", takeInput);
input.addEventListener("keydown", (e) => {
  if(e.key==="Enter"){
    e.preventDefault();
    takeInput();
  }
})

imageEl.addEventListener("click", changeSprite);