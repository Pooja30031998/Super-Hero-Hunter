let siteAPI = {
  key: "e38b451654d408f6f01dae66148272b8",
  hash: "71974b31b78e15a4d86a3d027f5d8805",
};

let marvelURL = "http://gateway.marvel.com/v1/public/";
let marvelURLAPI = `&ts=1&apikey=${siteAPI.key}&hash=${siteAPI.hash}`;

const fetchdata = async (URL) => {
  let response = await fetch(URL);
  response = await response.json();
  let data = response.data.results;
  return data;
};

// fetchdata(`${marvelURL}characters?${marvelURLAPI}&limit=100&orderBy=name`);

// fetchdata(`${marvelURL}characters/1017100?${marvelURLAPI}`);
