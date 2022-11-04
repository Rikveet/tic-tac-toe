import React from 'react';
import './HomePage.css';
import {useNavigate} from "react-router-dom";
import {checkGameState, putMarkerOnBoard, validateName} from "../../HelperFunctions";
import {BoardArrayValues, GameOver, Settings, UID} from "../../Types/Types";

function HomePage(props: { setFormSettings: { (settings: Settings): void } }) {

    const {setFormSettings} = {...props};
    const navigate = useNavigate();

    return (
        <div className='main flex-row st:flex-col'>
            <div className='text-white cursor-default flex-row md:flex-col group h-fit w-fit'>
                <button className='btn btnVisible'>
                    Multiplayer
                </button>
                <button className='btn btnHidden' onClick={
                    () => {
                        setFormSettings({
                            formType: 'local',
                            validator: validateName,
                            handlePlayerBoxClick: (players, currentPlayerUID, setCurrentPlayerUID, gameBoard, clickX, clickY, setGameOver) => {
                                // as it is two player no need to check current player just update.
                                // avoided array out of bounds check
                                let uid: UID | undefined = undefined;
                                let marker: BoardArrayValues | undefined = undefined;
                                const {player, opponent} = {...players};

                                switch (currentPlayerUID) {
                                    case player.uid: {
                                        marker = player.marker;
                                        uid = opponent.uid
                                        break;
                                    }
                                    case opponent.uid: {
                                        marker = opponent.marker;
                                        uid = player.uid;
                                        break;
                                    }
                                }
                                if (marker && uid) {
                                    putMarkerOnBoard(gameBoard, clickX, clickY, marker, setCurrentPlayerUID, uid);
                                    //check if game over
                                    const state = checkGameState(gameBoard.current!)
                                    if (state !== '') {
                                        setGameOver({
                                            isOver: true,
                                            gameWinner: state,
                                        } as GameOver);
                                    }
                                }
                            }
                        } as Settings);
                        navigate('game');
                    }}>Local
                </button>
                <button className='btn btnHidden' onClick={() => {
                    alert('Coming Soon');
                    //navigate('game', {replace: true});
                }}>Online
                </button>
            </div>
            <button className='btn text-white' onClick={() => {
                    alert('Coming Soon');
                //setFormSettings({formType: 'single', validator: validateName} as Settings);
                //navigate('game', {replace: true});
            }}>
                Single Player
            </button>
        </div>
    );
}

export default HomePage
;

