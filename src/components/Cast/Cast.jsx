import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "services/moviesAPI";

import  Loader  from "components/Loader/Loader";
import CastItem from "./CastItem/CastItem";
import css from "./Cast.module.css";

const Cast = () => {

    const {movieId} = useParams();
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const controller = new AbortController();
        const { signal } = controller;

        setIsLoading(true);

        const fetchData = async () => {
            try {
                const {cast} = await moviesAPI.getCast(movieId, signal);

                if (cast.length === 0) {
                    setError("Cast of this movie wasn't found. Please try again later.")
                    return
                }

                setCast(cast);
            } catch (error) {
                setError("Cast of this movie wasn't found. Please try again later.")
            } finally {
                setIsLoading(false);
            }
        } 

        fetchData()

        return () =>  controller.abort();

    }, [movieId])
    
    return (
        <>
            {isLoading && <Loader/>}
            {error && <div>{error}</div>}
            {cast.length !==0 &&
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
            }
        </>
    )
}

export default Cast;

