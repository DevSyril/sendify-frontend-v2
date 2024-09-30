import React from 'react'
import './SubmitButton.css'

export default function SubmitButton({text, onClick, type, disabled}) {
    return (
        <div className='submit-btn-div'>
            <button className='login-button' disabled={disabled} type={type} onClick={onClick}>{text || "Opérations"}</button>
        </div>
    )
}
