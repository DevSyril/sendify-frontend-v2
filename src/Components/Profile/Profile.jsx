import React, { useState } from 'react'
import './Profile.css'
import { images } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { GroupContext } from '../Context/GroupContext'
import { API_URL } from '../../assets/Utils'
import { updateUser } from '../../Http/HttpRequest/axiosClient'
import { toast } from 'react-toastify'
import { updateUserResponse } from '../../Http/HttpRequest/responseAnalyser'

export default function Profile() {

    const { currentUser, setCurrentUser } = useContext(GroupContext);

    const [image, setImage] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        if (password != passwordConfirm) {
            toast.error('Les deux mots de passe ne sont pas identiques.')
            return
        }

        if (phoneNumber != "")
            formData.set('phoneNumber', phoneNumber)

        if (password != "" && passwordConfirm != "") {
            formData.set('password', password)
            formData.set('passwordConfirm', passwordConfirm)
        }

        if (image)
            formData.set('profilePhoto', image)

        console.log(formData.get('phoneNumber'));

        const response =  await updateUser(formData)

        if (response.success) {
            toast.success(response.message)
            setImage(false)

        } else {
            setImage(false)

            if (updateUserResponse(response) != null) {
                toast.error(updateUserResponse(response))
            } else {
                toast.error(response.message)
            }

            toast.error(response.message)
        }
    }

    return (
        <div className='profile'>
            {currentUser.map((item, index) => (
                <form className='profile-form flex flex-column' key={index} onSubmit={handleSubmit}>
                    <div className='profile-header flex flex-column'>
                        <img src={image ? URL.createObjectURL(image) : `${API_URL.userImageUrl}${item.profilePhoto}`} className='profile-photo' />
                        <label htmlFor='photo'>
                            <FontAwesomeIcon icon={faPlusCircle} size='3x' color='tomato' />
                        </label>
                        <input type='file' id='photo' hidden onChange={(e) => setImage(() => e.target.files[0])} />
                    </div>
                    <input type='text' value={item.username} />
                    <input type='text' value={item.email} />
                    <input type='number' placeholder={item.phoneNumber ? item.phoneNumber : 'Numero de téléphone'}
                        onChange={(e) => setPhoneNumber(() => e.target.value)}
                    />
                    <input type='password' name='password' placeholder='Nouveau mot de passe' onChange={(e) => { setPassword(e.target.value) }} />
                    <input type='password' name='passwordConfirm' placeholder='Confirmer le mot de passe' onChange={(e) => { setPasswordConfirm(e.target.value) }} />
                    <button type='submit'>Enregister</button>
                </form>
            ))}
        </div>
    )
}
