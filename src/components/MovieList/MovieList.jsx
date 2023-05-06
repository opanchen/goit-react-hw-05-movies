import css from "./MovieList.module.css";
import MovieListItem from "./MovieListItem/MovieListItem";
import PropTypes from 'prop-types';

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

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          poster_path: PropTypes.string,
          name: PropTypes.string,
          title: PropTypes.string,
          release_date: PropTypes.string,
          first_air_date: PropTypes.string,
        }),
    ).isRequired,
}

export default MovieList;