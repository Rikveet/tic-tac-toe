"use client"

import {motion} from 'framer-motion';
import styles from './index.module.scss'
import {useGameState} from "@/lib/store/selectors";
import Button from "@/components/Button";

export default function GameOver({resetAction}: { resetAction: () => void }) {
    const {isOver} = useGameState()
    return (
        <motion.div className={styles.container}
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.2, ease: 'easeIn'}}
        >
            <div className={styles.heading}>Game Over</div>
            <div className={styles.message}>{isOver.result.toUpperCase()}</div>
            {
                isOver.board ?
                    <motion.div className={styles.game}
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{duration: 0.2, ease: 'easeIn'}}
                    >
                        {
                            isOver.board.map(
                                (cell, index) =>
                                    <motion.div
                                        key={index}
                                        className={styles.cell}
                                        animate={{
                                            color: "white",
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: 'easeInOut'
                                        }}
                                    >
                                        <motion.div
                                            className={styles.text}
                                            initial={{opacity: 0}}
                                            animate={{
                                                opacity: 1,
                                                background: isOver.combo && isOver.combo.includes(index) ? "rgba(16,185,129,1)" : cell.value === null? "rgba(58, 56, 56, 1)" : "rgba(0,0,0,0)"
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: 'easeInOut'
                                            }}
                                        >
                                            {cell.value === null ? "" : cell.value === 0 ? 'O' : 'X'}
                                        </motion.div>
                                    </motion.div>
                            )}
                    </motion.div>
                    : <></>
            }
            <Button className={styles.button} text={'Restart'} onClickAction={() => {
                resetAction()
            }}/>
        </motion.div>
    )
}