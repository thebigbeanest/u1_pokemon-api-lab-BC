const fetchData = async (url) => { //So this is important:
    try { // Try to grab:
        const response = await axios.get(url); // Try to grab (This variable "response", which is now defined as- await axios.get(URL); Now you can plug in a URL later when doing fetchData
        return response.data; // Assuming the data is there, it will give the response.data to the function it's inside of.
    } catch (error) { // Otherwise, if there is any sort of error...
        console.error('Error fetching data:', error); //It will console.log an error, and display the fact an error has been logged.
        return null; // Give nothing to the function being run with fetchdata.
    }
};

const searchButton = document.querySelector("#searchButton"); // Just defining buttons and areas we want to display data
const pokemonInput = document.querySelector("#inputBar"); // Just defining buttons and areas we want to display data
const pokemonNameElement = document.querySelector("#pokemonName"); // Just defining buttons and areas we want to display data
const pokemonImageElement = document.querySelector("#pokemonImage"); // Just defining buttons and areas we want to display data
const pokemonStatsElement = document.querySelector("#pokemonStats"); // Just defining buttons and areas we want to display data

searchButton.addEventListener('click', async () => { // On click of the searchButton a function will now run:
    const pokemonName = pokemonInput.value.trim().toLowerCase(); // the variable for said function is defined as the pokemonInput (AKA what we defined above, the user input in the search bar). Then it will display this name in lowercase to you, the value.
    if (!pokemonName) { // If the pokemonName (!) does NOT exist, then....
        console.log('Please enter a Pokémon name'); // Console log the phrase 'Please enter a Pokemon name'
        return; // Then end the function.
    }

    const pokemonData = await fetchData(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); // Here you can set pokeMon data to (RUN FETCHDATA) (URL FOR THE FUNCTION IS... WHATEVER YOU INPUT)
    if (!pokemonData) { //IF POKEMON DATA IS NOT PRESENT (! = "NOT" ) THEN PRINT "Pokemon not found" TO CONSOLE AND RESET TEXT CONTENT / IMAGE TO BLANK
        pokemonNameElement.textContent = "Pokémon not found"; //Change the textcontent of the pokemon name area to "Pokemon not found"
        pokemonImageElement.src = ""; // Set the image source to nothing, making it blank.
        pokemonStatsElement.textContent = ''; // Set the text content for the stats text area to "", making it blank.
        return; // END FUNCTION
    }

 // REMEMBER: Although the two consts above us were functions, they are not the functions we need to display data on our screen yet.
 // They were just defining how we grab data.
 // The data grabbed will immediately be plugged into the function you run it in, so you don't need extra steps for that.
 // Only steps you need to include in your gathering data function(s) are what to do if it goes wrong.
 // What you do if the data is Correct is what you include in your deeper functions.

    pokemonNameElement.textContent = pokemonData.name; // Selects the area in the HTML where the name will be displayed, tells its text content to be set to (pokemonAPI.pokemon you picked.name)
    pokemonImageElement.src = pokemonData.sprites.front_default; // Same thing here, except it will put an image where the image is defined to go, using a sprite from the pokemonAPI.

    const pokemonStats = pokemonData.stats; // PokemonStats is defined as pokemonData (AKA, the API we called above) and then targeting .stats (Dot notation) specifically.
    if (pokemonStats && pokemonStats.length > 0) { //If pokemonStats **AND** pokemonStats.length are greater than zero (Basically making sure they're not null)
        pokemonStatsElement.innerHTML = ''; //Change the pokemonStatsElement.innerHTML to blank, so it can be reset in the case something was already on screen.
        pokemonStats.forEach(stat => { // This now selects each individual stat in the area defined as "stats"
            const statElement = document.createElement('div'); // For each stat, this creates a div element in the body where you defined the statElement would be.
            statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`; //Now, for each stat, it will set the text content of your created statElement(s) to the pokemon Stat name and the actual stat numbers.
            pokemonStatsElement.appendChild(statElement); // This part will now actually add the data defined above to your document, with .appendChild, and make it viewable for the user.
        });
    } else { // Else, if this does not work / the stats are not able to be located in the defined location...
        pokemonStatsElement.textContent = 'Stats not found'; //display "Stats not Found" to the area they would normally be located inside of.
    }
});