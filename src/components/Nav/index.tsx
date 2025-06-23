"use client"

import styles from './index.module.scss';
import {motion} from "framer-motion";
import {usePathname, useRouter} from "next/navigation";

export default function Nav() {
    const pathname = usePathname()
    const isRoot = pathname === "/"
    const {push} = useRouter()

    return (
        <motion.div className={styles.wrapper} layout={true}>
            <motion.div className={styles.container}
                        initial={{
                            opacity: 0,
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                        animate={{
                            opacity: 1,
                            flexDirection: isRoot? 'column' : 'row',
                            justifyContent: 'center',
                            width: isRoot? '100vw': 'fit-content',
                            height: isRoot? '100vh': 'fit-content',
                            minWidth: "calc(155px * 3)"
                        }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeInOut'
                        }}
                        layout={true}
            >
                {[
                    {
                        path: 'local',
                        text: 'LOCAL'
                    },
                    {
                        path: 'online',
                        text: 'MULTI-PLAYER'
                    },
                    {
                        path: 'cpu',
                        text: 'BOT'
                    }
                ].map(
                    ({path, text}) =>
                        <motion.div
                            className={`${styles.link} shadow-lg shadow-black`}
                            key={path}
                            onClick={()=>{push(path)}}
                            animate={{
                                scale: 0.95
                            }}
                            whileHover={{
                                scale: 1
                            }}
                            whileFocus={{
                                scale: 0.95
                            }}
                        >
                            {text}
                        </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}