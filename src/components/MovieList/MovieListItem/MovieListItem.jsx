import { Link, useLocation } from "react-router-dom";

import { moviesAPI } from "services/moviesAPI"
import defaultImg from "../../../images/defaultPoster.jpeg";
import css from "./MovieListItem.module.css";
import PropTypes from 'prop-types';

const MovieListItem = ({poster, name, title, releaseDate, commonDate, id}) => {

    const location = useLocation();


    const posterPath = poster ? `${moviesAPI.imgBaseURL}${poster}` : defaultImg;

    const year = (releaseDate || commonDate) ? (releaseDate || commonDate).slice(0, 4) : 'unknown';

    return (
        <li key={id} className={css['movie-list__item']}>
        <Link to={`/movies/${id}`} state={{ from: location }}> 
            <div className={css['movie-card']}>
            <div className={css.thumb}>
            <img src={posterPath} alt={title || name} width={240} className={css['item-img']}/>
            </div>
            <div className={css['item-info']}>
            <h2 className={css['item-title']}>{title || name}</h2>
            <p className={css['item-year']}>{year}</p>
            </div>
            </div>
        </Link>
    </li>
    )

}

MovieListItem.propTypes = {
    poster: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number.isRequired,
    releaseDate: PropTypes.string,
    commonDate: PropTypes.string,
}

export default MovieListItem;