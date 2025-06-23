"use client"

import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactNode, useState} from "react";

interface props {
    children: ReactNode
}

export default function QueryProvider({children}: props) {
    const [queryClient] = useState(() => new QueryClient())
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}