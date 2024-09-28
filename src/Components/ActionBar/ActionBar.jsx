import React, { useContext, useEffect, useState } from 'react'
import './ActionBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faContactBook, faDoorOpen, faGear, faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { images } from '../../assets/assets'
import { faNfcDirectional } from '@fortawesome/free-brands-svg-icons'
import { API_URL } from '../../assets/Utils'
import axios from 'axios'
import { GroupContext } from '../Context/GroupContext'


export default function ActionBar() {

    const { isSelected, setIsSelected } = useContext(GroupContext)

    const [data, setData] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: API_URL.currentUser,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                setData(() => response.data.data)
            });
    }, []);

    return (
        <div className='action-bar'>
            <div className='controls-action'>
                <div className='logo-div'>
                    <FontAwesomeIcon className='logo' icon={faNfcDirectional} color='white' size='3x' />
                </div>
                <button className='action-button' id={isSelected === 'groups' ? 'button-active' : ''} onClick={() => setIsSelected(() => 'groups')}>
                    <FontAwesomeIcon icon={faUserGroup} size='xl' color='white' />
                </button>
                <button className='action-button' id={isSelected === 'addGroup' ? 'button-active' : ''} onClick={() => setIsSelected(() => 'addGroup')}>
                    <FontAwesomeIcon icon={faPlus} size='xl' color='white' />
                </button>
                <button className='action-button' id={isSelected === 'contacts' ? 'button-active' : ''} onClick={() => setIsSelected(() => 'contacts')}>
                    <FontAwesomeIcon icon={faContactBook} size='xl' color='white' />
                </button>
                <hr />
                <button className='action-button settings-button' id={isSelected === 'settings' ? 'button-active' : ''} onClick={() => setIsSelected(() => 'settings')}>
                    <FontAwesomeIcon icon={faGear} size='xl' color='white' />
                </button>
            </div>
            <div className='user-action'>
                {data.map((item, index) => (
                    <img className='user-image' key={index} src={`${API_URL.userImageUrl}${item.profilePhoto}`} title={item.profilePhoto} onClick={() => setIsSelected(() => 'profile')} />
                ))}
                <button className='logout-button' onClick={() => setIsSelected(() => 'logout')}>
                    <FontAwesomeIcon icon={faDoorOpen} size='xl' />
                </button>
            </div>
        </div>
    )
}
