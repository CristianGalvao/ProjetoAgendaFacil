import React, {useState, useEffect} from "react";
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AreaRestritaUsuario(){

    const [usuario, setNome_usuario] = useState(null);

    useEffect(
        ()=>{
                async function pegarUsuario(){
                    let response = await AsyncStorage.getItem('dadosUsuario'); 
                    let json = JSON.parse(response);
                    setNome_usuario(json.nome_usuario)
                }
                pegarUsuario();
        }, []);

    return(
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}}>

            <Text>Seja bem-vindo {usuario}</Text>

        </View>
    )
}