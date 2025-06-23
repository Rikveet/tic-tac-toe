"use client"

import {useAppSelector} from "@/lib/store";

export const getModalState = ()=> useAppSelector(state => state.modal)
export const getNotificationsState = ()=> useAppSelector(state=>state.notifications)
export const getGameState =  ()=> useAppSelector(state=>state.game)