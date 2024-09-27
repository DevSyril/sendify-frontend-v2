import { createContext, useState } from "react";

export const GroupContext = createContext(null)

const GroupContextProvider = (props) => {

    const [groupId, setGroupId] = useState("");

    const [isSelected, setIsSelected] = useState("groups");


    const contextValue = {
        groupId,
        setGroupId,
        isSelected,
        setIsSelected
    }

    return (
        <GroupContext.Provider value={contextValue}>
            {props.children}
        </GroupContext.Provider>
    )
}

export default GroupContextProvider