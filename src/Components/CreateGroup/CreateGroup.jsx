import React from 'react'
import './CreateGroup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default function CreateGroup() {
    return (
        <div className='discussions-bar'>
            <div className='title-top flex'>
                Créer un groupe
                <FontAwesomeIcon icon={faEdit} size='sm' />
            </div>
            <form className='create-group-form flex flex-column'>
                    <input type='text' placeholder='Définissiez le nom du groupe'/>
                    <textarea rows={10} placeholder='Veuillez décrire le groupe'></textarea>
                    <button type='submit'>Créer le groupe</button>
            </form>
        </div>
    )
}
