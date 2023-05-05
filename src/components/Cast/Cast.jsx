import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "services/moviesAPI";

import  Loader  from "components/Loader/Loader";
import CastItem from "./CastItem/CastItem";
import css from "./Cast.module.css";

const Cast = () => {

    const {movieId} = useParams();
    const [cast, setCast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const controller = new AbortController();
        const { signal } = controller;

        setIsLoading(true);

        const fetchData = async () => {
            try {
                const {cast} = await moviesAPI.getCast(movieId, signal);
                setCast(cast);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } 

        fetchData()

        return () =>  controller.abort();

    }, [movieId])
    
    return (
        <div>
            {isLoading && <Loader/>}
            {(cast && cast.length !==0 ) ? 
                <ul className={css['cast-list']} >
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
                : <div>Cast of this movie wasn't found. Please try again later.</div>
            }
        </div>
    )
}

export default Cast;

