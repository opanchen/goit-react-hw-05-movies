import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import css from "./SharedLayout.module.css"

import Loader from "components/Loader/Loader";

const SharedLayout = () => {
    return (
        <div className={css.container}>
            <header className={css.header}>
                <nav>
                    <ul className={css['page-nav']}>
                    <li>
                        <NavLink to="/" className={css['page-nav__link']} >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/movies" className={css['page-nav__link']}>Movies</NavLink>
                    </li>
                    </ul>
                </nav>
            </header>

            <main>
                <Suspense fallback={<Loader/>}>
                  <Outlet />
                </Suspense>
            </main>

            <footer className={css.footer}>
                Footer
            </footer>

        </div>
    )
}

export default SharedLayout;