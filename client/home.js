const API_BASE = "http://localhost:5002/api";

// Load all movies on page load
window.addEventListener("DOMContentLoaded", () => {
  fetchAllMovies();
});

function fetchAllMovies() {
  fetch(`${API_BASE}/movies`)
    .then(res => res.json())
    .then(data => {
      renderMovies(data.movies);
      populateGenres(data.movies);
    })
    .catch(err => {
      console.error("Error fetching movies:", err);
      alert("Unable to load movies.");
    });
}

function renderMovies(movies) {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = "";

  if (!movies.length) {
    movieList.innerHTML = "<p class='text-center text-muted'>No movies found.</p>";
    return;
  }

  movies.forEach(movie => {
    const col = document.createElement("div");
    col.className = "col-md-4 movie-card";

    col.innerHTML = `
      <div class="card h-100 shadow-3">
        <img src="${movie.movieImageURL}" class="card-img-top"">
        <div class="card-body">
          <h5 class="card-title">${movie.movieName}</h5>
          <p class="card-text">${movie.movieDescription}</p>
          <span class="badge bg-secondary">${movie.movieGenre}</span>
        </div>
      </div>
    `;

    movieList.appendChild(col);
  });
}

function populateGenres(movies) {
  const genreSelect = document.getElementById("genreSelect");
  const genres = [...new Set(movies.map(m => m.movieGenre))]; // ✅ fixed key

  // Clear and re-populate
  genreSelect.innerHTML = '<option value="">All Genres</option>';
  genres.forEach(genre => {
    const opt = document.createElement("option");
    opt.value = genre;
    opt.textContent = genre;
    genreSelect.appendChild(opt);
  });

  // Add change event listener
  genreSelect.addEventListener("change", () => {
    const selected = genreSelect.value;

    if (!selected) {
      fetchAllMovies();
    } else {
      filterMoviesByGenre(selected);
    }
  });
}

function filterMoviesByGenre(genre) {
  fetch(`${API_BASE}/movies/filter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieGenre: genre }) // ✅ must match backend
  })
    .then(res => res.json())
    .then(data => {
      renderMovies(data.movies); // also make sure your backend returns `movies`, not `movie`
    })
    .catch(err => {
      console.error("Error filtering movies:", err);
      alert("Failed to filter movies by genre.");
    });
}
