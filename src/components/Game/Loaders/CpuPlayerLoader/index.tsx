"use client"

import styles from './index.module.scss'
import {motion} from "framer-motion";
import {useGameState} from "@/lib/store/selectors";
import {useDispatchers} from "@/lib/store/dispatchers";
import {AiDifficulty} from "@/env";
import {useState} from "react";

export default function CpuPlayerLoader(
    { difficulty, onDifficultyChangeAction}:
    {
        difficulty: AiDifficulty
        onDifficultyChangeAction: (difficulty: AiDifficulty) => void
    }) {

    const {players} = useGameState()
    const {gameStore} = useDispatchers()
    const [playerO, playerX] = players
    const player = playerO?.name === 'Joe' ? playerX ?? {name: '', mark: 'X'} : playerO ?? {name: '', mark: 'O'}
    return (
        <div className={styles.container}>
            <motion.input
                className={`${styles.nameInput} inset-shadow-2xs inset-shadow-gray-500`}
                autoFocus={true}
                placeholder={"Name"}
                value={player?.name ?? ""}
                onChange={(e) => {
                    gameStore.setPlayer(e.target.value, player.mark)
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                }}
            />
            <div className={styles.select}>
                 <span>
                Difficulty:
            </span>
                <select defaultValue={"EASY"}
                        onChange={(e) => {
                            onDifficultyChangeAction(e.target.value as AiDifficulty)
                        }}>
                    <option value={"EASY"}>
                        Easy
                    </option>
                    <option value={"MEDIUM"}>
                        Medium
                    </option>
                    <option value={"HARD"}>
                        Hard
                    </option>
                </select>
            </div>

            <div className="flex items-center justify-center h-[100%] bg-transparent">
                <div className="flex items-center space-x-4 text-black font-bold font-mono text-lg">
                    <span className="">O</span>
                    <div
                        className={`w-16 h-8 rounded-full cursor-pointer transition-colors duration-200 ${
                            player.mark !== "O" ? 'bg-blue-200' : 'bg-gray-300'
                        }`}
                        onClick={() => {
                            const _player = {...player}
                            gameStore.setPlayer("Joe", _player.mark)
                            gameStore.setPlayer(_player.name, _player.mark === "O" ? "X" : "O")
                        }}
                    >
                        <motion.div
                            className="w-7 h-7 bg-white rounded-full shadow-md m-0.5"
                            animate={{
                                x: player.mark !== "O" ? 32 : 0,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                        />
                    </div>
                    <span className="">X</span>
                </div>
            </div>
        </div>
    )
}