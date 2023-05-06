import { moviesAPI } from "services/moviesAPI";
import { useEffect, useState } from "react";
import MovieList from "components/MovieList/MovieList";
import Loader from "components/Loader/Loader";

const Home = () => {

    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        
        const fetchData = async () => {
            
            try {
                setIsLoading(true);

                const data = await moviesAPI.getTrending(signal)
                setMovies(data.results)
            } catch (error) {
                console.log(error);
                setError('Something went wrong... Please, try again later.')
            } finally {
                setIsLoading(false);
            }


        } 

        fetchData()
    
        return () =>  controller.abort();
    
    }, [])

   


    return (
        <section style={{paddingLeft: 16, paddingRight: 16}}>
            <h1 className="visually-hidden">Popular movies</h1>
        {isLoading && <Loader/>}
        {error && <div>{error}</div>}
        {movies && <MovieList movies={movies}/>}
        </section>
    )
}

export default Home;