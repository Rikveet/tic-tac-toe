import {configureStore, PayloadAction} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {modalSlice} from "@/lib/store/slice/createModalSlice";
import { notificationSlice } from "./slice/createNotificationSlice";
import {gameSlice} from "@/lib/store/slice/createGameSlice";

export const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        notifications: notificationSlice.reducer,
        game: gameSlice.reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware(
        {
            serializableCheck: false
        }
    )
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

