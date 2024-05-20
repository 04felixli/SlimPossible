// This file stores functions that may be used everywhere 
import { Dispatch, SetStateAction } from "react";

// This function will handle all pop-up clicks
type SetStateBoolean = Dispatch<SetStateAction<boolean>>;

export const handlePopUp = (state: boolean, setState: SetStateBoolean): void => {
    setState(!state);
    console.log(state);
}