
import { TextInput, Text, View, TouchableOpacity, Image, Alert, ScrollView, Dimensions, FlatList } from "react-native";

// import medico1 from "../../../assets/medicos/medico1.jpg";
// import medico2 from "../../../assets/medicos/medico2.jpg";
// import medico3 from "../../../assets/medicos/medico3.jpg";

import BackgroundImage from '../../../assets/Login/fundoOficial.png';

import styles from '../../Agendar/styleAgenda';

import { useNavigation } from '@react-navigation/native';

import { Rating } from "react-native-ratings";
import React, { useState, useEffect } from "react";


export default function App() {

  const [nomeProfissional, setNomeProfissional] = useState([]);

  const [pesquisarNomeProfissional, setPesquisarNomeProfissional] = useState()


  async function buscarProfissionais() {
    await fetch('http://10.0.3.178:3000/listarProfissionais')
      .then(res => res.json())
      .then(res => {
        setNomeProfissional(res)
      })

    console.log(nomeProfissional)
  }

  useEffect(
    () => {
      buscarProfissionais()
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

        <Text style={styles.txtAgendar}>Profissionais</Text>

      </View>
      
      <FlatList
        keyExtractor={(chave)=> chave.idProfissionais}
        data={nomeProfissional}

        renderItem={({ item }) => (
          <ScrollView >
          <View  style={{ width: '90%', height: height / 10,marginLeft: '5%', marginBottom: 15, backgroundColor: 'white' }}>
         
            <TouchableOpacity  style={{borderColor:  '#04459ba', borderWidth: 1, padding: 10, borderRadius: 10}}>

             
              
              <Text style={{fontSize: 16,fontWeight: "bold", color:'#04459b' }}>
                  Nome Profissional: <Text style={{fontWeight: 'normal', color: 'black'}}> {item.nomeProfissional}</Text>
                </Text>

                <Text style={{fontSize: 16,fontWeight: "bold", color:'#04459b' }}>
                  Especialidade: <Text style={{fontWeight: 'normal', color: 'black'}}>{item.especialidade}</Text>
                </Text>

                <Text style={{fontSize: 16,fontWeight: "bold", color:'#04459b' }}>
                  CRM: <Text style={{fontWeight: 'normal', color: 'black'}}>{item.crm}</Text>
                </Text>
                
              
            </TouchableOpacity>
         

          </View>
          </ScrollView>
        )}

      >

      </FlatList>

    </View>

  );
}

