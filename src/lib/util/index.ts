import {BoardState, CellValue} from "@/env";

export const getEmptyCell: () => CellValue = () => ({
    placedAtMoveNum: -1,
    value: null
})


export const getEmptyBoard = () => {
    const board = []
    for (let i = 0; i < 9; i++) {
        board.push(getEmptyCell())
    }
    return board
}

export const evaluateBoard: (board: BoardState) => {winner: "O" | "X", winningCombo: number[], board: BoardState} | "DRAW" | void = (board) => {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    // Check for winner
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a].value !== null && board[a].value === board[b].value && board[a].value === board[c].value) {
            return{
                winner:  board[a].value === 1 ? "X" : "O",
                winningCombo: combo,
                board
            }
        }
    }

    // Check for draw
    if (board.every(cell => cell.value !== null)) {
        return 'DRAW';
    }
}