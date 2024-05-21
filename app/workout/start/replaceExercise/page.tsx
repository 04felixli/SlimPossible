import Button from '@/app/global components/Buttons/Button';
import PageLayout from '@/app/global components/layout';
import PageName from '@/app/global components/PageName';
import SearchBar from '@/app/global components/SearchBar';
import React from 'react'
import Link from 'next/link';
import ReplaceButton from './components/ReplaceButton';
import ReplaceExerciseList from './components/ReplaceExerciseList';

const replaceExercises = (
    { searchParams }: {
        searchParams: {
            query?: string;
            id: string;
        }
    }) => {
    const pageName: string = "Replace Exercise";
    const query: string = searchParams.query || '';
    const exerciseToReplaceId: number = parseInt(searchParams.id);

    return (
        <PageLayout>
            <PageName name={pageName} />
            <div className='mb-5 flex justify-between'>
                <Link href="/workout/start">
                    <ReplaceButton exerciseToReplaceId={exerciseToReplaceId} />
                </Link>
                <Button text={'Create New Exercise'} />
            </div>
            <SearchBar />
            <ReplaceExerciseList query={query} />
        </PageLayout>
    )
}

export default replaceExercises