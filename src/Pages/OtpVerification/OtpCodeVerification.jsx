import React, { useState } from 'react'
import './OtpCodeVerification.css'
import SubmitButton from '../../Components/Button/Submit/SubmitButton'
import { toast, ToastContainer } from 'react-toastify'
import { otpCheck } from '../../Http/HttpRequest/axiosClient'
import { BeatLoader, MoonLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'

export default function OtpCodeVerification() {

    const [otpCode, setOtpCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate= useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (otpCode !== '') {

            setIsLoading(true)

            const formData = new FormData()
            formData.set("email", localStorage.getItem("email"))
            formData.set("code", otpCode)

            const response = await otpCheck(formData)
            console.log(otpCode);
            

            if (response.success) {

                setIsLoading(false)
                localStorage.removeItem("email")

                navigate("/")

            } else {
                setIsLoading(false)
                toast.error(response.message)
            }

        }else {
            toast.error('Veuillez saisir le code OTP')
        }

    }


    return (
        <div>
            <ToastContainer stacked/>
            {isLoading && <div className='loader'><BeatLoader color="green" size={20} loading={true} /> En cours</div>}
            <div className='otp-code'>
                <form className='otp-code-form' onSubmit={handleSubmit}>
                    <div className='otp-code-verification-title'>
                        <h2>Vérification d’adresse e-mail</h2>
                        <p>Un code OTP vous a été envoyé à votre adresse e-mail.<br /> Saisissez-le pour vérifier votre email.</p>
                    </div>
                    <div className='otpCode-input-zone'>
                        <input type="text" maxLength={1} onChange={(e) => {
                            setOtpCode(otpCode + e.target.value[0]);
                        }}></input>
                        <input type="text" maxLength={1} onChange={(e) => {
                            setOtpCode(otpCode + e.target.value[0]);
                        }}></input>
                        <input type="text" maxLength={1} onChange={(e) => {
                            setOtpCode(otpCode + e.target.value[0]);
                        }}></input>
                        <input type="text" maxLength={1} onChange={(e) => {
                            setOtpCode(otpCode + e.target.value[0]);
                        }}></input>
                        <input type="text" maxLength={1} onChange={(e) => {
                            setOtpCode(otpCode + e.target.value[0]);
                        }}></input>
                        <input type="text" maxLength={1} onChange={(e) => {
                            setOtpCode(otpCode + e.target.value[0]);
                        }}></input>
                    </div>
                    
                    <SubmitButton type={'submit'} text={'Soumettre'} />
                </form>
            </div>
        </div>
    )
}
