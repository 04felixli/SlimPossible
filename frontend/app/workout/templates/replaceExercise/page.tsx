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

const replaceExercises = (
    { searchParams }: {
        searchParams: {
            query?: string;
            from: string; // Either came to replace exercises page from add or edit template page
            id: string;
            inoetr: string; // insertion number of exercise to replace
            filterCustomExercises?: string;
            filterHiddenExercises?: string;
        }
    }) => {
    const pageName: string = "Replace Exercise";
    const filterByCustom = searchParams?.filterCustomExercises === "true" || false;
    const filterByHidden = searchParams?.filterHiddenExercises === "true" || false;
    const query: string = searchParams.query || '';
    const from: string = searchParams.from;
    const exerciseToReplaceId: number = parseInt(searchParams.id);
    const insertionNumberOfExerciseToReplace: number = parseInt(searchParams.inoetr);

    return (
        <PageLayout activePage='/workout'>
            <PageName name={pageName} />
            <div className='mb-5 flex justify-between max-sm:flex-col'>
                <CustomLink href={`/workout/templates/${from}`} className='max-sm:mb-3'>
                    <AddOrReplaceButtonWrapper isAddButton={false} exerciseToReplaceId={exerciseToReplaceId} insertionNumberOfExerciseToReplace={insertionNumberOfExerciseToReplace} />
                </CustomLink>
                <AddNewExerciseButton />
            </div>
            <SearchBar />
            <div className='flex flex-col lg:flex-row justify-left mt-3 w-fit'>
                <p>Filters:</p>
                <FilterCustomExercises className='lg:ml-2' />
                <FilterHiddenExercises className='lg:ml-2' />
            </div>
            <ExerciseListWrapper query={query} filterByCustom={filterByCustom} filterByHidden={filterByHidden} singleSelect={true} />
        </PageLayout>
    )
}

export default replaceExercises