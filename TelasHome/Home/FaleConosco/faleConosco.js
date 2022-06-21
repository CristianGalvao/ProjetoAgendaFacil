import React, { useState } from "react";
import {View, Image, Text,TextInput, TouchableOpacity} from 'react-native';
import estiloFaleConosco from "./estiloFaleConosco";
import imgFundo from '../../../assets/Login/fundoOficial.png';

export default function FaleConosco({navigation}){


    const [assunto, setAssunto] = useState();
    const [mensagem, setMensagem] = useState();
    const [email, setEmail] = useState();

    async function enviarFormulario() {

        setEmail("projetoagendafacil@gmail.com")

        let response = await fetch('http://192.168.0.105:3000/enviarEmailFaleConosco', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               assunto: assunto,
               mensagem: mensagem,
               email: email
            })
        });

        let resposta = await response.json();
        if(resposta === 'enviado'){
            alert("Email enviado")
            navigation.navigate("home")
        }else{
            alert("ops", "Houve um problema ao enviar, tente novamente mais tarde")
        }
    }


    return(
        <View style={estiloFaleConosco.container}>

                <View style={estiloFaleConosco.viewParaImagem}>

                    <Image source={imgFundo} style={estiloFaleConosco.imgFundoCadastro}/>

                </View>

                <View style={estiloFaleConosco.viewTxtFaleConosco}>

                    <Text style={estiloFaleConosco.txtFaleConosco}>Fale Conosco</Text>

                </View>

                <View style={{width: '90%', marginLeft: '5%', height: 'auto', marginTop: 20, position: 'relative' }}>

                         <TextInput onChangeText={setAssunto} placeholder="Motivo" style={{borderColor: 'black',borderWidth: 1, padding: 5, borderRadius: 5}}></TextInput>
                         <TextInput onChangeText={setMensagem} placeholder="Mensagem" multiline={true} style={{borderColor: 'black',borderWidth: 1, padding: 5, borderRadius: 5, marginTop: 20}}></TextInput>


                        <TouchableOpacity onPress={()=>enviarFormulario()} style={{width: '100%', height: 38, backgroundColor: '#04459b', marginTop: 20, display: 'flex'
                        ,justifyContent: 'center', alignItems: 'center'
                    }}>

                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Enviar</Text>

                        </TouchableOpacity>
                </View>

                <View style={{width: '90%', marginLeft: '5%', height: 'auto',  marginTop: 20}}>

                        <Text style={{marginTop: 10, fontSize: 15}}>Fale Conosco também em:</Text>
                        <Text style={{marginTop: 10,fontSize: 15}}>(11) 4002-8922</Text>
                        <Text style={{marginTop: 10,fontSize: 15}}>ouvidoria@agendafacil.com</Text>

                </View>

        </View>
    )
}
