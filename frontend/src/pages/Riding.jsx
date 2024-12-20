import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useEffect, useContext} from 'react';
import {SocketContext} from '../context/SocketContext';
import {useNavigate} from 'react-router-dom';

const Riding = () => {
    const location = useLocation()
    const {ride} = location.state || {} //retrieve the ride object from the location state
    const {socket} = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on('ride-ended', () => {
        navigate('/home')
    })

    return(
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 w-10 h-10 bg-white flex items-center justify-center rounded-full'>
                <i className='text-lg font-medium ri-home-5-line'></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'></img>

            </div>
            <div className='h-1/2 p-4'>
            <div className='flex items-center justify-between'>
                <img className='h-10' src='https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg' alt=''></img>
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600'>Swift Dzire 300</p>
                </div>
            </div>
            
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-t-2'>
                        <i className="text-lg ri-map-pin-2-fill p-3"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-t-2'>
                        <i className="ri-currency-line p-3"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className='w-full h-10 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding;