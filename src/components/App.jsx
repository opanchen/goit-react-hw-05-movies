import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
// import Home from "pages/Home";
// import MovieDatails from "pages/MovieDatails";
// import Movies from "pages/Movies";

import SharedLayout from "./SharedLayout/SharedLayout";
// import Cast from "./Cast/Cast";
// import Reviews from "./Reviews/Reviews";

const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const MovieDatails = lazy(() => import('../pages/MovieDatails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'))

export const App = () => {
  return (
     <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={ <Home /> } />
        <Route path="/movies" element={ <Movies /> } />
        <Route path="/movies/:movieId" element={ <MovieDatails /> }>
          <Route path="cast" element={<Cast/>} />
          <Route path="reviews" element={ <Reviews/>} />
        </Route>
        <Route path="*" element={ <Home/> } />
      </Route>
     </Routes>
  );
};
