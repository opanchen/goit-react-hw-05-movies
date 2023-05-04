import { moviesAPI } from "services/moviesAPI"
import defaultImgM from "../../../images/defaultProfileM.png";
import defaultImgF from "../../../images/defaultProfileF.png";

const CastItem = ({name, character, img, gender}) => {

    const defaultImg = gender === 1 ? defaultImgF : defaultImgM;

    const imgPath = img ? `${moviesAPI.imgBaseURL}${img}` : defaultImg;

    return (
        <li>
            <div>
                <img src={imgPath} alt={name} width={120}/>
                <p>{name}</p>
                <p>Character: 
                    {character ? ` ${character}` : ' unknown'}
                </p>
            </div>
        </li>
    )

}

export default CastItem;