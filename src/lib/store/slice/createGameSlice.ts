import {CellMark, Game, Player, PlayerO, PlayerX} from "@/env";
import {getEmptyBoard, getEmptyCell} from "@/lib/util";
import {createSlice} from "@reduxjs/toolkit";
import {act} from "react";

const initialState: Game = {
    isVanishing: false,
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
            state.players = action.payload.players ? action.payload.players : [undefined, undefined]
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

            if (state.isVanishing) {
                let oldestCell = {index: 0, val: 0}
                state.boardState.forEach((cell, index) => {
                    if (state.moveNum - cell.placedAtMoveNum > 4 && cell.placedAtMoveNum !== -1) {
                        if (oldestCell.val < (state.moveNum - cell.placedAtMoveNum))
                            oldestCell = {
                                index,
                                val: state.moveNum - cell.placedAtMoveNum
                            }
                    }
                })
                if (oldestCell.val > 4)
                    state.boardState[oldestCell.index] = getEmptyCell() // remove the oldest state position
            }


            state.lastMoveBy = player.mark
        },
        endGame: (state, action: { payload: { result: string } }) => {
            state.isOver = {
                value: true,
                result: action.payload.result
            }
        },
        setVanishing: (state, action: { payload: boolean }) => {
            state.isVanishing = action.payload
        }
    }
})

export const {resetBoard, setPlayer, placeMarker, endGame, setVanishing} = gameSlice.actions