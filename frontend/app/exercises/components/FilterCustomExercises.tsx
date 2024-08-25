"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import CheckBoxFilter from './CheckBoxFilter';

interface Props {
    className?: string;
}

const FilterCustomExercises = ({ className }: Props) => {
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
            className={className}
            onChangeFunction={handleCustomFilter}
            labelText='Custom'
            classNameForLabelText='font-thin'
        />
    );
}

export default FilterCustomExercises;
