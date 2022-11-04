import React, {useState} from 'react';
import './Form.css';
import {BoardSizes, createUID, GamePlayers, Player, ReactRef, Settings} from "../../../../Types/Types";
import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";

const Form = (props: {
    formSettings: ReactRef<Settings>,
    children: React.ReactNode[]
}) => {
    const {formSettings} = {...props};
    const {formType, validator, formCompleted, setPlayers, setCurrentPlayerUID, setBoardSize} = {...formSettings.current!};
    const [sizeSelectorDropDown, setSizeSelectorDropDown] = useState(false);
    let tempBoardSize = BoardSizes[0];
    let storedBoardSize = window.localStorage.getItem('boardSize');
    if(storedBoardSize!=null){
        tempBoardSize = +storedBoardSize;
    }
    const [boardSize, setLocalBoardSize] = useState(tempBoardSize);
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
                    player: {name: target.player_name.value, uid: p1UID, marker: 'x'} as Player,
                    opponent: {name: target.opponent_name.value, uid: createUID(), marker: 'o'} as Player
                } as GamePlayers);
                setCurrentPlayerUID(p1UID);
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
                    player: {name: target.player_name.value, uid: p1UID, marker: 'x'} as Player,
                    opponent: {name: 'CPU', uid: createUID(), marker: 'o'} as Player
                } as GamePlayers);
                setCurrentPlayerUID(p1UID);
                break;
            }
            default:
                alert('Game mode invalid');
        }
        setBoardSize(boardSize);
        formCompleted();
    };

    const BoardSizesList = () => {
        return (
            <span className={'flex flex-row justify-between align-center'}>
                {
                    BoardSizes.map((size, index) => {
                        return (
                            <span className={'w-fill px-2 pb-1 cursor-pointer ' + (size === boardSize && 'bg-fuchsia-900 text-white')} key={index}
                                  onClick={() => {
                                      window.localStorage.setItem('boardSize',size.toString());
                                      setLocalBoardSize(size);
                                  }}>
                        {size}
                    </span>
                        )
                    })
                }
            </span>
        );

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
                <span className={''}>
                    <span className={
                        'py-0 flex flex-col rounded-lg border-white border-2 justify-around align-center'}>
                        <span className={'flex flex-row h-full overflow-hidden'}>
                            <span className={'border-r-2 h-fit px-2 py-3 '}>Current Size: {boardSize}</span>
                            <span className={'bg-fuchsia-900 hover:bg-indigo-900 h-full px-2 py-4 rounded-r-md cursor-pointer'} onClick={() => {
                                setSizeSelectorDropDown(!sizeSelectorDropDown);
                            }}>
                                {sizeSelectorDropDown ?
                                    <AiOutlineArrowUp className={'text-white h-full w-full'}/> :
                                    <AiOutlineArrowDown className={'text-white h-full w-full'}/>
                                }
                            </span>
                        </span>
                    </span>
                    <span className={(sizeSelectorDropDown ?
                        'transition-opacity ease-in delay-150 flex h-fit w-full opacity-100 border-x-2 border-b-2 rounded-b-lg justify-center'
                        : 'absolute opacity-0')}>
                        <BoardSizesList/>
                    </span>
                </span>
                <input className={'border-4 text-base uppercase btn cursor-pointer'} type={'submit'} value={'submit'}/>
            </div>
        </form>
    );
}

export default Form;