import React from "react";
import {IValidator} from "./Intefaces";

export type GameTypes = 'local' | 'single' | 'multi';

export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type ReactRef<T> = React.MutableRefObject<T | undefined>;

export type UID = number & { _type_: "UID" };
export const createUID = (max: number = 10000, min: number = 1000): UID => {
    return Math.floor(((Math.random() * (max - min + 1)) + min)) as UID;
};

export type Player = {
    name: string,
    uid: UID,
    marker: BoardArrayValues
}

export type GamePlayers = {
    player: Player,
    opponent: Player
}

export type handlePlayerBoxClick = {
    (players: GamePlayers, currentPlayerUID: UID, setCurrentPlayerUID: { (uid: UID): void },
     gameBoard: ReactRef<BoardArray>, clickX: number, clickY: number,
     setGameOver: { (gOverObj: GameOver): void }): void
}

export const BoardSizes =  [3 , 4 , 5 , 6];


export type Settings = {
    formType: GameTypes,
    validator: IValidator,
    setPlayers: { (players: GamePlayers): void },
    setCurrentPlayerUID: { (uid: UID): void },
    handlePlayerBoxClick: handlePlayerBoxClick,
    setBoardSize: {(size:number):void}
    formCompleted: { (): void }
}

export type BoardArrayValues = 'x' | 'o' | '';
export type BoardArray = BoardArrayValues[][];

export type GameOver = { isOver: boolean, gameWinner: 'x' | 'o' | 'draw' }