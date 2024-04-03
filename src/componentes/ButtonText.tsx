import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


interface Props{
    action: () => void;
    title: string;
}


export const ButtonText = ( { action, title }: Props ) => {

    return (
        <TouchableOpacity
            onPress={ action }
            style={ style.btnm }
        >
            <View>
                <Text
                    style={ style.menuText }
                >
                        { title}
                </Text>
            </View>
        </TouchableOpacity>
    );
} 

const style = StyleSheet.create({
    menuText:{
        fontSize: 20,
    },
    btnm: {
        marginTop: 10,
    }
})