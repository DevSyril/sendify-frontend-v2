import React, { useState } from 'react'
import './EmailVerification.css'
import Input from '../../Components/Form/Input'
import SubmitButton from '../../Components/Button/Submit/SubmitButton'
import { toast, ToastContainer } from 'react-toastify'
import { MoonLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword } from '../../Http/HttpRequest/axiosClient'
import { resetPasswordResponse } from '../../Http/HttpRequest/responseAnalyser'

export default function EmailVerification() {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        const formData = new FormData()
        formData.set("email", email)

        const response = await resetPassword(formData)
        console.log(response);


        if (response.success) {

            setIsLoading(false)

            localStorage.setItem('email', email)
            
            navigate("/otp-check")

        } else {
            setIsLoading(false)

            if (resetPasswordResponse(response) != null) {
                toast.error(resetPasswordResponse(response))
            } else {
                toast.error(response.message)
            }
        }

    }


    return (
        <div className='emailChecker'>
            <ToastContainer stacked />
            {isLoading && <div className='loader'><MoonLoader color="green" size={20} loading={true} /> En cours</div>}
            <form onSubmit={handleSubmit} className='loginForm'>
                <div className='title-zone'>
                    <h2>Récupération de mot de passe</h2>
                    <p>Un code OTP vous sera envoyé à votre adresse e-mail..</p>
                </div>
                <div className='input-container'>
                    <div className='input-zone'>
                        <FontAwesomeIcon icon={faEnvelope} className='icon' color='black' />
                        <Input
                            label={'Adresse E-mail'}
                            type={'email'}
                            name={'email'}
                            value={email}
                            reference={'email'}
                            placeHolder={"Veuillez entrer votre adresse email"}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }
                            }
                        />
                    </div>
                    <SubmitButton type={'submit'} text={'Se connecter'} />
                </div>
            </form>
        </div>
    )
}
