import Loader from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "services/moviesAPI";

// !!! перевірити кількість рендеру та запитів в useEffect, треба оптимізовувавти!

const Reviews = () => {

    const {movieId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const {results} = await moviesAPI.getReviews(movieId)
                console.log(results);
                setReviews(results)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        } 

        fetchData()

    }, [movieId])


    return (
        <>
        {isLoading && <Loader/>}

        {reviews.length === 0 
            ?   <div>
                    There aren't reviews for this movie yet.
                </div> 
            : <ul>
            {reviews.map(({author, content, id, created_at}) => { 
            
                const date = new Date(created_at);
                const formatedDate = date.toLocaleString();
            
                return (
                <li key={id}>
                    <h3>Author: {author}</h3>
                    <p>{content}</p>
                    <p><b>{formatedDate}</b></p>
                </li>
            )})}
            </ul>
        }

        </>
    )    
}

export default Reviews;