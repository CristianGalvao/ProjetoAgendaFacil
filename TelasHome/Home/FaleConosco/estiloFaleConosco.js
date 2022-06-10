import React from "react";
import { StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
    container:{
        backgroundColor: 'white', flex: 1
    },

    viewParaImagem: {
        width: '100%',
        height: height / 2.8,
        position: 'relative'
    },

    imgFundoCadastro: {
        width: "100%",
        height: '100%',
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,

    },

    viewTxtFaleConosco: {
        width: '100%',
        height: height / 20,
        padding: 5,
        borderRadius: 10,
        position: 'absolute',
        marginTop: '60%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center'
    },

    txtFaleConosco: {
        color: '#04459b',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
});