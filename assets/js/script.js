// Define the settings for the API call
var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=dog+friendly+locations&sort_by=distance&location=${window.searchText}`,
    "method": "GET",
    "headers": {
      "authorization": "Bearer ZMRol_fEx3vgsmM6XbAhsFNmcSt_FcqkeFnf6nW8xql3-XjYW4uqQMFOm5S1ZKN7BJ-GAk9Sx3fLNlNeoB_hI1UeUvAno8gCztKAU1_2nYbiHnBU1fVTj5xC71AEYnYx",
      "cache-control": "no-cache",
      "postman-token": "3f23d8c3-ce48-a224-50c0-14b9094948fc"
    }
  }