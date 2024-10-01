import React, { useContext, useEffect, useState } from 'react'
import './DiscussionsBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscourse } from '@fortawesome/free-brands-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { images } from '../../assets/assets'
import axios from 'axios'
import { API_URL } from '../../assets/Utils'
import { GroupContext } from '../Context/GroupContext'

export default function DiscussionsBar() {

    const [groupSelected, setGroupSelected] = useState("")

    const { groupId, setGroupId } = useContext(GroupContext)

    const [toSearch, setToSearch] = useState("");

    const [data, setData] = useState([])

    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: API_URL.userGroups,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                setData(() => response.data.data)
            });
    }, []);

    return (
        <div className='discussions-bar'>
            <div className='title-top flex'>
                Discussions
                <FontAwesomeIcon icon={faDiscourse} size='sm' />
            </div>
            <form className='search-bar' onSubmit={(e) => e.preventDefault()}>
                <input type='text' placeholder='Rechercher ...' onChange={(e) => {
                    setToSearch(() => e.target.value)
                    setSearchData(() => data.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())))
                }} />
                <FontAwesomeIcon icon={faSearch} color='black' className='search-icon' />
            </form>
            <hr />
            <div className='discussions flex flex-column'>
                {toSearch === "" ? data.map((item, index) => (
                    <div key={index} onClick={() => setGroupId(() => item.id)}>
                        <div className='group flex'
                            id={groupSelected === item.name ? 'group-active' : ''} onClick={() => setGroupSelected(() => item.name)}
                        >
                            <img className='group-image' src={`${API_URL.groupsImageUrl}${item.profilePhoto}`} />
                            <div className='group-text flex flex-column'>
                                <span className='group-title'>{item.name}</span>
                                <p className='p-0-m-0'>{item.description.length > 10 ? item.description.substring(0, 20) + "..." : item.description}</p>
                            </div>
                        </div>
                    </div>
                )) : searchData.map((item, index) => (
                    <div key={index} onClick={() => setGroupId(() => item.id)}>
                        <div className='group flex'
                            id={groupSelected === item.name ? 'group-active' : ''} onClick={() => setGroupSelected(() => item.name)}
                        >
                            <img className='group-image' src={`${API_URL.groupsImageUrl}${item.profilePhoto}`} />
                            <div className='group-text flex flex-column'>
                                <span className='group-title'>{item.name}</span>
                                <p className='p-0-m-0'>{item.description.length > 10 ? item.description.substring(0, 20) + "..." : item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
