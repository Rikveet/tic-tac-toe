import React, {useContext} from 'react';
import './HomePage.css';
import {useNavigate} from "react-router-dom";
import {validateName} from "../../HelperFunctions";
import FormManagerContext from "../../Contexts/FormManagerContext";

function HomePage() {
    const contextWrapper = useContext(FormManagerContext);
    const navigate = useNavigate();

    return (
        <div className='main flex-row xst:flex-col'>
            <div className='text-white cursor-default flex-col md:flex-row group h-fit w-fit'>
                <button className='btn btnVisible'>
                    Multiplayer
                </button>
                <button className='btn btnHidden' onClick={
                    () => {
                        contextWrapper.setContext({fType: 'local', v: validateName});
                        navigate('game', {replace: true});
                    }}>Local
                </button>
                <button className='btn btnHidden' onClick={() => {
                    navigate('game', {replace: true});
                }}>Online
                </button>
            </div>
            <button className='btn text-white' onClick={() => {
                contextWrapper.setContext({fType: 'single', v: validateName});
                navigate('game', {replace: true});
            }}>
                Single Player
            </button>
        </div>
    );
}

export default HomePage
;

