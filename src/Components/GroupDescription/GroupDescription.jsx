import React, { useContext, useEffect, useState } from 'react'
import './GroupDescription.css'
import { images } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { API_URL } from '../../assets/Utils'
import { GroupContext } from '../Context/GroupContext'
import { toast } from 'react-toastify'

export default function GroupDescription() {

    const [data, setData] = useState([])
    const [groupMember, setGroupMember] = useState([])
    const { groupId, setGroupId } = useContext(GroupContext)
    const [deleteAction, setDeleteAction] = useState(false)
    const { isSelected, setIsSelected, addMember, setAddMember, currentUser, showGroup, setShowGroup } = useContext(GroupContext)



    useEffect(() => {
        axios({
            method: 'get',
            url: `${API_URL.uniqueGroup}${groupId}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                setData(() => response.data.data)
                setShowGroup(() => response.data.data)
            });

        axios({
            method: 'get',
            url: `${API_URL.groupMembers}${groupId}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                setGroupMember(() => response.data.data)
            });
    }, [groupId]);


    const handleDeleteGroup = () => {
        axios({
            method: 'delete',
            url: `${API_URL.deleteGroup}/${groupId}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                setGroupId("")
                toast.success(response.data.message)
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            })
            .catch(function (error) {
                toast.error(error.message)
                setDeleteAction(() => false)
            });
    }

    return (
        <div className='group-description flex flex-column' id={groupId !== "" && isSelected === 'groups' ? 'group-description' : 'hide'}>
            {data.map((item, index) => (
                <div key={index}>
                    <div className='group-description-head flex flex-column'>
                        <div className='group-description-title'>
                            Description du groupe
                        </div>
                        <img className='group-description-image' src={`${API_URL.groupsImageUrl}${item.profilePhoto}`} />
                        <hr />
                    </div>
                    <div className='group-infos flex flex-column'>
                        <div className='info flex flex-column'>
                            {/* <span className='info-title title'>Titre du groupe</span> */}
                            <p className='info-title p-0-m-0'>{item.name}</p>
                            <div className='separator'></div>
                        </div>
                        <div className='info flex flex-column'>
                            {/* <span className='info-title title'>Description du groupe</span> */}
                            <p className='info-title p-0-m-0'>{item.description} </p>
                            <div className='separator'></div>
                        </div>
                        <div className='info flex flex-column'>
                            {/* <span className='info-title title'>Créé le </span> */}
                            <p className='info-title p-0-m-0'> {item.creationDate} </p>
                            <div className='separator'></div>
                        </div>
                    </div>
                    <br />
                </div>
            ))}
            <div className='group-members'>
                <div className='group-description-title'>
                    Membres du groupe
                    <div className='separator'></div>
                </div>
                {groupMember.map((item, index) => (
                    <div className='group-member flex' key={index}>
                        <img className='member-image' src={`${API_URL.userImageUrl}${item.profilePhoto}`} title={item.profilePhoto} />
                        <div className='flex flex-column'>
                            <p className='p-0-m-0'> {item.username} </p>
                            <p className='p-0-m-0'>{item.email} </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='group-descripiton-actions'>
                <button className='invite-member-button' onClick={() => {
                    setAddMember(() => true);
                    setIsSelected(() => 'contacts');
                }}>
                    <FontAwesomeIcon icon={faUserPlus} />
                    Ajouter un contact
                </button>
                <button className='exit-group-button' onClick={() => setDeleteAction(() => true)} >
                    <FontAwesomeIcon icon={faRemove} />
                    Quitter le groupe
                </button>
            </div>

            {deleteAction && (
                <div className='delete-group-modal'>
                    <div className='modal-content'>
                        <p>Vous êtes sûr de vouloir supprimer ce groupe?</p>
                        <div className='flex justify-content-center'>
                            <button className='yes-button' onClick={handleDeleteGroup}>Oui</button>
                            <button className='no-button' onClick={() => setDeleteAction(false)}>Non</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}