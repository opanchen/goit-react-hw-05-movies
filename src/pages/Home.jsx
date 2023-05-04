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
            // console.log(data.results);
        } 

        fetchData()
    
        return () => {
            console.log('unmount');
            controller.abort();
        }
    }, [])

   


    return (
        <section>
            <h1 className="visually-hidden">Popular movies</h1>
        <b>Home:</b> домашня сторінка зі списком популярних кінофільмів.
        {movies && <MovieList movies={movies}/>}
        </section>
    )
}

export default Home;