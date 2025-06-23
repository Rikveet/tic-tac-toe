"use client"

import {motion} from "framer-motion";
import {IoIosCloseCircle} from "react-icons/io";

export default function CloseIcon({ className, onCloseAction}: { className?: string, onCloseAction: () => void }) {
    return (
        <motion.div
            className={`h-[100%] w-[100%] cursor-pointer rounded-full bg-[rgba(0,0,0,0.2)] ${className}`} onClick={() => onCloseAction()}
            initial={{scale: 0}}
            animate={{scale: 0.9}}
            whileHover={{rotateZ: '180deg', scale: 1}}
            transition={{duration: 0.3, ease: 'easeInOut'}}
        >
            <IoIosCloseCircle className={'h-[100%] w-[100%]'}/>
        </motion.div>

    )
}