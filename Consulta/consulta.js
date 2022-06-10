import React, { useState, useEffect } from 'react';
import { View, Dimensions, ScrollView, Image, Text, RefreshControl, FlatList, Button } from 'react-native';
//Criando uma Const para receber os tamanhos da tela
const { width, height } = Dimensions.get('screen');

//Importando a imagem de fundo
import imgFundo from '../assets/Consulta/fundoHomeOfc.png';

import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

export default function App() {

    const navigation = useNavigation();

    const [atualizando, setAtualizando] = useState(false);
    const aoAtualizar = () => {
        setAtualizando(true);
        setTimeout(() => { setAtualizando(false) }, 3000);
    }


    const [data, setData] = useState(); 

    useEffect(
        () => {
            fetch('http://10.68.23.123:3000/consulta/listarConsultas')
                .then(res => res.json())
                .then(res => {
                    setData(res)
                })
        }
    ), []

    return (
        <View>
            
            <View style={{ width: '100%', height: height / 3 }}>

                <Image source={imgFundo} style={{
                    width: '100%', height: '100%', borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100
                }} />

            </View>

            <View style={{
                width: '100%', height: 'auto', backgroundColor: 'white', position: 'absolute', marginTop: height / 3.8,
                padding: 10
            }}>

                <Text style={{ textAlign: 'center', color: '#04459b', fontWeight: 'bold', fontSize: 18 }}>Minhas Consultas</Text>

            </View>

            <FlatList data={data} renderItem={({ item }) => (

                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={atualizando}
                            onRefresh={aoAtualizar}
                        />}

                        style={{ width: '100%' }}

                    >
                        <View style={{
                            backgroundColor: '#04459b', width: '80%', height: 50, marginLeft: '10%', padding: 10,
                            display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 'auto'
                        }}>

                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Especialidade: {item.especialidade}</Text>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Data: {item.createdAt}</Text>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Preço: {item.preco}</Text>

                        </View>
                    </ScrollView>
                </View>

            )}>



            </FlatList>


        </View >

    )
}

