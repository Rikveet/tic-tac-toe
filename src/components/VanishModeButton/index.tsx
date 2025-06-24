"use client"

import {motion} from "framer-motion";
import {useGameState} from "@/lib/store/selectors";
import {useDispatchers} from "@/lib/store/dispatchers";

export default function VanishModeButton() {
    const {isVanishing} = useGameState()
    const {gameStore} = useDispatchers()

    return (
        <div className="flex items-center justify-center h-[100%] bg-transparent">
            <div className="flex items-center space-x-4">
                <div
                    className={`w-16 h-8 rounded-full cursor-pointer transition-colors duration-200 ${
                        isVanishing ? 'bg-blue-200' : 'bg-gray-300'
                    }`}
                    onClick={() => gameStore.setVanishMode(!isVanishing)}
                >
                    <motion.div
                        className="w-7 h-7 bg-white rounded-full shadow-md m-0.5"
                        animate={{
                            x: isVanishing ? 32 : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                    />
                </div>
            </div>
        </div>
    )
}