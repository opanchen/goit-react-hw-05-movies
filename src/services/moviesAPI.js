const API_KEY = 'ef2f22bb4de9529af845b70082225b5a';
const imgBaseURL = 'https://image.tmdb.org/t/p/w500'


const fetchTrending = async (signal) => {
    const fetchURL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`

    const response = await fetch(fetchURL, { signal })

    if (!response.ok) throw new Error (response.status)

    const data = await response.json()
    return data
}

const fetchMovieByQuery = async (query, signal) => {
    const fetchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
 
    const response = await fetch(fetchURL, { signal })

    if (!response.ok) throw new Error (response.status)

    const data = await response.json()
    return data
}

const fetchMovieDetails = async (movieID, signal) => {
    const fetchURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`
 
    const response = await fetch(fetchURL, { signal })

    if (!response.ok) throw new Error (response.status)

    const data = await response.json()
    return data
}

const fetchMovieCast = async (movieID, signal) => {
    const fetchURL = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`
 
    const response = await fetch(fetchURL, { signal })

    if (!response.ok) throw new Error (response.status)

    const data = await response.json()
    return data
}

const fetchMovieReviews = async (movieID, signal) => {
    const fetchURL = `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${API_KEY}&language=en-US&page=1`
 
    const response = await fetch(fetchURL, { signal })

    if (!response.ok) throw new Error (response.status)

    const data = await response.json()
    return data
}

export const moviesAPI = {
    getTrending: fetchTrending,
    getMovies: fetchMovieByQuery,
    getDetails: fetchMovieDetails,
    getCast: fetchMovieCast,
    getReviews: fetchMovieReviews,
    imgBaseURL,
}