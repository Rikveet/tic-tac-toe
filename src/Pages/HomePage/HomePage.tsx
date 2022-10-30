import React from 'react';
import './HomePage.css';
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <>
            <div className='main flex-row xst:flex-col'>
                <div className='text-white cursor-default flex-col md:flex-row group h-fit w-fit'>
                    <button className='btn btnVisible'>
                        Multiplayer
                    </button>
                    <Link className='btn btnHidden' to={"local"}>
                        Local
                    </Link>
                    <Link className='btn btnHidden' to={"online"}>
                        Online
                    </Link>
                </div>
                <Link className='btn text-white' to={"singlePlayer"}>
                    Single Player
                </Link>
            </div>
        </>
    );
}

export default HomePage;