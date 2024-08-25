"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import CheckBoxFilter from './CheckBoxFilter';

interface Props {
    className?: string;
}

const FilterHiddenExercises = ({ className }: Props) => {
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
            className={className}
            onChangeFunction={handleHiddenFilter}
            labelText='Hidden'
            classNameForLabelText='font-thin'
        />
    );
}

export default FilterHiddenExercises;
