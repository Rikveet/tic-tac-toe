"use client"

import {useAppDispatch} from "@/lib/store/index";
import {pushNotification, removeNotification} from "@/lib/store/slice/createNotificationSlice";
import {BoardState, CellMark, ModalSlice, Player, PlayerO, PlayerX} from "@/env";
import {closeModal, exitModal, openModal} from "@/lib/store/slice/createModalSlice";
import {endGame, placeMarker, resetBoard, setPlayer, setVanishing} from "@/lib/store/slice/createGameSlice";

const getNotifyId = () => Date.now() + Math.floor(Math.random() * 1000)

export const useDispatchers = () => {
    const dispatch = useAppDispatch()

    return {
        notify: {
            success: (message: string) => {
                const id = getNotifyId()
                dispatch(pushNotification({msgType: 'SUCCESS', message, id}))
                setTimeout(() => {
                    dispatch(removeNotification({id}))
                }, 5000)
            },
            info: (message: string) => {
                const id = getNotifyId()
                dispatch(pushNotification({msgType: 'INFO', message, id}))
                setTimeout(() => {
                    dispatch(removeNotification({id}))
                }, 5000)
            },
            failed: (message: string) => {
                const id = getNotifyId()
                dispatch(pushNotification({msgType: 'FAILED', message, id}))
                setTimeout(() => {
                    dispatch(removeNotification({id}))
                }, 5000)
            },
        },
        modal: {
            open: (config: Pick<ModalSlice, "component">) => {
                dispatch(openModal(config))
            },
            close: () => {
                dispatch(closeModal())
            },
            exit: () => {
                dispatch(exitModal())
            }
        },
        gameStore: {
            resetBoard: (players?: { playerO: PlayerO, playerX: PlayerX }) => {
                dispatch(resetBoard({players: players ? [players.playerO, players.playerX] : undefined}))
            },
            placeMark: (player: Player, position: number) => {
                dispatch(placeMarker({player, position}))
            },
            endGame: (result: string, winner?: { combo: number[], board: BoardState }) => {
                dispatch(endGame({result, winner}))
            },
            setPlayer: (name: string, mark: CellMark) => {
                dispatch(setPlayer({name, mark}))
            },
            setVanishMode: (open: boolean) => {
                dispatch(setVanishing(open))
            }
        }
    }
}
