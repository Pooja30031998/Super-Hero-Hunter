//declaring variables
const char = document.querySelector("#charecter");
const search = document.querySelector(".homepageSearch");
const searchSuggestions = document.querySelector("#searchSuggestionDisplay>ul");

//display charecter function
function displayChars(character) {
  if (character.description.length > 0) {
    let charCard = `
        <div class="col">
        <div class="card">
          <img src="${character.thumbnail.path}.${character.thumbnail.extension}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text">
              ${character.description}
            </p>
            <a href="about.html?id=${character.id}" class="btn btn-danger about" id = "${character.id}">About</a>
            <button type="button" class="btn btn-danger favButton" id = "${character.id}">Add to favorite</button>
          </div>
        </div>
      </div>`;
    char.innerHTML += charCard;
  }
}

//function to get favorites array
function getFavorites() {
  let fav;
  let storage = localStorage.getItem("favorites");
  if (storage === null) {
    fav = [];
  } else {
    fav = storage.split(",");
  }
  return fav;
}

//function to add favorites to array and local storage
function addToFavourites(id) {
  let fav = getFavorites();
  if (!fav.includes(id)) {
    fav.push(id);
  }
  localStorage.setItem("favorites", fav);
}

//function to show search suggestions
const displaySearchSuggestion = (searchList) => {
  if (searchList.description.length > 0) {
    let suggestion = `
          <li class="list-group-item">
              <div style="display:flex">
                  <img src = "${searchList.thumbnail.path}.${searchList.thumbnail.extension}" >
                  <a href="about.html?id=${searchList.id}" style="text-decoration:none; color:black;" id = "${searchList.id}">${searchList.name}</a>
              </div>
          </li>`;
    searchSuggestions.insertAdjacentHTML("afterbegin", suggestion);
  }
};

//eventlistener to fetch results from marvel api when search value changes
search.addEventListener("keyup", () => {
  let searchString = search.value;
  if (searchString.length > 0) {
    let marvelSearchURL = `${marvelURL}characters?nameStartsWith=${searchString}&${marvelURLAPI}`;
    searchSuggestions.innerHTML = "";
    fetchdata(marvelSearchURL).then((data) => {
      data.map(displaySearchSuggestion);
    });
  } else {
    searchSuggestions.innerHTML = "";
  }
});

//fetching data and calling displayChars function to display charecters
fetchdata(`${marvelURL}characters?${marvelURLAPI}&limit=15&orderBy=name`).then(
  (data) => {
    data.map(displayChars);
  }
);

//event listerner for add to favorites button
document.addEventListener("click", (event) => {
  try {
    if (event.target.className === "btn btn-danger favButton") {
      let id = event.target.id;
      addToFavourites(id);
    } else if (
      event.target.parentElement.className === "btn btn-danger favButton"
    ) {
      let id = event.target.id;
      addToFavourites(id);
    }
  } catch (error) {
    console.log("can't find class name");
  }
});
