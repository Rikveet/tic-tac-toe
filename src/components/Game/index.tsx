"use client"

import styles from "./index.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import GameOver from "@/components/Game/Over";
import GameBoard from "@/components/Game/Board";
import {useGameState} from "@/lib/store/selectors";
import {useEffect} from "react";
import {evaluateBoard} from "@/lib/util";
import {useDispatchers} from "@/lib/store/dispatchers";

export default function Game({resetAction, onCellAction}: {
    resetAction: () => void,
    onCellAction: (position: number) => void
}) {
    const {boardState, players, isOver: isGameOver, moveNum, lastMoveBy} = useGameState()
    const {notify, gameStore} = useDispatchers()

    useEffect(() => {
        const res = evaluateBoard(boardState)
        if (res) {
            if (res === "DRAW") {
                gameStore.endGame("It's a draw")
                notify.info('Game over.')
            } else {
                gameStore.endGame(
                    `${res.winner === 'X' ? players[1]?.name : players[0]?.name} won!`,
                    {
                        combo: res.winningCombo,
                        board: res.board
                    })
            }

        }
    }, [boardState]);

    return (
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
                    <GameOver resetAction={resetAction}/>
                    :
                    <GameBoard onCellAction={onCellAction}/>
            }
            <div className={styles.boardStats}>
                <div>Move #</div>
                <div>{moveNum + 1}</div>
            </div>
        </div>
    )
}