"use client"

import {motion} from "framer-motion";
import {BsGear} from "react-icons/bs";

export default function Settings({onClickAction}:{onClickAction: ()=>void}){
    return(
        <motion.div
            className={'absolute bottom-[10px] right-[50px] h-[50px] w-[50px] cursor-pointer'}
            onClick={onClickAction}
            whileHover={{
                rotateZ: '180deg',
                scale: 0.95
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut'
            }}
            whileTap={{
                scale: 0.9
            }}
        >
            <BsGear className={'h-[100%] w-[100%]'}/>
        </motion.div>
    )
}