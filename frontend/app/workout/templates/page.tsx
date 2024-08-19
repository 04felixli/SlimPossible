// This page should not be accesible - all templates are shown in /workout 
import { redirect } from 'next/navigation';

const template = () => {
    redirect('/workout')
}

export default template