import { useState } from "react";
import css from "./FilterForm.module.css";

const FilterForm = ({onSubmit}) => {

    const [query, setQuery] = useState('')

    const handleChangeQuery = (e) => {
        setQuery(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (query.trim() === '') {
            return alert('Enter search query...');
        }
    
        onSubmit(query);
        setQuery('')
    }

    return (
        <form onSubmit={handleSubmit} className={css.form}>
        <label>
         <input type="text" name={query} value={query} onChange={handleChangeQuery} className={css.input}
         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
         title="Name may contain only letters, apostrophe, dash and spaces."
         placeholder="Enter query to search movies"
         />
        </label>
        <button type="submit" className={css['search-btn']}>Search</button>
     </form>
    )
}

export default FilterForm;