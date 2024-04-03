import { useEffect, useState } from "react";
import { cuervoApi } from "../api/cuervoApi";
import { UserResponse } from "../interfaces/cuervoApi";
import { UserForm } from "./useUserForm";

export const useUserApi = () => {

    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ listUsers, setListUsers ] = useState<UserResponse>({} as UserResponse);

    const apiUrl: string= 'http://192.168.1.79:3030/usuarios';

    const loadUsers = async () => {
        setIsLoading( false );

        const response = await cuervoApi.get<UserResponse>(apiUrl);

        setListUsers( response.data );

        setIsLoading( true );
    }

    const createUser = async( data: UserForm) => {

        const dataBody = {
            nombre:         data.nombre,
            ap_paterno:     data.ap_paterno,
            ap_materno:     data.ap_materno,
            image:          data.image,
            userKey:        data.userKey,
            carrera:        data.carrera,
            password:       data.password,
            type_user:      data.type_user
        }

        await cuervoApi.post( apiUrl, dataBody );
    }

    const updateUser = async( data: UserForm ) => {

        const dataBody = {
            nombre:         data.nombre,
            ap_paterno:     data.ap_paterno,
            ap_materno:     data.ap_materno,
            userKey:        data.userKey,
            carrera:        data.carrera
        }

        const password = ( data.password !== '' )
            ? { ...dataBody, password: data.password}
            : { ...dataBody }

        const image = ( data.password !== '' )
            ? { ...dataBody, password: data.password }
            : { ...password }

        await cuervoApi.put( apiUrl + `/${data.id_user}`, image );
    }

    const deleteUser = async( data: UserForm ) => {
        await cuervoApi.delete( apiUrl + `/${data.id_user}` );
    }

    useEffect( () => {
        loadUsers();
    },[]);

    return{
        isLoading,
        loadUsers,
        listUsers,
        createUser,
        updateUser,
        deleteUser
    };
} 
