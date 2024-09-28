import React, { useState } from 'react'
import './CreateGroup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { groupCreation } from '../../Http/HttpRequest/axiosClient'
import { toast } from 'react-toastify'
import { createGroupResponse } from '../../Http/HttpRequest/responseAnalyser'

export default function CreateGroup() {

    const [name, setName] = useState('')
    const [descripition, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.set('name', name)
        formData.set('description', descripition)

        const response = await groupCreation(formData)

        if (response.success) {
            toast.success(response.message)
            
            setTimeout(() => {
                location.reload(true)
            }, 2000)
        } else {

            if (createGroupResponse(response) != null) {
                toast.error(createGroupResponse(response))
            } else {
                toast.error(response.message)
            }
        }
    }


    return (
        <div className='discussions-bar'>
            <div className='title-top flex'>
                Créer un groupe
                <FontAwesomeIcon icon={faEdit} size='sm' />
            </div>
            <form className='create-group-form flex flex-column' onSubmit={handleSubmit}>
                <input type='text' placeholder='Définissiez le nom du groupe' onChange={(e) => {
                    setName(() => e.target.value)
                }} />
                <textarea rows={10} placeholder='Veuillez décrire le groupe' onChange={(e) => {
                    setDescription(() => e.target.value)
                }}></textarea>
                <button type='submit'>Créer le groupe</button>
            </form>
        </div>
    )
}
