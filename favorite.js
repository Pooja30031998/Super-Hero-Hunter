//declaring variables
const char = document.querySelector("#charecter");

//function to fetch and display charecter
async function displayChars(id) {
  let response = await fetchdata(
    `${marvelURL}characters/${id}?${marvelURLAPI}`
  );
  let charData = response[0];
  let charCard = `
      <div class="col">
      <div class="card">
        <img src="${charData.thumbnail.path}.${charData.thumbnail.extension}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${charData.name}</h5>
          <p class="card-text">
            ${charData.description}
          </p>
          <a href="about.html?id=${charData.id}" class="btn btn-danger about" id = "${charData.id}">About</a>
          <button type="button" class="btn btn-danger favButton" id = "${charData.id}">Remove from favorite</button>
        </div>
      </div>
    </div>`;
  char.innerHTML += charCard;
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

//function to remove favorites from array and local storage
function removeFromFavourites(id) {
  let fav = getFavorites();
  let removeFav = fav.filter((element) => {
    return element != id;
  });
  localStorage.setItem("favorites", removeFav);
}

//calling displayChars function to display charecters if the facorite array is not empty
if (
  getFavorites() == null ||
  getFavorites().length == 0 ||
  getFavorites() == ""
) {
  char.innerHTML = `
             <br>
             <br>
             <h5 style="color:white; font-weight:700; background-color:black; font-family:cursive; font-size:xxx-large;">Nothing here, Add to favourite to display here</h5>
             <br>
             <br>`;
} else {
  getFavorites().map((id) => {
    if (id != "") {
      displayChars(id);
    }
  });
}

//event listerner for remove from favorites button
document.addEventListener("click", (event) => {
  try {
    if (event.target.className === "btn btn-danger favButton") {
      let id = event.target.id;
      removeFromFavourites(id);
      window.location.assign("favorite.html");
    } else if (
      event.target.parentElement.className === "btn btn-danger favButton"
    ) {
      let id = event.target.id;
      removeFromFavourites(id);
      window.location.assign("favorite.html");
    }
  } catch (error) {
    console.log("target doesnt have class name");
  }
});
