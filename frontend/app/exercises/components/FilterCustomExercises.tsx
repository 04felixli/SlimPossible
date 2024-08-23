"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import CheckBoxFilter from './CheckBoxFilter';

const FilterCustomExercises = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const viewCustom = searchParams.get('filterCustomExercises') === 'true';

    const handleCustomFilter = useDebouncedCallback((viewcustom: boolean) => {
        const params = new URLSearchParams(searchParams);
        if (viewcustom) {
            params.set('filterCustomExercises', viewcustom.toString());
        } else {
            params.delete('filterCustomExercises');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <CheckBoxFilter
            checked={viewCustom}
            className=''
            onChangeFunction={handleCustomFilter}
            labelText='Filter by Custom Exercises'
        />
    );
}

export default FilterCustomExercises;
