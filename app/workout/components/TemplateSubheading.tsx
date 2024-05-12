import React from 'react'
import Button from '@/app/global components/Buttons/Button'
import '../../globals.css'

const TemplateSubheading = () => {
    return (
        <div className='flex flex-row justify-between items-center'>
            <div className='subheading-font'>Templates</div>
            <Button text={"Add"}/>
        </div>
    )
}

export default TemplateSubheading