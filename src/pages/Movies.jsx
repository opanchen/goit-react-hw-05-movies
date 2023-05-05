import FilterForm from "components/FilterForm/FilterForm";
import Loader from "components/Loader/Loader";
import MovieList from "components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { moviesAPI } from "services/moviesAPI";


const Movies = () => {

    const [movies, setMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        
                setMovies(data.results);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } 

        loadMovies()
        
        return () =>  controller.abort();

    }, [query])
 
    const onFilterSubmit = (query) => {
        setSearchParams({query})
    }

    return (
        <section>
            <h1 className="visually-hidden">Search movies</h1>
            <FilterForm onSubmit={onFilterSubmit}/>
            {isLoading && <Loader/>}
            {movies && ( movies.length !== 0 
                ? <MovieList movies={movies} /> 
                : <div>Movies with this query weren't found. Please enter valid query and try again!
                </div>)}
        </section>
    )
}

export default Movies;