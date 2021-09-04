import { ChatAuth } from "../models/ChatAuthType";
import { CHANGE_USER, CHANGE_CHANNEL } from './ActionTypes'

export const chatReducer = (state: ChatAuth, action: { type: string, payload: string }) => {
    switch (action.type) {
        case CHANGE_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case CHANGE_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload
            }
        default: return state;
    }
}