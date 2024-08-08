import PageLayout from '@/app/global components/PageLayouts/layout';
import PageName from '@/app/global components/PageName';
import SearchBar from '@/app/global components/SearchBar';
import React from 'react'
import Link from 'next/link';
import AddOrReplaceButtonWrapper from '../components/AddOrReplaceButtonWrapper';
import ExerciseListWrapper from '../components/ExerciseListWrapper';
import AddNewExerciseButton from '@/app/global components/AddNewExerciseButton';

const replaceExercises = (
    { searchParams }: {
        searchParams: {
            query?: string;
            id: string;
            inoetr: string; // insertion number of the exercise to replace
        }
    }) => {
    const pageName: string = "Replace Exercise";
    const query: string = searchParams.query || '';
    const exerciseToReplaceId: number = parseInt(searchParams.id);
    const insertionNumberOfExerciseToReplace: number = parseInt(searchParams.inoetr);

    return (
        <PageLayout activePage='/history'>
            <PageName name={pageName} />
            <div className='mb-5 flex justify-between max-sm:flex-col'>
                <Link href="/history/edit" className='max-sm:mb-3'>
                    <AddOrReplaceButtonWrapper isAddButton={false} exerciseToReplaceId={exerciseToReplaceId} insertionNumberOfExerciseToReplace={insertionNumberOfExerciseToReplace} />
                </Link>
                <AddNewExerciseButton />
            </div>
            <SearchBar />
            <ExerciseListWrapper query={query} singleSelect={true} />
        </PageLayout>
    )
}

export default replaceExercises