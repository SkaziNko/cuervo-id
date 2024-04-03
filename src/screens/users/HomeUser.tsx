import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, RefreshControl, Button } from "react-native";
import { UserResponse } from "../../interfaces/cuervoApi";
import { appTheme } from "../../theme/appTheme";
import { useUserApi } from "../../hooks/useUserApi";
import { BtnTouch } from "../../componentes/BtnTouch";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { QrScannerScreen } from "../camera/QrScannerScreen";

export const UserHome = () => {

    const { listUsers, isLoading, loadUsers } = useUserApi();
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const createUser: UserResponse = {
        id_user:  '',
        nombre:     '',
        ap_paterno: '',
        ap_materno: '',
        image:      '',
        userKey:  '',
        carrera:    '',
        password:   '',
        type_user:  ''
    }

    useEffect( () => {
        (isLoading) && loadUsers();
    },[ isFocused ]);

    return(
        <View
            style={ appTheme.containerGlobal }
        >
            <FlatList
                data={ Object.values( listUsers ) }
                keyExtractor={ (item) => '#'+item.id_user }
                ListHeaderComponent={(
                    <View>
                        <Text
                            style={{
                                ...appTheme.title,
                                marginTop: 20
                            }}
                        >
                            Lista de Usuarios
                        </Text>
                        {
                            ( !isLoading ) &&
                            <ActivityIndicator
                                style={{ height: 100 }}
                                size={ 40 }
                                color="pink"
                            />
                        }
                        <BtnTouch
                            title='Nuevo registro'
                            action={ () => navigation.navigate("UserFormScreen",{ UserResponse: createUser }) }
                            backgroundColor='black'
                        />                        
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={ (!isLoading) }
                        onRefresh={ loadUsers }
                        colors={ ["pink"] }
                        progressBackgroundColor="black"
                    />
                }
                showsVerticalScrollIndicator={ false }
                numColumns={ 2 }
                renderItem={ ( { item } ) => (
                    <BtnTouch
                        title={ item.nombre }
                        action={ () => navigation.navigate("UserFormScreen",{ UserResponse: item }) }
                        backgroundColor='lightgreen'
                    />
                )}
            />
        </View>
    );

}