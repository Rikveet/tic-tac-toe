import React, {useContext, useEffect, useState} from 'react';
import Board from "./components/GameBoard/Board";
import Form from "./components/Form/Form";
import InputField from "./components/Form/Form components/Input/InputField";
import {Navigate} from "react-router-dom";
import FormManagerContext from "../../Contexts/FormManagerContext";
import {getBoard, Validator} from "../../HelperFunctions";

const Game = () => {
    const [isFormFilled, setFormFilled] = useState<boolean>(false);
    const [gameBoard, setGameBoard] = useState(getBoard(3));

    // game config shared via react router v6
    const contextWrapper = useContext(FormManagerContext);
    const {formHandler, player, opponent} = {...contextWrapper.context};

    useEffect(() => {
        return () => {
            contextWrapper.setContext({fCompleted: setFormFilled})
        };
    }, []);


    useEffect(() => {
        return () => {
            console.log(player)
        };
    }, [player]);


    return (
        (!(formHandler.formType && formHandler.validator)) ?
            <Navigate to={'/'} replace={true}/> :
            <div className={'main'}>
                {isFormFilled && player && opponent ?
                    <div className={'flex-col h-fill w-fill mx-auto overflow-x-hidden max-w-fit'}>
                        <div className={'flex-row h-[10%]'}>
                            <span className={'absolute left-0'}>{player.name}</span>
                            <span className={'absolute right-0'}>{opponent.name}</span>
                        </div>
                        <div className={'p-5 w-fit'}>
                            <Board boardArray={gameBoard}/>
                        </div>
                    </div>
                    :
                    <Form>
                        <InputField iptT={'text'} htmF={'player_name'} plh={'Player 1'} name={'player_name'}
                                    validate={formHandler!.validator as Validator} labelText={'Player Name'}/>
                        <InputField iptT={'text'} htmF={'opponent_name'} plh={'Player 2'} name={'opponent_name'}
                                    validate={formHandler!.validator as Validator}
                                    labelText={'Opposition Player Name'}/>
                    </Form>

                }
            </div>


    );
};

export default Game;