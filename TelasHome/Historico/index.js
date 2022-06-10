import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Dimensions, ScrollView, Image, StyleSheet, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleAgenda from "../Agendar/styleAgenda";
import imgFundo from '../../assets/Login/fundoOficial.png';
//Importando os icones
import { Entypo } from '@expo/vector-icons';

import imgHistorico from './assets/imgHistorico.png';
import { NavigationContainer } from "@react-navigation/native";


export default function Historico({navigation, route}) {

    const [data, setData] = useState();
    const [users, setUsers] = useState([]);
    const [idUsuario, setIdUsuario] = useState();

    const [mes, setMes] = useState();
    const [dia, setDia] = useState();
    const [ano, setAno] = useState();

    const [modalVisible, setModalVisible] = useState(false);

    const {width, height} = Dimensions.get('screen');


    useEffect(() => {

        async function pegarUsuario() {
            let response = await AsyncStorage.getItem('dadosUsuario');
            let json = JSON.parse(response);
            setIdUsuario(json.idUsuario);

        }
        pegarUsuario();
        buscarHistorico();

    }, [idUsuario])

    const [id, setId] = useState()


    async function buscarHistorico() {
        await fetch('http://192.168.0.101:3000/historico/agendado/' + idUsuario)
            .then(res => res.json())
            .then(res => {
                setUsers(res);
            });

            console.log(users)
    }


    async function modalCancelamento() {


        let response = await fetch('http://192.168.0.101:3000/cancelarAgendamento/' + id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });


        if (response) {
            Alert.alert("Agendamento cancelado", "Valor da consulta será estornado em até 7 dias")
            setModalVisible(false)
            buscarHistorico()
        } else {
            Alert.alert("Houve um erro", "Tente novamente mais tarde")
        }
    }

    function agendamentoVazio(){

        

        return(
            <View style={{width: '90%', marginLeft: '5%', height:  height / 3, display: 'flex',justifyContent: 'space-between', flexDirection: 'row'}}>

                <Image style={{width: '45%', height: '100%', resizeMode: 'contain'}} source={imgHistorico}></Image>

                <View style={{width: '55%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                    <Text style={{fontSize: 16, fontWeight: 'bold', color: 'blue', marginBottom: 20}}>Você não tem agendamentos</Text>

                    <Text style={{fontSize: 16, marginBottom: 20}}>Vamos agendar uma consulta?</Text>

                    <TouchableOpacity style={{width: '90%', borderRadius: 30,backgroundColor: 'white',borderColor: 'blue', display: 'flex', justifyContent: 'center',alignItems: 'center',borderWidth: 1, height: '12%'}}>

                        <Text style={{fontWeight: 'bold', color: 'blue'}} onPress={()=>navigation.navigate('escolhaServico')}>Agendar</Text>

                    </TouchableOpacity>

                </View>

            </View>
        )

       
    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ width: '100%', height: height / 2.4 }}>

                <Image source={imgFundo} style={{ width: '100%', height: '100%', borderBottomLeftRadius: 100, borderBottomRightRadius: 100 }} />

            </View>

            <View style={{
                width: '100%',
                height: '5.5%',
                padding: 5,
                borderRadius: 10,
                position: 'absolute',
                marginTop: '74%',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                borderColor: 'blue',
                borderWidth: 1
            }}>

                <Text style={styleAgenda.txtAgendar}>Meu Histórico</Text>

            </View>

            <Entypo name="cycle" style={{ marginRight: "5%", fontSize: 25, marginTop: 10, marginBottom: 10, color: '#04459b', textAlign: 'right' }}

                onPress={() => buscarHistorico()}

            />

            <FlatList

                data={users} ListEmptyComponent={()=>agendamentoVazio()} renderItem={({ item }) => (



                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                      

                        <ScrollView style={{ width: '100%', padding: 5 }}>

                            <TouchableOpacity style={{ borderRadius: 10, borderColor: 'blue', borderWidth: 1, width: '90%', marginBottom: 15, marginLeft: '5%', display: 'flex', justifyContent: 'space-between', padding: 10, flexDirection: 'row' }}>

                                <View style={{ width: '50%', height: 'auto' }}>

                                    <Text style={{ fontWeight: 'bold' }}>Código Consulta: <Text style={{ color: 'black', fontWeight: 'normal' }}>{setId(item.id)} {item.id}</Text></Text>
                                    <Text style={{ fontWeight: 'bold' }}>Dia: <Text style={{ color: 'black', fontWeight: 'normal' }}>{item.dia}</Text></Text>
                                    <Text style={{ fontWeight: 'bold' }}>Horario: <Text style={{ color: 'black', fontWeight: 'normal' }}>{item.horario}</Text></Text>
                                    <Text style={{ fontWeight: 'bold' }}>Compareceu: <Text style={{ color: 'black', fontWeight: 'normal' }}>{item.compareceu}</Text></Text>
                                    <Text style={{ fontWeight: 'bold' }}>Tipo: <Text style={{ color: 'black', fontWeight: 'normal' }}>{item.tipo}</Text></Text>

                                </View>

                                <View style={{ width: '50%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>



                                    <View style={{ width: '40%', height: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                        <Entypo name="eye" color="blue" style={{ fontSize: 24 }} />
                                        <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'blue' }}>Visualizar</Text>

                                    </View>

                                    <TouchableOpacity onPress={() => setModalVisible(true)} style={{ width: '40%', height: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>


                                        {
                                            item.compareceu === 'Aguardando' ? <Entypo name="cross" color="red" style={{ fontSize: 24 }} /> : <Text></Text>
                                        }

                                        {
                                            item.compareceu === 'Aguardando' ? <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'red' }}>Cancelar</Text> : <Text></Text>
                                        }

                                    </TouchableOpacity>

                                </View>

                            </TouchableOpacity>


                            <View style={styles.centeredView}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Text style={styles.modalText}>Deseja cancelar o agendamento?</Text>


                                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>

                                                <Pressable
                                                    style={[styles.button]}
                                                    onPress={() =>

                                                        modalCancelamento()

                                                    }
                                                >


                                                    <Text style={{ color: 'black', fontWeight: 'bold', width: 60, textAlign: 'center' }}>Sim</Text>

                                                </Pressable>

                                                <Pressable style={[styles.button, styles.buttonClose]}
                                                    onPress={() => setModalVisible(!modalVisible)}>

                                                    <Text style={styles.textStyle}>Voltar</Text>

                                                </Pressable>

                                            </View>
                                        </View>
                                    </View>
                                </Modal>

                            </View>

                        </ScrollView>

                    </View>
                )}

            />

        </View>


    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginLeft: 10,

    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "red",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        width: 60

    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",

    }
});