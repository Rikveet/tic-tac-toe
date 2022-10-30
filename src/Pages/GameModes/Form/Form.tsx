import React, {ChangeEvent, useState} from 'react';
import {validateName} from "../HelperFunctions";
import InputField from "./Form components/Input/InputField";
import './Form.css';

const Form = (props: {
    gameType: {
        type: 'local',
        setON: Function // opponent name
    } | {
        type: 'multiplayer',
    }
        | {
        type: 'singlePlayer',
    },
    setPN: Function, // player name
    formCompleted: Function
}) => {

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.persist();
        e.preventDefault();
        switch (props.gameType.type) {
            case "local": {
                console.log(e.target)
                const target = e.target as typeof e.target & {
                    player_name: { value: string };
                    opponent_name: { value: string };
                };
                if (!validateName(target.player_name.value).result) break;
                if (!validateName(target.opponent_name.value).result) break;
                props.setPN(target.player_name.value);
                props.gameType.setON(target.opponent_name.value)
                props.formCompleted(true);
                break;
            }
            case "multiplayer": {
                break;
            }
            case "singlePlayer": {
                break;
            }
        }
    }

    return (
            <form className={'form'} onSubmit={handleSubmit}>
                <div className={'flex-col justify-around space-y-10'}>
                    <InputField iptT={'text'} htmF={'player_name'} plh={'Player 1'} name={'player_name'} validate={validateName} labelText={'Player Name'} />
                    <InputField iptT={'text'} htmF={'opponent_name'} plh={'Player 2'} name={'opponent_name'} validate={validateName} labelText={'Opposition Player Name'} />
                    <input className={'btn'} type={'submit'} value={'submit'}/>
                </div>
            </form>
    );
};

export default Form;