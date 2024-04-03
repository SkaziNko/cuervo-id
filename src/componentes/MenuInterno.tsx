import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { AuthContext } from '../context/AuthContext';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { ButtonText } from "./ButtonText";
import { appTheme } from '../theme/appTheme';


export const MenuInterno = ( { navigation }:DrawerContentComponentProps ) => {

    const assets: string = './../../assets/';
    
    const { authState } = useContext( AuthContext );

    return(
        <DrawerContentScrollView>
            <View
                style={ appTheme.avatarContainer }
            >
                <Image
                    style={ appTheme.avatar }
                    source={
                        ( authState.userImage == undefined )
                        ? require( assets + 'cuervo.png')
                        //: { uri: authState.userImage }
                        : { uri: `data:image/jpeg;base64,${authState.userImage}` }
                    }
                />
                <Text
                    style={{
                        ...appTheme.title,
                        fontSize: 25,
                        marginTop: 5
                    }}
                >
                    Estudiante: {'\n'}
                    {
                        ( authState.username != undefined ) && authState.username
                    }
                </Text>
            </View>
            <View
                style={ appTheme.menuContainer }
            >
                <ButtonText
                    action={ () => navigation.navigate("StackNavigator") }
                    title="Home"
                />
                <ButtonText
                    action={ () => navigation.navigate("CalendarScreen") }
                    title="School Calendar"
                    
                />
                <ButtonText
                    action={ () => navigation.navigate("ServiceScreen") }
                    title="Services"
                />
                <ButtonText
                    action={ () => navigation.navigate("SettingsScreen") }
                    title="Settings"
                />
                <ButtonText
                    action={ () => navigation.navigate("QrScannerScreen") }
                    title="Escanear Codigo Qr"
                />
                <ButtonText
                    action={ () => navigation.navigate("QrGeneratorScreen") }
                    title="LogOut"
                />
            </View>
        </DrawerContentScrollView>
    )
}