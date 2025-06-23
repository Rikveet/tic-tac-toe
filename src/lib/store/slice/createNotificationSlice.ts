import {Notification, NotificationSlice} from "@/env";
import {createSlice} from "@reduxjs/toolkit";

const initialState: NotificationSlice = {
    notifications: []
}

export const notificationSlice = createSlice(
    {
        name: 'notifications',
        initialState,
        reducers: {
            pushNotification: (state, action: { payload: Pick<Notification, 'msgType' | 'message' | 'id'> }) => {
                if (!state.notifications.every(n => n.message !== action.payload.message))
                    return
                state.notifications.push(
                    {
                        message: action.payload.message,
                        msgType: action.payload.msgType,
                        createdAt: Date.now(),
                        id: action.payload.id
                    }
                )
                if (state.notifications.length > 5) {
                    let earliestNotificationIndex = 0
                    state.notifications.forEach((n, i) => {
                        if (n.createdAt < state.notifications[earliestNotificationIndex].createdAt)
                            earliestNotificationIndex = i
                    })
                    state.notifications = state.notifications.filter((n, i) => i !== earliestNotificationIndex)
                }

            },
            clearAllNotifications: (state) => {
                state.notifications = []
            },
            removeNotification: (state, action: { payload: { id: number } }) => {
                state.notifications = state.notifications.filter(n => n.id != action.payload.id)
            },
        }
    }
)

export const {pushNotification, removeNotification, clearAllNotifications} = notificationSlice.actions