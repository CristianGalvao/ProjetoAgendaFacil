import React, { useState, useEffect } from 'react';
import { Button, Text, Image, View, FlatList, Item } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_IMG = require('../../../assets/Login/fundoOficial.png')

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [idUsuario, setIdUsuario] = useState();
  
  useEffect(() => {
    async function pegarUsuario() {
      let response = await AsyncStorage.getItem('dadosUsuario');
      let json = JSON.parse(response);
      setIdUsuario(json.idUsuario);

    }
    pegarUsuario();

  }, [idUsuario])

  async function pegarFotoPerfil() {
    let response = await fetch('http://10.0.3.178:3000/pegarImagemPerfil/' + idUsuario)
      .then(res => res.json())
      .then(
        res => {
          setImage(res[0].fotoPerfil)
        }
      )
  }

  const [newImg, setNewImg] = useState(image);

  async function setUserImage(img) {
    let response = await fetch('http://10.0.3.178:3000/cadastrarImagemPerfil', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUsuario: idUsuario,
        caminhoImagem: img
      })
    });
  }

  const pickImage = async () => {

    

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setUserImage(result.uri)
    }
    
  };

  useEffect(
    () => {

      pegarFotoPerfil()

    }, [idUsuario]
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Button title="Pick an image from camera roll" onPress={pickImage} />

      

      <View style={{ width: 200, height: 200 }} >
        <Image source={{uri: image}} style={{ width: '100%', height: '100%' }} />
      </View>

    </View>
  );
}