import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext';


const UserLogin = () => {
    //TWO WAY BINDING
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const {user, setUser} = React.useContext(UserDataContext);


    const submitHandler = async (e)=>{
        e.preventDefault();
        
        const userData = {
            email:email,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
        if(response.status == 200){
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token); //for UserProtectWrapper depend on token to check user already loggedIn or not.
            navigate('/home');
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
                <p className='text-center'>Ready to explore? <Link to='/signup' className='text-blue-600 font-bold'>Create new Account</Link></p>
            </div>
            <div>
                <Link to='/captain-login'
                    className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin;