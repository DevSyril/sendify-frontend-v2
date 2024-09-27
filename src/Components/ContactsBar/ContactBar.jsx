import React, { useContext, useEffect, useState } from 'react'
import './ContactBar.css'
import axios from 'axios';
import { API_URL } from '../../assets/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faContactCard, faSearch } from '@fortawesome/free-solid-svg-icons';
import { GroupContext } from '../Context/GroupContext';

export default function ContactBar() {

    const [data, setData] = useState([])
    const { groupId, setGroupId } = useContext(GroupContext)

    useEffect(() => {
        axios({
            method: 'get',
            url: API_URL.usersList,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                setData(() => response.data.data)
            });
    }, []);


    return (
        <div className='discussions-bar'>
            <div className='title-top flex'>
                Mes contacts
                <FontAwesomeIcon icon={faContactCard} size='sm' />
            </div>
            <form className='search-bar'>
                <input type='text' placeholder='Rechercher ...' />
                <FontAwesomeIcon icon={faSearch} className='search-icon' />
            </form>
            <hr />
            <div className='discussions flex flex-column'>
                {data.map((item, index) => (
                    <div>
                        <div className='group flex contact'>
                            <img className='group-image' src={`${API_URL.groupsImageUrl}${item.profilePhoto}`} />
                            <div className='group-text flex flex-column'>
                                <span className='group-title'>{item.username}</span>
                                <p className='p-0-m-0'>{item.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
