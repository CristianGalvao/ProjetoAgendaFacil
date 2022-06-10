import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleAgenda from "./styleAgenda";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

//Importando a imagem fundo
import imgFundo from '../../assets/Login/fundoOficial.png';

export default function EscolhaServicos() {

    const [usuario, setNome_usuario] = useState(null);
    const { width, height } = Dimensions.get("screen");

    const navigation = useNavigation();


    useEffect(
        () => {
            async function pegarUsuario() {
                let response = await AsyncStorage.getItem('dadosUsuario');
                let json = JSON.parse(response);
                setNome_usuario(json.nome_usuario)
            }
            pegarUsuario();
        }, []);

    return (

        <View style={styleAgenda.container}>

            <View style={styleAgenda.viewParaImagem}>

                <Image source={imgFundo} style={styleAgenda.imgFundoCadastro} />

            </View>

            <View style={styleAgenda.viewTxtAgendar}>

                <Text style={styleAgenda.txtAgendar}>Agendar</Text>

            </View>

            <View style={styleAgenda.viewEscolhaServico}>

                <View style={styleAgenda.viewEscolherServico}>

                    <View style={styleAgenda.viewDadosEscolhaServicos}>

                        <Text style={styleAgenda.txtTituloServicos}>Quem será atendido</Text>
                        <Text style={styleAgenda.txtSubTituloServicos}>{usuario}</Text>

                        <Text style={styleAgenda.txtTituloServicos}>Qual serviço você quer agendar?</Text>
                        <Text style={styleAgenda.txtSubTituloServicos}>Selecione abaixo:</Text>

                        <View style={styleAgenda.viewBotoesServicos}>

                            <TouchableOpacity style={styleAgenda.btnServicos}  onPress={()=>navigation.navigate('consultaAgenda')}>

                                <Text style={styleAgenda.txtBotoes}>Consulta</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={styleAgenda.btnServicos}>

                                <Text style={styleAgenda.txtBotoes} onPress={()=>navigation.navigate('exames')}>Exames</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={styleAgenda.btnServicos}>

                                <Text style={styleAgenda.txtBotoes} onPress={()=>navigation.navigate('vacinas')}>Vacinas</Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </View>

        </View>

    )
}