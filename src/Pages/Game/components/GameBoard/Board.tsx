import React, {useContext, useState} from 'react';
import "./Board.css";
import {BoardArray, BoardArrayValuesType} from "../../../../HelperFunctions";
import FormManagerContext from "../../../../Contexts/FormManagerContext";

const Board = (props: { boardArray: BoardArray }) => {
    const {boardArray} = {...props};
    const contextWrapper = useContext(FormManagerContext);
    const {currentPlayer} = {...contextWrapper.context}
    const [hoverValue, setHoverValue] = useState<undefined | BoardArrayValuesType>(undefined);
    const [hoverBox, setHoverBox] = useState<undefined | { rowId: number, colId: number }>(undefined)
    return (
        <div className={`flex-col h-fill w-auto aspect-square m-0 rounded-xl p-1`}>
            {
                boardArray.map((row, xId) => {
                    return (
                        <div key={xId} className={`h-fit m-0 my-1 p-1`}>
                            {
                                row.map((value, yId) => {
                                    return (
                                        <div key={yId} className={`box h-fit p-2 mx-1`}
                                             onMouseEnter={() => {
                                                 if (value === '') {
                                                     setHoverValue(currentPlayer.marker);
                                                     setHoverBox({rowId: xId, colId: yId});
                                                 }
                                             }}
                                             onMouseLeave={() => {
                                                 setHoverValue(undefined);
                                                 setHoverBox({rowId: xId, colId: yId});
                                             }}>
                                            <span>
                                                {hoverValue && hoverBox && hoverBox.rowId === xId && hoverBox.colId === yId ? hoverValue : value}
                                            </span>
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