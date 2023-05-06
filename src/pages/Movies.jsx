import FilterForm from "components/FilterForm/FilterForm";
import Loader from "components/Loader/Loader";
import MovieList from "components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { moviesAPI } from "services/moviesAPI";


const Movies = () => {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');


    useEffect(() => {
        if (!query) return;

        const controller = new AbortController();
        const { signal } = controller;

        const loadMovies = async () => {
            try {
                setIsLoading(true);

                const data = await moviesAPI.getMovies(query, signal);
                
                if (data.results.length === 0) {
                    setError("Movies with this query weren't found. Please enter valid query and try again!")
                    return
                }

                setMovies(data.results);
            } catch (error) {
                setError("Something went wrong. Please try again later!");
            } finally {
                setIsLoading(false);
            }
        } 

        loadMovies()
        
        return () =>  controller.abort();

    }, [query])
 
    const onFilterSubmit = (query) => {
        setError(null)
        setSearchParams({query})
    }

    return (
        <section>
            <h1 className="visually-hidden">Search movies</h1>
            <FilterForm onSubmit={onFilterSubmit}/>
            {isLoading && <Loader/>}
            {error && <div>{error}</div>}
            {movies.length !== 0 && <MovieList movies={movies} /> }
        </section>
    )
}

export default Movies;