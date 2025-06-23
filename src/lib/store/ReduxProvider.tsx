"use client"

import {ReactNode, useRef} from "react";
import {Provider} from "react-redux";
import {store} from "@/lib/store/index";

export default function ReduxProvider({children}: { children: ReactNode }) {
    return (<Provider store={store}>{children}</Provider>)
}