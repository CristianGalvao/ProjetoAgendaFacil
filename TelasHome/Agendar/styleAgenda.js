import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        flex: 1,

    },

    viewParaImagem: {
        width: '100%',
        height: '40%',
    },

    imgFundoCadastro: {
        width: "100%",
        height: '100%',
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,

    },

    viewTxtAgendar: {

        width: '100%',
        height: '5.5%',
        padding: 5,
        borderRadius: 10,
        position: 'absolute',
        marginTop: '55%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center'
    },

    txtAgendar: {
        color: '#04459b',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },

    viewEscolhaServico: {

        width: '100%',
        height: '55%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,


    },

    viewEscolherServico: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
        shadowColor: '#04459b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#04459b',
        borderWidth: 1,

    },

    viewDadosEscolhaServicos: {
        width: '90%',
        height: 'auto',
        padding: 10,
    },

    viewBotoesServicos: {
        width: '100%',
        height: 'auto',
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    btnServicos: {
        width: '31%',
        height: 40,
        borderRadius: 15,
        backgroundColor: '#04459b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    txtTituloServicos: {
        color: '#04459b',
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 15
    },

    txtSubTituloServicos: {
        color: 'grey',
        fontSize: 16,
        marginBottom: 20
    },

    txtBotoes: {
        color: 'white',
        fontWeight: 'bold'
    },

    // TELA DE CONSULTA AGENDAR
    containerConsulta: {
        width: '100%',
        height: height / 2,


    },
    viewConsultaSelecione: {
        width: '95%',
        height: 'auto',
        padding: 5,
        marginLeft: '5%',

    },

    txtSelecioneConsulta: {
        color: '#04459b',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 20,
    },

    pickerConsulta: {
        width: '90%',
        marginLeft: '5%',
        marginTop: 5,
        color: 'black',
        fontWeight: 'bold',


    },

    botaoAgendar: {
        width: '70%',
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#04459b',
        marginLeft: "15%",
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20
    },

    txtBotaoAgendar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 5
    },

    // ESTILO PARA TELA DE CARRINHO
    viewMeuAgendamento: {
        marginTop: 20,
        width: '45%',
        marginLeft: "5%",
        height: height / 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    txtMeuAgedamento: {
        marginLeft: 0,
        fontWeight: 'bold',
        fontSize: 18
    },

    containerCarrinhoConsulta: {
        marginTop: 20,
        width: '90%',
        marginLeft: "5%",
        height: height / 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderRadius: 5
    },

    viewTxtConsulta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    txtConsulta: {
        marginLeft: "2%",
        fontWeight: 'bold',
        fontSize: 16
    },

    txtValor: {
        marginRight: "2%",
        fontWeight: 'bold',
        fontSize: 16
    },

    viewCarrinhoSubTotalValor: {
        width: '90%',
        marginLeft: "5%",
        height: height / 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderRadius: 5,
        marginTop: 20
    },

    txtSubTotal: {
        marginLeft: "2%",
        fontWeight: 'bold',
        fontSize: 16
    },

    txtCarrinhoValor: {
        marginRight: "2%",
        fontWeight: 'bold',
        fontSize: 16
    },

    viewCarrinhoUnidade: {
        marginTop: 10,
        width: '90%',
        marginLeft: "5%",
        height: height / 13,
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },

    txtCarrinhoUnidade: {
        fontWeight: 'bold',
        fontSize: 16
    },

    txtSubCarrinhoUnidade: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'grey'
    },

    btnRealizarPagamento: {
        width: '90%',
        marginLeft: '5%',
        backgroundColor: 'green',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        padding: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewProduto:{
        width: '90%',
        marginLeft: '5%',
        height: '8%',
        marginTop: 10,
        borderColor: 'black',
        borderBottomWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    viewSubProduto:{
        width: '45%',
        height: '90%',
        display: 'flex',
    },

    txtProdutoEspecialidade:{
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'left',
       marginLeft: '10%'
    },

    txtSubProdutoEspecialidade:{
        fontSize: 15,
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'right',
       marginRight: '10%'
    },

    txtSubEsquedoProdutoEspecialidade:{
        fontSize: 15,
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'left',
       marginLeft: '10%'
    }


});

