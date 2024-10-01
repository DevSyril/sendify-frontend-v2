import React, { useContext } from 'react'
import './MainWrapper.css'
import { GroupContext } from '../Context/GroupContext'
import GroupDiscussions from '../GroupDiscussions/GroupDiscussions'
import { images } from '../../assets/assets'

export default function MainWrapper() {

    const { isSelected, setIsSelected } = useContext(GroupContext)

    return (
        isSelected === "groups" ?
            <GroupDiscussions /> :
            <div className="main-wrapper">
                <img src={images.sendifyHome} />
                <p className='p-0-m-0'>Sendify, Echangez de la meilleure des manières</p>
            </div>
    )
    
}
