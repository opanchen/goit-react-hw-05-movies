import { useEffect, useRef, useState, Suspense } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { moviesAPI } from "services/moviesAPI";
import Loader from "components/Loader/Loader";

const MovieDatails = () => {

   const { movieId } = useParams();

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('Something went wrong... Try again later.')
    const [status, setStatus] = useState('idle')

    const location = useLocation();
    // console.log('film location: ', location);

    const backLinkLocationRef = useRef(location.state?.from ?? '/movies')
    // console.log('ref: ', backLinkLocationRef.current);



    useEffect(() => {
        setStatus('pending')
        const fetchData = async () => {
            try {
                const data = await moviesAPI.getDetails(movieId)
                if (data.success === false) {
                    // console.log('not successfull fetch');
                    setError('Something went wrong... Information about this movie was not found yet. Please try again later.')
                    setStatus('rejected')
                    return
                }
                setMovie(data)
                // console.log(movieId);
                // console.log(data);
                setStatus('resolved')
            } catch (error) {
                setStatus('rejected')
            }
        } 

        fetchData()
    
    }, [movieId])

    const renderMarkup = () => {
        if (status === 'idle') {
            return (
                <div>           
                    <b>MovieDatails:</b> сторінка з детальною інформацією про кінофільм - {movieId}.
                    <button type="button">Go back</button>
                </div>
            )
        }
    
        if (status === 'pending') {
           return <Loader/>
        }
    
        if (status === 'resolved') {
            // console.log(movie);
            const imgBaseURL = 'https://image.tmdb.org/t/p/w500'
            const { title, overview, release_date:releaseDate, genres, poster_path:poster, vote_average:vote } = movie;
    
            return (
                <section style={{paddingTop: 24, paddingBottom: 24}}>
                    { movie &&
                    <> 
                        <div style={{outline: '1px solid teal'}}>
                        <img src={imgBaseURL+poster} alt="" width={320}/>
                        <h2>{title} ({releaseDate})</h2>
                        <p>User Score: {Number(vote) * 10}%  </p>
                        <h3>Overview</h3>
                        <p>{overview}</p>
                        <h3>Genres</h3>
                        <p>{genres.map(item => item.name).join(' ')}</p>
        
                    </div>
                    <div>
                        <p>Additional information</p>
                        <ul>
                        <li>
                            <Link to={'cast'}>Cast</Link>
                        </li>
                        <li>
                            <Link to={'reviews'}>Reviews</Link>
                        </li>
                    </ul>
                    </div>
                    </>}
                    
                    <Suspense fallback={<Loader/>}>
                        <Outlet />
                    </Suspense>
                 
                    </section>
            )
        }
    
        if (status === 'rejected') {
            return <div>{error}</div>
        }
    }


    // if (status === 'idle') {
    //     return (
    //         <div>           
    //             <b>MovieDatails:</b> сторінка з детальною інформацією про кінофільм - {movieId}.
    //             <button type="button">Go back</button>
    //         </div>
    //     )
    // }

    // if (status === 'pending') {
    //    return <Loader/>
    // }

    // if (status === 'resolved') {
    //     // console.log(movie);
    //     const imgBaseURL = 'https://image.tmdb.org/t/p/w500'
    //     const { title, overview, release_date:releaseDate, genres, poster_path:poster, vote_average:vote } = movie;

    //     return (
    //         <div>
    //             <Link to={backLinkLocationRef.current} >Go back</Link>
    //             { movie &&
    //             <>
                   
    //                 <div style={{outline: '1px solid teal'}}>
    //                 <img src={imgBaseURL+poster} alt="" width={320}/>
    //                 <h2>{title} ({releaseDate})</h2>
    //                 <p>User Score: {Number(vote) * 10}%  </p>
    //                 <h3>Overview</h3>
    //                 <p>{overview}</p>
    //                 <h3>Genres</h3>
    //                 <p>{genres.map(item => item.name).join(' ')}</p>
    
    //             </div>
    //             <div>
    //                 <p>Additional information</p>
    //                 <ul>
    //                 <li>
    //                     <Link to={'cast'}>Cast</Link>
    //                 </li>
    //                 <li>
    //                     <Link to={'reviews'}>Reviews</Link>
    //                 </li>
    //             </ul>
    //             </div>
    //             </>}
                
    //             <Suspense fallback={<Loader/>}>
    //                 <Outlet />
    //             </Suspense>
             
    //             </div>
    //     )
    // }

    // if (status === 'rejected') {
    //     return <div>{error}</div>
    // }

    return (
        <>
        <Link to={backLinkLocationRef.current} >Go back</Link>
       { renderMarkup() }
        </>
        )
}

export default MovieDatails;