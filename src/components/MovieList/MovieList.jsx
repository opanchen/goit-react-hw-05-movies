
import css from "./MovieList.module.css";
import MovieListItem from "./MovieListItem/MovieListItem";

// !!! Для головної сторінки в to прописувати повний шлях (напевно. глянь конспект!!!)

const MovieList = ({movies}) => {

    return (
        <ul className={css['movie-list']}>
            {movies.map(({id, poster_path, name, title, release_date, first_air_date}) => 
            <MovieListItem
                key={id}
                id={id}
                poster={poster_path}
                name={name}
                title={title}
                releaseDate={release_date}
                commonDate={first_air_date}
            />)}
        </ul>
    )
}

export default MovieList;