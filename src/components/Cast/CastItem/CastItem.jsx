import { moviesAPI } from "services/moviesAPI"
import defaultImgM from "../../../images/defaultProfileM.png";
import defaultImgF from "../../../images/defaultProfileF.png";
import css from "./CastItem.module.css";

const CastItem = ({name, character, img, gender}) => {

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

export default CastItem;