"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import CheckBoxFilter from './CheckBoxFilter';

const FilterHiddenExercises = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const viewHidden = searchParams.get('filterHiddenExercises') === 'true';

    const handleHiddenFilter = useDebouncedCallback((viewHidden: boolean) => {
        const params = new URLSearchParams(searchParams);
        if (viewHidden) {
            params.set('filterHiddenExercises', viewHidden.toString());
        } else {
            params.delete('filterHiddenExercises');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <CheckBoxFilter
            checked={viewHidden}
            className=''
            onChangeFunction={handleHiddenFilter}
            labelText='Filter by Hidden Exercises'
        />
    );
}

export default FilterHiddenExercises;
