import React from 'react';
import './PopUp.css'; // Make sure to import the CSS file
import { IPopUp } from '@/app/workout/interfaces/popup';
import Button from '@/app/global components/Buttons/Button';
import Link from 'next/link';

interface Props {
  popUp: IPopUp;
  onDoIt: () => void;
  onDontDoIt: () => void;
}

const PopUp = ({ popUp, onDoIt, onDontDoIt }: Props) => {
  return (
    <div className='popup-overlay hover:cursor-pointer' onClick={onDontDoIt}>
      <div className='popup-content hover:cursor-default'>
        <div className='card-title-font items-center flex justify-center'>{popUp.header}</div>
        <div className='thin-font'>{popUp.subHeading}</div>
        <div className='flex flex-row justify-around mt-5'>
          <button
            className='px-6 py-0.5 rounded-full shadow-lg border items-center flex justify-center'
            onClick={onDontDoIt}
          >
            {popUp.noDontDoIt}
          </button>
          <Link href={'/workout'}>
            <Button text={popUp.doIt} onClickFunction={onDoIt} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopUp;