import PageLayout from '@/app/global components/PageLayouts/layout';
import PageName from '@/app/global components/PageName';
import SearchBar from '@/app/global components/SearchBar';
import React from 'react';
import AddOrReplaceButtonWrapper from '../components/AddOrReplaceButtonWrapper';
import ExerciseListWrapper from '../components/ExerciseListWrapper';
import AddNewExerciseButton from '@/app/global components/AddNewExerciseButton';
import CustomLink from '@/app/global components/CustomLink';
import FilterCustomExercises from '@/app/exercises/components/FilterCustomExercises';
import FilterHiddenExercises from '@/app/exercises/components/FilterHiddenExercises';

const selectExercises = (
    { searchParams }: {
        searchParams?: {
            query?: string;
            filterCustomExercises?: string;
            filterHiddenExercises?: string;
        }
    }) => {
    const pageName: string = "Select Exercises";
    const filterByCustom = searchParams?.filterCustomExercises === "true" || false;
    const filterByHidden = searchParams?.filterHiddenExercises === "true" || false;
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
            <div className='flex flex-row w-4/12 justify-between items-center mt-3'>
                <FilterCustomExercises />
                <FilterHiddenExercises />
            </div>
            <ExerciseListWrapper query={query} filterByCustom={filterByCustom} filterByHidden={filterByHidden} singleSelect={false} />
        </PageLayout>
    )
}

export default selectExercises