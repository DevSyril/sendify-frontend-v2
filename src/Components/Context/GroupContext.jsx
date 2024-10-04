import { createContext, useEffect, useState } from "react";
import { API_URL } from "../../assets/Utils";
import axios from "axios";

export const GroupContext = createContext(null)

const GroupContextProvider = (props) => {

    const [groupId, setGroupId] = useState("");

    const [addMember, setAddMember] = useState(false);

    const [isSelected, setIsSelected] = useState("groups");

    const [currentUser, setCurrentUser] = useState([]);

    const [groupDatas, setGroupDatas] = useState([]);

    const [groupMembers, setGroupMembers] = useState([]);

    const [hideAftercick, setHideAfterClick] = useState(false);

    const contextValue = {
        groupId,
        setGroupId,
        isSelected,
        setIsSelected,
        currentUser,
        addMember,
        setAddMember,
        groupDatas,
        setGroupDatas,
        groupMembers,
        setGroupMembers,
        hideAftercick, 
        setHideAfterClick
    }

    async function getCurrentUser() {

        try {
            const user = await axios.get(
                API_URL.currentUser,
                {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }}
            )
            setCurrentUser(() => user.data.data)

        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {

        getCurrentUser();

            axios({
                method: 'get',
                url: `${API_URL.groupMembers}${groupDatas.id}`,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            })
                .then(function (response) {
                    setGroupMembers(() => response.data.data)
                    console.log(response.data.data);
                });
    }, [groupDatas]);



    return (
        <GroupContext.Provider value={contextValue}>
            {props.children}
        </GroupContext.Provider>
    )
}

export default GroupContextProvider