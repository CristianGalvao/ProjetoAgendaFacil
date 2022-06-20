import React from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default StyleSheet.create(

    {

        viewContainerFundoImagem: {

            backgroundColor: 'skyblue',
            height: height / 6,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',


        },

        containerTextInput: {

            width: '90%',
            marginTop: 20,
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },

        viewTitulo: {

            width: '60%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'

        },

        txtTitulo: {
            color: '#04459b',
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center'
        },

        viewParaCampos: {
            width: '100%',
            height: height / 1.6,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderWidth: 1,
            borderColor: '#04459b',
            backgroundColor: 'white'
        },

        viewSeparacaoIconeTexto: {
            width: '80%',
            marginLeft: '10%',
            flexDirection: 'row',
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },

        txtInput:{
            width: '90%',
            marginLeft: '5%',
            marginTop: 20,
            borderColor: 'grey',
            borderWidth: 1,
            borderRadius: 10,
            padding: 5
        },

        botaoSalvar:{
            width: '90%',
            marginLeft: '5%',
            flexDirection: 'row',
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#04459b',
            padding: 5,
            borderRadius: 10
        }

    }

);