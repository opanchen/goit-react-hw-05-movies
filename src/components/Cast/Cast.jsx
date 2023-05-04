import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "services/moviesAPI";

import  Loader  from "components/Loader/Loader";
import CastItem from "./CastItem/CastItem";

// !!! перевірити кількість рендеру та запитів в useEffect, треба оптимізовувавти!


const Cast = () => {

    const {movieId} = useParams();
    const [cast, setCast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true);

        const fetchData = async () => {
            try {
                const {cast} = await moviesAPI.getCast(movieId);
                setCast(cast);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } 

        fetchData()
    }, [movieId])
    
    return (
        <div>
            {isLoading && <Loader/>}
            {cast && 
                <ul>
                    {cast.filter(({known_for_department:role}) => role === 'Acting')
                    .map(({name, character, profile_path:img, gender}) => 
                    <CastItem
                        name={name}
                        character={character}
                        img={img}
                        gender={gender}
                        key={name + character}
                    /> )}
                </ul>
            }
        </div>
    )
}

export default Cast;

// {
//     const defaultImg = gender === 1 ? defaultImgF : defaultImgM;
//     const imgPath = img ? `${imgBaseURL}${img}` : defaultImg;
//     return (
//     <li key={name + character}>
//         <div>
//             <img src={imgPath} alt={name} width={120}/>
//             <p>{name}</p>
//             <p>Character: 
//                 {character ? ` ${character}` : ' unknown'}
//             </p>
//         </div>
//     </li>
// )}