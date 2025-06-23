import {CellMark, Game, Player, PlayerO, PlayerX} from "@/env";
import {getEmptyBoard, getEmptyCell} from "@/lib/util";
import {createSlice} from "@reduxjs/toolkit";

const initialState: Game = {
    boardState: getEmptyBoard(),
    isOver: {result: "", value: false},
    lastMoveBy: undefined,
    moveNum: 0,
    players: [undefined, undefined]
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        resetBoard: (state, action: { payload: { players?: [PlayerO, PlayerX] } }) => {
            state.lastMoveBy = undefined
            state.moveNum = 0
            state.isOver = {
                value: false,
                result: ""
            }
            state.boardState = getEmptyBoard()
            state.players = action.payload.players ? action.payload.players: [undefined, undefined]
        },
        setPlayer: (state, action: { payload: Player }) => {
            const player = action.payload
            state.players[player.mark === "X" ? 1 : 0] = player
        },
        placeMarker: (state, action: { payload: { player: Player, position: number } }) => {
            const {player, position} = action.payload

            if (position >= state.boardState.length || position < 0)
                return

            if (state.lastMoveBy === player.mark)
                return;

            state.boardState[position] = {value: player.mark === "O" ? 0 : 1, placedAtMoveNum: state.moveNum}

            state.moveNum += 1

            state.boardState.forEach((cell, index) => {
                if (state.moveNum - cell.placedAtMoveNum > 7 && cell.placedAtMoveNum !== -1) {
                    state.boardState[index] = getEmptyCell() // remove stale positions
                }
            })

            state.lastMoveBy = player.mark
        },
        endGame: (state, action: { payload: { result: string } }) => {
            state.isOver = {
                value: true,
                result: action.payload.result
            }
        }
    }
})

export const {resetBoard, setPlayer, placeMarker, endGame} = gameSlice.actions