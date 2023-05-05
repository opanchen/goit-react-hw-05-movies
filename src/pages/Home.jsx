import { moviesAPI } from "services/moviesAPI";
import { useEffect, useState } from "react";
import MovieList from "components/MovieList/MovieList";

const Home = () => {

    const [movies, setMovies] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {

            const data = await moviesAPI.getTrending(signal)
            setMovies(data.results)
        } 

        fetchData()
    
        return () =>  controller.abort();
    
    }, [])

   


    return (
        <section style={{paddingLeft: 16, paddingRight: 16}}>
            <h1 className="visually-hidden">Popular movies</h1>
        {movies && <MovieList movies={movies}/>}
        </section>
    )
}

export default Home;