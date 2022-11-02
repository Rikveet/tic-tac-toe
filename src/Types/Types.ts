import React from "react";
import {IValidator} from "./Intefaces";

export type GameTypes = 'local' | 'single' | 'multi';

// export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>; maybe used in the future
export type ReactRef<T> = React.MutableRefObject<T|undefined>;

export type UID = number & {_type_: "UID"};
export const createUID = (max: number = 10000, min: number = 1000): UID => {
    return Math.floor(((Math.random() * (max - min + 1)) + min)) as UID;
};

export type Player ={
    name: string,
    uid: UID,
    marker: BoardArrayValuesType
}

export type GamePlayers= {
    player : Player,
    opponent: Player
}

export type FormSettings = {
    formType: GameTypes,
    validator: IValidator,
    setPlayers: {(players:GamePlayers):void},
    setCurrentPlayer: {(uid:UID):void}
    formCompleted: {():void}
}

export type BoardArrayValuesType = 'x' | 'o' | '';
export type BoardArray = BoardArrayValuesType[][];