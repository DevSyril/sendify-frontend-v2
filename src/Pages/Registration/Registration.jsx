import React, { useState } from 'react'
import './Registration.css'
import { toast, ToastContainer } from 'react-toastify'
import { MoonLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import SubmitButton from '../../Components/Button/Submit/SubmitButton'
import Input from '../../Components/Form/Input'
import { faNfcDirectional } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons'
import { registerResponse } from '../../Http/HttpRequest/responseAnalyser'
import { registration } from '../../Http/HttpRequest/axiosClient'

export default function Registration() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        const formData = new FormData()
        formData.set("email", email)
        formData.set("password", password)
        formData.set("username", username)
        formData.set("passwordConfirm", passwordConfirm)

        const response = await registration(formData)
        console.log(response);


        if (response.success) {

            setIsLoading(false)
            localStorage.setItem('email', response.data.email)
            
            navigate("/otp-check")

        } else {
            setIsLoading(false)
            
            if (registerResponse(response) != null) {
                toast.error(registerResponse(response))
            } else {
                toast.error(response.message)
            }
        }


    }

    return (
        <>
            <ToastContainer stacked />
            {isLoading && <div className='loader'><MoonLoader color="green" size={20} loading={true} /> En cours</div>}
            <div className='login'>
                <div className='left-zone'>
                    <div className=''>
                        <img />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='loginForm'>
                    <div className='title-logo'>
                        <FontAwesomeIcon icon={faNfcDirectional} color='#0097b2' size='xl' />
                        <h1>Sendify</h1>
                    </div>
                    <div className='input-container'>
                        <p className='title'>Rejoignez-notre communauté</p>
                        <div className='input-zone'>
                            <FontAwesomeIcon icon={faUser} className='icon' color='black' />
                            <Input
                                label={'Nom d\'utilisateur'}
                                type={'text'}
                                name={'username'}
                                value={username}
                                reference={'username'}
                                placeHolder={"Entrez votre nom d'utilisateur"}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }
                                }
                            />
                        </div>
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
                        <div className='input-zone'>
                            <FontAwesomeIcon icon={faCheckCircle} className='icon' color='black' />
                            <Input
                                label={'Confirmez le mot de passe'}
                                type={'password'}
                                name={'passwordConfirm'}
                                value={passwordConfirm}
                                reference={'passwordConfirm'}
                                placeHolder={"Confirmez le mot de passe ..."}
                                onChange={(e) => {
                                    setPasswordConfirm(e.target.value)
                                }
                                }
                            />
                        </div>
                        <SubmitButton type={'submit'} text={'Se connecter'} />
                        <div className='link-container'>
                            <Link to={'/email-verification'} className='password-reset'>Mot de passe oulié ?</Link>
                            <Link to={'/'} className='registration-link'>Se connecter</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}
