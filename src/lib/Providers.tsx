"use client"

import {ReactNode} from "react";
import ReduxProvider from "@/lib/store/ReduxProvider";
import QueryProvider from "@/lib/store/QueryProvider";

export default function Providers({children}:{children: ReactNode}){
    return (
        <ReduxProvider>
            <QueryProvider>
                {children}
            </QueryProvider>
        </ReduxProvider>
    )
}