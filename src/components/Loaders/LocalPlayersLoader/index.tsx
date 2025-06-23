"use client";

import styles from './index.module.scss';
import {useGameState} from "@/lib/store/selectors";
import {useDispatchers} from "@/lib/store/dispatchers";
import {motion} from 'framer-motion';
import {CellMark, Player} from "@/env";

const PlayerNameInput = ({player, mark, autoFocus}: { player?: Player, mark: CellMark, autoFocus?: boolean }) => {
    const {gameStore} = useDispatchers()

    return (
        <motion.input
            className={`${styles.nameInput} inset-shadow-2xs inset-shadow-gray-500`}
            autoFocus={autoFocus}
            animate={
                mark === "X" ?
                    {
                        bottom: 0
                    } : {
                        top: 0
                    }
            }
            value={player?.name ?? ""}
            onChange={(e) => {
                gameStore.setPlayer(e.target.value, mark)
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut'
            }}
        />
    )
}

export default function LocalPlayersLoader() {
    const {players} = useGameState()
    const {gameStore} = useDispatchers()

    return (
        <div className={styles.container}>
            <div className={styles.indicators}>
                <div className={styles.indicator}>O</div>
                <div className={styles.indicator}>X</div>
            </div>
            <div className={styles.nameInputs}>
                <PlayerNameInput player={players[0]} mark={'O'} autoFocus={true}/>
                <PlayerNameInput player={players[1]} mark={'X'}/>
            </div>
        </div>
    )
}