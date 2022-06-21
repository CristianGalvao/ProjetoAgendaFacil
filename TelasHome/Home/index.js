import React, {useState, useEffect} from 'react';
import { View, Dimensions, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
//Importando os estilos
import estilo from './estilo';
//Criando uma Const para receber os tamanhos da tela
const { width, height } = Dimensions.get('screen');
//Importando Imagem fundo Header
import imgFundoHeader from '../../assets/Login/fundoOficial.png';
//Importando os icones
import { Entypo } from '@expo/vector-icons';



import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {

    const [usuario, setNome_usuario] = useState(null);

    useEffect(
        ()=>{
                async function pegarUsuario(){
                    let response = await AsyncStorage.getItem('dadosUsuario'); 
                    let json = JSON.parse(response);
                    setNome_usuario(json.nome_usuario)
                }
                pegarUsuario();
        }, []);


    return (

        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>

            {/* Header */}
            <View style={{ width: '100%', height: height / 2.7 }}>

                <Image source={imgFundoHeader} style={estilo.imgFundoHome} />
                {/* View Coronavirus */}
                <View style={estilo.ViewCoronavirus}>

                    <Text style={estilo.txtUsuario}>Bem vindo {usuario}!</Text>

                    <Text style={estilo.txtCoronavirus}>Coronavirus</Text>
                    <Text style={{ marginLeft: 10 }}>A Covid-19 afeta diferentes pessoas de diferentes maneiras</Text>
                    <Text style={{ marginLeft: 10 }}>Clique aqui para saber orientações médicas</Text>
                </View>
            </View>
            {/* Fim do Header */}

            {/* Botoes interativos */}
            <View style={estilo.ViewBotoesInterativos}>

                <TouchableOpacity onPress={()=> navigation.navigate('unidades')} style={estilo.botaoUnidades}>

                    <Text style={estilo.txtBotaoUnidade}>Buscar Unidades</Text>
                    <Text style={estilo.subTxtBotaoUnidade}>Clique aqui e encontre a unidade mais proxima de você!</Text>

                </TouchableOpacity>

                {/* View Para colocar lado a lado os botões */}
                <View style={estilo.botoesPerfilExame}>

                    {/* Botao Perfil e Exames */}
                    <TouchableOpacity onPress={()=> navigation.navigate('exames')} style={estilo.botaoPerfil}>

                        <Text style={estilo.txtBotaoUnidade}>Exames</Text>
                        <Text style={estilo.subTxtBotaoUnidade}>Acesse seus exames!</Text>

                    </TouchableOpacity>

                    {/* Perfil */}

                    <TouchableOpacity onPress={()=> navigation.navigate('perfil')} style={estilo.botaoExame}>

                        <Text style={estilo.txtBotaoUnidade}>Perfil</Text>
                        <Text style={estilo.subTxtBotaoUnidade}>Acesse suas informações!</Text>

                    </TouchableOpacity>
                </View>

            </View>

            {/* Opções de Serviços */}
            <View style={estilo.servicos}>

                <TouchableOpacity style={estilo.meuServicos} onPress={() => navigation.navigate("escolhaServico")}>

                    <Entypo name="direction" size={28} />
                    <Text style={{ fontSize: 13, color: 'black' }}>Agendar</Text>

                </TouchableOpacity>

                <TouchableOpacity style={estilo.meuServicos} onPress={() => navigation.navigate("profissionais")}>

                    <Entypo name="slideshare" size={28} />
                    <Text style={{ fontSize: 13, color: 'black' }}>Profissionais</Text>

                </TouchableOpacity>

                <TouchableOpacity  style={estilo.meuServicos} onPress={() => navigation.navigate("historico")}>

                    <Entypo name="text" size={28} />
                    <Text style={{ fontSize: 13, color: 'black' }}>Consultas</Text>

                </TouchableOpacity>

            </View>

            {/* Opções de Serviços */}
            <View style={estilo.servicos}>

                <TouchableOpacity style={estilo.meuServicos} onPress={() => navigation.navigate("faleConosco")}>

                    <Entypo name="typing" size={28} />
                    <Text style={{ fontSize: 13, color: 'black' }}>Fale Conosco</Text>

                </TouchableOpacity>

                <TouchableOpacity style={estilo.meuServicos} onPress={() => navigation.navigate("carrinhoHome")}>

                    <Entypo name="wallet" size={28} />
                    <Text style={{ fontSize: 13, color: 'black' }}>Carrinho</Text>

                </TouchableOpacity>

                <TouchableOpacity style={estilo.meuServicos} onPress={() => navigation.navigate("chatBot")}>

                    <Entypo name="rocket" size={28} />
                    <Text style={{ fontSize: 13, color: 'black' }}>ChatBot</Text>

                </TouchableOpacity>

            </View>

            {/* Demostrativo Agendamento no mesmo dia */}

            <View style={{ width: '100%', padding: 10, marginTop: 20 }}>

            <Text style={{marginLeft: "2.5%", fontWeight: 'bold', fontSize: 17}}>Agendamentos</Text>

                <View style={{width: '95%', marginLeft: '2.5%', marginTop: 10, backgroundColor: '#04459b', marginBottom: 8, padding: 15, borderRadius: 8}}>

                    <Text style={{color: 'white'}}>Aqui, você agenda até para o mesmo dia com Unidades perto da sua casa ou trabalho</Text>

                </View>
            </View>


        </ScrollView>

    )
}