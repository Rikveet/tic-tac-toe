import {IValidator} from "./Types/Intefaces";
import {BoardArray} from "./Types/Types";

export const validateName: IValidator = (name: string) => {
    const playerNameRegex = /^(?=[a-zA-Z0-9._]{5,10}$)(?!.*[_.]{2})[^_.].*[^_.]$/i;
    if (playerNameRegex.test(name))
        return {result: true};
    // implement custom error messages dependent on what is missing
    return {
        result: false, message: 'Username must be in between 5 and 10 characters long, <br>' +
            ' The only available special characters are _ . and cannot be more than 1 in a row.'
    };
}




export function getBoard(size: number): BoardArray {
    return Array(size).fill(Array(size).fill(''));
}