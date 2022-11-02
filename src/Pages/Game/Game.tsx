import React, {useRef, useState} from 'react';
import Board from "./Components/GameBoard/Board";
import Form from "./Components/Form/Form";
import InputField from "./Components/Form/Form components/Input/InputField";
import {Navigate} from "react-router-dom";
import {getBoard} from "../../HelperFunctions";
import './Game.css';
import {UID, GamePlayers, FormSettings, ReactRef, BoardArray} from "../../Types/Types";

const Game = (props:{formSettings: ReactRef<FormSettings>}) => {
    const [isFormFilled, setFormFilled] = useState<boolean>(false);

    const gameBoard = useRef<BoardArray>(getBoard(3));
    const [players, setCurrentPlayers] = useState<GamePlayers>();
    const currentPlayer = useRef<UID>();

    const {formSettings} = {...props};
    const {formType, validator} = {...formSettings.current};
    formSettings.current = {
        ...formSettings.current!,
        formCompleted: () => {
            setFormFilled(true)
        },
        setPlayers: (players: GamePlayers) => {
            setCurrentPlayers(players);
        },
        setCurrentPlayer: (uid: UID) => {
            currentPlayer.current = uid;
        }
    }

    const isCurrentCssClass = (uid: number): string => {
        return currentPlayer.current === uid ? 'current' : '';
    }

    return (
        (!(formType && validator)) ? <Navigate to={'/'} replace={true}/> :
            <div className={'main min-h-[500px]'}>
                {isFormFilled && players ?
                    <div className={'flex-col h-fill min-w-fit max-w-[500px] mx-auto'}>
                        <div className={'flex-row h-[10%] w-fill justify-around'}>
                            <span className={isCurrentCssClass(players.player.uid)}>{players.player.name}</span>
                            <span className={isCurrentCssClass(players.opponent.uid)}>{players.opponent.name}</span>
                        </div>
                        <div className={'p-5 aspect-square h-auto w-fill'}>
                            <Board boardArray={gameBoard} currentPlayer={currentPlayer} players={players}/>
                        </div>
                    </div>
                    :
                    <Form formSettings={formSettings}>
                        <InputField iptT={'text'} htmF={'player_name'} plh={'Player 1'} name={'player_name'}
                                    validate={validator} labelText={'Player Name'}/>
                        <InputField iptT={'text'} htmF={'opponent_name'} plh={'Player 2'} name={'opponent_name'}
                                    validate={validator}
                                    labelText={'Opposition Player Name'}/>
                    </Form>

                }
            </div>
    );
};

export default Game;