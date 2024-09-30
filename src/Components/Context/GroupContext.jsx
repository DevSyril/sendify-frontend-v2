import { createContext, useEffect, useState } from "react";
import { API_URL } from "../../assets/Utils";
import axios from "axios";

export const GroupContext = createContext(null)

const GroupContextProvider = (props) => {

    const [groupId, setGroupId] = useState("");
    
    const [addMember, setAddMember] = useState(false);

    const [isSelected, setIsSelected] = useState("groups");

    const [currentUser, setCurrentUser] = useState([]);

    const contextValue = {
        groupId,
        setGroupId,
        isSelected,
        setIsSelected,
        currentUser,
        addMember,
        setAddMember,
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: API_URL.currentUser,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then(function (response) {
                setCurrentUser(() => response.data.data)
            });
    }, []);


    return (
        <GroupContext.Provider value={contextValue}>
            {props.children}
        </GroupContext.Provider>
    )
}

export default GroupContextProvider