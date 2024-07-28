import Button from '@/app/global components/Buttons/Button';
import PageLayout from '@/app/global components/PageLayouts/layout';
import PageName from '@/app/global components/PageName';
import SearchBar from '@/app/global components/SearchBar';
import React from 'react'
import Link from 'next/link';
import AddOrReplaceButtonWrapper from '../components/AddOrReplaceButtonWrapper';
import ExerciseListWrapper from '../components/ExerciseListWrapper';

const selectExercises = (
    { searchParams }: {
        searchParams: {
            query?: string;
            from: string; // Either came to replace exercises page from add or edit template page
        }
    }) => {
    const pageName: string = "Select Exercises";
    const query: string = searchParams.query || '';
    const from: string = searchParams.from;

    return (
        <PageLayout activePage='/workout'>
            <PageName name={pageName} />
            <div className='mb-5 flex justify-between'>
                <Link href={`/workout/templates/${from}`}>
                    <AddOrReplaceButtonWrapper isAddButton={true} />
                </Link>
                <Button text={'Create New Exercise'} />
            </div>
            <SearchBar />
            <ExerciseListWrapper query={query} singleSelect={false} />
        </PageLayout>
    )
}

export default selectExercises