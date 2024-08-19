'use client';
import React from 'react';
import { FaSearch } from "react-icons/fa";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)
    return (
        <label className="input flex items-center gap-2 shadow-md bg-card-bg-gradient-dark">
            <input type="text"
                className="grow"
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <FaSearch className='h-5 w-5' />
        </label>
    )
}

export default SearchBar
