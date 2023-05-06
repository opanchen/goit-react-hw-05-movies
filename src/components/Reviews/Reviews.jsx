import Loader from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "services/moviesAPI";
import css from "./Reviews.module.css";

const Reviews = () => {

    const {movieId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const controller = new AbortController();
        const { signal } = controller;

        setIsLoading(true);

        const fetchData = async () => {
            try {
                const {results} = await moviesAPI.getReviews(movieId, signal)
               
                if (results.length === 0) {
                    setError("There aren't reviews for this movie yet. Try again later.")
                    return
                }
               
                setReviews(results)
            } catch (error) {
               setError("There aren't reviews for this movie yet. Try again later.")
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
        {reviews.length !== 0 && <ul className={css['review-list']}>
            {reviews.map(({author, content, id, created_at}) => { 
            
                const date = new Date(created_at);
                const formatedDate = date.toLocaleString();
            
                return (
                <li key={id} className={css.item}>
                    <h3>Author: {author}</h3>
                    <p>{content}</p>
                    <p className={css['review-date']}>{formatedDate}</p>
                </li>
            )})}
            </ul>
        }

        </>
    )    
}

export default Reviews;