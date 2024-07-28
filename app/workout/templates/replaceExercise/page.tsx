import Button from '@/app/global components/Buttons/Button';
import PageLayout from '@/app/global components/PageLayouts/layout';
import PageName from '@/app/global components/PageName';
import SearchBar from '@/app/global components/SearchBar';
import React from 'react'
import Link from 'next/link';
import AddOrReplaceButtonWrapper from '../components/AddOrReplaceButtonWrapper';
import ExerciseListWrapper from '../components/ExerciseListWrapper';

const replaceExercises = (
    { searchParams }: {
        searchParams: {
            query?: string;
            from: string; // Either came to replace exercises page from add or edit template page
            id: string;
            inoetr: string; // insertion number of exercise to replace
        }
    }) => {
    const pageName: string = "Replace Exercise";
    const query: string = searchParams.query || '';
    const from: string = searchParams.from;
    const exerciseToReplaceId: number = parseInt(searchParams.id);
    const insertionNumberOfExerciseToReplace: number = parseInt(searchParams.inoetr);

    return (
        <PageLayout activePage='/workout'>
            <PageName name={pageName} />
            <div className='mb-5 flex justify-between'>
                <Link href={`/workout/templates/${from}`}>
                    <AddOrReplaceButtonWrapper isAddButton={false} exerciseToReplaceId={exerciseToReplaceId} insertionNumberOfExerciseToReplace={insertionNumberOfExerciseToReplace} />
                </Link>
                <Button text={'Create New Exercise'} />
            </div>
            <SearchBar />
            <ExerciseListWrapper query={query} singleSelect={true} />
        </PageLayout>
    )
}

export default replaceExercises