import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({

    container:{
        flex: 1, backgroundColor: 'white'
    },

    viewImagemFundo:{
        width: '100%', height: '40%', position: 'relative'
    },

    imgFundo:{
        borderBottomLeftRadius: 100, borderBottomRightRadius: 100,width: '100%', height: '100%'
    },

    areaLogin:{
        width: '90%', height: '50%', elevation: 5,position: 'absolute', marginTop: '70%', marginLeft: '5%', backgroundColor: 'white', borderRadius: 30
    },

    botoesCadastroLogin:{
        marginTop: 30, width: '80%', height: 'auto', marginLeft: '10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'
    },

    botaoLogin:{
        width: '47%', backgroundColor: '#04459b', padding: 10,display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10
    },

    txtLogin:{
        color: 'white', fontWeight: 'bold', fontSize: 16
    },

    botaoCadastro:{
        width: '47%', backgroundColor: 'white', padding: 10,display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderColor: '#04459b', borderWidth: 2
    },

    txtLogin:{
        color: 'white', fontWeight: 'bold', fontSize: 16
    },

    txtCadastro:{
        color: '#04459b', fontWeight: 'bold', fontSize: 16
    },

    login:{
        width: '90%', marginLeft: '5%', height: 'auto', padding: 20, marginTop: 30
    },

    txtInput:{
        width: '100%', height: 25, borderBottomColor: '#04459b', borderBottomWidth: 1, borderRadius: 5, marginTop: 10, marginBottom: 35
    },

    botaoEntrar:{
        width: '100%', backgroundColor: '#04459b', padding: 10,display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10
    },

});