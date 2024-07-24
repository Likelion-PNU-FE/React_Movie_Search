import React from 'react';
import { useAtom } from 'jotai';
import { searchQueryAtom } from './atom';

const SearchForm = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSearch) onSearch(searchQuery);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Search for movies..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;