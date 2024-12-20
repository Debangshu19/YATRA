import React from 'react';

const RidePopUp = (props) => {
    return(
        <div>
            <h5 className='p-3 text-center w-[93%] absolute top-0' onClick={()=>{
                props.setRidePopUpPanel(false)
            }}><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5 '>New Ride Available!</h3>
            <div className='flex items-center justify-between mt-3 p-3 bg-yellow-300 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src='https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg'></img>
                    <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-t-2'>
                        <i className="ri-map-pin-user-fill p-3"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-t-2'>
                        <i className="text-lg ri-map-pin-2-fill p-3"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-t-2'>
                        <i className="ri-currency-line p-3"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={()=>{
                    props.setConfirmRidePopUpPanel(true)
                    props.confirmRide()
                }} className='w-full h-10 bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>
                <button onClick={()=>{
                    props.setRidePopUpPanel(false)
                }} className='w-full h-10 bg-red-700 text-white font-semibold p-2 rounded-lg'>Ignore</button>
            </div>
        </div>
    )
}

export default RidePopUp;