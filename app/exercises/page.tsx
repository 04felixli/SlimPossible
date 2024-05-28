import React from 'react'
import PageLayout from '../global components/layout'
import PageName from '../global components/PageName'
import SearchBar from '../global components/SearchBar'
import Button from '../global components/Buttons/Button'
import ExerciseList from './components/exerciseList'

const exercises = (
  { searchParams }: {
    searchParams?: {
      query?: string;
    }
  }) => {
  const pageName = "Exercises";
  const query = searchParams?.query || '';
  return (
    <PageLayout>
      <PageName name={pageName} />
      <div className='mb-5 flex justify-center'>
        <Button text={"Create New Exercise"} />
      </div>
      <SearchBar />
      <ExerciseList query={query} />
    </PageLayout>
  )
}

export default exercises