import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserFormScreen } from "../screens/users/UserFormScreen"; 
import { UserHome } from "../screens/users/HomeUser";
import { UserResponse } from "../interfaces/cuervoApi";
import { QrScannerScreen } from "../screens/camera/QrScannerScreen";


export type RootStackUserParam = {
    UserHome:       undefined;
    UserFormScreen: { UserResponse: UserResponse };
    QrScannerScreem: undefined;
}

const Stack = createStackNavigator<RootStackUserParam>();

export const UsersNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions= {{
                headerShown: false,
                cardStyle: {
                    backgroundColor: "white"
                }
            }}
        >
            <Stack.Screen
                component={UserHome }
                name= 'UserHome'
            />
            <Stack.Screen
                component={ UserFormScreen }
                name="UserFormScreen"
            />
        </Stack.Navigator>
    )
}