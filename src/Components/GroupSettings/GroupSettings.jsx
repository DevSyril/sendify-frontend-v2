import React, { useContext, useState } from 'react'
import { GroupContext } from '../Context/GroupContext'
import { API_URL } from '../../assets/Utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { toast } from 'react-toastify'
import { updateGroup } from '../../Http/HttpRequest/axiosClient'
import { updateGroupResponse } from '../../Http/HttpRequest/responseAnalyser'
import './GroupSetting.css'

export default function GroupSettings() {

    const { groupId, showGroup } = useContext(GroupContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name != "" ||description != "" || !image) {
            toast.error('Veuillez remplir l\'un des champs !');
            return;
        }

        const formData = new FormData()

        if (name != "")
            formData.set('name', name)

        if (description != "" ) {
            formData.set('description', description)
        }

        if (image)
            formData.set('profilePhoto', image)

        const response =  await updateGroup(formData, groupId)

        if (response.success) {
            toast.success(response.message)
            setImage(false)

        } else {
            setImage(false)

            if (updateGroupResponse(response) != null) {
                toast.error(updateGroupResponse(response))
            } else {
                toast.error(response.message)
            }

            toast.error(response.message)
        }
    }

    return (
        <div className='profile'>
            {showGroup.map((item, index) => (
                <form className='profile-form flex flex-column' key={index} onSubmit={handleSubmit}>
                    <div className='profile-header flex flex-column'>
                        <img src={image ? URL.createObjectURL(image) : `${API_URL.groupImage}${item.profilePhoto}`} className='profile-photo' />
                        <label htmlFor='photo'>
                            <FontAwesomeIcon icon={faPlusCircle} size='3x' color='tomato' />
                        </label>
                        <input type='file' id='photo' hidden onChange={(e) => setImage(() => e.target.files[0])} />
                    </div>
                    <input type='text' placeholder={item.name ? item.name : 'Nom du groupe'}
                        onChange={(e) => setName(() => e.target.value)}
                    />
                    <textarea rows={10} type='text' name='description' placeholder={item.description ? item.description : 'Description du groupe'}
                        onChange={(e) => { setDescription(() => e.target.value) }} > </textarea>
                    <button type='submit'>Enregister</button>
                </form>
            ))}
        </div>
    )
}
