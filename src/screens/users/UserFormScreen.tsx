import React, { useEffect } from "react";
import { View, Text, TextInput, Image, SafeAreaView, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from  "expo-file-system";
import { RootStackUserParam } from "../../navigator/UsersNavigator";
import { useUserForm } from "../../hooks/useUserForm";
import { BtnTouch } from "../../componentes/BtnTouch";
import { appTheme } from "../../theme/appTheme";


interface Props extends StackScreenProps<RootStackUserParam, 'UserFormScreen'>{};

export const UserFormScreen = ( { navigation, route }: Props ) => {

    const {
        state,
        handleSubmit,
        handleInputChange,
        handleDelete
    } = useUserForm();
}

    useEffect( () => {
        const user = route.params.UserResponse;
        handleInputChange('id_user', `${user.id_user}`);
        handleInputChange('nombre', user.nombre);
        handleInputChange('ap_paterno', user.ap_paterno);
        handleInputChange('ap_materno', user.ap_materno);
        handleInputChange('image', user.image);
        handleInputChange('userKey', user.userKey);
        handleInputChange('carrera', user.carrera);
    },[]);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 0.4,
        });

        ( ! result.canceled ) && ( () => {
            convertImageToBase64( result.assets[0].uri );
        })();
    }

    const convertImageToBase64 = async ( imageUri: string ) => {
        try{
            const base64 = await FileSystem.readAsStringAsync( imageUri,{
                encoding: FileSystem.EncodingType.Base64,
            });
            handleInputChange( 'image', base64 );
            }catch( error ){
                console.log("No se ha podido convertir la imagen");
            }
        }

    return(
        <SafeAreaView
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View
                    style={{
                        ...appTheme.containerGlobal,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {
                        (state.id_user !== '') &&
                        <BtnTouch
                            title="Delete User"
                            action={ () => {
                                handleDelete();
                                navigation.popToTop();
                            }}
                            backgroundColor="violet"
                            />
                    }
                    { /*fomrulario*/ }
                    <Text
                        style={appTheme.title}
                    >
                        User Form
                    </Text>
                    <TextInput
                        style={appTheme.input}
                        value={state.nombre}
                        onChangeText={ (text) => handleInputChange('nombre',text)}
                        placeholder="Nombre del usuario"
                    />
                    <TextInput
                        style={ appTheme.input }
                        value={ state.ap_paterno }
                        onChangeText={ (text) => handleInputChange('ap_paterno',text) }
                        placeholder="Apellido paterno del alumno"
                    />
                    <TextInput
                        style={ appTheme.input }
                        value={ state.ap_materno }
                        onChangeText={ (text) => handleInputChange('ap_materno',text) }
                        placeholder="Apellido materno del alumno"
                    />
                    <TextInput
                        style={ appTheme.input }
                        value={ state.userKey }
                        onChangeText={ (text) => handleInputChange('matricula',text) }
                        placeholder="Matricula del alumno"
                    />
                    <BtnTouch
                        title='Seleccionar imagen'
                        action={ pickImage }
                        backgroundColor="black"
                    />
                    {
                        ( state.image !== '' ) &&
                        (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${state.image}` }}
                                style={{ width: 150, height:150, borderRadius: 20 }}
                            />
                        )
                    }
                    <TextInput
                        style={ appTheme.input }
                        value={ state.password }
                        secureTextEntry={true}
                        onChangeText={ (text) => handleInputChange('password',text) }
                        placeholder="Contraseña del alumno"
                    />
                    <TextInput
                        style={ appTheme.input }
                        value={ state.carrera }
                        onChangeText={ (text) => handleInputChange('carrera',text) }
                        placeholder="Carrera del alumno"
                    />
                    <BtnTouch
                        action={ () => {
                            handleSubmit();
                            navigation.popToTop();
                        }}
                        title={ ( state.id_user !== '' ) ? 'Actualizar registro' : 'Crear Registro' }
                        backgroundColor="black"
                    />
                    <BtnTouch
                        action={ () => {
                            navigation.popToTop();
                        }}
                        title="Regresar"
                        backgroundColor="violet"
                    />               
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
}