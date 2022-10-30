import React from 'react';
import "./Board.css";

const Board = (props: { size: number }) => {
    const boardGrid = [...Array.from(Array(props.size).keys())]
    return (
        <div className={`board-container`}>
            {
                boardGrid.map((xId) => {
                    return (
                        <span key={xId} className={`row`}>
                            {
                                boardGrid.map((yId) => {
                                    return (
                                        <div key={yId} className={`box`}>
                                            <span>+</span>
                                        </div>
                                    )
                                })
                            }
                        </span>
                    )
                })
            }
        </div>
    );
};

export default Board;