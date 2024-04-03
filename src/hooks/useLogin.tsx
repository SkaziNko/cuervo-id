import { useReducer, useState, useContext } from "react";
import { cuervoApi } from "../api/cuervoApi";
import { RequestLogin } from "../interfaces/cuervoApi";
import { AuthContext } from "../context/AuthContext";


export interface LoginData{
    userKey:    string;
    password:   string;
    type_user:  string;
}

const initialLoginData: LoginData = {
    userKey:    '',
    password:   '',
    type_user:  '',
}

type Action = 
    { type: 'handleInputChange', payload: { fieldName: keyof LoginData, value: string } };
    


const dataReducer = ( state: LoginData, action: Action ) => {
    switch( action.type ){
        case 'handleInputChange':
            return{
                ...state,
                [ action.payload.fieldName ] : action.payload.value,
            }
        default:
            return { ...state };
    }
}

export const useLogin  = () => {

    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ state, dispatch ] = useReducer( dataReducer, initialLoginData );
    const [ request, setRequest ] = useState<RequestLogin>();
    const { authState, signIn, changeUserName, changeUserImage, changeUserKey } = useContext( AuthContext );

    const handleInputChange = ( fieldName: keyof LoginData, value: string ) => {
        dispatch({ type: 'handleInputChange', payload:{ fieldName, value } });
    }

    const handleLogin = async () => {
        
        setIsLoading( false );

        const apiUrl: string = 'http://192.168.1.79:3030/usuarios/login';

        const dataBody = {
            userKey: state.userKey,
            password: state.password,
            type_user: state.type_user
        }

        try{

            const response = await cuervoApi.post<RequestLogin>(apiUrl, dataBody);

            ( response.data !== false ) && ( () => {

                const user = response.data;

                signIn();
                changeUserName( `${user.nombre} ${user.ap_paterno} ${user.ap_materno}` );
                changeUserImage( user.image );
                changeUserKey( user.userKey );
                setRequest( response.data );
            })();
        }catch( error ){
            console.log("Datos Incorrectos")
            setRequest( false );
        }

        setIsLoading( true );
    }

    return { state, handleInputChange, handleLogin, isLoading, request };
}