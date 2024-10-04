import React, { useContext, useEffect, useState } from 'react'
import './ContactBar.css'
import axios from 'axios';
import { API_URL } from '../../assets/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faContactCard, faSearch } from '@fortawesome/free-solid-svg-icons';
import { GroupContext } from '../Context/GroupContext';
import { toast } from 'react-toastify';
import { addGroupMember } from '../../Http/HttpRequest/axiosClient';
import LeftSpinner from '../Spinner/LeftSpinner';

export default function ContactBar() {

    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState([])
    const { groupId, addMember, setAddMember, currentUser } = useContext(GroupContext)
    const [toSearch, setToSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'get',
            url: API_URL.usersList,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                setData(() => response.data.data)
                setIsLoading(() => false)
            });
    }, []);

    const handleAddMember = async (email) => {
        const formData = new FormData();
        formData.set('member_email', email);
        formData.set('group_id', groupId);

        const response = await addGroupMember(formData)

        if (response.success) {
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
    }


    return (
        <div className='discussions-bar'>
            <div className='title-top flex'>
                Mes contacts
                <FontAwesomeIcon icon={faContactCard} size='sm' />
            </div>
            <form className='search-bar'>
                <input type='text' placeholder='Rechercher ...' onChange={(e) => {
                    setToSearch(() => e.target.value)
                    setSearchData(() => data.filter(item => item.username.toLowerCase().includes(e.target.value.toLowerCase())))
                    console.log(searchData)
                }} />
                <FontAwesomeIcon icon={faSearch} color='black' className='search-icon' />
            </form>
            <hr />
            <div className='discussions flex flex-column'>
                {toSearch == "" ? (isLoading ? <LeftSpinner /> :
                    data.map((item, index) => (
                        <div key={index}>
                            <div className=''>
                                <div className='group flex contact'>
                                    <img className='group-image' src={`${API_URL.userImageUrl}${item.profilePhoto}`} />
                                    <div className='group-text flex flex-column mx-200'>
                                        <p className='p-0-m-0 group-title small-text txt-over'>{currentUser[0].username === item.username ? 'Vous-même' : item.username}</p>
                                        <p className='p-0-m-0 small-text max-length txt-over'>{window.innerWidth < 450 ? item.email.substring(0, 12) + "..." : item.email}</p>
                                    </div>
                                </div>
                                {addMember && currentUser[0].username != item.username && <button className='add-member-btn' onClick={() => handleAddMember(item.email)}>Ajouter</button>}
                            </div>
                        </div>
                    ))) : searchData.map((item, index) => (
                        <div key={index}>
                            <div className='group flex contact'>
                                <img className='group-image' src={`${API_URL.userImageUrl}${item.profilePhoto}`} />
                                <div className='group-text flex flex-column mx-200'>
                                    <p className='p-0-m-0 group-title small-text txt-over'>{item.username}</p>
                                    <p className='p-0-m-0 small-text max-length txt-over'>{item.email}</p>
                                </div>
                            </div>
                            {addMember && currentUser[0].username != item.username && <button className='add-member-btn' onClick={() => handleAddMember(item.email)}>Ajouter</button>}
                        </div>
                    ))}
            </div>
        </div>
    )
}
