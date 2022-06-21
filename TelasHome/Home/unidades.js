
import { TextInput, Text, View, TouchableOpacity, Image, Alert, ScrollView, Dimensions, FlatList } from "react-native";
import BackgroundImage from '../../assets/Login/fundoOficial.png';

import styles from '../Agendar/styleAgenda';

import { useNavigation } from '@react-navigation/native';

import { Rating } from "react-native-ratings";
import React, { useState, useEffect } from "react";


export default function App() {

  const [nomeUnidades, setNomeUnidades] = useState([]);

  async function buscarUnidades() {
    await fetch('http://192.168.0.105:3000/listarUnidades')
      .then(res => res.json())
      .then(res => {
        setNomeUnidades(res)
      })

    console.log(nomeUnidades)
  }

  useEffect(
    () => {
        buscarUnidades()
    }, []
  )




  const navigation = useNavigation();

  const { height, width } = Dimensions.get("screen")


  return (



    <View style={styles.container}>

      <View style={styles.viewParaImagem}>

        <Image style={styles.imgFundoCadastro} source={BackgroundImage} />

      </View>

      <View style={styles.viewTxtAgendar}>

        <Text style={styles.txtAgendar}>Unidades</Text>

      </View>
      
      <FlatList
        keyExtractor={(chave)=> chave.idUnidades}
        data={nomeUnidades}
       
        renderItem={({ item }) => (
          <ScrollView >
          <View  style={{ width: '90%', height: height / 10,marginLeft: '5%', marginBottom: 5, backgroundColor: 'white' }}>
         
            <TouchableOpacity keyExtractor={item.idProfissionais} style={{borderColor:  '#04459ba', borderWidth: 1, padding: 10, borderRadius: 10}}>

             
              
              <Text style={{fontSize: 16,fontWeight: "bold", color:'#04459b' }}>
                  Endereço: <Text style={{fontWeight: 'normal', color: 'black'}}> {item.endereco}</Text>
                </Text>

                {/* <Text style={{fontSize: 16,fontWeight: "bold", color:'#04459b' }}>
                  Telefone: <Text style={{fontWeight: 'normal', color: 'black'}}>{item.telefone}</Text>
                </Text>
               */}
            </TouchableOpacity>
         

          </View>
          </ScrollView>
        )}

      >

      </FlatList>

    </View>

  );
}

