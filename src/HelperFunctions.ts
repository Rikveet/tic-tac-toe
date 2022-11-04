import {IValidator} from "./Types/Intefaces";
import {BoardArray, BoardArrayValues, ReactRef, UID} from "./Types/Types";

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
    const gameArray = []
    for (let i = 0; i < size; gameArray[i++] = Array(size).fill('')) ;
    return gameArray;
}

export function checkGameState(gameBoard: BoardArray): '' | 'x' | 'o' | 'draw' { // no win -1, oWon 0, xWon 1
    function extractValues(array: BoardArrayValues[], startPoint: number, skipBy: number): BoardArrayValues[] {
        const extractedVals: BoardArrayValues[] = [];
        for (let i = startPoint; i < array.length; i = i + skipBy) {
            extractedVals.push(array[i])
        }
        return extractedVals;
    }

    function count(slice: BoardArrayValues[], countFor: BoardArrayValues): number {
        let count = 0;
        for (let i = 0; i <= slice.length; i++) {
            count = slice[i] === countFor ? count + 1 : count;
        }
        return count;
    }

    function check(slice: BoardArrayValues[]) {
        xWon = count(slice, 'x') === boardSize;
        oWon = count(slice, 'o') === boardSize;
    }

    const boardSize = gameBoard.length;
    const flatGameBoard = gameBoard.flat();
    let xWon = false;
    let oWon = false;
    const eValues = count(flatGameBoard, '');


    // row check
    for (let row = 0; !xWon && !oWon && row < gameBoard.length; row++) {
        check(gameBoard[row]);
    }
    // col check
    for (let col = 0; !xWon && !oWon && col < gameBoard.length; col++) {
        check(gameBoard.map((row, index) => {
            return row[col];
        }))
    }
    // diag check
    if (!xWon && !oWon)
        check(extractValues(flatGameBoard, 0, boardSize + 1));
    // reverse diag
    if (!xWon && !oWon)
        check(extractValues(flatGameBoard, boardSize - 1, boardSize - 1).slice(0, boardSize));

    return xWon ? 'x' : oWon ? 'o' : eValues === 0 ? 'draw' : '';
}

export function putMarkerOnBoard(boardArray: ReactRef<BoardArray>, x: number, y: number, marker: BoardArrayValues, setCurrentPlayerUID: { (uid: UID): void }, uid: UID) {
    if (boardArray.current![x][y] === '') {
        boardArray.current![x][y] = marker;
        setCurrentPlayerUID(uid);
    }
}