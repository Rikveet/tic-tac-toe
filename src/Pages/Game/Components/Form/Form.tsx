import React from 'react';
import './Form.css';
import {createUID, FormSettings, GamePlayers, Player, ReactRef} from "../../../../Types/Types";

const Form = (props: {
    formSettings: ReactRef<FormSettings>,
    children: React.ReactNode[]
}) => {
    const {formSettings} = {...props};
    const {formType, validator, formCompleted, setPlayers, setCurrentPlayer} = {...formSettings.current!};
    const formSubmitHandler = (e: React.SyntheticEvent) => {
        e.persist();
        e.preventDefault();
        switch (formType) {
            case "local": {
                const target = e.target as typeof e.target & {
                    player_name: { value: string };
                    opponent_name: { value: string };
                };
                if (!validator!(target.player_name.value).result) break;
                if (!validator!(target.opponent_name.value).result) break;
                const p1UID = createUID(); // inorder to set uid
                setPlayers({
                    player:{name: target.player_name.value, uid: p1UID, marker: 'x'} as Player,
                    opponent: {name: target.opponent_name.value, uid: createUID(), marker: 'o'} as Player
                } as GamePlayers);
                setCurrentPlayer(p1UID);
                formCompleted();
                break;
            }
            case
            "multi"
            : {
                break;
            }
            case
            'single'
            : {
                const target = e.target as typeof e.target & {
                    player_name: { value: string };
                };
                if (!validator!(target.player_name.value).result) break;
                const p1UID = createUID(); // inorder to set uid
                setPlayers({
                    player:{name: target.player_name.value, uid: p1UID, marker: 'x'} as Player,
                    opponent: {name: 'CPU', uid: createUID(), marker: 'o'} as Player
                } as GamePlayers);
                setCurrentPlayer(p1UID);
                formCompleted();
                break;
            }
            default:
                alert('Game mode invalid');
        }
    }
    return (
        <form className={'form min-h-[250px] h-fit'}
              onSubmit={(e) => {
                  formSubmitHandler(e)
              }}
        >
            <div className={'flex-col justify-around space-y-10 overflow-y-visible'}>
                {
                    props.children
                }
                <input className={'btn'} type={'submit'} value={'submit'}/>
            </div>
        </form>
    );
}

export default Form;