import { useReducer } from "react";
import { useUserApi } from "./useUserApi";

export interface UserForm{
    id_user:    number | string;
    nombre:     string;
    ap_paterno: string;
    ap_materno: string;
    image:      string;
    userKey:    string;
    carrera:    string;
    password:   string;
    type_user:  string;
}

const initialState: UserForm = {
    id_user:    '',
    nombre:     '',
    ap_paterno: '',
    ap_materno: '',
    image:      '',
    userKey:    '',
    carrera:    '',
    password:   '',
    type_user:  '',
}

type Action = {
    type: 'handleInputChange', payload: { fieldName: keyof UserForm, value: string }
};

const formReducer = ( state: UserForm, action: Action ) => {
    switch( action.type ){
        case 'handleInputChange':
            return { 
                ...state,
                [ action.payload.fieldName ] : action.payload.value,
             }
        default:
            return{ ...state };
    }
}


export const useUserForm = () => {

    const { createUser, updateUser, deleteUser } = useUserApi();

    const [ state, dispatch ] = useReducer( formReducer, initialState );

    const handleInputChange = ( fieldName: keyof UserForm, value: string ): void => {
        dispatch( { type: 'handleInputChange', payload: { fieldName, value } } )
    }

    const handleSubmit = () => {
        ( state.id_user !== '' )
        ? updateUser( state )
        : createUser( state );
    }

    const handleDelete = () => {
        ( state.id_user !== '' ) && deleteUser( state );
    }
    return { state, handleInputChange, handleDelete, handleSubmit };
}