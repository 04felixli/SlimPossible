import React from 'react';
import './popup.css'; // Make sure to import the CSS file
import { IPopUp } from '@/app/workout/interfaces/popup';
import Button from '@/app/global components/Buttons/Button';
import Link from 'next/link';
import PopUpLayout, { popupContentClassNames } from './PopUpLayout';

interface Props {
  popUpContent: IPopUp;
  onDoIt: () => void;
  onDontDoIt: () => void;
  onDoItRedirectURL?: string; // We may want to redirect to an url after doing something. The default redirect route is to /workout
}

const ConfirmationPopUp = ({ popUpContent, onDoIt, onDontDoIt, onDoItRedirectURL }: Props) => {
  return (
    <PopUpLayout closePopUp={onDontDoIt} className='w-6/12' popupContentClassName={popupContentClassNames.confirmation}>
      <div className='card-title-font items-center flex justify-center'>{popUpContent.header}</div>
      <div className='thin-font'>{popUpContent.subHeading}</div>
      <div className='flex flex-col mt-5'>
        <button
          className='px-6 py-0.5 rounded-full shadow-lg border items-center flex justify-center'
          onClick={onDontDoIt}
        >
          {popUpContent.noDontDoIt}
        </button>
        {!onDoItRedirectURL &&
          <Link href={'/workout'} className='mt-3'>
            <Button text={popUpContent.doIt} onClickFunction={onDoIt} className='w-full' />
          </Link>}
        {onDoItRedirectURL &&
          <Link href={onDoItRedirectURL} className='mt-3'>
            <Button text={popUpContent.doIt} onClickFunction={onDoIt} className='w-full' />
          </Link>}
      </div>
    </PopUpLayout>

  )
}

export default ConfirmationPopUp;