import React from 'react'
import './Input.css'

export default function Input({
    value,
    onChange,
    placeHolder,
    type,
    reference,
    name
}) {
    return (
        <div>
            <input
                type={type}
                value={value}
                name={name}
                placeholder={placeHolder}
                onChange={onChange}
                id={reference}
                className='input'
            />
        </div>
    )
}
