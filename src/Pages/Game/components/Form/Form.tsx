import React, {useContext} from 'react';
import {Player} from "../../../../HelperFunctions";
import './Form.css';
import FormManagerContext from "../../../../Contexts/FormManagerContext";


// make better a common uid function
const createUID = (max:number = 10000, min:number =1000):number => {
    return Math.floor(((Math.random() * (max-min + 1)) + min));
}

const Form = (props: {
    children: React.ReactNode[]
}) => {
    const contextWrapper = useContext(FormManagerContext);
    const {formHandler} = {...contextWrapper.context}
    const {formType, formCompleted, validator} = {...formHandler};
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
                const p1 = {name: target.player_name.value, uid: createUID(), marker: 'x'} as Player;
                const p2 = {name: target.opponent_name.value, uid: createUID(), marker: 'o'} as Player
                contextWrapper.setContext({
                    p: p1,
                    o: p2,
                    cP: p1 // find a better version in future because this one is not good :P
                });
                // contextWrapper.setContext({ potential better way but is unable to update as player is not the latest ref.
                //     cP: contextWrapper.context.player
                // });
                formCompleted!(true);
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
                contextWrapper.setContext({
                    p: {name: target.player_name.value, uid:  createUID(), marker: 'x'} as Player,
                    o: {name: 'Cpu', uid:  createUID(), marker: 'o'} as Player
                });
                contextWrapper.setContext({
                    cP: contextWrapper.context.player
                });
                formCompleted!(true);
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