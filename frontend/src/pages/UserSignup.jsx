import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext';

const UserSignup = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const {user, setUser} = React.useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
          fullname:{
            firstname:firstname,
            lastname:lastname
          },
          email:email,
          password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if(response.status == 201){
          const data = response.data;
          setUser(data.user);
          localStorage.setItem('token', data.token); //for UserProtectWrapper depend on token to check user already loggedIn or not.
          navigate('/home');
        }
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }
    return (
        <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <b className='w-16'>Yatra</b>
          <form onSubmit={(e)=>{
            submitHandler(e);
          }}>

            <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                value={firstname}
                onChange={(e)=>{
                    setFirstName(e.target.value);
                }}
              />
              <input
                required
                className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={lastname}
                onChange={(e)=>{
                    setLastName(e.target.value);
                }}
              />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
              required
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
              value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              required type="password"
              placeholder='password'
              value={password}
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
            />

            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>

          </form>
          <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600 font-bold'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div >
    )
}

export default UserSignup;