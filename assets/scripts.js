

// document.addEventListener('DOMContentLoaded', async function() {
//     const searchForm = document.getElementById('searchForm');

//     searchForm.addEventListener('submit', async function(event) {
//         event.preventDefault(); // Prevent the default form submission
        
//         const searchTerm = document.getElementById('searchInput').value.trim();
        
//         try {
//             // Make a request to the API
//             const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
            
//             // Process the data and append to HTML
//             const pokemonData = response.data;
//             console.log(pokemonData); // You can replace this with your logic to display the data
            
//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//         }
//     });
// });


const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const searchButton = document.querySelector("#searchButton");
const pokemonInput = document.querySelector("#inputBar");
const pokemonNameElement = document.querySelector("#pokemonName");
const pokemonImageElement = document.querySelector("#pokemonImage");
const pokemonStatsElement = document.querySelector("#pokemonStats");

searchButton.addEventListener('click', async () => {
    const pokemonName = pokemonInput.value.trim().toLowerCase();
    if (!pokemonName) {
        console.log('Please enter a Pokémon name');
        return;
    }

    const pokemonData = await fetchData(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!pokemonData) {
        pokemonNameElement.textContent = "Pokémon not found";
        pokemonImageElement.src = "";
        pokemonStatsElement.textContent = '';
        return;
    }

    pokemonNameElement.textContent = pokemonData.name;
    pokemonImageElement.src = pokemonData.sprites.front_default;

    const pokemonStats = pokemonData.stats;
    if (pokemonStats && pokemonStats.length > 0) {
        pokemonStatsElement.innerHTML = '';
        pokemonStats.forEach(stat => {
            const statElement = document.createElement('div');
            statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStatsElement.appendChild(statElement);
        });
    } else {
        pokemonStatsElement.textContent = 'Stats not found';
    }
});



































































////////////////////////////////////////////////////////////////////////////////

// const getPokemon = async () => {
//     const pokemonIndex = await axios.get('https://pokeapi.co/api/v2/')
//     console.log(pokemonIndex)
//     console.log(pokemonIndex.data.results)
//   }
//   getPokemon()



//   const searchButton = document.querySelector("#searchbtn")
//   const pokemonInput = document.querySelector("#inputBar")
//   const imageContainer = document.querySelector("#imgContainer")

// //   searchButton.addEventListener('click', async () => {
// //     let pokemon = pokemonInput.value
// //   })

//   let displayPokemonInfoArea = document.querySelector("#pokemon_info")



//   searchButton.addEventListener('click', async () => {
//     displayInfo
//   })
    
// //   })

// //   function displayInfo() {
// //     let pokemonSpecies = pokemonIndex.data.pokemon-species
//     // let pokemonColor = pokemonIndex.data.pokemon-color
//     // let totalInfo = pokemonSpecies document.querySelector("#pokemon_info").appendChild 
//   }







    
//     let response = await axios.get(
//         `https://dog.ceo/api/breed/${breed}/images/random`)
//         console.log(response.data.message)
//         let dogPic = response.data.message
//         imageContainer.setAttribute ('src', dogPic)
//   })