import { useEffect, useRef, useState, Suspense } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import { moviesAPI } from "services/moviesAPI";
import Loader from "components/Loader/Loader";
import defaultImg from "../../images/defaultPoster.jpeg";
import css from "./MovieDetails.module.css";

const MovieDatails = () => {

    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('Something went wrong... Try again later.');
    const [status, setStatus] = useState('idle');

    const location = useLocation();
    
    const backLinkLocationRef = useRef(location.state?.from ?? '/movies');
 
    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        setStatus('pending')

        const fetchData = async () => {
            try {
                const data = await moviesAPI.getDetails(movieId, signal)

                if (data.success === false) {
                    setError('Something went wrong... Information about this movie was not found yet. Please try again later.')
                    setStatus('rejected')
                    return
                }

                setMovie(data);
                setStatus('resolved');
            } catch (error) {
                setStatus('rejected')
            }
        } 

        fetchData()
    
        return () => controller.abort();
    
    }, [movieId])

    // function to render back-link & result together without additional Outlet:
    const renderMarkup = () => {
    
        if (status === 'pending') {
           return <Loader/>
        }
    
        if (status === 'resolved') {
            
            const { title, overview, release_date:releaseDate, genres, poster_path:poster, vote_average:vote } = movie;

            const posterPath = poster ? `${moviesAPI.imgBaseURL}${poster}` : defaultImg;

            const year = releaseDate ? releaseDate.slice(0, 4) : 'unknown';
    
            return (
                <section style={{paddingTop: 24, paddingBottom: 24}}>
                    { movie &&
                    <> 
                        <div className={css['main-info']}>
                        <img src={posterPath} alt={title} width={320}/>
                        <div className={css.description} >
                            <h1>{title} ({year})</h1>
                            <p>User Score: {Math.round(Number(vote) * 10)}%  </p>
                            <div className={css['descr-item']}>
                                <h2>Overview</h2>
                                <p>{overview}</p>
                            </div>
                            <div className={css['descr-item']}>
                                <h2>Genres</h2>
                                <p>{(genres && genres.length !== 0) ? genres.map(item => item.name).join(' ') : 'unknown'}</p>
                            </div>
                        </div>
        
                    </div>
                    <div className={css['add-info']}>
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
                    </div>
                    </>}
                    </section>
            )
        }
    
        if (status === 'rejected') {
            return <div>{error}</div>
        }
    }

    return (
        <div className={css.wrapper}>
        <Link to={backLinkLocationRef.current} className={css['page-link']}>Go back</Link>
       { renderMarkup() }
        </div>
    )
}

export default MovieDatails;