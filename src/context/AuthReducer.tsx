import { AuthState } from "./AuthContext";

type AuthAction =
    | { type: "signIn" }
    | { type: "logOut" }
    | { type: "changeUserImage", payload: string }
    | { type: "changeUserName", payload: string }
    | { type: "changeUserKey", payload: string };


export const AuthReducer = ( state: AuthState, action: AuthAction): AuthState => {

    switch( action.type ){
        case "signIn":
            return{
                ...state,
                isLoggenIn: true,
                username: 'no_nameuser_yet',
            }
        case "logOut":
            return{
                ...state,
                isLoggenIn: false,
                username: undefined,
                userImage: undefined,
            }
        case "changeUserImage":
            return{
                ...state,
                userImage: action.payload,
            }
        case "changeUserName":
            return{
                ...state,
                username: action.payload,
            }
        case "changeUserKey":
            return{
                ...state,
                userKey: action.payload,
            }
        default:
            return{
                ...state
            };
    }
}