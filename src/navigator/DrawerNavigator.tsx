import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import { StackNavigator } from "./StackNavigator";
import { MenuInterno } from "../componentes/MenuInterno";
import { AuthContext } from "../context/AuthContext";
import { LoginScreen } from "../screens/users/LoginScreen";
import { QrScannerScreen } from "../screens/camera/QrScannerScreen";
import { QrGeneratorScreen } from "../screens/camera/QrGeneratorScreen";
export type RootDrawerParams = {
    StackNavigator: undefined;
    SettingsScreen: undefined;
    AvatarScreen:   undefined;
    RickMortyNavigator: undefined;
    QrNavigator: undefined;
    AlumnosNavigator: undefined;
    QrGeneratorScreen: undefined;
}

const Drawer = createDrawerNavigator<RootDrawerParams>();

const Navigator = () => {

    const { width } = useWindowDimensions();

    return(
        <Drawer.Navigator
            initialRouteName="StackNavigator"
            screenOptions={{
                headerShown: true,
                //overlayColor: 'white',
                drawerType: (width >= 768) ? 'permanent' : 'front',
                drawerPosition: "right",
                drawerStyle: {
                    backgroundColor: 'rgba(41,255,51,0.5)',
                    width: width * 0.7,
                },
                headerStyle:{
                    height: 50,
                }
            }}
            drawerContent={ ( props ) => <MenuInterno {...props} /> }
        >
            <Drawer.Screen
                name="StackNavigator"
                options={{ title: '' }}
                component={ StackNavigator }
                
            />
            
            <Drawer.Screen
                name="SettingsScreen"
                options={{ title: "Settings" }}
                component={ QrGeneratorScreen }
            
            />
            <Drawer.Screen
                name="QrNavigator"
                options={{ title: "QrScannerScreen" }}
                component={ QrScannerScreen }    
            /*/>
            <Drawer.ScreenQrNavigator
                name="AvatarScreen"
                options={{ title: "Avatar" }}
                component={ AvatarScreen }
            />
            <Drawer.Screen
                name="RickMortyNavigator"
                options={{ title: "Rick and Morty" }}
                component={ RickMortyNavigator }
            />
            <Drawer.Screen
                name="QrNavigator"
                options={{ title: "Escaner QR" }}
                component={ QrNavigator }
            />
            <Drawer.Screen
                name="AlumnosNavigator"
                options={{ title: "Alumnos" }}
                component={ AlumnosNavigator }
            
            */
            />
        </Drawer.Navigator>
    );

}

export const DrawerNavigator = () => {

    const { authState } = useContext( AuthContext );

    return ( authState.isLoggenIn ) ? <Navigator/> : <LoginScreen/>;

}