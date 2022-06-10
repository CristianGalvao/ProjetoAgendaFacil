import React, { useEffect, useState } from "react";
import { MaskedTextInput } from "react-native-mask-text";
import moment from 'moment';
import {
    Text,
    View,
    TextInput,
    Button,
    Alert,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,

} from "react-native";
import { Controller, useForm } from "react-hook-form";
import styles from "./styles";
import imgFundo from "../assets/Login/fundoOficial.png";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import DatePicker from 'react-native-datepicker';
import { Icon } from 'react-native-elements';

import { cpf } from 'cpf-cnpj-validator';


//Importando os icones
import { Entypo } from '@expo/vector-icons';

export default function App() {

    const navigation = useNavigation();

    //ver/ocultar a senha do password
    const [ocultarSenha, setOcultarSenha] = useState(true);
    const [ocultarConfirmaSenha, setocultarConfirmaSenha] = useState(true);

    const { width, height } = Dimensions.get("screen");

    const [nome_usuario, setUsuario] = useState(null);
    const [rg, setRg] = useState(null);
    const [cpf, setCpf] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [numero, setNumero] = useState(null);
    const [complemento, setComplemento] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [data_nascimento, setData_nascimento] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [confirmarSenha, setConfirmarSenha] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(
        () => {
            if (senha == " ") {
                <Text style={{ display: 'none' }}></Text>
            }
        }
    )

    const { handleSubmit, control, errors } = useForm();

    async function enviarFormulario() {


        if (senha === confirmarSenha && isValidCPF(cpf)) {

            let response = await fetch('http://192.168.0.101:3000/usuario/cadastroUsuario', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome_usuario: nome_usuario,
                    rg: rg,
                    cpf: cpf,
                    endereco: endereco,
                    numero: numero,
                    complemento: complemento,
                    telefone: telefone,
                    data_nascimento: data_nascimento,
                    email: email,
                    senha: senha,
                    fotoPerfil: "semFoto"
                })
            });


            let json = await response.json();

        if (json === 'cadastrado') {
            Alert.alert("Cadastrado com sucesso!", "Faça Login");
            navigation.navigate("login");

        }

        if (json === 'erro') {
            alert("Erro!", "Tente novamente mais tarde");
        }

        }else {
            Alert.alert("Verique os campos", "Por favor! Verifique os campos")
        }

        

    }


        const showDatePicker = () => {
            setOpen(true);
        };

        const hideDatePicker = () => {
            setOpen(false);
        };

        const handleConfirm = (event, selectedDate) => {
            let currentDate = selectedDate;

            if (currentDate !== undefined) {
                currentDate = currentDate.toString();
                setData_nascimento(new Date(currentDate));

                hideDatePicker();
            }
        };

        const mensagem = <Text>CPF invalido</Text>

        function mostrarMensagemCPF(){
            if(cpf != ' '){
                isValidCPF(cpf)

                if(!isValidCPF(cpf)){
                    mensagem
                 }
            }

            
        }

        function isValidCPF(cpf) {
            if (typeof cpf !== 'string') return false
            cpf = cpf.replace(/[^\d]+/g, '')
            if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
            cpf = cpf.split('').map(el => +el)
            const rest = (count) => (cpf.slice(0, count - 12)
                .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10
            return rest(10) === cpf[9] && rest(11) === cpf[10]
        }


        return (

            <ScrollView style={{ flex: 1, height: height / 5 }}>

                <View style={styles.container}>
                    <View style={{ width: "100%", height: 'auto', marginBottom: 5 }}>
                        <Image source={imgFundo} style={styles.imgFundoCadastro} />

                        <View style={styles.cadastro}>
                            <View style={styles.inputView}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) =>
                                        <><FontAwesome name="user" size={17} color="#0445ba" />
                                            <TextInput
                                                style={styles.input}
                                                onBlur={onBlur}
                                                onChangeText={text => setUsuario(text)}
                                                value={value}
                                                placeholder={"Nome Completo"} /></>}
                                    name="nome_usuario"
                                />

                            </View>

                            <View style={styles.inputView}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) =>
                                        <><FontAwesome name="user" size={17} color="#0445ba" />
                                            <MaskedTextInput
                                                style={styles.input}
                                                onBlur={onBlur}
                                                onChangeText={text => setRg(text)}
                                                mask="99.999.999-S"
                                                value={value}
                                                placeholder={"RG"} /></>}
                                    name="rg"
                                />

                            </View>



                            <View style={styles.inputView}>
                                <Controller
                                    control={control}
                                    rules={{
                                        maxLength: 14,
                                        required: false
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) =>
                                        <><MaterialCommunityIcons name="numeric" size={18} color="#0445ba" />
                                            <MaskedTextInput
                                                style={styles.input}
                                                onBlur={onBlur}
                                                onChangeText={text => setCpf(text)}
                                                keyboardType="numeric"
                                                mask="999.999.999-99"
                                                value={value}

                                                placeholder={"CPF"} /></>}
                                    name="cpf"
                                />

                                {cpf  != ' '? mostrarMensagemCPF(): <Text></Text>}
                             


                            </View>

                            <View style={styles.inputView}>


                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}

                                    render={({ field: { onChange, onBlur, value } }) =>

                                        <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

                                            <Entypo name="calendar" style={{ fontSize: 16, width: '10%', color: '#0445ba' }} />

                                            <DatePicker

                                                iconComponent={
                                                    <Icon
                                                        size={0}
                                                        color='#0445ba'
                                                        name='access-time'

                                                    />
                                                }

                                                style={{ width: '90%', borderWidth: 0, marginLeft: 0 }}
                                                format="DD/MM/YYYY"
                                                date={data_nascimento}
                                                onDateChange={setData_nascimento}
                                                is24Hour={true}
                                                placeholder="Data de Nascimento"



                                            />
                                        </View>
                                    }
                                    name="data_nascimento"
                                />
                            </View>

                            <View style={styles.inputView}>
                                <Controller
                                    control={control}
                                    rules={{
                                        maxLength: 20,
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) =>
                                        <><FontAwesome5 name="whatsapp" size={17} color="#0445ba" />
                                            <MaskedTextInput
                                                style={styles.input}
                                                onBlur={onBlur}
                                                onChangeText={setTelefone}
                                                keyboardType="numeric"
                                                value={value}
                                                mask="(99) 99999-9999"
                                                placeholder={"(00) 90000-0000"} /></>}
                                    name="celular"
                                />
                            </View>

                            <View style={styles.inputView}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) =>
                                        <><Ionicons name="location-sharp" size={17} color="#0445ba" />
                                            <TextInput
                                                style={styles.input}
                                                onBlur={onBlur}
                                                onChangeText={setEndereco}
                                                value={value}
                                                placeholder={"Endereço"} /></>}
                                    name="endereco"
                                />
                            </View>


                            <View style={styles.inputView}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) =>
                                        <><Ionicons name="location-sharp" size={17} color="#0445ba" />
                                            <TextInput
                                                style={styles.input}
                                                onBlur={onBlur}
                                                onChangeText={setComplemento}
                                                value={value}
                                                placeholder={"Complemento"} /></>}
                                    name="complemento"
                                />
                            </View>

                            <View style={styles.inputView}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) =>
                                        <><MaterialCommunityIcons name="numeric" size={18} color="#0445ba" />
                                            <TextInput
                                                style={styles.input}
                                                onBlur={onBlur}
                                                onChangeText={setNumero}
                                                keyboardType="numeric"
                                                value={value}
                                                placeholder={"Número"} /></>}
                                    name="numero"
                                />
                            </View>


                            <View style={styles.inputView}>
                                <Controller
                                    control={control}
                                    rules={{
                                        maxLength: 250,
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) =>
                                        <><MaterialIcons name="alternate-email" size={16} color="#0445ba" />
                                            <TextInput
                                                style={styles.input}
                                                onBlur={onBlur}
                                                onChangeText={setEmail}
                                                value={value}
                                                placeholder={"Email"} /></>}
                                    name="email"
                                />
                            </View>

                            <View style={styles.inputView}>
                                <Controller
                                    control={control}
                                    rules={{
                                        maxLength: 15,
                                        minLength: 8,
                                        required: true
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) =>
                                        <><FontAwesome name="lock" size={17} color="#0445ba" />
                                            <TextInput
                                                style={styles.input}
                                                onBlur={onBlur}
                                                onChangeText={setSenha}
                                                value={value}
                                                textContentType="password"
                                                secureTextEntry={ocultarSenha}
                                                placeholder={"Senha"} /></>}
                                    name="senha"
                                />



                                <TouchableOpacity
                                    style={styles.icon}
                                    onPress={() => setOcultarSenha(!ocultarSenha)}
                                >
                                    {ocultarSenha
                                        ? <Ionicons name="eye" color="#0445ba" size={17} />
                                        : <Ionicons name="eye-off" color="#0445ba" size={17} />}
                                </TouchableOpacity>


                            </View>

                            <View style={styles.inputView}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                        maxLength: 15,
                                        minLength: 8,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) =>
                                        <><FontAwesome name="lock" size={17} color="#0445ba" />
                                            <TextInput
                                                style={styles.input}
                                                onBlur={onBlur}
                                                onChangeText={setConfirmarSenha}
                                                value={value}
                                                textContentType="password"
                                                secureTextEntry={ocultarConfirmaSenha}
                                                placeholder={"Confirme a Senha"} /></>}
                                    name="confirma_senha"
                                />



                                <TouchableOpacity
                                    style={styles.icon}
                                    onPress={() => setocultarConfirmaSenha(!ocultarConfirmaSenha)}
                                >
                                    {ocultarConfirmaSenha
                                        ? <Ionicons name="eye" color="#0445ba" size={17} />
                                        : <Ionicons name="eye-off" color="#0445ba" size={17} />}
                                </TouchableOpacity>
                            </View>

                            {confirmarSenha == senha ? <Text style={{ display: "none" }}></Text> : <Text style={{ color: 'red', textAlign: 'left', marginLeft: '5%', marginTop: '3%' }}>Senha e confirmar senha não coincidem</Text>}

                            <TouchableOpacity
                                style={styles.btnCadastrar}
                                onPress={() => enviarFormulario()}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: "white",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Cadastrar
                                </Text>
                            </TouchableOpacity>


                        </View>

                    </View>
                </View>
            </ScrollView>
        );
                                }