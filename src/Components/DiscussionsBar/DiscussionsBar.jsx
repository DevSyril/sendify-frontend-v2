import React, { useContext, useEffect, useState } from 'react'
import './DiscussionsBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscourse } from '@fortawesome/free-brands-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { images } from '../../assets/assets'
import axios from 'axios'
import { API_URL } from '../../assets/Utils'
import { GroupContext } from '../Context/GroupContext'
import LeftSpinner from '../Spinner/LeftSpinner'

export default function DiscussionsBar() {

    const [groupSelected, setGroupSelected] = useState("")

    const { setGroupId, setGroupDatas, hideAftercick, setHideAfterClick } = useContext(GroupContext)

    const [toSearch, setToSearch] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState([])

    const [searchData, setSearchData] = useState([])
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        axios({
            method: 'get',
            url: API_URL.userGroups,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                setData(() => response.data.data)
                setIsLoading(() => false)
                setCompleted(() => true)
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
                {isLoading && <LeftSpinner />}
                {toSearch === "" ? data.map((item, index) => (
                    <div key={index} onClick={() => {
                        setGroupId(() => item.id)
                        setHideAfterClick(() => true)
                    }}>
                        <div className='group flex'
                            id={groupSelected === item.name ? 'group-active' : ''} onClick={() => {
                                setGroupSelected(() => item.name)
                                setGroupDatas(() => item)
                            }}
                        >
                            <img className='group-image' src={`${API_URL.groupsImageUrl}${item.profilePhoto}`} />
                            <div className='group-text flex flex-column'>
                                <span className='group-title small-text'>{item.name}</span>
                                <p className='p-0-m-0 small-text'>{item.description.length > 10 ? item.description.substring(0, 20) + "..." : item.description}</p>
                            </div>
                        </div>
                    </div>
                )) : searchData.map((item, index) => (
                    <div key={index} onClick={() => setGroupId(() => item.id)}>
                        <div className='group flex'
                            id={groupSelected === item.name ? 'group-active' : ''} onClick={() => {
                                setGroupSelected(() => item.name)
                                setGroupDatas(() => item)
                            }}
                        >
                            <img className='group-image' src={`${API_URL.groupsImageUrl}${item.profilePhoto}`} />
                            <div className='group-text flex flex-column'>
                                <span className='group-title'>{item.name}</span>
                                <p className='p-0-m-0'>{item.description.length > 10 ? item.description.substring(0, 20) + "..." : item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {data.length == 0 && searchData.length == 0 && completed && <div className="none-group">Aucun groupe disponible</div> }
            </div>
        </div>
    )
}
