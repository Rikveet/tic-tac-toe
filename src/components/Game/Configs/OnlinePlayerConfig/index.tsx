"use client"

import styles from './index.module.scss'
import {useEffect, useState} from "react";
import {useDispatchers} from "@/lib/store/dispatchers";
import {useDebounce} from "use-debounce";
import {getAuth, signOut, updateProfile} from "@firebase/auth";
import {firebaseApp} from "@/lib/db";
import {FaSave} from "react-icons/fa";
import {motion} from 'framer-motion';
import Button from "@/components/Button";

export default function OnlinePlayerConfig() {
    const [name, setName] = useState("")
    const {notify, modal} = useDispatchers()

    const [updatingUserName, setUpdatingUserName] = useState(false)

    const auth = getAuth(firebaseApp)

    useEffect(() => {
        if (auth.currentUser) {
            setName(auth.currentUser.displayName ?? "")
        }
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.nameInput}>
                <div className={'absolute -top-[35%] left-[2%] bg-transparent font-mono font-bold text-lg text-black'}>Gamer Tag</div>
                <input value={name}
                       placeholder={'Your name'}
                       onChange={(e) => {
                           if (e.target.value !== '') {
                               notify.failed("Name cannot be empty")
                           }
                           setName(e.target.value)
                       }}
                       disabled={updatingUserName}
                />
                <motion.div
                    className={'h-[50px] w-[50px] flex justify-center items-center absolute top-[10px] right-[10px]'}
                    onClick={() => {
                        if (auth.currentUser && !updatingUserName) {
                            setUpdatingUserName(true)
                            console.log(auth.currentUser)
                            updateProfile(auth.currentUser, {
                                displayName: name
                            }).then(r => {
                                setUpdatingUserName(false)
                                console.log(r)
                            })
                        }
                    }}
                    animate={{
                        color: auth.currentUser?.displayName === name ? 'rgb(155,155,155)' : 'rgb(0,0,0)',
                        cursor: auth.currentUser?.displayName === name ? 'default' : 'pointer'
                    }}
                    whileHover={{
                        y: auth.currentUser?.displayName === name ? '0%' : '10%'
                    }}
                >
                    <FaSave className={'h-[100%] w-[auto] aspect-square'}/>
                </motion.div>
            </div>
            <Button
                text={'Logout'}
                onClickAction={
                    () => {
                        modal.exit()
                        auth.signOut()
                    }}/>
        </div>
    )
}