import {ModalSlice, NotificationSlice} from "@/env";
import {ReactNode} from "react";
import {createSlice} from "@reduxjs/toolkit";

const initialState: ModalSlice = {
    isOpen: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        closeModal: (state) => {
            if(state.component && state.component.onClose){
                if(state.component.onClose()){
                    state.isOpen = false
                    state.component = undefined
                }
            }else{
                state.isOpen = false
                state.component = undefined
            }
        },
        openModal: (state, action: { payload: Pick<ModalSlice, "component"> }) => {
            state.isOpen = true
            state.component = action.payload.component
        },
        exitModal: (state)=>{
            state.isOpen = false
            state.component = undefined
        }
    }
})

export const {openModal, closeModal, exitModal} = modalSlice.actions