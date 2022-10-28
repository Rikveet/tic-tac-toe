import React from 'react';
import './HomePage.css';

function HomePage() {

    return (
        <section className="main_section">
            <h1>Tic Tac Toe</h1>
            <div className='menu'>
                <div className='text-white cursor-default group'>
                    <button className='btn btnVisible'>Multiplayer
                    </button>
                    <button
                        className='btn btnHidden'>Local
                    </button>
                    <button
                        className='btn btnHidden'>Online
                    </button>
                </div>

                <button className='btn text-white'>Single Player</button>
            </div>
        </section>
    );
}

export default HomePage;