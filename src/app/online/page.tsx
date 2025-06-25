"use client"

import styles from './index.module.scss'
import {getAuth, GoogleAuthProvider} from "@firebase/auth";
import {useEffect, useState} from "react";
import {db, firebaseApp} from "@/lib/db";
import Button from "@/components/Button";
import {signInWithPopup} from "@firebase/auth";
import {useDispatchers} from "@/lib/store/dispatchers";
import {useModalState} from "@/lib/store/selectors";
import OnlinePlayerConfig from "@/components/Game/Configs/OnlinePlayerConfig";
import Settings from "@/components/Game/Settings";
import {motion} from 'framer-motion';
import {child, equalTo, get, onValue, orderByChild, query, ref} from "@firebase/database";

const Games = () => {
    const [games, setGames] = useState([])
    const auth = getAuth(firebaseApp)

    useEffect(() => {
        console.log('hooked')
        console.log('games/*/players/0/' + auth.currentUser?.uid)
        if (!auth.currentUser?.uid)
            return

        const hosted = query(
            ref(db, 'games'),
            orderByChild('players/0/id'),
            equalTo(auth.currentUser.uid)
        );

        const joined = query(
            ref(db, 'games'),
            orderByChild('players/1/id'),
            equalTo(auth.currentUser.uid)
        )

        onValue(hosted, (snapshot) => {
            console.log(snapshot.exists(), snapshot.toJSON())
        }, (error) => {
            console.log(error)
        })

        onValue(joined, (snapshot) => {
            console.log(snapshot.exists(), snapshot.toJSON())
        }, (error) => {
            console.log(error)
        })

    }, []);

    return (
        <motion.div layout={true}>

        </motion.div>
    )
}

export default function Page() {
    const auth = getAuth(firebaseApp)
    const [isLoggedIn, setUserLoggedIn] = useState(false)
    const [isLoggingIn, setUserLoggingIn] = useState(false)
    const googleAuthProvider = new GoogleAuthProvider();

    const {notify, modal} = useDispatchers()

    const {isOpen: isModalOpen} = useModalState()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserLoggedIn(true)
                notify.success(`Welcome ${user.displayName ?? user.email?.split('@')[0]} 👋`)
            } else {
                setUserLoggedIn(false)
                notify.success(`Good bye 👋`)
            }

        })
    }, []);

    const openPlayerInfoModal = () => {
        modal.open({
            component:
                {
                    title: "Settings",
                    child: <OnlinePlayerConfig/>,
                }
        })
    }

    const getRender = () => {
        if (isLoggedIn)
            return <Games/>
        if (isLoggingIn)
            return <div>log-in animation</div>
        return <Button className={styles.loginButton}
                       text={'Login'}
                       onClickAction={
                           async () => {
                               setUserLoggingIn(true)
                               const res = await signInWithPopup(auth, googleAuthProvider)
                               setUserLoggingIn(false)
                           }}/>
    }


    return (
        <div className={styles.wrapper}>
            {
                getRender()
            }
            {
                isLoggedIn ?
                    <Settings
                        onClickAction={() => {
                            openPlayerInfoModal()
                        }}/>
                    : <></>
            }

        </div>
    )
}