import React, { useEffect, useRef, useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import {SocketContext} from '../context/SocketContext';
import {UserDataContext} from '../context/UserContext';
import {useNavigate} from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [ panelOpen, setPanelOpen ] = useState(false);
    const vehiclePanelRef = useRef(null)
    const confirmedRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const WaitingForDriverRef = useRef(null)

    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);

    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)

    const navigate = useNavigate();

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [ user ])

    socket.on('ride-confirmed', ride => {
        setWaitingForDriver(true);
        setRide(ride);
        setVehicleFound(false);
        setConfirmedRidePanel(false);
    })

    socket.on('ride-started', ride => {
        setWaitingForDriver(false);
        navigate('/riding', { state: { ride } });
    })


    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%', //hidden
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [ panelOpen ]);

    useGSAP(function(){
        if(vehiclePanel){
            gsap.to(vehiclePanelRef.current, {
                transform:'translateY(0)'
            })
        }else{
            gsap.to(vehiclePanelRef.current, {
                transform:'translateY(150%)'
            })
        }
    }, [vehiclePanel]);

    useGSAP(function(){
        if(confirmedRidePanel){
            gsap.to(confirmedRidePanelRef.current, {
                transform:'translateY(0)'
            })
        }else{
            gsap.to(confirmedRidePanelRef.current, {
                transform:'translateY(150%)'
            })
        }
    }, [confirmedRidePanel]);

    useGSAP(function(){
        if(vehicleFound){
            gsap.to(vehicleFoundRef.current, {
                transform:'translateY(0)'
            })
        }else{
            gsap.to(vehicleFoundRef.current, {
                transform:'translateY(150%)'
            })
        }
    }, [vehicleFound]);

    useGSAP(function(){
        if(waitingForDriver){
            gsap.to(WaitingForDriverRef.current, {
                transform:'translateY(0)'
            })
        }else{
            gsap.to(WaitingForDriverRef.current, {
                transform:'translateY(150%)'
            })
        }
    }, [waitingForDriver]);

    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setFare(response.data)
    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data);
    }

    return (
        <div className='h-screen relative overflow-hidden'>
        
            <div className='h-screen w-screen'>
                {/* image for temporary use  */}
                <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'></img>
                {/*<LiveTracking />    */}
            </div>
            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[40%] p-6 bg-white relative'>
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-3' onSubmit={(e) => {
                        submitHandler(e)
                        }}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination');
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination'
                        />
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel
                    suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                    setPanelOpen={setPanelOpen}
                    setVehiclePanel={setVehiclePanel}
                    setPickup={setPickup}
                    setDestination={setDestination}
                    activeField={activeField} />
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <VehiclePanel 
                selectVehicle={setVehicleType} 
                fare={fare} setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>
            <div ref={confirmedRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmedRide
                pickup={pickup}
                destination={destination}
                fare={fare}
                vehicleType={vehicleType} 
                createRide={createRide} setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound={setVehicleFound} />
            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <LookingForDriver
                pickup={pickup}
                destination={destination}
                fare={fare}
                vehicleType={vehicleType} 
                createRide={createRide}
                setVehicleFound={setVehicleFound}/>
            </div>
            <div ref={WaitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
                <WaitingForDriver
                ride={ride}
                setVehicleFound={setVehicleFound}
                waitingForDriver={waitingForDriver} 
                setWaitingForDriver={setWaitingForDriver}/>
            </div>
        </div>
    )
}

export default Home;