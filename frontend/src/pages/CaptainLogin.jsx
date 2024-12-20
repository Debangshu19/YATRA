import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    //TWO WAY BINDING
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const { captain, setCaptain } = React.useContext(CaptainDataContext)
    const navigate = useNavigate();

    const submitHandler = async (e)=>{
        e.preventDefault();
        const captain = {
            email: email,
            password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

        if (response.status === 200) {
        const data = response.data

        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')

        }
        setEmail('');
        setPassword('');
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <b className='w-16'>Yatra</b>
                <form onSubmit={(e)=>{
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input  required className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' 
                        type="email"
                        placeholder='email@example.com'
                        value={email} onChange={(e)=> {
                            setEmail(e.target.value);
                        }}
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                    <input className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        required type="password"
                        placeholder='password'
                        value={password} onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />

                    <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
                </form>
                <p className='text-center'>Start today! <Link to='/captain-signup' className='text-blue-600 font-bold'>Register as Captain</Link></p>
            </div>
            <div>
                <Link to='/login'
                    className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin;