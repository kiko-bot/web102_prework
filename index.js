/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
const searchResult = document.getElementById("search__result");


// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i<games.length; i++){
       
        
        // create a new div element, which will become the game card
        let gameCard = document.createElement("div")
       
        // add the class game-card to the list
        gameCard.classList.add("game-card")
        

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        const display = `
            <div class="game-info">
                <h2>${games[i].name}</h2>
                <img src = "${games[i].img}" class="game-img"/>
                <p> ${games[i].description}</p>
                <p> Backers: ${games[i].backers}</p>
            </div>
        
        `
        gameCard.innerHTML = display
       

        // append the game to the games-container
        gamesContainer.append(gameCard)



    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
var totalIndividualContribution = GAMES_JSON.reduce( (acc, game) => {
    return(acc + game.backers);
  }, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalIndividualContribution.toLocaleString('en-US')}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
var totalAmountRaised = GAMES_JSON.reduce( (acc, game) => {
    return(acc + game.pledged);
  }, 0);


// set inner HTML using template literal
raisedCard.innerHTML = `$${totalAmountRaised.toLocaleString('en-US')}`



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length.toLocaleString('en-US')}` 


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that were searched for
function filterSearched() {
    deleteChildElements(gamesContainer);
    deleteChildElements(searchResult);
    let input = document.getElementById('searchbar').value
    // use filter() to get a list of games that have not yet met their goal
    let searchedGames = GAMES_JSON.filter ( (game) => {
        if(game.name.toLowerCase().includes(input.toLowerCase())){
                return game
        }
      });
    
    // use the function we previously created to add the unfunded games to the DOM
    var displayStr;
    let searchedGameInfoCont= document.createElement("h2");
    if(searchedGames.length == 0){
        displayStr = `There is no game that with this "${input}" title in our Database`;
        searchedGameInfoCont.innerHTML = displayStr.toUpperCase()
        searchResult.append(searchedGameInfoCont)
    }else{
        displayStr = `<h3>There ${searchedGames.length == 1 ? "is a game": `are ${searchedGames.length} games`} with this "${input}" title in our Database</h3>`;
        searchedGameInfoCont.innerHTML = displayStr.toUpperCase()
        searchResult.append(searchedGameInfoCont)
        addGamesToPage(searchedGames)
    }
}


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let goalnotMet = GAMES_JSON.filter ( (game) => {
           return game.goal > game.pledged
      });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(goalnotMet)
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
  

    // use filter() to get a list of games that have met or exceeded their goal
    let goalMet = GAMES_JSON.filter ( (game) => {
        return game.goal < game.pledged
    });
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(goalMet)

}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM

}



// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const searchBtn = document.getElementById("searchBtn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
searchBtn.addEventListener("click", filterSearched);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let goalnotMet = GAMES_JSON.filter ( (game) => {
    return game.goal < game.pledged
});
const totalAmountUnfunded =  goalnotMet.length
 

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${totalAmountRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} ${GAMES_JSON.length > 1 ?  "games." : "game."} Currently, ${totalAmountUnfunded} ${totalAmountUnfunded > 1 ?  "games" : "game"} remain unfunded. We need your help to fund ${totalAmountUnfunded > 1 ?  "these" : "this"} amazing ${totalAmountUnfunded > 1 ?  "games." : "game."}`

// create a new DOM element containing the template string and append it to the description container
descriptionContainer
let descriptionCont= document.createElement("p")
descriptionCont.innerHTML = displayStr
descriptionContainer.append(descriptionCont)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames




// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstGameTag= document.createElement("p")
firstGameTag.innerHTML = firstGame.name
firstGameContainer.append(firstGameTag)

// do the same for the runner up item
let secondGameTag= document.createElement("p")
secondGameTag.innerHTML = secondGame.name
secondGameContainer.append(secondGameTag)
