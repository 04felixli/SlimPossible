import React from 'react'
import PageLayout from '../global components/PageLayouts/layout'
import PageName from '../global components/PageName'
import SearchBar from '../global components/SearchBar'
import ExerciseList from './components/exerciseList'
import AddNewExerciseButton from '../global components/AddNewExerciseButton'
import { GetExerciseList } from '../global components/Library/apiCalls'
import { ExerciseInList } from './interfaces/exercises'

const exercises = async (
  { searchParams }: {
    searchParams?: {
      query?: string;
    }
  }) => {
  const pageName = "Exercises";
  const query = searchParams?.query || '';
  const exercises: ExerciseInList[] = await GetExerciseList(query);

  return (
    <PageLayout activePage='/exercises'>
      <PageName name={pageName} />
      <div className='mb-5 flex justify-center'>
        <AddNewExerciseButton />
      </div>
      <SearchBar />
      <ExerciseList exercises={exercises} />
    </PageLayout>
  )
}

export default exercises