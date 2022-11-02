import React from 'react';
import './HomePage.css';
import {useNavigate} from "react-router-dom";
import {validateName} from "../../HelperFunctions";
import {FormSettings} from "../../Types/Types";

function HomePage(props:{setFormSettings:{(settings :FormSettings):void}}) {

    const {setFormSettings} = {...props};
    const navigate = useNavigate();

    return (
        <div className='main flex-row xst:flex-col'>
            <div className='text-white cursor-default flex-col md:flex-row group h-fit w-fit'>
                <button className='btn btnVisible'>
                    Multiplayer
                </button>
                <button className='btn btnHidden' onClick={
                    () => {
                        setFormSettings({formType: 'local', validator: validateName} as FormSettings);
                        navigate('game', {replace: true});
                    }}>Local
                </button>
                <button className='btn btnHidden' onClick={() => {
                    navigate('game', {replace: true});
                }}>Online
                </button>
            </div>
            <button className='btn text-white' onClick={() => {
                setFormSettings({formType: 'single', validator: validateName} as FormSettings);
                navigate('game', {replace: true});
            }}>
                Single Player
            </button>
        </div>
    );
}

export default HomePage
;

