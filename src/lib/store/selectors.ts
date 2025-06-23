"use client"

import {useAppSelector} from "@/lib/store";

export const useModalState = ()=> useAppSelector(state => state.modal)
export const useNotificationsState = ()=> useAppSelector(state=>state.notifications)
export const useGameState =  ()=> useAppSelector(state=>state.game)