import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
import { ViewProps } from "react-native";


export interface AuthState{
    isLoggenIn: boolean;
    username?: string | undefined;
    userKey?: string | undefined;
    userImage?: string | undefined;
}


export const AuthInitialState: AuthState = {
    isLoggenIn: false,
    username: undefined,
    userImage: undefined,
    userKey: undefined,
}

export interface AuthContextProps{
    authState: AuthState;
    signIn: () => void;
    changeUserName: ( userName: string ) => void;
    logOut: () => void;
    changeUserImage: ( sourceImage: string ) => void;
    changeUserKey: ( userKey: string ) => void;
}

export const AuthContext = createContext( {} as AuthContextProps );

export const AuthProvider = ( { children }: { children: ReactNode } ) => {


    const [ authState, dispatch ] = useReducer(AuthReducer, AuthInitialState);

    const signIn = (): void => dispatch( { type: "signIn" } );

    const logOut = (): void => dispatch( { type: "logOut" } );

    const changeUserName = ( userName: string ): void => {
        dispatch( { type: "changeUserName", payload: userName } );
    }

    const changeUserImage = ( userImage: string ): void => {
        dispatch( { type: "changeUserImage", payload: userImage } );
    }

    const changeUserKey = ( userKey: string ): void => {
        dispatch( { type: "changeUserKey", payload: userKey } );
    }

    return(
        <AuthContext.Provider
            value={{
                authState,
                signIn,
                logOut,
                changeUserImage,
                changeUserName,
                changeUserKey
            }}
        >
            { children }
        </AuthContext.Provider>
    );

} 
