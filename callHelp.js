//declaring variables
const char = document.querySelector("#charecter");
const search = document.querySelector(".homepageSearch");
const searchSuggestions = document.querySelector("#searchSuggestionDisplay>ul");

//function to show search suggestions
const displaySearchSuggestion = (searchList) => {
  if (searchList.description.length > 0) {
    let suggestion = `
            <li class="list-group-item">
                <div style="display:flex">
                    <img src = "${searchList.thumbnail.path}.${searchList.thumbnail.extension}" >
                    <a href="callHelp.html?id=${searchList.id}" style="text-decoration:none; color:black;" id = "${searchList.id}">${searchList.name}</a>
                </div>
            </li>`;
    searchSuggestions.insertAdjacentHTML("afterbegin", suggestion);
  }
};

//fetch results from marvel api when search value changes
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

//findData function to fetch charected data
async function findData() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    let id = parseInt(urlParams.get("id"), 10);
    await displayChars(id);
  } catch (error) {
    console.log("not selected superhero yet");
  }
}

//display charecter function
async function displayChars(id) {
  let response = await fetchdata(
    `${marvelURL}characters/${id}?${marvelURLAPI}`
  );
  let charData = response[0];

  let charCard = `
    <div class="card" >
  <img src="${charData.thumbnail.path}.${charData.thumbnail.extension}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${charData.name}</h5>
    <p class="card-text">${charData.description}</p>
  </div>
</div>`;
  char.innerHTML += charCard;
  //settimeout to display success
  setTimeout(() => {
    document.querySelector(".wrapper").remove();
    let success = document.querySelector("#template3");
    success.innerHTML = `<div class="success">
    <img style="background-color:red" src="images/tick.png" alt="Superhero found" />
    <h2>Super Hero Assigned</h2>
    </div>`;
  }, 5000);
}

//calling findData function to fetch charected data
findData();
