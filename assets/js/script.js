// setting for API Call

//global varibles 
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
var recipeList = document.querySelector("#recipe-list")

//render search history
var renderSearchHistory = function () {
  recentHistory.innerHTML = ""
  for (var i = 0; i < searchHistory.length; i++) {
    var button = document.createElement("button")
    button.setAttribute("class", "button")
    button.addEventListener("click", function (event) {
      console.log(event.target.innerHTML)
      renderSearch(event.target.innerHTML)
    })
    button.innerHTML = searchHistory[i]
    recentHistory.appendChild(button)
    console.log(searchHistory[i])
  }
}

//store search history
var storeSearchHistory = function (search) {
  if (searchHistory.length >= 5) {
    searchHistory.pop()
  }
  searchHistory.unshift(search)
  console.log(searchHistory)
  localStorage.setItem("Searchhistory", JSON.stringify(searchHistory))
  renderSearchHistory()

}

// rendering search
var renderSearch = function (search) {
  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?food=" + search + "&maxPrice=50", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "eff664db17mshe95b0e4695a6a7cp1b915ejsnbf16eceafe4c"
    }
  })

    .then((response) => {
      console.log(response);
      response.json().then((data) => {
        wines = data.pairedWines
        pairingText.innerHTML = data.pairingText
        wineList.innerHTML = ""
        try {
          for (var i = 0; i < wines.length; i++) {
            var listItem = document.createElement("li")
            listItem.setAttribute("class", "wine-item")
            listItem.innerHTML = wines[i]
            wineList.appendChild(listItem)
          }
        } catch (error) {
          pairingText.innerHTML = "Result not found. Please try again."

        }

        console.log(data);
      })
    })
  fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=5&q=" + search, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": "5a14697b02msh42244a1beada018p100b3ajsn699e260e7f11"
    }
  })

    .then(response => {
      console.log(response);
      response.json().then((data) => {
        console.log(data)
        recipeList.innerHTML = ""
        try {
          for (var i = 0; i < results.length; i++) {
            var listItem = document.createElement("li")
            listItem.innerHTML = recipeList[i]
            recipeList.appendChild(listItem)
          }
        } catch (error) {
          recipeList.innerHTML = "No Recipies Found"
        }
      })
    })

}

//search button
searchButton.addEventListener("click", function (event) {
  storeSearchHistory(searchInput.value)
  renderSearch(searchInput.value)
});

renderSearchHistory()
