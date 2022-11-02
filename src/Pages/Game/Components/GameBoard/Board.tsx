import React, {useState} from 'react';
import "./Board.css";
import {ReactComponent as OSvg} from "../../Content/Images/circle-ring-svgrepo-com.svg";
import {ReactComponent as XSvg} from "../../Content/Images/cross-svgrepo-com.svg";
import {BoardArray, BoardArrayValuesType, GamePlayers, ReactRef, UID} from "../../../../Types/Types";

const Board = (props: { boardArray: ReactRef<BoardArray>, players: GamePlayers, currentPlayer: ReactRef<UID> }) => {
    const {boardArray, currentPlayer, players} = {...props};
    const [hoverValue, setHoverValue] = useState<undefined | BoardArrayValuesType>(undefined);
    const [hoverBox, setHoverBox] = useState<undefined | { rowId: number, colId: number }>(undefined)

    const getIcon = (imgType: BoardArrayValuesType) => {
        switch (imgType) {
            case "x": {
                return (<OSvg className={'svg'}/>)
            }
            case "o": {
                return (<XSvg className={'svg'}/>);
            }
        }
    }

    return (
        <div className={`flex-col h-fill m-0 rounded-xl p-1`}>
            {
                boardArray.current!.map((row, xId) => {
                    return (
                        <div key={xId} className={`h-fill w-fill my-[10px]`}>
                            {
                                row.map((value, yId) => {
                                    return (
                                        <div key={yId} className={`box`}
                                             onMouseEnter={() => {
                                                 if (value === '') {
                                                     setHoverValue(players.player.uid === currentPlayer.current ? players.player.marker : players.opponent.marker);
                                                     setHoverBox({rowId: xId, colId: yId});
                                                 }
                                             }}
                                             onMouseLeave={() => {
                                                 setHoverValue(undefined);
                                                 setHoverBox({rowId: xId, colId: yId});
                                             }}>
                                            {getIcon(hoverValue && hoverBox && hoverBox.rowId === xId && hoverBox.colId === yId ? hoverValue : value)}
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
};

export default Board;