"use client"

import styles from "./index.module.scss";
import Settings from "@/components/Game/Settings";
import {motion} from "framer-motion";
import Game from "@/components/Game";
import Button from "@/components/Button";
import {useGameState, useModalState} from "@/lib/store/selectors";
import {useEffect, useState} from "react";
import {AiDifficulty, AiWorkerInput, Player} from "@/env";
import {useDispatchers} from "@/lib/store/dispatchers";
import CpuPlayerLoader from "../../components/Game/Configs/CpuPlayerConfig";
import {useAiWorker} from "@/lib/util/ai";


export default function Page() {

    const {boardState, players, isOver: isGameOver, moveNum, lastMoveBy, isVanishing} = useGameState()
    const {isOpen: isModalOpen} = useModalState()

    const {modal, notify, gameStore} = useDispatchers()

    const [currentPlayer, setCurrentPlayer] = useState(players[0])
    const [playersLoaded, setPlayersLoaded] = useState(players.every(p => p !== undefined))

    const [difficulty, setDifficulty] = useState<AiDifficulty>("EASY")

    const {result: bestMove, error, processing, setAiInputData} = useAiWorker()

    const openPlayerInfoModal = () => {
        modal.open({
            component:
                {
                    title: "Settings",
                    child:
                        <CpuPlayerLoader
                            difficulty={difficulty}
                            onDifficultyChangeAction={(difficulty) => {
                                setDifficulty(difficulty)
                            }}/>,
                }
        })
    }

    useEffect(() => {
        gameStore.setPlayer('Joe', 'X')
    }, []);

    useEffect(() => {
        const [playerO, playerX] = players
        if (playerO === undefined || playerX === undefined || playerO.name === "" || playerX.name === "") {
            notify.info('Player name missing')
            if (!playersLoaded)
                setPlayersLoaded(false)
            return;
        }
        if (!playersLoaded && playerX && playerX.name !== "" && playerO && playerX.name !== "") {
            notify.success(`Let's play!`)
            setCurrentPlayer(playerX.name === "Joe" ? playerO : playerX)
            setPlayersLoaded(true)
        }

    }, [players, isModalOpen]);

    useEffect(() => {
        if (!playersLoaded) {
            // open modal for the player
            openPlayerInfoModal()
        }
    }, [playersLoaded])

    useEffect(() => {
        console.log(bestMove)
        const aiPlayer = (players[0]?.name === "Joe" ? players[0] : players[1]) as Player
        if (lastMoveBy !== aiPlayer?.mark && bestMove !== null){
            console.log(aiPlayer, bestMove)
            gameStore.placeMark(aiPlayer, bestMove)
        }

    }, [bestMove]);


    return (
        <div className={styles.wrapper}>
            <Settings
                onClickAction={() => {
                    openPlayerInfoModal()
                }}/>

            <motion.div className={styles.container} layout={true}>
                {
                    playersLoaded && players[0] && players[1] && currentPlayer ?
                        <Game
                            onCellAction={
                                async (position) => {
                                    const user = (players[0]!.name !== "Joe" ? players[0] : players[1]) as Player
                                    const aiPlayer = (players[0]!.name === "Joe" ? players[0] : players[1]) as Player
                                    if (lastMoveBy === user.mark)
                                        return
                                    gameStore.placeMark(user, position)
                                    const syncedBoard = [...boardState]
                                    syncedBoard[position] = {
                                        value: user.mark === "O" ? 0 : 1,
                                        placedAtMoveNum: moveNum + 1
                                    }
                                    setAiInputData(
                                        {
                                            boardState: syncedBoard,
                                            difficulty,
                                            aiMark: aiPlayer!.mark,
                                            isVanishing: isVanishing ? {movesDone: moveNum + 1} : undefined
                                        }
                                    )
                                }
                            }

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
                            }}
                        />
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