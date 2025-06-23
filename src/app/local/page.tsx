"use client";

import styles from './index.module.scss'
import {useGameState, useModalState} from "@/lib/store/selectors";
import GameBoard from "@/components/GameBoard";
import {useEffect, useState} from "react";
import {Player} from "@/env";
import {useDispatchers} from "@/lib/store/dispatchers";
import Button from "@/components/Button";
import {AnimatePresence, motion} from 'framer-motion';
import LocalPlayersLoader from "@/components/Loaders/LocalPlayersLoader";
import {evaluateBoard} from "@/lib/util";
import GameOver from "@/components/GameOver";
import {BsGear} from "react-icons/bs";

export default function Page() {
    const {boardState, players, isOver: isGameOver, moveNum, lastMoveBy} = useGameState()
    const {isOpen: isModalOpen} = useModalState()
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
            <motion.div
                className={'absolute bottom-[10px] right-[50px] h-[50px] w-[50px] cursor-pointer'}
                onClick={() => {
                    openPlayerInfoModal()
                }}
                whileHover={{
                    rotateZ: '180deg',
                    scale: 0.95
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                }}
                whileTap={{
                    scale: 0.9
                }}
            >
                <BsGear className={'h-[100%] w-[100%]'} />
            </motion.div>

            <motion.div className={styles.container} layout={true}>
                {
                    playersLoaded && players[0] && players[1] && currentPlayer ?
                        <div className={styles.game}>
                            {
                                isGameOver.value ?
                                    <></> :
                                    <div className={styles.heading}>
                                        <AnimatePresence mode={'popLayout'}>
                                            <motion.span
                                                className={'cursor-pointer'}
                                                key={lastMoveBy}
                                                initial={{
                                                    opacity: 0,
                                                    y: '-100%'
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: '0'
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: '100%'
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    type: 'spring',
                                                    ease: 'easeInOut'
                                                }}
                                            >
                                                {`${lastMoveBy === 'O' ? players[1]?.name : players[0]?.name}`.toUpperCase()}
                                            </motion.span>
                                        </AnimatePresence>
                                        'S TURN
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