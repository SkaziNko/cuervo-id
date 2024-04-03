import { StyleSheet } from "react-native";


export const appTheme = StyleSheet.create({
    containerGlobal:{
        flex:1,
        justifyContent: "center",
    },
    loginScreen:{
        marginTop: 75,
        
    },
    containerMarginGlobal:{
        marginHorizontal: 10,
    },
    title:{
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold"
    },
    avatar:{
        height: 200,
        width: 200,
        borderRadius: 100,
        borderColor: "green",
        borderWidth: 7,
    },
    avatarContainer:{
        alignItems: "center",
    },
    menuContainer:{
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    input:{
        borderRadius: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        height:40,
        width: 300,
        margin: 12,
        borderWidth: 5,
        borderColor: 'green',
    }
});