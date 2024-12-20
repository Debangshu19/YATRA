import React, {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {

    const navigate = useNavigate();
    const {captain,setCaptain} = React.useContext(CaptainDataContext);

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ vehicleColor, setVehicleColor ] = useState('');
    const [ vehiclePlate, setVehiclePlate ] = useState('');
    const [ vehicleCapacity, setVehicleCapacity ] = useState('');
    const [ vehicleType, setVehicleType ] = useState('');


    const submitHandler = async (e) => {
        e.preventDefault();
        const newCaptain = {
          fullname:{
            firstname:firstname,
            lastname:lastname
          },
          email:email,
          password:password,
          vehicle:{
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType: vehicleType
          }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);

        if(response.status == 201){
          const data = response.data;
          setCaptain(data.captain);
          localStorage.setItem('token', data.token); //for CaptainProtectWrapper depend on token to check captain already loggedIn or not.
          navigate('/captain-home');
        }

        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
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

            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
            <div className='flex gap-4 mb-7'>
              <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
              />
              <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
              />
            </div>
            <div className='flex gap-4 mb-7'>
              <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
              />
              <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
              >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
              </select>
            </div>

            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>

          </form>
          <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600 font-bold'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div >
    )
}

export default CaptainSignup;