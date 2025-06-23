"use client";

import styles from './index.module.scss'
import {getGameState, getModalState} from "@/lib/store/selectors";
import GameBoard from "@/components/GameBoard";
import {useEffect, useState} from "react";
import {Player} from "@/env";
import {useDispatchers} from "@/lib/store/dispatchers";
import Button from "@/components/Button";
import {motion} from 'framer-motion';
import LocalPlayersLoader from "@/components/Loaders/LocalPlayersLoader";
import {evaluateBoard} from "@/lib/util";
import GameOver from "@/components/GameOver";

export default function Page() {
    const {boardState, players, isOver: isGameOver, moveNum, lastMoveBy} = getGameState()
    const {isOpen: isModalOpen} = getModalState()
    const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(players[0])

    const {modal, notify, gameStore} = useDispatchers()

    const [playersLoaded, setPlayersLoaded] = useState(players.every(p => p !== undefined))

    const openPlayerInfoModal = () => {
        modal.open({
            component:
                {
                    title: "Select your mark",
                    child: <LocalPlayersLoader/>,
                }
        })
    }

    useEffect(() => {
        const [playerO, playerX] = players
        if (playerO === undefined && playerX === undefined) {
            notify.info('Player names missing')
            if (!playersLoaded)
                setPlayersLoaded(false)
            return;
        }
        if (playerO === undefined || playerO.name === "") {
            if (!isModalOpen)
                notify.info('Name missing for O')
            if (!playersLoaded)
                setPlayersLoaded(false)
            return;
        }
        if (playerX === undefined || playerX.name === "") {
            if (!isModalOpen)
                notify.info('Name missing for X')
            if (!playersLoaded)
                setPlayersLoaded(false)
            return;
        }
        if (!playersLoaded) {
            notify.success(`Let's play!`)
            setCurrentPlayer(playerO)
            setPlayersLoaded(true)
        }

    }, [players, isModalOpen]);

    useEffect(() => {
        if (!playersLoaded) {
            // open modal for both players
            openPlayerInfoModal()
        }
    }, [playersLoaded])

    useEffect(() => {
        const res = evaluateBoard(boardState)
        if (res) {
            gameStore.endGame(res === "DRAW" ? "It's a draw" : `${res === 'X' ? players[1]?.name : players[0]?.name} won!`)
            notify.info('Game over.')
        }
    }, [boardState]);

    return (
        <div className={styles.wrapper}>
            <motion.div className={styles.container} layout={true}>
                {
                    playersLoaded && players[0] && players[1] && currentPlayer ?
                        <div className={styles.game}>
                            {
                                isGameOver.value ?
                                    <></> :
                                    <div className={styles.heading}>
                                        {`${lastMoveBy === 'O' ? players[1]?.name : players[0]?.name}'s turn`.toUpperCase()}
                                    </div>
                            }

                            {
                                isGameOver.value ?
                                    <GameOver
                                        resetAction={() => {
                                            if (players[0] && players[1])
                                                setCurrentPlayer(players[0])
                                            else
                                                setCurrentPlayer(undefined)
                                            gameStore.resetBoard(
                                                players[0] && players[1] ?
                                                    {
                                                        playerO: players[0],
                                                        playerX: players[1]
                                                    } :
                                                    undefined
                                            )
                                        }}/>
                                    :
                                    <GameBoard
                                        onCellAction={
                                            (position) => {
                                                gameStore.placeMark(currentPlayer, position)
                                                setCurrentPlayer(players[currentPlayer?.mark === 'O' ? 1 : 0])
                                            }
                                        }
                                    />
                            }
                            <div className={styles.boardStats}>
                                <div>Move #</div>
                                <div>{moveNum + 1}</div>
                            </div>
                        </div>
                        :
                        <div className={styles.playerMissing}>
                            <div className={styles.text}>
                                Players missing
                            </div>
                            <Button
                                className={styles.actionButton}
                                text={"Select Marks"}
                                onClickAction={() => {
                                    openPlayerInfoModal()
                                }}/>
                        </div>
                }
            </motion.div>
        </div>

    )
}