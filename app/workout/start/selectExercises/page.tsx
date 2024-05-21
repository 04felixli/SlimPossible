import Button from '@/app/global components/Buttons/Button';
import PageLayout from '@/app/global components/layout';
import PageName from '@/app/global components/PageName';
import SearchBar from '@/app/global components/SearchBar';
import React from 'react'
import SelectExercisesList from './components/SelectExercisesList';
import AddButton from './components/AddButton';
import Link from 'next/link';

const selectExercises = (
    { searchParams }: {
        searchParams?: {
            query?: string;
            page?: string;
        }
    }) => {
    const pageName = "Select Exercises";
    const query = searchParams?.query || '';

    return (
        <PageLayout>
            <PageName name={pageName} />
            <div className='mb-5 flex justify-between'>
                <Link href="/workout/start">
                    <AddButton />
                </Link>
                <Button text={'Create New Exercise'} />
            </div>
            <SearchBar />
            <SelectExercisesList query={query} />
        </PageLayout>
    )
}

export default selectExercises