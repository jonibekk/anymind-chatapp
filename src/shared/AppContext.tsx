import { createContext, ReactNode, useContext, useReducer } from "react";
import { ChatAuth } from "../models/ChatAuthType";
import { chatReducer } from './Reducers'

// Default Data since it's given as default in the description
const defaultState: ChatAuth = {
    currentUser: 'Sam',
    currentChannel: '1',
    users: ['Sam', 'Russell', 'Joyse'],
    channels: ['1', '2', '3']
}

// Dispatch Type
export type Dispatch = (action: { type: string, payload: string }) => void;

// Create Context
const AppContext = createContext<{ state: typeof defaultState, dispatch: Dispatch }>(
    {} as { state: typeof defaultState, dispatch: Dispatch }
);

export const ChatProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(chatReducer, defaultState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export const useChatContext = () => {
    const context = useContext(AppContext)
    return context;
}