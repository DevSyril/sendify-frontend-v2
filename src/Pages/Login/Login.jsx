import { faNfcDirectional } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BeatLoader, MoonLoader, } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import SubmitButton from '../../Components/Button/Submit/SubmitButton'
import Input from '../../Components/Form/Input'
import { login } from '../../Http/HttpRequest/axiosClient'
import './Login.css'
import { loginResponse } from '../../Http/HttpRequest/responseAnalyser'
import { images } from '../../assets/assets'




export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        const formData = new FormData()
        formData.set("email", email)
        formData.set("password", password)

        const response = await login(formData)
        console.log(response);
        

        if (response.success) {

            setIsLoading(false)

            const authToken = response.data.token

            localStorage.setItem('token', authToken)

            console.log(localStorage.getItem('token'));

            toast.success(response.message)

            setTimeout(function () {
                navigate("/")
            }, 3000);

        } else {
            setIsLoading(false)
            if (loginResponse(response) != null) {
                toast.error(loginResponse(response))
            } else {
                toast.error(response.message)
            }
        }

    }

    return (
        <>
            <ToastContainer stacked />
            {isLoading && <div className='loader'><BeatLoader color="green" size={20} loading={true} /> En cours</div>}
            <div className='login'>
                <div className='left-zone'>
                    <div className=''>
                        <img src={images.sendifyHome} />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='loginForm'>
                    <div className='title-logo'>
                        <FontAwesomeIcon icon={faNfcDirectional} color='#0097b2' size='xl' />
                        <h1>Sendify</h1>
                    </div>
                    <div className='input-container'>
                        <p className='title'>Connectez-vous à votre compte</p>
                        <div className='input-zone'>
                            <FontAwesomeIcon icon={faUser} className='icon' color='black' />
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
                        <div className='input-zone'>
                            <FontAwesomeIcon icon={faLock} className='icon' color='black' />
                            <Input
                                label={'Mot de passe'}
                                type={'password'}
                                name={'password'}
                                value={password}
                                reference={'password'}
                                placeHolder={"Saisissez ici votre mot de pase ..."}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }
                                }
                            />
                        </div>
                        <SubmitButton type={'submit'} text={'Se connecter'} />
                        <div className='link-container'>
                            <Link to={'/email-verification'} className='password-reset'>Mot de passe oulié ?</Link>
                            <Link to={'/registration'} className='registration-link'>Créer un compte</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
