import React from 'react';
import './popup.css';
import { IPopUp } from '@/app/workout/interfaces/popup';
import Button from '@/app/global components/Buttons/Button';
import PopUpLayout, { popupContentClassNames } from './PopUpLayout';
import CustomLink from '../CustomLink';

interface Props {
  popUpContent: IPopUp;
  onDoIt: () => void;
  onDontDoIt: () => void;
  replaceExerciseRedirectURL?: string;
}

const ConfirmationPopUp = ({ popUpContent, onDoIt, onDontDoIt, replaceExerciseRedirectURL }: Props) => {
  return (
    <PopUpLayout closePopUp={onDontDoIt} className='' popupContentClassName={popupContentClassNames.confirmation}>
      <div className='card-title-font items-center flex justify-center'>{popUpContent.header}</div>
      <div className='thin-font'>{popUpContent.subHeading}</div>
      <div className='flex flex-col mt-5'>
        <button
          className='px-6 py-0.5 rounded-md shadow-lg border items-center flex justify-center'
          onClick={onDontDoIt}
        >
          {popUpContent.noDontDoIt}
        </button>
        {!replaceExerciseRedirectURL ?
          <Button text={popUpContent.doIt} onClickFunction={onDoIt} className='w-full mt-3' /> :
          <CustomLink href={replaceExerciseRedirectURL} className='mt-3'>
            <Button text={popUpContent.doIt} onClickFunction={onDoIt} className='w-full' />
          </CustomLink>}
      </div>
    </PopUpLayout>

  )
}

export default ConfirmationPopUp;