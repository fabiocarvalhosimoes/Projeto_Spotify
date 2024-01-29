// Obtém referências para elementos HTML
const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

// Função para fazer uma solicitação à API com base no termo de pesquisa
function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayResults(results));
}

// Função para exibir os resultados da pesquisa de artistas
function displayResults(results) {
  // Oculta as playlists antes de exibir os resultados dos artistas
  hidePlaylists();

  // Obtém referências para elementos específicos do resultado do artista
  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  // Atualiza os elementos com os dados do artista encontrado
  results.forEach((element) => {
    artistImage.src = element.urlImg;
    artistName.innerText = element.name;
  });

  // Remove a classe "hidden" para tornar visível o resultado do artista
  resultArtist.classList.remove("hidden");
}

// Função para ocultar as playlists
function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

// Adiciona um ouvinte de evento para detectar mudanças no input de pesquisa
searchInput.addEventListener("input", function () {
  // Obtém o termo de pesquisa em minúsculas
  const searchTerm = searchInput.value.toLowerCase();

  // Se o termo de pesquisa estiver vazio, exibe as playlists e oculta os resultados do artista
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  // Faz uma solicitação à API com base no termo de pesquisa não vazio
  requestApi(searchTerm);
});
