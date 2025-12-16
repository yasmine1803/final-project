// Movie Data - Array of Objects
const movies = [
    {
        id: 1,
        title: "Inception",
        releaseDate: "2010-07-16",
        poster: "Inception.jpeg",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        rating: 8.8,
        genres: ["Action", "Sci-Fi", "Thriller"]
    },
    {
        id: 2,
        title: "The Shawshank Redemption",
        releaseDate: "1994-09-23",
        poster: "Shawshank Redemption.jpeg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        rating: 9.3,
        genres: ["Drama"]
    },
    {
        id: 3,
        title: "The Dark Knight",
        releaseDate: "2008-07-18",        
        poster:"The Dark Knight.jpeg",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        rating: 9.0,
        genres: ["Action", "Crime", "Drama"]
    },
    {
        id: 4,
        title: "La La Land",
        releaseDate: "2016-12-09",
        poster: "la la land movie.jpeg",
        description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
        rating: 8.0,
        genres: ["Comedy", "Drama", "Romance"]
    },
    {
        id: 5,
        title: "Parasite",
        releaseDate: "2019-05-30",
        poster: "parasite.jpeg",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        rating: 8.6,
        genres: ["Comedy", "Drama", "Thriller"]
    },
    {
        id: 6,
        title: "Interstellar",
        releaseDate: "2014-11-07",
        poster: "Interstellar.jpeg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        rating: 8.6,
        genres: ["Adventure", "Drama", "Sci-Fi"]
    },
    {
        id: 7,
        title: "The Grand Budapest Hotel",
        releaseDate: "2014-03-28",
        poster: "Grand Hotel Budapest.jpeg",
        description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
        rating: 8.1,
        genres: ["Adventure", "Comedy", "Drama"]
    },
    {
        id: 8,
        title: "Get Out",
        releaseDate: "2017-02-24",
        poster: "get out.jpeg",
        description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
        rating: 7.7,
        genres: ["Horror", "Mystery", "Thriller"]
    },
    {
        id: 9,
        title: "Avengers: Endgame",
        releaseDate: "2019-04-26",
        poster: "Avengers Endgame.jpeg",
        description: "After the devastating events of Avengers: Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
        rating: 8.4,
        genres: ["Action", "Adventure", "Sci-Fi"]
    },
    {
        id: 10,
        title: "The Social Network",
        releaseDate: "2010-10-01",
        poster: "the social network.jpeg",
        description: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea.",
        rating: 7.7,
        genres: ["Biography", "Drama"]
    },
    {
        id: 11,
        title: "Whiplash",
        releaseDate: "2014-10-15",
        poster: "Whiplash.jpeg",
        description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
        rating: 8.5,
        genres: ["Drama", "Music"]
    },
    {
        id: 12,
        title: "Toy Story",
        releaseDate: "1995-11-22",
        poster: "Toy Story.jpeg",
        description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
        rating: 8.3,
        genres: ["Animation", "Adventure", "Comedy"]
    }
];

// DOM Elements
const moviesContainer = document.getElementById('movies-container');
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');
const themeToggle = document.getElementById('theme-toggle');
const movieCount = document.getElementById('movie-count');
const noResults = document.getElementById('no-results');

// Current filter state
let currentSearch = '';
let currentGenre = 'all';

// Initialize the app
function initApp() {
    renderMovies(movies);
    setupEventListeners();
    updateMovieCount(movies.length);
}

// Render movies to the DOM
function renderMovies(moviesArray) {
    // Clear the container
    moviesContainer.innerHTML = '';
    
    // If no movies, show no results message
    if (moviesArray.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    // Hide no results message
    noResults.style.display = 'none';
    
    // Create movie cards
    moviesArray.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

// Create a movie card element
function createMovieCard(movie) {
    // Format release date
    const releaseDate = new Date(movie.releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Create rating stars
    const starRating = createStarRating(movie.rating);
    
    // Create genre badges
    const genreBadges = movie.genres.map(genre => 
        `<span class="genre-badge">${genre}</span>`
    ).join('');
    
    // Create card element
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
        <div class="movie-content">
            <div class="movie-header">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-release">${releaseDate}</p>
                <div class="movie-rating">
                    ${starRating}
                    <span class="rating-value">${movie.rating}/10</span>
                </div>
            </div>
            <p class="movie-description">${movie.description}</p>
            <div class="movie-genres">
                ${genreBadges}
            </div>
            <div class="movie-footer">
                <button class="view-more-btn" data-id="${movie.id}">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
            </div>
        </div>
    `;
    
    // Add click event to button
    const viewMoreBtn = card.querySelector('.view-more-btn');
    viewMoreBtn.addEventListener('click', () => {
        alert(`Viewing details for: ${movie.title}\n\nDescription: ${movie.description}\n\nGenres: ${movie.genres.join(', ')}`);
    });
    
    return card;
}

// Create star rating display
function createStarRating(rating) {
    // Calculate full and half stars
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    // Generate star HTML
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Filter movies based on search and genre
function filterMovies() {
    const filteredMovies = movies.filter(movie => {
        // Check search term
        const matchesSearch = movie.title.toLowerCase().includes(currentSearch.toLowerCase());
        
        // Check genre filter
        const matchesGenre = currentGenre === 'all' || movie.genres.includes(currentGenre);
        
        return matchesSearch && matchesGenre;
    });
    
    // Update movie count
    updateMovieCount(filteredMovies.length);
    
    // Render filtered movies
    renderMovies(filteredMovies);
}

// Update movie count display
function updateMovieCount(count) {
    movieCount.textContent = `Showing ${count} movie${count !== 1 ? 's' : ''}`;
}

// Toggle dark/light mode
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
}

// Set up event listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterMovies();
    });
    
    // Genre filter
    genreFilter.addEventListener('change', (e) => {
        currentGenre = e.target.value;
        filterMovies();
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTheme(); // Switch to dark mode if saved
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);