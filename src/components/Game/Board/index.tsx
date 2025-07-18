"use client"

import styles from './index.module.scss';
import {useGameState} from "@/lib/store/selectors";
import {motion} from 'framer-motion';
import VanishModeButton from "@/components/VanishModeButton";
import {BoardState} from "@/env";

export default function GameBoard({onCellAction}: { onCellAction: (position: number) => void, }) {
    const {boardState, lastMoveBy, moveNum, isVanishing, isOver} = useGameState();

    return (
        <motion.div className={styles.container}>
            <div className={styles.vanishMode}>
                <div>Vanish Mode</div>
                <VanishModeButton/>
            </div>
            <motion.div className={styles.game}
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{duration: 0.2, ease: 'easeIn'}}
            >
                {
                    boardState.map(
                        (cell, index) =>
                            <motion.div
                                key={index}
                                className={styles.cell}
                                onClick={() => {
                                    if (cell.value === null)
                                        onCellAction(index)
                                }}
                                animate={{
                                    color: "white",
                                    background: cell.value === null ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0)'
                                }}
                                whileHover={{
                                    scale: cell.value === null ? 0.95 : 1,
                                    color: cell.value === null ? 'grey' : 'white',
                                    background: cell.value === null ? 'rgba(240, 248, 255, 0.8)' : 'rgba(58, 56, 56, 1)'
                                }}
                                whileTap={{
                                    scale: cell.value === null ? 0.85 : 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: 'easeInOut'
                                }}
                            >
                                <motion.div
                                    className={styles.text}
                                    animate={{
                                        opacity: cell.value === null ?
                                            0 :
                                            isVanishing ? Math.max(1 - ((moveNum - cell.placedAtMoveNum) / 8), 0.1) : 1
                                    }}
                                    whileHover={{
                                        opacity: 1
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'easeInOut'
                                    }}
                                >
                                    {cell.value === null ? lastMoveBy === 'O' ? 'X' : 'O' : cell.value === 0 ? 'O' : 'X'}
                                </motion.div>
                            </motion.div>
                    )}
            </motion.div>
        </motion.div>
    )
}