"use client"

import {motion} from 'framer-motion';
import styles from './index.module.scss'
import {getGameState} from "@/lib/store/selectors";
import Button from "@/components/Button";

export default function GameOver({resetAction}:{resetAction: ()=>void}) {
    const {isOver: {value, result}} = getGameState()
    return (
        <motion.div className={styles.container}
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.2, ease: 'easeIn'}}
        >
            <div className={styles.heading}>Game Over</div>
            <div className={styles.message}>{result.toUpperCase()}</div>
            <Button className={styles.button} text={'Restart'} onClickAction={()=>{resetAction()}}/>
        </motion.div>
    )
}