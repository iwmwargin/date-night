// setting for API Call



//Selectors
var searchButton = document.querySelector("#search-submit")
var searchInput = document.querySelector("#search-input") 
var searchResults = document.querySelector("#search-results")
var historyContainerE1 = document.querySelector("#search-data-list")


//search history
var createHistoryDropdown = function(){
  historyContainerE1.innerHTML = "";
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

})

