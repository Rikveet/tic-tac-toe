import React, {useRef, useState} from 'react';
import Form from "./Components/Form/Form";
import InputField from "./Components/Form/Form components/Input/InputField";
import {Navigate, useNavigate} from "react-router-dom";
import {getBoard} from "../../HelperFunctions";
import './Game.css';
import {BoardArray, BoardArrayValues, BoardSizes, GameOver, GamePlayers, ReactRef, Settings, UID} from "../../Types/Types";
import {ReactComponent as OSvg} from "./Content/Images/circle-ring-svgrepo-com.svg";
import {ReactComponent as XSvg} from "./Content/Images/cross-svgrepo-com.svg";

const Game = (props: { formSettings: ReactRef<Settings> }) => {
    const navigate = useNavigate();
    const {formSettings} = {...props};
    const [isFormFilled, setFormFilled] = useState<boolean>(false);
    const [players, setPlayers] = useState<GamePlayers>();
    const [currentPlayerUID, setCurrentPlayerUID] = useState<UID>();
    const boardSize = useRef(BoardSizes[0]);
    const {formType, validator, handlePlayerBoxClick} = {...formSettings.current};
    formSettings.current = {
        ...formSettings.current!,
        formCompleted: () => {
            setFormFilled(true)
        },
        setPlayers: (players: GamePlayers) => {
            setPlayers(players);
        },
        setCurrentPlayerUID: (uid: UID) => {
            setCurrentPlayerUID(uid);
        },
        setBoardSize: (size: number) => {
            console.log(size);
            boardSize.current = size
            resetBoard()
        }
    }
    const gameBoard = useRef<BoardArray>(getBoard(boardSize.current));
    const [gameOver, _setGameOver] = useState<GameOver>({isOver: false} as GameOver);
    const setGameOver = (gOverObj: GameOver) => {
        _setGameOver(gOverObj);
    }
    const isCurrentCssClass = (uid: number): string => {
        return currentPlayerUID === uid ? 'current' : '';
    }
    const resetBoard = () => {
        gameBoard.current = getBoard(boardSize.current);
        setGameOver({isOver: false} as GameOver);
    }
    const resetGame = () => {
        setFormFilled(false);
        resetBoard();
    }
    const getIcon = (imgType: BoardArrayValues, value: BoardArrayValues = '') => {
        const setVisible = value !== '' ? 'opacity-100' : 'opacity-0';
        switch (imgType) {
            case "x": {
                return (<XSvg className={'svg' + setVisible}/>)
            }
            case "o": {
                return (<OSvg className={'svg' + setVisible}/>);
            }
        }
    }
    const Board = () => {
        const [hoverValue, setHoverValue] = useState<undefined | BoardArrayValues>(undefined);
        const [hoverBox, setHoverBox] = useState<undefined | { rowId: number | undefined, colId: number | undefined }>(undefined);
        const {player, opponent} = {...players};
        return (
            <div className={`flex-col max-h-[80%] max-w-[90vw] h-fill w-auto aspect-square m-0 rounded-xl p-1`}>
                {
                    gameBoard.current!.map((row, xId) => {
                        return (
                            <div key={xId} className={`h-fill w-fill my-[5px] md:my-[2px]`}>
                                {
                                    row.map((value, yId) => {
                                        return (
                                            <div key={yId}
                                                 className={`box`}
                                                 onMouseEnter={() => {
                                                     if (value === '') {
                                                         setHoverValue(player!.uid === currentPlayerUID ? player!.marker : opponent!.marker);
                                                         setHoverBox({rowId: xId, colId: yId});
                                                     }
                                                 }}
                                                 onMouseLeave={() => {
                                                     setHoverValue(undefined);
                                                     setHoverBox({rowId: undefined, colId: undefined});
                                                 }}
                                                 onClick={() => {
                                                     handlePlayerBoxClick!(players!, currentPlayerUID!, formSettings.current?.setCurrentPlayerUID!, gameBoard, xId, yId, setGameOver);
                                                 }}
                                            >
                                                {getIcon(hoverValue && hoverBox && hoverBox.rowId === xId && hoverBox.colId === yId ? hoverValue : value, value)}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    return (
        (!(formType && validator)) ? <Navigate to={'/'} replace={true}/> :
            <div className={'main'}>
                {isFormFilled && players ?
                    gameOver!.isOver ?
                        <div className={'gameScreen justify-between'}>
                            <div className={'winner flex-col justify-center'}>
                                <div>{gameOver.gameWinner === 'draw' ? 'draw' : gameOver.gameWinner === players.player.marker ? players.player.name : players.opponent.name}</div>
                                {gameOver.gameWinner !== 'draw' && <div>Won!</div>}
                            </div>
                            <div className={'justify-around sm:flex-col sm:justify-center'}>
                                <button className={'btn'} onClick={() => {
                                    //custom reset function sent to the <Game/> component.
                                    resetBoard();
                                }}>
                                    Rematch
                                </button>
                            </div>

                        </div>
                        :
                        <div className={'gameScreen h-fit max-w-[100vw]'}>
                            <div className={'flex-row h-fit w-fit min-w-[70%] max-w-[90vw] justify-around bg-white rounded-2xl p-5 md:p-4' +
                                ' sm:p-2'}>
                                <span className={'playerIndicator'}>
                                    {getIcon(players.player.marker)}
                                    <span className={isCurrentCssClass(players.player.uid) + " text-2xl md:text-base"}>{players.player.name}</span>
                                </span>
                                <span className={'playerIndicator'}>
                                    {getIcon(players.opponent.marker)}
                                    <span
                                        className={isCurrentCssClass(players.opponent.uid) + " text-2xl md:text-base"}>{players.opponent.name}</span>
                                </span>
                            </div>
                            <div className={'p-5 aspect-square md:p-0 h-auto w-fill'}>
                                <Board/>
                            </div>
                            <span className={'flex flex-row min-h-[5%] h-fit'}>
                                <button className={'btn h-fit'} onClick={() => {
                                    //custom reset function sent to the <Game/> component.
                                    resetGame();
                                }}>
                                    Change Settings
                                </button>
                                <button className={'btn h-fit'} onClick={() => {
                                    navigate('/', {replace: true});
                                }}>
                                    Main Menu
                                </button>
                            </span>
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