import React, {useState, useEffect} from "react";
import {View, Text,TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Agendar({navigation}){

    const [idUsuario, setNome_usuario] = useState();
    const [nome, setNome] = useState(null);
    const [sobrenome, setSobrenome] = useState(null);
    const [statuss, setStatus] = useState();

    useEffect(
        ()=>{
                async function pegarUsuario(){
                    let response = await AsyncStorage.getItem('dadosAgendaConsulta'); 
                    let json = JSON.parse(response);
                    setNome_usuario(json.idUsuario)
                    setStatus("Aguardando pagamento")
                    
                }
                pegarUsuario();
        }, []);


        

        async function enviarFormulario() {
            let response = await fetch('http://10.68.23.15:3000/teste/agendar', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    sobrenome: sobrenome,
                    idUsuario: idUsuario,
                    statuss: statuss
                })
            });

            let json = await response.json();
            await AsyncStorage.setItem('dadosAgenda', JSON.stringify(json));
            navigation.navigate('carrinho');
        }

    return(
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}}>

           <TextInput style={{width: '100%', height: 30, borderColor: 'black', borderWidth: 1}} placeholder="Nome" onChangeText={setNome}></TextInput>
           <TextInput style={{width: '100%', height: 30, borderColor: 'black', borderWidth: 1}} placeholder="Sobrenome" onChangeText={setSobrenome}></TextInput>
           <Button title="Enviar"
           
            onPress={()=>enviarFormulario()}
           
           ></Button>

           <Button title="Ver ID" onPress={()=>alert(idUsuario)}></Button>

        </View>
    )
}