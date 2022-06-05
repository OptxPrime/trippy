// https://flowbite.com/docs/forms/search-input/

import {useState} from "react";

export const SearchInput = ({handleSearch}) => {

    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div className="flex items-center" style={{marginTop: '1em'}}>
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"></path>
                    </svg>
                </div>
                <input type="text" id="simple-search"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-300 focus:border-sky-300 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search" required value={query} onChange={handleChange} onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleSearch(query);
                    }
                }}/>
            </div>
            <button type="button"
                    onClick={() => handleSearch(query)}
                    className="p-2.5 ml-2 text-sm font-medium text-black dark:text-white bg-sky-300 rounded-lg border border-sky-300 dark:border-sky-700 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-200 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </div>
    );
}