import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity, FlatList, LogBox } from 'react-native';
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


export default function Exames({navigation, route}) {

    LogBox.ignoreLogs(['Warning: ...']);

    const [usuario, setNome_usuario] = useState(null);
    const [idUsuario, setIdUsuario] = useState(null);

    const [nomeProfissional, setNomeProfissional] = useState([]);
    const [profissional, setprofissional] = useState();

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


    // CONSTANTES PARA ESPECIALDIADE
    const [nomeEspecialidade, setNomeEspecialidade] = useState([]);
    const [especialidade, setEspecialidade] = useState();

    async function buscarEspecialidade() {
        await fetch('http://10.0.3.178:3000/listarEspecialidades/exames')
            .then(res => res.json())
            .then(res => {
                setNomeEspecialidade(res)
            }
            )
    }

    useEffect(
        () => {
            if (especialidade != "selecione") {
                buscarEspecialidade()
                buscarProfissionais()
            }
        }, [especialidade]
    )


    async function buscarProfissionais() {

        await fetch('http://10.0.3.178:3000/listarProfissionaisEspecialidade/' + especialidade)
            .then(res => res.json())
            .then(res => {
                setNomeProfissional(res)
            })
    }

    // CONSTANTE UNIDADES
    const [nomeUnidades, setNomeUnidades] = useState([]);
    const [unidade, setUnidade] = useState();

    async function buscarUnidades() {
        await fetch('http://10.0.3.178:3000/listarUnidades')
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
        let response = await fetch('http://10.0.3.178:3000/buscarHorario/vacinas', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nomeProfissional: profissional,
                dia: dia
            })
        });

        let json = await response.json()
        setHorario(json)
    }

    useEffect(() => {

        if (profissional != "selecione" && dia != null) {
            buscarHorario();
        }

    }, [profissional, dia, horarioSelecionado])




    
    //CONSTANTES PARA AGENDAR

    const [preco, setPreco] = useState();
    const [tipo, setTipo] = useState();
    const [status, setStatus] = useState();
    const [compareceu, setCompareceu] = useState();

    async function Agendar() {

        setPreco("210.00")
        setTipo("Exames")
        setStatus("Aguardando pagamento")
        setCompareceu("Aguardando")



        let response = await fetch('http://10.0.3.178:3000/agendar/consulta', {
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
                nomeProfissional: profissional,
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
        setTipo("Exames")
        setStatus("Aguardando pagamento")
        setCompareceu("Aguardando")
    }, [preco, tipo, status])


    return (

        <View style={styleAgenda.container}>

            <View style={styleAgenda.viewParaImagem}>

                <Image source={imgFundo} style={styleAgenda.imgFundoCadastro} />

            </View>

            <View style={styleAgenda.viewTxtAgendar}>

                <Text style={styleAgenda.txtAgendar}>Agendar Exame</Text>

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
                        onValueChange={(itemValue) => setEspecialidade(itemValue)}
                        mode="dropdown">

                        <Picker.Item label="Selecione: " value="selecione" color="grey" />

                        {
                            nomeEspecialidade.map((teste, index) =>
                                <Picker.Item label={`${teste.nomeEspecialidade}`} key={index} value={teste.nomeEspecialidade} />
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
                        selectedValue={profissional}
                        onValueChange={setprofissional}
                        mode="dropdown">

                        <Picker.Item label="Selecione: " value="selecione" color='grey' />

                        {
                            nomeProfissional.map((buscar, index) =>
                                <Picker.Item label={`${buscar.nomeProfissional}`} key={index} value={buscar.nomeProfissional} />
                            )
                        }

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
                                <Picker.Item label={`${buscar.endereco}`} key={index} value={buscar.endereco} />
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
                        is24Hour={true} 
                        minDate={new Date(Date.now()+(10 * 60 * 1000))}
                        
                        />
                        


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
                                <Picker.Item label={`${buscar.horarios}`} key={index} value={buscar.horarios} />
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