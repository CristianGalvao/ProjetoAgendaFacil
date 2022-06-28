import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    BackHandler
} from 'react-native';

import { Controller, useForm } from "react-hook-form";

import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Importando os estilos
import estilo from './estiloLogin.js';

// expo install expo-font
import { useFonts } from 'expo-font';

//Importando imagem fundo 
import BackgroundImage from "../assets/Login/fundoOficial.png";
import { KeyboardAvoidingView } from 'react-native-web';




// npm install react-native-animatable
import * as Animatable from 'react-native-animatable';

export default function Login() {

    const { handleSubmit, control,  formState: { errors }} = useForm();

    const navigation = useNavigation();

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();


    async function login() {
        let response = await fetch('http://10.0.3.178:3000/usuario/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senha: senha,
                email: email
            })

        });

        let json = await response.json();
        if (json === 'error') {
            alert("Senha ou Usuario incorreto");
            await AsyncStorage.clear();
        } else {
            await AsyncStorage.setItem('dadosUsuario', JSON.stringify(json));
            navigation.navigate('home')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ flex: 1, width: '100%', height: '100%' }}
                        source={BackgroundImage}
                    />
                </View>
                <Animatable.Text
                    style={styles.titleText}
                    animation='fadeInUp'
                    delay={1200}
                >

                </Animatable.Text>
                <View style={styles.bottomView}>
                    <Text style={styles.loginText}>Login</Text>

                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='person'
                            type='ionicons'
                            color='#0459ba'
                        />

                        <Controller
                          control={control}
                          rules={{ required: true }}
                          name="email"
                          render={({ field: { onChange, onBlur, value } }) => (

                            <TextInput
                            style={styles.input}
                            placeholder='E-mail'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={setEmail}
                        />
                          )}/>    
                            {errors.email && alert('Entre com o email. Campo Obrigatório.')}

                    </View>


                    {/* Senha */}
                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='lock'
                            type='ionicons'
                            color='#0459ba'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Senha'
                            secureTextEntry={true}
                            autoCapitalize='none'
                            onChangeText={setSenha}

                        />
                    </View>

                    {/* Fim senha */}

                    <Text style={styles.fpText}>Esqueceu a senha?</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    </TouchableOpacity>
                    <Text style={styles.registerText}>
                        Não tem uma conta?
                        <Text style={{ color: '#0459ba' }} onPress={()=>navigation.navigate('cadastro')}>
                            {' Cadastre-se'}
                        </Text>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        position: 'absolute',
        top: Dimensions.get('screen').height * 0.1,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    bottomView: {
        backgroundColor: '#fff',
        opacity: 0.95,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    loginText: {
        fontSize: 24,
        marginTop: 12,
        marginBottom: 4,
    },
    inputView: {
        height: 40,
        borderRadius: 10,
        backgroundColor: '#f1f3f6',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#0459ba',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 18,
    },
    registerText: {
        alignSelf: 'center',
        marginTop: 12,
        fontSize: 16,
    },
    fpText: {
        marginTop: 10,
        alignSelf: 'flex-end',
        fontSize: 16,
        color: '#0459ba',
    },
});

