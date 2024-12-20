import React from 'react';

const LookingForDriver = (props) => {
    return(
        <div>
            <h5 className='p-3 text-center w-[93%] absolute top-0' onClick={()=>{
                props.setVehicleFound(false)
            }}><i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5 '>Looking For Driver</h3>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src='https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg' alt=''></img>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-t-2'>
                        <i className="ri-map-pin-user-fill p-3"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.pickup}</h3>
                            
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-t-2'>
                        <i className="text-lg ri-map-pin-2-fill p-3"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.destination}</h3>
                            
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-t-2'>
                        <i className="ri-currency-line p-3"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver;