import React from "react";

export interface Validator {
    (value: any): { result: true } | { result: false, message: string }
}

export const validateName: Validator = (name: string) => {
    const playerNameRegex = /^(?=[a-zA-Z0-9._]{5,10}$)(?!.*[_.]{2})[^_.].*[^_.]$/i;
    if (playerNameRegex.test(name))
        return {result: true};
    // implement custom error messages dependent on what is missing
    return {
        result: false, message: 'Username must be in between 5 and 10 characters long, <br>' +
            ' The only available special characters are _ . and cannot be more than 1 in a row.'
    };
}


export interface Player {
    name: string,
    uid: number,
    marker: BoardArrayValuesType
}

export type GameTypes = 'local' | 'single' | 'multi';

export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type ReactSetStateU<T> = ReactSetState<T | undefined>;

export interface FormHandler {
    formType: undefined | GameTypes,
    validator: undefined | Validator,
    formCompleted: undefined | ReactSetState<boolean>
}

export interface FormManagerContextType {
    formHandler: FormHandler,
    player: Player,
    opponent: Player,
    currentPlayer: Player
}

export interface FormManagerWrapperContextType {
    context: FormManagerContextType,
    setContext: (params: {
        fType?: GameTypes,
        v?: Validator,
        p?: Player,
        o?: Player,
        cP?: Player
    }) => {}
}

export type BoardArrayValuesType = 'x' | 'o' | '';
export type BoardArray = BoardArrayValuesType[][]


export function getBoard(size: number): BoardArray {
    return Array(size).fill(Array(size).fill(''));
}