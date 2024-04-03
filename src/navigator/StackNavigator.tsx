import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserHome } from '../screens/users/HomeUser';

export type RootStackParams = {
    Home: undefined;
    Screen2: undefined;
    Screen3: undefined;
    PersonaScreen: { id: number, nombre: string };
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return(
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                cardStyle:{
                    backgroundColor: "white",
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={ UserHome }
                options={{ title: "Home" }}
            />
        </Stack.Navigator>
    );
}