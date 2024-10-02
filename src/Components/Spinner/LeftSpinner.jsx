import React from 'react'
import './LeftSpinner.css'
import { RiseLoader, SquareLoader } from 'react-spinners'

export default function LeftSpinner() {
    return (
        <div className='loader-container'>
            <div className='left-loader'><RiseLoader color="green" size={20} loading={true} /></div>
        </div>
    )
}
