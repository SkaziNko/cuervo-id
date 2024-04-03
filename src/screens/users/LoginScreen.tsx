import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from "react-native";
import { useLogin } from "../../hooks/useLogin";
import { appTheme } from "../../theme/appTheme";


export const LoginScreen = () => {

    const {
        isLoading,
        request,
        handleLogin,
        handleInputChange,
        state
    } = useLogin();

    return(
        <View
            style={{
                ...appTheme.loginScreen,
                marginTop:40,
                //...appTheme.containerMarginGlobal,
                backgroundColor: "rgba(255,255,255)"
            }}
                >
            <Image
                style={{ 
                    height: 50,
                    width: 120,
                    marginHorizontal: 15,
                    borderRadius: 10,
                }}
                source={
                    require( "../../../assets/utvt_logo.png" ) 
                }
            >
            </Image>
            <Image
                    style= {{
                        
                    }}
                    source={{
                        uri: "https://seeklogo.com/images/U/universidad-tecnologica-del-valle-de-toluca-logo-82F16BF313-seeklogo.com.png"
                    }}
                />
            <View
                style={{ alignItems: "center" }}
            >
                <Image
                    style={{ 
                        height: 200,
                        width: 200,
                        marginTop: 40,
                        borderRadius: 100,
                        borderColor: "rgba(255,255,255,0.2)",
                        borderWidth: 5
                    }}
                    source={{
                        uri: "https://utvt.edomex.gob.mx/sites/utvt.edomex.gob.mx/files/images/1%20copia.jpg"
                    }}
                />
                {
                    (!isLoading) &&
                    <ActivityIndicator
                        style={{ height:100 }}
                        size={ 100 }
                        color= "green"
                    />
                }
                {
                    (request == false ) &&
                    (
                        <Text
                            style={{
                                ...appTheme.title,
                                color: "#000",
                                fontWeight: "bold",
                                marginTop: 30

                            }}
                        >
                            {"Contraseña incorrecta \n"}
                            {"Intenta de nuevo \n"}
                        </Text>
                    )
                }
                <TextInput
                    style={{ 
                        ...appTheme.input, 
                    }}
                    value={ state.userKey }
                    onChangeText={ (text) => handleInputChange('userKey', text) }
                    placeholder="Ingresa la matricula"
                    editable={ isLoading }
                    
                />
                <TextInput
                    style={ {
                        ...appTheme.input,
                        marginTop: 20
                    } }
                    value={ state.password }
                    onChangeText={ (text) => handleInputChange ('password', text) }
                    placeholder="Contraseña"
                    editable={ isLoading }
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress={ handleLogin }
                    disabled={ !isLoading }
                >
                    <View
                        style={{
                            height:50,
                            width: 100,
                            marginTop: 20,
                            backgroundColor: '#000',
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20
                        }}
                    >
                        <Text
                            style={{
                            color: 'white',
                            fontSize: 25,
                            fontWeight: "bold",
                            fontStyle: "italic"
                            }}
                        >
                            Entrar
                        </Text>
                    </View>
                </TouchableOpacity>
                        <Image
                            style={{ 
                            height: 90,
                            width: 150,
                            marginTop: 70,
                            marginHorizontal: 130,
                            borderRadius: 10,
                            }}
                            source={
                                require( "../../../assets/sdnlogo.png" ) 
                                }
                        >
                        </Image>
            </View>
        </View>  
    );
}