import { ExerciseInList } from "@/app/exercises/interfaces/exercises";
import { postCompletedWorkoutServerAction } from "@/app/global components/Library/actions";
import { PostCompletedWorkout } from "@/app/global components/Library/apiCalls";
import { formatTime } from "@/app/global components/Library/utilFunctions";
import { Exercise, Workout, WorkoutSet } from "@/app/workout/objects/classes";

export const addSet = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, insertionNumber: number) => {
    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.map(exercise => {
            if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                const newSet = new WorkoutSet(exercise.sets.length + 1);
                const updatedSets = [...exercise.sets, { ...newSet, setNumber: exercise.sets.length + 1 }];
                return { ...exercise, sets: updatedSets };
            }
            return exercise;
        })
        return { ...prevWorkout, exercises: updatedExercises };
    });
}

export const removeExercise = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, insertionNumber: number) => {
    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.filter(exercise => exercise.id !== exerciseId || exercise.insertionNumber !== insertionNumber);
        return { ...prevWorkout, exercises: updatedExercises };
    })
}

export const changeWeightUnit = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, insertionNumber: number) => {
    const lbsToKgs = (lbs: number): number => {
        const kgs = lbs * 0.45359237;
        return +kgs.toFixed(2);
    }

    const kgsToLbs = (kgs: number): number => {
        const lbs = kgs / 0.45359237;
        return +lbs.toFixed(2);
    }

    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.map(exercise => {
            if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                const updatedSets = exercise.sets.map(set => {
                    if (exercise.weightUnit === 'lbs') {
                        return { ...set, weight: lbsToKgs(set.weight) }
                    }
                    return { ...set, weight: kgsToLbs(set.weight) }
                })

                return { ...exercise, sets: updatedSets, weightUnit: exercise.weightUnit === 'lbs' ? 'kgs' : 'lbs' };
            }
            return exercise;
        })
        return { ...prevWorkout, exercises: updatedExercises };
    })
}

export const updateNotes = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, value: string, insertionNumber: number): void => {
    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.map(exercise => {
            if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                return { ...exercise, notes: value };
            }
            return exercise;
        })
        return { ...prevWorkout, exercises: updatedExercises };
    })
}

export const toggleNotes = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, insertionNumber: number): void => {
    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.map(exercise => {
            if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                return { ...exercise, showNotes: !exercise.showNotes };
            }
            return exercise;
        })
        return { ...prevWorkout, exercises: updatedExercises };
    })
}

export const addExercises = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>) => {
    setWorkout(prevWorkout => {
        // Update each exercises insertion number
        const processedExercisesToAdd = prevWorkout.exercisesToAdd.map((exercise, index) => {
            const newInsertionNumber = prevWorkout.totalNumExercisesAddedEver + index
            return { ...exercise, insertionNumber: newInsertionNumber }
        })

        // 1. Update workout.exercises
        // 2. Clear workout.exercisesToAdd
        // 3. Increment workout.totalNumExercisesAddedEver by the number of workouts added
        return { ...prevWorkout, exercises: [...prevWorkout.exercises, ...processedExercisesToAdd], exercisesToAdd: [], totalNumExercisesAddedEver: prevWorkout.totalNumExercisesAddedEver + processedExercisesToAdd.length }
    })
}

export const replaceExercise = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseToReplaceId?: number, insertionNumberOfExerciseToReplace?: number) => {
    setWorkout(prevWorkout => {
        // Update the exercise to replace with workout.replacementExercise
        const updatedExercises = prevWorkout.exercises.map(exercise => {
            if (exercise.id === exerciseToReplaceId && exercise.insertionNumber === insertionNumberOfExerciseToReplace && prevWorkout.replacementExercise) {
                const replacementExercise = { ...prevWorkout.replacementExercise, insertionNumber: insertionNumberOfExerciseToReplace }

                return replacementExercise
            }

            return exercise
        })

        // 1. Update workout.exercises 
        // 2. Clear workout.replacementExercise
        return { ...prevWorkout, exercises: updatedExercises, replacementExercise: undefined }
    })
}

// Set selected exercises
export const multipleExerciseSelect = (workout: Workout, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, selectedExercise: ExerciseInList): void => {
    // Create a new exercise object from selectedExercise
    const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');

    // Check if the exercise is already selected
    const isSelected = workout.exercisesToAdd.some(selected => selected.id === exercise.id);

    if (isSelected) {
        // Remove the exercise if it's already selected
        const updatedExercises = workout.exercisesToAdd.filter(selected => selected.id !== exercise.id);
        setWorkout({ ...workout, exercisesToAdd: updatedExercises });
    } else {
        // Add the exercise if it's not already selected
        const updatedExercises = [...workout.exercisesToAdd, exercise];
        setWorkout({ ...workout, exercisesToAdd: updatedExercises });
    }
};

// Set replacement exercise
export const singleExerciseSelect = (workout: Workout, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, selectedExercise: ExerciseInList): void => {
    const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');
    const isSelected = workout.replacementExercise?.id === exercise.id ? true : false;

    if (isSelected) {
        setWorkout({ ...workout, replacementExercise: undefined });
    } else {
        const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');
        setWorkout({ ...workout, replacementExercise: exercise });
    }
};

export const toggleCompletedSet = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, setNumber: number, insertionNumber: number) => {
    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.map(ex => {
            if (ex.id === exerciseId && ex.insertionNumber === insertionNumber) {
                const updatedSets = ex.sets.map(set => {
                    if (set.setNumber === setNumber) {
                        return { ...set, isCompleted: !set.isCompleted };
                    }
                    return set;
                });
                return { ...ex, sets: updatedSets };
            }
            return ex;
        })
        return { ...prevWorkout, exercises: updatedExercises };
    })
}

export const changeWeightValue = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => {
    const newWeight = event.target.value ? parseFloat(event.target.value) : -1;

    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.map(ex => {
            if (ex.id === exerciseId && ex.insertionNumber === insertionNumber) {
                const updatedSets = ex.sets.map(set => {
                    if (set.setNumber === setNumber && newWeight !== -1) {
                        return { ...set, weight: newWeight };
                    } else if (set.setNumber === setNumber && newWeight === -1) {
                        return { ...set, weight: newWeight, isCompleted: false };
                    }
                    return set;
                });
                return { ...ex, sets: updatedSets };
            }
            return ex
        })
        return { ...prevWorkout, exercises: updatedExercises };
    })
};

export const changeRepsValue = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => {
    const newReps = event.target.value ? parseInt(event.target.value, 10) : -1;

    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.map(ex => {
            if (ex.id === exerciseId && ex.insertionNumber === insertionNumber) {
                const updatedSets = ex.sets.map(set => {
                    if (set.setNumber === setNumber && newReps !== -1) {
                        return { ...set, reps: newReps };
                    } else if (set.setNumber === setNumber && newReps === -1) {
                        return { ...set, reps: newReps, isCompleted: false };
                    }
                    return set;
                });
                return { ...ex, sets: updatedSets };
            }
            return ex
        })
        return { ...prevWorkout, exercises: updatedExercises };
    })
};

export const startWorkout = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, intervalIdRef: React.MutableRefObject<NodeJS.Timeout | null>) => {
    setWorkout(prevWorkout => {
        const newWorkout = { ...prevWorkout, startTime: new Date(), duration: 0 };
        return newWorkout;
    });

    if (intervalIdRef.current) {
        // Interval already running, no need to start a new one
        return;
    }

    intervalIdRef.current = setInterval(() => {
        setWorkout(prevWorkout => {
            if (!prevWorkout.startTime) return prevWorkout; // Don't run in case a workout hasn't been started
            const newDuration = prevWorkout.duration + 1;
            const newWorkout = { ...prevWorkout, duration: newDuration };
            return newWorkout;
        });
    }, 1000);
}

export const endWorkout = async (workout: Workout, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, intervalIdRef: React.MutableRefObject<NodeJS.Timeout | null>, post: boolean) => {
    if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    }

    // 1. workout.endTime = workout.startTime + workout.duration
    // 2. Send POST request to API
    // 3. Reset workout to initial state
    const durationInMillis = workout.duration * 1000;
    const updatedEndTime = new Date(workout.startTime!.getTime() + durationInMillis);

    const updatedWorkout: Workout = { ...workout, endTime: updatedEndTime };

    if (post) { await postCompletedWorkoutServerAction(updatedWorkout); }
    resetWorkout(setWorkout);
};

export const resetWorkout = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>) => {
    setWorkout(new Workout());
}

export const changeStartAndEndTime = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, newStartTime: Date, newEndTime: Date) => {
    const newStartTimeDate = new Date(newStartTime);
    const newEndTimeDate = new Date(newEndTime);

    setWorkout(prevWorkout => {
        return { ...prevWorkout, startTime: newStartTimeDate, endTime: newEndTimeDate };
    })
}