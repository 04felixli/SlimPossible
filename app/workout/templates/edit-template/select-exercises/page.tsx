import Button from '@/app/global components/Buttons/Button';
import PageLayout from '@/app/global components/layout';
import PageName from '@/app/global components/PageName';
import SearchBar from '@/app/global components/SearchBar';
import React from 'react'
import Link from 'next/link';
import ExercisesList from '../../../components/ExerciseList';
import AddOrReplaceButtonWrapper from '../../components/AddOrReplaceButtonWrapper';

const selectExercises = (
    { searchParams }: {
        searchParams: {
            query?: string;
            id: string;
        }
    }) => {
    const pageName: string = "Select Exercises";
    const query: string = searchParams.query || '';
    const templateId: number = parseInt(searchParams.id);

    return (
        <PageLayout>
            <PageName name={pageName} />
            <div className='mb-5 flex justify-between'>
                <Link href={`/workout/templates/edit-template?id=${templateId}`}>
                    <AddOrReplaceButtonWrapper isAddButton={true} />
                </Link>
                <Button text={'Create New Exercise'} />
            </div>
            <SearchBar />
            <ExercisesList query={query} singleSelect={false} />
        </PageLayout>
    )
}

export default selectExercises