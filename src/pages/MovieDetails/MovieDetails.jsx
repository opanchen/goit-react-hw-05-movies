import { useEffect, useRef, useState, Suspense } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import { moviesAPI } from "services/moviesAPI";
import Loader from "components/Loader/Loader";
import css from "./MovieDetails.module.css";
import MovieMainInfo from "components/MovieMainInfo/MovieMainInfo";

const MovieDatails = () => {

    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    
    const backLinkLocationRef = useRef(location.state?.from ?? '/movies');
 
    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        setIsLoading(true)


        const fetchData = async () => {
            try {
                const data = await moviesAPI.getDetails(movieId, signal)

                if (data.success === false) {
                    setError('Something went wrong... Information about this movie was not found yet. Please try again later.')
                    return
                }

                setMovie(data);
            } catch (error) {
                setError('Something went wrong... Please try again later.')
            } finally {
                setIsLoading(false)
            }
        } 

        fetchData()
    
        return () => controller.abort();
    
    }, [movieId])

    return (
        <div className={css.wrapper}>
            <Link to={backLinkLocationRef.current} className={css['page-link']}>Go back</Link>
            {isLoading && <Loader />}
            {error && <div>{error}</div>}
            {movie && 
                <>
                    <MovieMainInfo movie={movie} />

                    <section className={css['add-info']}>
                        <h2>Additional information</h2>
                        <ul className={css['add-nav']}>
                        <li>
                            <Link to={'cast'} className={css['page-link']}>Cast</Link>
                        </li>
                        <li>
                            <Link to={'reviews'} className={css['page-link']}>Reviews</Link>
                        </li>
                    </ul>

                    <Suspense fallback={<Loader/>}>
                        <Outlet />
                    </Suspense>
                    </section>
                </>
            }
        </div>
    )
}

export default MovieDatails;