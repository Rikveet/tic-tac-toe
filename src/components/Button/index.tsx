"use client"

import {motion} from 'framer-motion'
import styles from './index.module.scss'

export default function Button({text, onClickAction, className}:{text: string, onClickAction: ()=>void, className?: string}) {
    return (
        <motion.button className={`${styles.button} shadow-black shadow-2xl ${className}`}
                       initial={{scale: 0}}
                       animate={{scale: 0.95}}
                       whileHover={{scale: 1}}
                       transition={{duration: 0.3, ease: 'easeInOut'}}
                       onClick={onClickAction}
        >
            {text}
        </motion.button>
    )
}