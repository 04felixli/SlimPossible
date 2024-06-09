import React from 'react';
import './PopUp.css'; // Make sure to import the CSS file
import { IPopUp } from '@/app/workout/interfaces/popup';
import Button from '@/app/global components/Buttons/Button';
import Link from 'next/link';

interface Props {
  popUpContent: IPopUp;
  onDoIt?: () => void;
  onDontDoIt?: () => void;
  onDoItRedirectURL?: string; // For replacing an exercise, we want to redirect to an url
}

const PopUp = ({ popUpContent, onDoIt, onDontDoIt, onDoItRedirectURL }: Props) => {
  return (
    <div className='popup-overlay hover:cursor-pointer z-50' onClick={onDontDoIt}>
      <div className='popup-content hover:cursor-default' onClick={(e) => e.stopPropagation()}>
        <div className='card-title-font items-center flex justify-center'>{popUpContent.header}</div>
        <div className='thin-font'>{popUpContent.subHeading}</div>
        <div className='flex flex-row justify-around mt-5'>
          <button
            className='px-6 py-0.5 rounded-full shadow-lg border items-center flex justify-center'
            onClick={onDontDoIt}
          >
            {popUpContent.noDontDoIt}
          </button>
          {!onDoItRedirectURL &&
            <Link href={'/workout'}>
              <Button text={popUpContent.doIt} onClickFunction={onDoIt} />
            </Link>}
          {onDoItRedirectURL &&
            <Link href={onDoItRedirectURL}>
              <Button text={popUpContent.doIt} />
            </Link>}
        </div>
      </div>
    </div>
  )
}

export default PopUp;