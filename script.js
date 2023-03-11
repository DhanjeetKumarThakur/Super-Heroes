//https://superheroapi.com/api/access-token/character-id


//If u search by name ---> base_URL/search/name
//then u will retrive image as json.results[0].image.url 
//here the response will be an array of results

//But if u serch by ID ---> base_URL/id
//then u will retrive image as json.image.url
//here the response will be a single object 

const newHeroButton = document.getElementById('newHeroButton')
const heroImageDiv = document.getElementById('heroImage')
const searchButtonDiv = document.getElementById('searchButton')
const searchInputDiv = document.getElementById('searchInput')
const nameDiv = document.getElementById('name')

const SUPERHERO_TOKEN = '10223569763528853'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const getRandomSuperHero = (id, name) => {
  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
      //console.log(json)
      const superHero = json
      showHeroInfo(superHero)
    })
}

const getSuperHeroBySearch = (name) => {

  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      const hero = json.results[0]
      showHeroInfo(hero)
    })
}

const randomNumber = () => {
  const noOfHeroes = 731
  return Math.floor(Math.random() * noOfHeroes) + 1;
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♂️',
  power: '📊',
  combat: '⚔️',
}


const showHeroInfo = (character) => {

  const name = `<h1 style="padding-bottom:0px;">${character.name}</h1><hr>`
  const img = `<img src='${character.image.url}' width="80%" />`

  //console.log(Object.keys(character.powerstats)) 
  //Object.keys will return an array of keys

  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()} :${character.powerstats[stat]}</p>`
  }).join('')

  heroImageDiv.innerHTML = `${img}`
  nameDiv.innerHTML = `${name}${stats}`
  //console.log(stats.join(''))
  //return stats.join('')

}
newHeroButton.onclick = () => getRandomSuperHero(randomNumber())

searchButtonDiv.onclick = () => getSuperHeroBySearch(searchInputDiv.value)
