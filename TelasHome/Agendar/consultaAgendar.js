import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleAgenda from "./styleAgenda";
import { useForm, Controller, set } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Button, CheckBox, Divider } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

import { format } from "date-fns";

//Importando a imagem fundo
import imgFundo from '../../assets/Login/fundoOficial.png';

//Importando a DatePicker
import DatePicker from "react-native-datepicker";


export default function EscolhaServicos({ navigation, route }) {

    const [usuario, setNome_usuario] = useState(null);



    //Criando as constantes de DropDown

    const [valorSelecionado, setValorSelecionado] = useState()

    //Constantes para o Metodo Post

    const [especialidade, setEspecialidade] = useState(null);
    const [idUnidades, setIdUnidades] = useState(null);
    const [idProfissionais, setIdProfissionais] = useState(null);
    const [horario, setHorario] = useState([]);
    const [preco, setPreco] = useState(null);
    const [dia, setDia] = useState(null);
    const [idUsuario, setIdUsuario] = useState(null);

    //Mudar no Back-End
    const [tipo, setTipo] = useState(null);
    const [status, setStatus] = useState(null);

    const [nomeProfissional, setNomeProfissional] = useState([]);
    const [nomeEspecialidade, setNomeEspecialidade] = useState([]);
    const [nomeUnidades, setNomeUnidades] = useState([]);

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

        const [compareceu, setCompareceu] = useState();


    async function Agendar() {

        setPreco("120.00")
        setTipo("Consulta")
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
                unidade: idUnidades,
                preco: preco,
                horario: valorSelecionado,
                dia: dia,
                tipo: tipo,
                status: status,
                nomeProfissional: idProfissionais,
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

    useEffect(()=>{
        setPreco("120.00")
        setTipo("Consulta")
        setStatus("Aguardando pagamento")
        setCompareceu("Aguardando")
    }, [preco, tipo, status])

    useEffect(() => {

        if (idProfissionais != "selecione" && dia != null) {
            buscarHorario()
        }

    }, [idProfissionais, dia, valorSelecionado])



    async function buscarHorario() {
        let response = await fetch('http://192.168.0.101:3000/buscarHorario', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idProfissionais: idProfissionais,
                dia: dia
            })
        });

        let json = await response.json()
        // setHorario(JSON.stringify(json))
        setHorario(json)
        const horarioJson = JSON.stringify(horario)
        // // setHorario(horarioJson)
        // console.log(horarioJson)
    }

    useEffect(
        ()=>{
                if(especialidade != "selecione"){
                    buscarEspecialidade()
                   buscarProfissionais()
                }
        },[especialidade]
    )


    async function buscarProfissionais(){
        
            await fetch('http://192.168.0.101:3000/listarProfissionaisEspecialidade/' + especialidade)
            .then(res => res.json())
            .then(res => {
                setNomeProfissional(res)
            })
    }

    async function buscarEspecialidade(){
        await fetch('http://192.168.0.101:3000/listarEspecialidades')
        .then(res => res.json())
        .then(res => {
            setNomeEspecialidade(res)
        })
    }

    useEffect(
        ()=>{
            if(idUnidades != "selecione"){
                buscarUnidades()
            }
        }, []
    )

    async function buscarUnidades(){
        await fetch('http://192.168.0.101:3000/listarUnidades')
        .then(res => res.json())
        .then(res => {
            setNomeUnidades(res)
        })
    }

    return (


        <View style={styleAgenda.container}>

            <View style={styleAgenda.viewParaImagem}>

                <Image source={imgFundo} style={styleAgenda.imgFundoCadastro} />

            </View>

            <View style={styleAgenda.viewTxtAgendar}>

                <Text style={styleAgenda.txtAgendar}>Agendar Consulta</Text>

            </View>

            <View style={styleAgenda.containerConsulta}>

                <ScrollView>

                    <View style={styleAgenda.viewConsultaSelecione}>

                        <Text style={styleAgenda.txtSelecioneConsulta}>Especialidade:</Text>

                    </View>


                    <Picker
                        style={styleAgenda.pickerConsulta}
                        useNativeAndroidPickerStyle={false}
                        selectedValue={especialidade}
                        onValueChange={(itemValue) => setEspecialidade(itemValue)}
                        mode="dropdown"



                    >
                        <Picker.Item label="Selecione: " value="selecione" color="grey" />
                        {
                            nomeEspecialidade.map((teste, index)=>
                            <Picker.Item label={`${teste.nomeEspecialidade}`} key={index} value={teste.nomeEspecialidade}/>
                            )
                        }


                    </Picker>

                    <View style={{ borderTopColor: '#04459b', borderWidth: 1, width: '90%', marginLeft: '5%' }}></View>

                    <View style={styleAgenda.viewConsultaSelecione}>

                        <Text style={styleAgenda.txtSelecioneConsulta}>Profissional:</Text>

                    </View>



                    <Picker
                        style={styleAgenda.pickerConsulta}
                        useNativeAndroidPickerStyle={false}
                        selectedValue={idProfissionais}
                        onValueChange={setIdProfissionais}
                        mode="dropdown"



                    >
                        <Picker.Item label="Selecione: " value="selecione" color='grey' />
                        {
                            nomeProfissional.map((teste, index)=>
                            <Picker.Item label={`${teste.nomeProfissional}`} key={index} value={teste.nomeProfissional}/>
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
                        selectedValue={idUnidades}
                        onValueChange={(itemValue) => setIdUnidades(itemValue)}
                        mode="dropdown"



                    >
                        <Picker.Item label="Selecione: " value="selecione" color="grey" />
                      
                        {
                            nomeUnidades.map((teste, index)=>
                            <Picker.Item label={`${teste.endereco}`} key={index} value={teste.endereco}/>
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
                    // disabled={diaHabilitado}

                    />

                    <View style={styleAgenda.viewConsultaSelecione}>

                        <Text style={styleAgenda.txtSelecioneConsulta}>Horário:</Text>

                    </View>


                    <Picker
                        style={styleAgenda.pickerConsulta}
                        useNativeAndroidPickerStyle={false}
                        selectedValue={valorSelecionado}

                        onValueChange={setValorSelecionado}
                        mode="dropdown"
                    >
                        <Picker.Item label="Selecione: " value="selecione" color="grey" />
            
                                   {horario.map((teste, index) => 
                                   
                                    <Picker.Item label={`${teste.horarios}`} key={index} value={teste.horarios}/>
                                   
                                   )}                        


                                   { console.log(valorSelecionado)}
                               

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