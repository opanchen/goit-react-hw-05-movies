import { useState } from "react"

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
        console.log('query before submit ', query);
        onSubmit(query);
        setQuery('')
    }

    return (
        <form onSubmit={handleSubmit}>
        <label>
         <input type="text" name={query} value={query} onChange={handleChangeQuery}/>
        </label>
        <button type="submit">Search</button>
     </form>
    )
}

export default FilterForm;