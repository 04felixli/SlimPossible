import PageLayout from '@/app/global components/PageLayouts/layout';
import PageName from '@/app/global components/PageName';
import SearchBar from '@/app/global components/SearchBar';
import React from 'react';
import AddOrReplaceButtonWrapper from '../components/AddOrReplaceButtonWrapper';
import ExerciseListWrapper from '../components/ExerciseListWrapper';
import AddNewExerciseButton from '@/app/global components/AddNewExerciseButton';
import CustomLink from '@/app/global components/CustomLink';

const selectExercises = (
    { searchParams }: {
        searchParams?: {
            query?: string;
            page?: string;
        }
    }) => {
    const pageName: string = "Select Exercises";
    const query: string = searchParams?.query || '';

    return (
        <PageLayout activePage='/workout'>
            <PageName name={pageName} />
            <div className='mb-5 flex justify-between max-sm:flex-col'>
                <CustomLink href="/workout/start" className='max-sm:mb-3'>
                    <AddOrReplaceButtonWrapper isAddButton={true} />
                </CustomLink>
                <AddNewExerciseButton />
            </div>
            <SearchBar />
            <ExerciseListWrapper query={query} singleSelect={false} />
        </PageLayout>
    )
}

export default selectExercises