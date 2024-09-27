import React, { useContext } from 'react'
import './Sidebar.css'
import DiscussionsBar from '../DiscussionsBar/DiscussionsBar'
import ContactBar from '../ContactsBar/ContactBar'
import CreateGroup from '../CreateGroup/CreateGroup'
import { GroupContext } from '../Context/GroupContext'

export default function Sidebar() {

    const { isSelected, setIsSelected } = useContext(GroupContext)

    return (
        <div className='sidebar'>
            {isSelected === "groups" ? <DiscussionsBar /> : <></> }
            {isSelected === "contacts" ? <ContactBar /> : <></> }
            {isSelected === "addGroup" ? <CreateGroup /> : <></> }
        </div>
    )
}
