import { moviesAPI } from "services/moviesAPI"
import defaultImgM from "../../../images/defaultProfileM.png";
import defaultImgF from "../../../images/defaultProfileF.png";
import css from "./CastItem.module.css";
import PropTypes from "prop-types";

const CastItem = ({name, character, img, gender}) => {

    // back-end can return gender === 0 irrespective of person's real gender,
    // so we just ignore this case and set "male" default img
    const defaultImg = gender === 1 ? defaultImgF : defaultImgM;

    const imgPath = img ? `${moviesAPI.imgBaseURL}${img}` : defaultImg;

    return (
        <li className={css.item}> 
            <img src={imgPath} alt={name} width={120}/>
            <h3>{name}</h3>
            <p><span className={css.accent}>Character: </span>
                {character ? ` ${character}` : ' unknown'}
            </p>
        </li>
    )

}

CastItem.propTypes = {
    name: PropTypes.string.isRequired,
    character: PropTypes.string,
    img: PropTypes.string,
    gender: PropTypes.number.isRequired,
}

export default CastItem;