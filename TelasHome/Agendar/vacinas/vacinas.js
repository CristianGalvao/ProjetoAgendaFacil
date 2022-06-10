import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleAgenda from "../styleAgenda";
import { useForm, Controller, set } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Button, CheckBox, Divider } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

//Importando a imagem fundo
import imgFundo from '../../../assets/Login/fundoOficial.png';
//Importando a DatePicker
import DatePicker from "react-native-datepicker";


export default function Vacinas({navigation, route}) {


    // CONSTANTES PARA ESPECIALDIADE
    const [nomeEspecialidade, setNomeEspecialidade] = useState([]);
    const [especialidade, setEspecialidade] = useState();

    async function buscarEspecialidade() {
        await fetch('http://192.168.0.101:3000/listarEspecialidades/vacinas')
            .then(res => res.json())
            .then(res => {
                setNomeEspecialidade(res)
            }
            )
    }

    useEffect(
        () => {

            if (especialidade != "selecione") {
                buscarEspecialidade();
            }
        }, [especialidade]
    );




    // CONSTANTE PROFISSIONAIS
    const [NomeProfissional, setNomeProfissional] = useState();



    // CONSTANTE UNIDADES
    const [nomeUnidades, setNomeUnidades] = useState([]);
    const [unidade, setUnidade] = useState();


    async function buscarUnidades() {
        await fetch('http://192.168.0.101:3000/listarUnidades')
            .then(res => res.json())
            .then(res => {
                setNomeUnidades(res);
            })
    }

    useEffect(
        () => {
            if (unidade != "selecione") {
                buscarUnidades()
            }
        }, [unidade]
    )


    // CONSTANTES HORARIOS E DIA

    const [dia, setDia] = useState();
    const [horario, setHorario] = useState([]);
    const [horarioSelecionado, sethorarioSelecionado] = useState();

    async function buscarHorario() {
        let response = await fetch('http://192.168.0.101:3000/buscarHorario/vacinas', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomeProfissional: NomeProfissional,
                dia: dia
            })
        });

        let json = await response.json()
        setHorario(json)
    }

    useEffect(() => {

        if (NomeProfissional != "selecione" && dia != null) {
            buscarHorario();
        }

    }, [NomeProfissional, dia, horarioSelecionado])



    //CONSTANTES PARA AGENDAR

    const [preco, setPreco] = useState();
    const [tipo, setTipo] = useState();
    const [status, setStatus] = useState();

    const [compareceu, setCompareceu] = useState();

    async function Agendar() {

        setPreco("210.00")
        setTipo("Vacinas")
        setStatus("Aguardando pagamento")
        setCompareceu("Aguardando")


        let response = await fetch('http://192.168.0.101:3000/agendar/consulta', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                especialidade: especialidade,
                unidade: unidade,
                preco: preco,
                horario: horarioSelecionado,
                dia: dia,
                tipo: tipo,
                status: status,
                nomeProfissional: NomeProfissional,
                idUsuario: idUsuario,
                compareceu: compareceu

            })
        });

        let json = await response.json();
        await AsyncStorage.setItem('dadosAgendaConsulta', JSON.stringify(json));

        if (json === 'Servidor') {
            alert("Horario indisponivel")
        } else {
            navigation.navigate('carrinho', { especialidade: especialidade, preco: preco, tipo: tipo });
        }
    }

    useEffect(() => {
        setPreco("210.00")
        setTipo("Vacinas")
        setStatus("Aguardando pagamento")
        setCompareceu("Aguardando")
    }, [preco, tipo, status])


    //CONSTANTES PARA ASYNC STORAGE
    const [nome_usuario, setNome_usuario] = useState();
    const [idUsuario, setIdUsuario] = useState();

    useEffect(
        () => {
            async function pegarUsuario() {
                let response = await AsyncStorage.getItem('dadosUsuario');
                let json = JSON.parse(response);
                setNome_usuario(json.nome_usuario)
                setIdUsuario(json.idUsuario)
            }


            pegarUsuario();

        }, []);


    return (

        <View style={styleAgenda.container}>

            <View style={styleAgenda.viewParaImagem}>

                <Image source={imgFundo} style={styleAgenda.imgFundoCadastro} />

            </View>

            <View style={styleAgenda.viewTxtAgendar}>

                <Text style={styleAgenda.txtAgendar}>Agendar Vacina</Text>

            </View>

            <View style={styleAgenda.containerConsulta}>

                <ScrollView>

                    <View style={styleAgenda.viewConsultaSelecione}>

                        <Text style={styleAgenda.txtSelecioneConsulta}>Especialidade:</Text>

                    </View>

                    {/* COMEÇO PICKER */}
                    <Picker

                        style={styleAgenda.pickerConsulta}
                        useNativeAndroidPickerStyle={false}
                        selectedValue={especialidade}
                        onValueChange={setEspecialidade}
                        mode="dropdown">

                        <Picker.Item label="Selecione: " value="selecione" color="grey" />

                        {
                            nomeEspecialidade.map((buscar, index) =>
                                <Picker.Item label={`${buscar.nomeEspecialidade}`} value={`${buscar.nomeEspecialidade}`} key={index} />
                            )
                        }


                    </Picker>

                    <View style={{ borderTopColor: '#04459b', borderWidth: 1, width: '90%', marginLeft: '5%' }}></View>

                    {/* FIM PICKER */}


                    <View style={styleAgenda.viewConsultaSelecione}>

                        <Text style={styleAgenda.txtSelecioneConsulta}>Profissional:</Text>

                    </View>


                    <Picker
                        style={styleAgenda.pickerConsulta}
                        useNativeAndroidPickerStyle={false}
                        selectedValue={NomeProfissional}
                        onValueChange={setNomeProfissional}
                        mode="dropdown">

                        <Picker.Item label="Selecione: " value="selecione" color='grey' />
                        <Picker.Item label="Enfermeiro(a) local" value="Enfermeiro(a)" />

                    </Picker>

                    <View style={{ borderTopColor: '#04459b', borderWidth: 1, width: '90%', marginLeft: '5%' }}></View>

                    {/* UNIDADES */}

                    <View style={styleAgenda.viewConsultaSelecione}>

                        <Text style={styleAgenda.txtSelecioneConsulta}>Unidade:</Text>

                    </View>

                    <Picker
                        style={styleAgenda.pickerConsulta}
                        useNativeAndroidPickerStyle={false}
                        selectedValue={unidade}
                        onValueChange={(itemValue) => setUnidade(itemValue)}
                        mode="dropdown">

                        <Picker.Item label="Selecione: " value="selecione" color="grey" />

                        {
                            nomeUnidades.map((buscar, index) =>
                                <Picker.Item label={`${buscar.endereco}`} value={`${buscar.endereco}`} key={index} />
                            )
                        }

                    </Picker>

                    <View style={{ borderTopColor: '#04459b', borderWidth: 1, width: '90%', marginLeft: '5%' }}></View>




                    <View style={styleAgenda.viewConsultaSelecione}>

                        <Text style={styleAgenda.txtSelecioneConsulta}>Data:</Text>

                    </View>

                    <DatePicker

                        style={{ width: '70%', marginLeft: "5%", marginTop: 20 }}
                        format="DD/MM/YYYY"
                        date={dia}
                        onDateChange={setDia}
                        is24Hour={true} />



                    <View style={styleAgenda.viewConsultaSelecione}>

                        <Text style={styleAgenda.txtSelecioneConsulta}>Horário:</Text>

                    </View>



                    <Picker
                        style={styleAgenda.pickerConsulta}
                        useNativeAndroidPickerStyle={false}
                        selectedValue={horarioSelecionado}
                        onValueChange={sethorarioSelecionado}
                        mode="dropdown">

                        <Picker.Item label="Selecione: " value="selecione" color="grey" />

                        {
                            horario.map((buscar, index) =>
                                <Picker.Item label={`${buscar.horarios}`} value={`${buscar.horarios}`} key={index} />
                            )
                        }

                    </Picker>

                    <View style={{ borderTopColor: '#04459b', borderWidth: 1, width: '90%', marginLeft: '5%' }}></View>



                    <TouchableOpacity style={styleAgenda.botaoAgendar} onPress={() => Agendar()}>

                        <Text style={styleAgenda.txtBotaoAgendar}>Agendar</Text>

                    </TouchableOpacity>

                </ScrollView>

            </View>

        </View>
    )

}