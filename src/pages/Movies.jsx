import FilterForm from "components/FilterForm/FilterForm";
import Loader from "components/Loader/Loader";
import MovieList from "components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { moviesAPI } from "services/moviesAPI";
// import { fetchMovieByQuery } from "services/fakeAPI";


const Movies = () => {

    // const [filter, setFilter] = useState('');
    const [movies, setMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');


    useEffect(() => {
        if (!query) return;

        const loadMovies = async () => {
            try {
                setIsLoading(true);

                const data = await moviesAPI.getMovies(query);
            
                setMovies(data.results);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } 

        loadMovies()
        
    }, [query])
 
    const onFilterSubmit = (query) => {
        // setFilter(query);
        setSearchParams({query})
    }

    return (
        <div>
            <b>Movies:</b> сторінка пошуку кінофільмів за ключовим словом.
            <FilterForm onSubmit={onFilterSubmit}/>
            {isLoading && <Loader/>}
            {movies && <MovieList movies={movies} />}
            {/* {movies && console.log(movies)} */}

        </div>
    )
}

export default Movies;