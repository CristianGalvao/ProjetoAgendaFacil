import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
 corFundo:{
     backgroundColor: "white", flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',position: 'relative'
 },

 //Tela Home
 imgFundoHome:{
    width: '100%', height: '80%', borderBottomRightRadius: 100, borderBottomLeftRadius: 100, position: 'relative'
 },

 ViewCoronavirus:{
     width: '95%', borderColor: 'black', borderWidth: 2, padding: 11, borderRadius: 20, marginLeft: '2.5%',
 },

 txtCoronavirus:{
     textAlign: 'center', fontSize: 14
 },

 txtUsuario:{
    textAlign: 'center', fontWeight: 'bold', fontSize: 14
},

//  Botoes interativos
ViewBotoesInterativos:{
    width: '95%', marginTop: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '2.5%'
},
botaoUnidades:{
    minWidth: '100%', height: 'auto', backgroundColor: 'white', padding: 8, backgroundColor: '#04459b', padding: 10, borderRadius: 50,marginTop:20
},
txtBotaoUnidade:{
    textAlign: 'center', color: 'white', fontWeight: 'bold'
},

subTxtBotaoUnidade:{
    fontSize: 11, textAlign: 'center', color: 'white'
},

botoesPerfilExame:{
    width: '100%', height:'auto',  justifyContent:'space-between', alignItems:'center', flexDirection: 'row', marginTop: 20
},
botaoPerfil:{
    minWidth: '48%', height: 'auto', padding: 10, backgroundColor: '#04459b', padding: 10, borderRadius: 50
},

botaoExame:{
    minWidth: '48%', height: 'auto', padding: 8, backgroundColor: '#04459b', padding: 10, borderRadius: 50
},

servicos:{
    width: '90%', marginTop: 20, flexDirection: "row", justifyContent: "space-between", marginLeft: '5%'
},

meuServicos:{
    minWidth: '25%', display: 'flex',borderRadius:20, justifyContent: 'center', alignItems: 'center', borderColor: "#04459b", borderWidth: 2, padding: 7,
},

dentista:{
    width: '100%', borderColor: '#04459b', borderWidth: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, minHeight: 100
}


})