// setting for API Call



//Selectors
var searchButton = document.querySelector("#search-submit")
var searchInput = document.querySelector("#search-input") 
var searchResults = document.querySelector("#search-results")
var historyContainerEl = document.querySelector("#search-data-list")


//search history
var createHistoryDropdown = function(){
  historyContainerEl.innerHTML = "";
  historyContainerEl.innerHTML = "";
    var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistoryArr"));
    if (searchHistoryArr != null){
        searchHistoryArr = searchHistoryArr.sort();
        console.log(searchHistoryArr);
        for (var i=0;i<searchHistoryArr.length;i++){
          //console.log(searchHistoryArr[i]);
          var historyListItem = document.createElement("option");
          historyListItem.value = searchHistoryArr[i];
          historyListItem.text = searchHistoryArr[i];
          historyContainerEl.appendChild(historyListItem);
}
}
}
 
//store search hx
var storeSearchHistory = function(searchValue){
  var cleanedSearchValue = searchValue.toLowerCase().trim();
  var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistoryArr"))
}

//search button
searchButton.addEventListener("click", function(event) {
  fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?food=" + searchInput + "&maxPrice=50", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "eff664db17mshe95b0e4695a6a7cp1b915ejsnbf16eceafe4c"
	}
})

.then((response) => {
	console.log(response);
  response.json().then((data) => {
    console.log(data);
  })
})
.catch(err => {
	console.error(err);
});
});


