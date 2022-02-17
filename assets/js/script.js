// setting for API Call

//global variables 
if (localStorage.getItem("Searchhistory")) {
  var searchHistory = JSON.parse(localStorage.getItem("Searchhistory"))
} else {
  var searchHistory = []
}

//Selectors
var searchButton = document.querySelector("#search-submit")
var searchInput = document.querySelector("#search-input")
var searchResults = document.querySelector("#search-results")
var historyContainerEl = document.querySelector("#search-data-list")
var wineList = document.querySelector("#wine-list")
var pairingText = document.querySelector("#pairing-text")
var recentHistory = document.querySelector("#recent-history")
var recipeResults = document.querySelector("#recipe-results")

//render search history
var renderSearchHistory = function () {
  recentHistory.innerHTML = ""
  for (var i = 0; i < searchHistory.length; i++) {
    var button = document.createElement("button")
    button.setAttribute("class", "button")
    button.addEventListener("click", function (event) {
      //console.log(event.target.innerHTML)
      renderSearch(event.target.innerHTML)
    })
    button.innerHTML = searchHistory[i]
    recentHistory.appendChild(button)
    //console.log(searchHistory[i])
  }
}

//store search history
var storeSearchHistory = function (search) {
  if (searchHistory.length >= 5) {
    searchHistory.pop()
  }
  searchHistory.unshift(search)
  //console.log(searchHistory)
  localStorage.setItem("Searchhistory", JSON.stringify(searchHistory))
  renderSearchHistory()

}

// rendering search
var renderSearch = function (search) {
  if(search == ""){
    recipeResults.innerHTML = "Your search can not be blank."
    pairingText.innerHTML = "Your search can not be blank."
    return
  }
  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?food=" + search + "&maxPrice=50", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "eff664db17mshe95b0e4695a6a7cp1b915ejsnbf16eceafe4c"
    }
  })

    .then((response) => {
      //console.log(response);
      response.json().then((data) => {
        console.log(data)
        wines = data.pairedWines
        pairingText.setAttribute("class", "pairing-text")
        pairingText.innerHTML = data.pairingText
        wineList.innerHTML = ""

        try {
          if (wines.length > 0) {
            for (var i = 0; i < wines.length; i++) {
              var listItem = document.createElement("li")
              listItem.setAttribute("class", "wine-item")
              listItem.innerHTML = wines[i]
              wineList.appendChild(listItem)
            }
          } else {
            pairingText.innerHTML = "We're sorry! We could not find a wine pairing for " + search + ". "
          }
        } catch (error) {
          pairingText.innerHTML = "We're sorry! We could not find a wine pairing for " + search + "."
        }
      })
    })
  fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=1&q=" + search, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": "eff664db17mshe95b0e4695a6a7cp1b915ejsnbf16eceafe4c"
    }
  })
    .then(response => {
      //console.log(response);
      response.json().then((data) => {
        console.log(data)
        recipeResults.innerHTML = ""
        if(data.results.length > 0 ){
          for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].instructions) {
              var recipe = document.createElement("div")
              var recipeName = document.createElement("div")
              recipe.setAttribute("class", "recipe")
              recipeName.setAttribute("class", "recipe-name")
              recipeName.innerHTML = data.results[i].name
              recipe.appendChild(recipeName)
              var instructions = document.createElement("ol")
              instructions.setAttribute("class", "instructions")
              for (var r = 0; r < data.results[i].instructions.length; r++) {
                var step = document.createElement("li")
                step.setAttribute("class", "step")
                step.innerHTML = data.results[i].instructions[r].display_text
                instructions.appendChild(step)
              }
              recipe.appendChild(instructions)
            }
            recipeResults.appendChild(recipe)
          }
        } else {
          recipeResults.innerHTML = "We're sorry! We could not find recipes for " + search + "."
        }
      })
    })
}

//search button
searchButton.addEventListener("click", function (event) {
  storeSearchHistory(searchInput.value)
  renderSearch(searchInput.value)
});

searchInput.addEventListener("keyup", function(event){
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("search-submit").click();
    }
  })

renderSearchHistory()