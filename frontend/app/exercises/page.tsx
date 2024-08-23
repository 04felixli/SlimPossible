import React from 'react'
import PageLayout from '../global components/PageLayouts/layout'
import PageName from '../global components/PageName'
import SearchBar from '../global components/SearchBar'
import ExerciseList from './components/exerciseList'
import AddNewExerciseButton from '../global components/AddNewExerciseButton'
import { GetExerciseList } from '../global components/Library/apiCalls'
import { ExerciseInList } from './interfaces/exercises'
import FilterCustomExercises from './components/FilterCustomExercises'
import FilterHiddenExercises from './components/FilterHiddenExercises'

const exercises = async (
  { searchParams }: {
    searchParams?: {
      query?: string;
      filterCustomExercises?: string;
      filterHiddenExercises?: string;
    }
  }) => {
  const pageName = "Exercises";
  const query = searchParams?.query || '';
  const filterByCustom = searchParams?.filterCustomExercises === "true" || false;
  const filterByHidden = searchParams?.filterHiddenExercises === "true" || false;
  const exercises: ExerciseInList[] = await GetExerciseList(query, filterByCustom, filterByHidden);

  return (
    <PageLayout activePage='/exercises'>
      <PageName name={pageName} />
      <div className='mb-5 flex justify-center'>
        <AddNewExerciseButton />
      </div>
      <SearchBar />
      <div className='flex flex-row w-4/12 justify-between items-center mt-3'>
        <FilterCustomExercises />
        <FilterHiddenExercises />
      </div>
      <ExerciseList exercises={exercises} />
    </PageLayout>
  )
}

export default exercises