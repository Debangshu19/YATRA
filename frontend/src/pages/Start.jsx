import React from 'react';
import {Link} from 'react-router-dom';

const Start = () => {
    return (
    <div>
        <div className='sm:bg-contain bg-cover bg-[url(https://images.unsplash.com/photo-1519121785383-3229633bb75b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
            <b className='w-16 ml-8'>Yatra</b>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Yatra</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
    )
}

export default Start;