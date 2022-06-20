import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  Modal,
  Pressable,
  TextInput
} from 'react-native';

import imagemPadrao from './assets/fotoPadraoPerfil.png';

import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

//Importando os icones
import { Entypo } from '@expo/vector-icons';


export default function ProfileScreen1() {

  //CONSTANTE DADOS USUARIOS
  const [idUsuario, setIdUsuario] = useState();
  const [image, setImage] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState();
  const [endereco, setEndereco] = useState();
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState();
  const [telefone, setTelefone] = useState();
  const [email, setEmail] = useState();
  const [cpf, setCpf] = useState();

  const { width, height } = Dimensions.get('screen');
  const [habilitarEdicao, setHabilitarEdicao] = useState(false);

  useEffect(() => {
    pegarUsuario();
    buscarDadosUsuario()
  }, [idUsuario])

  async function pegarUsuario() {
    let response = await AsyncStorage.getItem('dadosUsuario');
    let json = JSON.parse(response);
    setIdUsuario(json.idUsuario);
  }

  const [dadosUsuario, setDadosUsuario] = useState([]);

  async function buscarDadosUsuario() {
    await fetch('http://192.168.0.105:3000/pegarDadosUsuario/' + idUsuario)
      .then(res => res.json())
      .then(
        res => {
          setDadosUsuario(res)
        }
      )

    console.log(dadosUsuario)

  }

  async function pegarFotoPerfil() {
    let response = await fetch('http://192.168.0.105:3000/pegarImagemPerfil/' + idUsuario)
      .then(res => res.json())
      .then(
        res => {
          setImage(res[0].fotoPerfil)
        }
      )
  }

  async function setUserImage(image) {
    let response = await fetch('http://192.168.0.105:3000/cadastrarImagemPerfil', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUsuario: idUsuario,
        caminhoImagem: image
      })
    });

    console.log("TESTE 2: " + image)
  }

  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setUserImage(result.uri)
    }
    setModalVisible(false)
  };

  useEffect(
    () => {

      pegarUsuario()

      if (image === 'undefined' || image === undefined || image === null) {
        setImage("semFoto")

        console.log("IMAGEM :" + image)
      } else {
        pegarFotoPerfil()
      }
    }, [idUsuario]
  )

  async function limparImagemPerfil() {
    pegarUsuario()

    setImage("semFoto")

    let response = await fetch('http://192.168.0.105:3000/cadastrarImagemPerfil', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUsuario: idUsuario,
        caminhoImagem: "semFoto"
      })
    });
    setModalVisible(false)
    console.log("IMAGEM VAZIA: " + image)

  }

  function escolherFotoPerfil() {
    setModalVisible(true)

  }

  function habilitarEdicaoCampos() {
    setHabilitarEdicao(!habilitarEdicao)

  }

  async function salvarAlteracoesDados() {
    let response = await fetch('http://192.168.0.105:3000/atualizarDadosPerfil/' + idUsuario, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_usuario: nomeUsuario,
        endereco: endereco,
        complemento: complemento,
        telefone: telefone,
        numero: numero,
        idUsuario: idUsuario
      })
    })

    if (response) {
      Alert.alert("Dados atualizados");
      setHabilitarEdicao(false);



    } else {
      Alert.alert("Houve algum erro");
    }

  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View>
            <Image
              style={styles.coverImage}
              source={{ uri: 'https://picsum.photos/500/500?random=211' }}
            />
          </View>

          <View style={styles.profileContainer}>

            <View>
              {/* Profile Image */}
              <View style={styles.profileImageView}>
                {image === 'semFoto' || image === 'undefined' || image === undefined ? <Image onPress={() => escolherFotoPerfil()} style={styles.profileImage} source={imagemPadrao} />
                  : <Image onPress={() => escolherFotoPerfil()} style={styles.profileImage} source={{ uri: image }} />}
                <Entypo name='camera' onPress={() => escolherFotoPerfil()} style={{ fontSize: 20, color: 'black' }} />
              </View>

              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>

                  {
                    dadosUsuario.map((buscar) =>
                      <Text key={idUsuario}>{buscar.nome_usuario}</Text>
                    )
                  }

                </Text>
                <Text style={styles.userBio}>

                  {
                    dadosUsuario.map((buscar) =>
                      <Text key={idUsuario}>{buscar.email}</Text>
                    )
                  }

                </Text>
              </View>


            </View>

            <View style={styles.inputView}>

              <Icon

                color='blue'
                name="user"
                type='font-awesome'
                size={20}

              />

              <TextInput style={{ flex: 1, paddingHorizontal: 12 }}>

                {
                  dadosUsuario.map((buscar) =>
                    <Text key={idUsuario}>{buscar.nome_usuario}</Text>
                  )
                }

              </TextInput>

            </View>


            <View style={styles.inputView}>

              <Icon

                color='blue'
                name="user"
                type='font-awesome'
                size={20}

              />

                <TextInput style={{ flex: 1, paddingHorizontal: 12 }}>

                {
                  dadosUsuario.map((buscar) =>
                    <Text key={idUsuario}>{buscar.endereco}</Text>
                  )
                }
                
              </TextInput>

            </View>
          </View>

        </>
      </ScrollView>




      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>

              <Pressable
                style={[styles.button]}
                onPress={pickImage}
              >


                <Text style={{ color: 'black', fontWeight: 'bold', width: 100, textAlign: 'center' }}>Escolher foto</Text>

              </Pressable>

              <Pressable style={[styles.button, styles.buttonClose]}
                onPress={() => limparImagemPerfil()}>

                <Text style={styles.textStyle}>Limpar imagem</Text>

              </Pressable>

            </View>
          </View>
        </View>
      </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: { height: 300, width: '100%' },

  centeredView: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'

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
    width: 100

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",

  },

  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: { alignItems: 'center', marginTop: 10 },
  userFullName: { fontSize: 26 },
  userBio: {

    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  countsView: { flexDirection: 'row', marginTop: 20 },
  countView: { flex: 1, alignItems: 'center' },
  countNum: { fontSize: 20 },
  countText: { fontSize: 18, color: '#333' },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b7bec',
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {

    color: '#fff',
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6',
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000',
  },
  showContentButtonText: {

    fontSize: 18,
  },

  inputView: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 20,
    height: 44,
    backgroundColor: '#f1f3f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }


});