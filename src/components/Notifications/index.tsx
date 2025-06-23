"use client"

import styles from './index.module.scss'
import {useNotificationsState} from "@/lib/store/selectors";
import {AnimatePresence, motion} from "framer-motion";
import {Notification} from "@/env";

const getToastColor = ({msgType}: Pick<Notification, "msgType">) => {
    switch (msgType) {
        case "SUCCESS": {
            return "rgb(16,185,129)"
        }
        case "FAILED": {
            return "rgb(239,68,68)"
        }
        case "INFO": {
            return "rgb(221,107,32)"
        }
    }
}

function Toast({msgType, message, id}: Pick<Notification, "message" | "msgType" | "id">) {
    return (
        <motion.div
            className={`${styles.toast} shadow-black shadow-2xl`}
            key={id}
            style={{
                background: getToastColor({msgType})
            }}
            initial={{opacity: 0, x: '-100%'}}
            animate={{opacity: 1, x: '0%'}}
            exit={{opacity: 0, x: '-100%'}}
            transition={{duration: 0.3, ease: 'easeInOut'}}
        >
            {message}
        </motion.div>
    )
}

export default function Notifications() {
    const {notifications} = useNotificationsState()

    return (
        <div className={styles.wrapper}>
            <motion.div className={styles.container} layout={true} transition={{duration: 0.3, ease: "easeInOut"}}>
                <AnimatePresence mode={"sync"}>
                    {
                        notifications.map(({message, msgType, id}) => <Toast key={id} {...{message, msgType, id}}/>)
                    }
                </AnimatePresence>
            </motion.div>
        </div>
    )
}