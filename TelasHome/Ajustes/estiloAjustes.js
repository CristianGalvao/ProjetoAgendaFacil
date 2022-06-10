import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
   
    container:{
        backgroundColor: 'white', flex: 1
    },

    imgFundoHeader:{
        width: '100%', height: '100%', borderBottomLeftRadius: 150, borderBottomRightRadius: 150
    },

    nomeConfiguracoes:{
        width: '100%', backgroundColor: 'white', height: '15%', position: 'absolute', marginTop: '70%', borderWidth: 1, borderColor: '#04459b', display: 'flex', justifyContent: 'center',
        alignItems: 'center', padding: 5, borderRadius: 20
    }

})