//declaring variables
const char = document.querySelector("#charecter");

//calling findData function to fetch charected data
findData();

//findData function to fetch charected data
async function findData() {
  const urlParams = new URLSearchParams(window.location.search);
  let id = parseInt(urlParams.get("id"), 10);
  await displayChars(id);
}

//display charecter function
async function displayChars(id) {
  let response = await fetchdata(
    `${marvelURL}characters/${id}?${marvelURLAPI}`
  );
  let charData = response[0];

  let series = charData.series.items;
  let seriesArray = series.map((element) => {
    return element.name;
  });

  let comics = charData.comics.items;
  let comicsArray = comics.map((element) => {
    return element.name;
  });

  let charCard = `
    <div class="card mx-auto" style="width:50%">
      <img
        src="${charData.thumbnail.path}.${charData.thumbnail.extension}"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">${charData.name}</h5>
        <p class="card-text"> <h2>Description : </h2> ${charData.description}</p>
        <p> <h2> Appeared in series : </h2> ${seriesArray}</p>
        <p> <h2> Appeared in comics : </h2> ${comicsArray}</p>
        <button
          type="button"
          class="btn btn-danger favButton"
          id="${charData.id}"
        >
          Add to favorite
        </button>
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

//function to add favorites to array and local storage
function addToFavourites(id) {
  let fav = getFavorites();
  if (!fav.includes(id)) {
    fav.push(id);
  }
  localStorage.setItem("favorites", fav);
}

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
    console.log("target doesnt have class name");
  }
});
