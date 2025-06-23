import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/store/QueryProvider";
import Providers from "@/lib/Providers";
import Modal from "@/components/Modal";
import Notifications from "@/components/Notifications";
import Nav from "@/components/Nav";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tic Tac Toe",
    description: "Tic tac toe my name is Joe....",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
            <Nav/>
            <Modal/>
            <Notifications/>
            {children}
        </Providers>
        </body>
        </html>
    );
}
