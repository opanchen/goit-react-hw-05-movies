import { Link, useLocation } from "react-router-dom";

import { moviesAPI } from "services/moviesAPI"
import defaultImg from "../../../images/defaultPoster.jpeg";
import css from "./MovieListItem.module.css";

const MovieListItem = ({poster, name, title, releaseDate, commonDate, id}) => {

    const location = useLocation();


    const posterPath = poster ? `${moviesAPI.imgBaseURL}${poster}` : defaultImg;

    const year = (releaseDate || commonDate) ? (releaseDate || commonDate).slice(0, 4) : 'unknown';

    return (
        <li key={id} className="movie-list__item">
        <Link to={`/movies/${id}`} state={{ from: location }}> 
            <div className={css['movie-card']}>
            <div className={css.thumb}>
            <img src={posterPath} alt={title || name} width={120} className={css['item-img']}/>
            </div>
            <div className={css['item-info']}>
            <p className={css['item-title']}>{title || name}</p>
            <p className={css['item-year']}>{year}</p>
            </div>
            </div>
        </Link>
    </li>
    )

}

export default MovieListItem;