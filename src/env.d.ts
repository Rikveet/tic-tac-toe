import {ReactNode} from "react";

export type ModalSlice = {
    isOpen: boolean,
    component?: {
        title: string,
        child: ReactNode,
        onClose?: () => boolean, // invalid attempt notification should be handled by the function provided
    }
}

export type Notification = {
    msgType: 'SUCCESS' | 'INFO' | 'FAILED',
    message: string,
    createdAt: number,
    id: number
}

export type NotificationSlice = {
    notifications: Notification[]
}

export type AiDifficulty = "EASY" | "MEDIUM" | "HARD"

export type CellMark = "O" | "X"

export type PlayerO = {
    name: string,
    mark: CellMark
}

export type PlayerX = {
    name: string,
    mark: CellMark
}

export type Player = PlayerO | PlayerX

export type CellValue = {
    value: 0 | 1 | null,
    placedAtMoveNum: number
}

export type BoardState = CellValue[]

export type Game = {
    isVanishing: boolean,
    boardState: BoardState,
    players: [PlayerO | undefined, PlayerX | undefined],
    isOver: {
        value: boolean,
        board?: BoardState,
        combo?: number[],
        result: string
    },
    lastMoveBy: "O" | "X" | undefined,
    moveNum: number,
}


interface AiWorkerInput {
    boardState: BoardState,
    difficulty: AiDifficulty,
    aiMark: CellMark,
    isVanishing?: {
        movesDone: number
    }
}