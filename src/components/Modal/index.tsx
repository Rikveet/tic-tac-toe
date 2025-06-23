"use client"

import styles from "./index.module.scss"
import CloseIcon from "@/components/CloseIcon";
import {useDispatchers} from "@/lib/store/dispatchers";
import {getModalState} from "@/lib/store/selectors";
import Button from "@/components/Button";
import {AnimatePresence, motion} from "framer-motion";
import {Fragment} from "react";

export default function Modal() {
    const {modal: {exit: exitModal, close: closeModal}} = useDispatchers();
    const {component} = getModalState();

    return (
        <AnimatePresence mode={"wait"}>
            {
                component ?
                    <motion.div
                        className={styles.wrapper}
                        key={"open"}
                        initial={{
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0
                        }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut'
                        }}
                    >
                        <div className={styles.container}>
                            <div className={styles.heading}>
                                <div className={styles.title}>
                                    {component?.title}
                                </div>
                                <CloseIcon
                                    className={styles.closeButton}
                                    onCloseAction={() => {
                                        exitModal()
                                    }}/>
                            </div>
                            <div className={styles.childContainer}>
                                {component?.child}
                            </div>
                            {
                                component?.onClose !== undefined ?
                                    <div className={`${styles.footer}`}>
                                        <Button text={"Close"}
                                                onClickAction={() => {
                                                    if (component?.onClose && component.onClose())
                                                        closeModal()
                                                }}/>
                                    </div> :
                                    <></>
                            }

                        </div>
                    </motion.div> :
                    <Fragment key={'closed'}/>
            }
        </AnimatePresence>

    )
}