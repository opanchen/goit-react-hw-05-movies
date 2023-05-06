import { moviesAPI } from "services/moviesAPI";
import defaultImg from "../../images/defaultPoster.jpeg";
import css from "./MovieMainInfo.module.css";
import PropTypes from "prop-types";

const MovieMainInfo = ({movie}) => {

    const {title, overview, release_date:releaseDate, genres, poster_path:poster, vote_average:vote} = movie;

    const posterPath = poster ? `${moviesAPI.imgBaseURL}${poster}` : defaultImg;

    const year = releaseDate ? releaseDate.slice(0, 4) : 'unknown';

    return (
        <section className={css['main-info']}>
        <img src={posterPath} alt={title} width={320}/>
        <div className={css.description} >
            <h1>{title} ({year})</h1>
            <p>User Score: {Math.round(Number(vote) * 10)}%  </p>
            <div className={css['descr-item']}>
                <h2>Overview</h2>
                <p>{overview}</p>
            </div>
            <div className={css['descr-item']}>
                <h2>Genres</h2>
                <p>{genres?.length !== 0 ? genres.map(item => item.name).join(' ') : 'unknown'}</p>
            </div>
        </div>
       </section>
    )
}

MovieMainInfo.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      release_date: PropTypes.string,
      genres: PropTypes.array,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
    }).isRequired,
}

export default MovieMainInfo;