import React from 'react';
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({    

    container: {
        backgroundColor: "#f5f5f5",
        flex: 1,
        
      },
      imgFundoCadastro: {
        width: "100%",
        height: height / 2.5,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
      },
    
      cadastro: {
        width: "90%",
 
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 15,
        marginLeft: '5%',
 
            },
    
      btnCadastrar:{
        width: "40%",
        height: 35, 
        backgroundColor: '#04459b', 
        padding: 6, 
        marginLeft: '30%',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 15,
    
        
      },
    
      text: {
        fontSize: 14,
        color: "#0459ab",
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        marginTop: 10,
      },
    
      inputView: {
        width: '90%',
        height: 44,
        backgroundColor: '#F1F3F6',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginLeft: '5%',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
        
      },
    
      input:{
        width: '85%',
        height: 44,
        padding: 8,
        fontSize: 14,
        flex: 1,
        paddingHorizontal: 12
      },
    
      icon: {
        width: '20%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      picker:{
          width: '30%',
          height: 44,
          padding: 8,
          fontSize: 10,
          flex: 1,
          paddingHorizontal: 12
    
      },
    
    });