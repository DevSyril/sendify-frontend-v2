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

    const { isSelected, setIsSelected, currentUser, setGroupId, setAddMember, hideAftercick, setHideAfterClick } = useContext(GroupContext)

    return (
        <div className='action-bar'>
            <div className='controls-action'>
                <div className='logo-div'>
                    <FontAwesomeIcon className='logo' icon={faNfcDirectional} color='white' size='3x' />
                </div>
                <button className='action-button' id={isSelected === 'groups' ? 'button-active' : ''} onClick={() => {
                    setIsSelected(() => 'groups')
                    setGroupId(() => '')
                    setAddMember(() => false)
                    setHideAfterClick(() => false);
                }}>
                    <FontAwesomeIcon icon={faUserGroup} size='xl' color='white' />
                </button>
                <button className='action-button' id={isSelected === 'addGroup' ? 'button-active' : ''} onClick={() => {
                    setIsSelected(() => 'addGroup')
                    setGroupId(() => '')
                    setAddMember(() => false);
                    setHideAfterClick(() => false);
                }}>
                    <FontAwesomeIcon icon={faPlus} size='xl' color='white' />
                </button>
                <button className='action-button' id={isSelected === 'contacts' ? 'button-active' : ''} onClick={() => {
                    setIsSelected(() => 'contacts')
                    setGroupId(() => '')
                    setAddMember(() => false);
                    setHideAfterClick(() => false);
                }}>
                    <FontAwesomeIcon icon={faContactBook} size='xl' color='white' />
                </button>
                <hr />
                <button className='action-button settings-button' id={isSelected === 'settings' ? 'button-active' : ''} onClick={() => {
                    setIsSelected(() => 'settings')
                    setGroupId(() => '')
                    setAddMember(() => false);
                    setHideAfterClick(() => false);
                }}>
                    <FontAwesomeIcon icon={faGear} size='xl' color='white' />
                </button>
            </div>
            <div className='user-action'>
                {currentUser.map((item, index) => (
                    <img className='user-image' key={index} src={`${API_URL.userImageUrl}${item.profilePhoto}`} title={item.profilePhoto} onClick={() => {
                        setIsSelected(() => 'profile')
                        setGroupId(() => '')
                        setAddMember(() => false);
                        setHideAfterClick(() => false);
                    }} />
                ))}
                <button className='logout-button' onClick={() => setIsSelected(() => 'logout')}>
                    <FontAwesomeIcon icon={faDoorOpen} size='xl' />
                </button>
            </div>
        </div>
    )
}
