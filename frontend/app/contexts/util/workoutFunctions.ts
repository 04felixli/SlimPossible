import { ExerciseInList } from "@/app/exercises/interfaces/exercises";
import { deleteHistoryServerAction, deleteTemplateServerAction, postCompletedWorkoutServerAction, postTemplateServerAction, redirectServerAction, updateHistoryServerAction, updateTemplateServerAction } from "@/app/global components/Library/actions";
import { computeTotalVolume, deleteCookies, deleteLocalStorage, GetWorkoutTime, setCookies, setLocalStorage } from "@/app/global components/Library/utilFunctions";
import { Exercise, Workout, WorkoutSet } from "@/app/global components/objects/classes";

export enum action {
    post = 'post',
    update = 'update',
    cancel = 'cancel',
    delete = 'delete'
}

export enum localStorageKeys {
    workout = 'workoutObject',
    history = 'historyObject',
    template = 'templateObject',
}

export enum cookieKeys {
    workout = 'exercisesInWorkout',
    history = 'exercisesInHistory',
    template = 'exercisesInTemplate',
    isEditTemplate = 'isEditTemplate',
}

export interface CookieValueType {
    exerciseId: number;
    insertionNumber: number;
}

const cookieExpTime: number = 1;

export const addSet = (localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, insertionNumber: number) => {
    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.map(exercise => {
            if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                const newSet = new WorkoutSet(exercise.sets.length + 1);
                const updatedSets = [...exercise.sets, { ...newSet, setNumber: exercise.sets.length + 1 }];
                return { ...exercise, sets: updatedSets };
            }
            return exercise;
        })
        const updatedWorkout = { ...prevWorkout, exercises: updatedExercises };
        setLocalStorage(localStorageKey, updatedWorkout);
        return updatedWorkout;
    });
}

export const removeExercise = (cookieKey: cookieKeys, localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, insertionNumber: number) => {
    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.filter(exercise => exercise.id !== exerciseId || exercise.insertionNumber !== insertionNumber);
        const updatedWorkout = { ...prevWorkout, exercises: updatedExercises }
        setLocalStorage(localStorageKey, updatedWorkout);
        const cookieValues: CookieValueType[] = updatedWorkout.exercises.map(exercise => {
            return {
                exerciseId: exercise.id,
                insertionNumber: exercise.insertionNumber
            };
        });
        setCookies(cookieKey, cookieValues, cookieExpTime);
        return updatedWorkout;
    })
}

export const changeWeightUnit = (localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, insertionNumber: number) => {
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
        const updatedWorkout = { ...prevWorkout, exercises: updatedExercises };
        setLocalStorage(localStorageKey, updatedWorkout);
        return updatedWorkout;
    })
}

export const updateNotes = (localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, value: string, insertionNumber: number): void => {
    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.map(exercise => {
            if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                return { ...exercise, notes: value };
            }
            return exercise;
        })
        const updatedWorkout = { ...prevWorkout, exercises: updatedExercises };
        setLocalStorage(localStorageKey, updatedWorkout);
        return updatedWorkout;
    })
}

export const toggleNotes = (localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, insertionNumber: number): void => {
    setWorkout(prevWorkout => {
        const updatedExercises = prevWorkout.exercises.map(exercise => {
            if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                return { ...exercise, showNotes: !exercise.showNotes };
            }
            return exercise;
        })
        const updatedWorkout = { ...prevWorkout, exercises: updatedExercises };
        setLocalStorage(localStorageKey, updatedWorkout);
        return updatedWorkout;
    })
}

export const addExercises = (cookieKey: cookieKeys, localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>) => {
    setWorkout(prevWorkout => {
        // Update each exercises insertion number
        const processedExercisesToAdd = prevWorkout.exercisesToAdd.map((exercise, index) => {
            const newInsertionNumber = prevWorkout.totalNumExercisesAddedEver + index
            return { ...exercise, insertionNumber: newInsertionNumber }
        })

        // 1. Update workout.exercises
        // 2. Clear workout.exercisesToAdd
        // 3. Increment workout.totalNumExercisesAddedEver by the number of workouts added
        const updatedWorkout = { ...prevWorkout, exercises: [...prevWorkout.exercises, ...processedExercisesToAdd], exercisesToAdd: [], totalNumExercisesAddedEver: prevWorkout.totalNumExercisesAddedEver + processedExercisesToAdd.length };
        setLocalStorage(localStorageKey, updatedWorkout);
        const cookieValues: CookieValueType[] = updatedWorkout.exercises.map(exercise => {
            return {
                exerciseId: exercise.id,
                insertionNumber: exercise.insertionNumber
            };
        });
        setCookies(cookieKey, cookieValues, cookieExpTime);
        return updatedWorkout;
    })
}

export const replaceExercise = (cookieKey: cookieKeys, localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseToReplaceId?: number, insertionNumberOfExerciseToReplace?: number) => {
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
        const updatedWorkout = { ...prevWorkout, exercises: updatedExercises, replacementExercise: undefined };
        setLocalStorage(localStorageKey, updatedWorkout);
        const cookieValues: CookieValueType[] = updatedWorkout.exercises.map(exercise => {
            return {
                exerciseId: exercise.id,
                insertionNumber: exercise.insertionNumber
            };
        });
        setCookies(cookieKey, cookieValues, cookieExpTime);
        return updatedWorkout;
    })
}

// Set selected exercises
export const multipleExerciseSelect = (localStorageKey: localStorageKeys, workout: Workout, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, selectedExercise: ExerciseInList): void => {
    // Create a new exercise object from selectedExercise
    const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');

    // Check if the exercise is already selected
    const isSelected = workout.exercisesToAdd.some(selected => selected.id === exercise.id);

    if (isSelected) {
        // Remove the exercise if it's already selected
        const updatedExercises = workout.exercisesToAdd.filter(selected => selected.id !== exercise.id);
        setWorkout(prevWorkout => {
            const updatedWorkout = { ...prevWorkout, exercisesToAdd: updatedExercises };
            setLocalStorage(localStorageKey, updatedWorkout);
            return updatedWorkout;
        });
    } else {
        // Add the exercise if it's not already selected
        const updatedExercises = [...workout.exercisesToAdd, exercise];
        setWorkout(prevWorkout => {
            const updatedWorkout = { ...prevWorkout, exercisesToAdd: updatedExercises };
            setLocalStorage(localStorageKey, updatedWorkout);
            return updatedWorkout;
        });
    }
};

// Set replacement exercise
export const singleExerciseSelect = (localStorageKey: localStorageKeys, workout: Workout, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, selectedExercise: ExerciseInList): void => {
    const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');
    const isSelected = workout.replacementExercise?.id === exercise.id ? true : false;

    if (isSelected) {
        setWorkout(prevWorkout => {
            const updatedWorkout = { ...prevWorkout, replacementExercise: undefined };
            setLocalStorage(localStorageKey, updatedWorkout);
            return updatedWorkout;
        });
    } else {
        const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');
        setWorkout(prevWorkout => {
            const updatedWorkout = { ...prevWorkout, replacementExercise: exercise };
            setLocalStorage(localStorageKey, updatedWorkout);
            return updatedWorkout;
        });
    }
};

export const toggleCompletedSet = (localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, setNumber: number, insertionNumber: number) => {
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
        const updatedWorkout = { ...prevWorkout, exercises: updatedExercises };
        setLocalStorage(localStorageKey, updatedWorkout);
        return updatedWorkout;
    })
}

export const changeWeightValue = (localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => {
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
        const updatedWorkout = { ...prevWorkout, exercises: updatedExercises };
        setLocalStorage(localStorageKey, updatedWorkout);
        return updatedWorkout;
    })
};

export const changeRepsValue = (localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => {
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
        const updatedWorkout = { ...prevWorkout, exercises: updatedExercises };
        setLocalStorage(localStorageKey, updatedWorkout);
        return updatedWorkout;
    })
};

export const changeName = (localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, newName: string) => {
    setWorkout(prevWorkout => {
        const updatedWorkout = { ...prevWorkout, name: newName };
        setLocalStorage(localStorageKey, updatedWorkout);
        return updatedWorkout;
    });
}

export const deleteSet = (localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, exerciseId: number, insertionNumber: number, setNumber: number) => {
    setWorkout((prevWorkout) => {
        const updatedExercises = prevWorkout.exercises.map((exercise) => {
            if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                if (exercise.sets.length === 1) {
                    return { ...exercise, sets: [new WorkoutSet(1)] };
                }
                // Filter out the set with the specific setNumber
                const updatedSets = exercise.sets
                    .filter((set) => set.setNumber !== setNumber)
                    .map((set, index) => ({ ...set, setNumber: index + 1 })); // Re-index setNumbers
                return { ...exercise, sets: updatedSets };
            }
            return exercise;
        });

        const newWorkout = { ...prevWorkout, exercises: updatedExercises };
        setLocalStorage(localStorageKey, newWorkout);
        return newWorkout;
    });
}

export const reOrderExercises = (result: any, localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>) => {
    if (!result.destination) {
        return;
    }

    setWorkout(prevWorkout => {
        const exercisesCopy = [...prevWorkout.exercises];
        const [reorderedExercise] = exercisesCopy.splice(result.source.index, 1);
        exercisesCopy.splice(result.destination.index, 0, reorderedExercise);
        const updatedWorkout = { ...prevWorkout, exercises: exercisesCopy };
        setLocalStorage(localStorageKey, updatedWorkout);
        return updatedWorkout;
    })
}

export const startWorkout = (localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, workout?: Workout) => {
    setWorkout(prevWorkout => {
        const newWorkout = !workout ? { ...prevWorkout, startTime: new Date(), duration: 0, name: GetWorkoutTime() + " Workout" } : { ...workout };
        setLocalStorage(localStorageKey, newWorkout);
        const exercisesInWorkout: CookieValueType[] = prevWorkout.exercises.map(exercise => {
            return { exerciseId: exercise.id, insertionNumber: exercise.insertionNumber };
        })
        setCookies(cookieKeys.workout, exercisesInWorkout, cookieExpTime);
        return newWorkout;
    });
}

export const startTemplate = (localStorageKey: localStorageKeys, setTemplate: React.Dispatch<React.SetStateAction<Workout>>, template?: Workout) => {
    setTemplate(prevTemplate => {
        // No provided template means user wants to add new template
        if (!template) {
            setLocalStorage(localStorageKey, prevTemplate);
            setCookies(cookieKeys.template, [], cookieExpTime);
            setCookies(cookieKeys.isEditTemplate, false, cookieExpTime);
            return { ...prevTemplate, startTime: new Date(), duration: 0, name: GetWorkoutTime() + " Workout" };
        }

        setLocalStorage(localStorageKey, template);
        const exercisesInTemplate: CookieValueType[] = template.exercises.map(exercise => {
            return { exerciseId: exercise.id, insertionNumber: exercise.insertionNumber };
        });
        setCookies(cookieKeys.template, exercisesInTemplate, cookieExpTime);
        setCookies(cookieKeys.isEditTemplate, true, cookieExpTime);
        return { ...template, startTime: new Date(), duration: 0 };
    })
}

export const startHistory = (localStorageKey: localStorageKeys, setHistory: React.Dispatch<React.SetStateAction<Workout>>, history: Workout) => {
    setLocalStorage(localStorageKey, history);
    const exercisesInHistory: CookieValueType[] = history.exercises.map(exercise => {
        return { exerciseId: exercise.id, insertionNumber: exercise.insertionNumber };
    });
    setCookies(cookieKeys.history, exercisesInHistory, cookieExpTime);
    setHistory({ ...history });
}

export const endWorkout = async (workout: Workout, setWorkout: React.Dispatch<React.SetStateAction<Workout>>, cause: action) => {
    // 1. workout.endTime = workout.startTime + workout.duration
    // 2. Send POST request to API
    // 3. Reset workout to initial state
    if (cause == action.post) {
        const updatedEndTime = new Date();
        const updatedDuration = Math.floor((updatedEndTime.getTime() - new Date(workout.startTime!).getTime()) / 1000);
        const totalVolume = computeTotalVolume(workout);
        const updatedWorkout: Workout = { ...workout, volume: totalVolume, duration: updatedDuration, endTime: updatedEndTime }; // create a plain object for server action
        await postCompletedWorkoutServerAction(updatedWorkout);
    }

    resetWorkout(cookieKeys.workout, localStorageKeys.workout, setWorkout);
    await redirectServerAction("/workout");
};

export const endTemplate = async (template: Workout, setTemplate: React.Dispatch<React.SetStateAction<Workout>>, cause: action) => {
    const plainTemplate: Workout = {
        ...template,
        exercises: template.exercises.map(exercise => ({
            ...exercise,
            sets: exercise.sets.map(set => ({
                ...set
            }))
        }))
    };
    if (cause == action.post) { await postTemplateServerAction(plainTemplate); }
    else if (cause == action.update) { await updateTemplateServerAction(plainTemplate); }
    else if (cause == action.delete) {
        const templateOrderFromLS = localStorage.getItem('template list order');
        if (templateOrderFromLS) {
            const templateOrder: number[] = JSON.parse(templateOrderFromLS);

            // Remove the template ID from local storage for template order
            const updatedTemplateOrder = templateOrder.filter(id => id !== plainTemplate.id);

            // Update local storage with the new order
            localStorage.setItem('template list order', JSON.stringify(updatedTemplateOrder));
        }

        await deleteTemplateServerAction(plainTemplate);
    }

    resetWorkout(cookieKeys.template, localStorageKeys.template, setTemplate);
    deleteCookies(cookieKeys.isEditTemplate);
    await redirectServerAction("/workout");
};

export const endHistory = async (history: Workout, setHistory: React.Dispatch<React.SetStateAction<Workout>>, cause: action) => {
    const plainHistory: Workout = {
        ...history,
        exercises: history.exercises.map(exercise => ({
            ...exercise,
            sets: exercise.sets.map(set => ({
                ...set
            }))
        }))
    };
    if (cause == action.update) { await updateHistoryServerAction(plainHistory); }
    if (cause == action.delete) { await deleteHistoryServerAction(plainHistory); }
    resetWorkout(cookieKeys.history, localStorageKeys.history, setHistory);
    await redirectServerAction("/history");
};

export const resetWorkout = (cookieKey: cookieKeys, localStorageKey: localStorageKeys, setWorkout: React.Dispatch<React.SetStateAction<Workout>>) => {
    setWorkout(new Workout());
    deleteLocalStorage(localStorageKey);
    deleteCookies(cookieKey);
    if (cookieKey === cookieKeys.template) {
        deleteCookies(cookieKeys.isEditTemplate);
    }
}

export const changeStartAndEndTime = (setWorkout: React.Dispatch<React.SetStateAction<Workout>>, newStartTime: Date, newEndTime: Date, localStorageKey: localStorageKeys) => {
    const newStartTimeDate = new Date(newStartTime);
    const newEndTimeDate = new Date(newEndTime);

    setWorkout(prevWorkout => {
        const diffInSeconds = Math.floor((newEndTimeDate.getTime() - newStartTimeDate.getTime()) / 1000);
        const newWorkout = { ...prevWorkout, startTime: newStartTimeDate, endTime: newEndTimeDate, duration: diffInSeconds };
        setLocalStorage(localStorageKey, newWorkout);
        return newWorkout;
    })
}