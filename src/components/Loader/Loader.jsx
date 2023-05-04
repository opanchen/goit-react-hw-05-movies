import {ImSpinner3} from "react-icons/im";
import css from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={css.loader}>
            <span className={css['loader-text']}>Loading...</span>
            <ImSpinner3 size={32} className={css['icon-spin']}/> 
        </div>
    )
}

export default Loader;