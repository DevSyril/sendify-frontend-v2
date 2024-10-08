import React, { useContext } from 'react'
import './Sidebar.css'
import DiscussionsBar from '../DiscussionsBar/DiscussionsBar'
import ContactBar from '../ContactsBar/ContactBar'
import CreateGroup from '../CreateGroup/CreateGroup'
import { GroupContext } from '../Context/GroupContext'
import Profile from '../Profile/Profile'
import GroupSettings from '../GroupSettings/GroupSettings'

export default function Sidebar() {

    const { isSelected, setIsSelected, hideAftercick, setHideAfterClick } = useContext(GroupContext)

    return (
        <div className='sidebar' id={hideAftercick ? 'hide-sidebar' : ''}>
            {isSelected === "groups" ? <DiscussionsBar /> : <></> }
            {isSelected === "contacts" ? <ContactBar /> : <></> }
            {isSelected === "addGroup" ? <CreateGroup /> : <></> }
            {isSelected === "profile" ? <Profile /> : <></> }
            {isSelected === "editGroup" ? <GroupSettings /> : <></> }
        </div>
    )
}
