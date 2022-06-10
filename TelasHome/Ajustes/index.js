import React, {useEffect} from 'react';
import { View, Text, Image, Dimensions,BackHandler, ScrollView, TouchableOpacity, Alert } from 'react-native';
//Importando o estilo
import estilo from './estiloAjustes';
//Importando a imagem de fundo
import imgFundo from '../../assets/Login/fundoOficial.png';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function App() {

    const navigation = useNavigation(); 


        const backAction = () => {
          Alert.alert("Sair do App", "Certeza que deseja sair?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancelar"
            },
            { text: "Sim", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
     
        }
    

    return (

        

        <ScrollView>
         {/* View que conterá todos os elementos */}
        <View style={estilo.container}>

            <View style={{ width: '100%', height: height / 2.3 }}>

                <Image source={imgFundo} style={estilo.imgFundoHeader} />

                <View style={estilo.nomeConfiguracoes}>

                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#04459b' }}>Configurações</Text>

                </View>

            </View>

            <View style={{ width: '90%', marginTop: 15, marginLeft: '5%' }}>

                <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderRadius: 30, padding: 15, borderWidth: 3, borderColor: '#04459b' }}
                
                        onPress={() => navigation.navigate("perfil")}
                
                >

                    <Text style={{ color: "#04459b", fontWeight: 'bold', marginLeft: 10, fontSize: 17 }}>Perfil</Text>
                    <Text style={{ color: "#04459b", marginLeft: 10, marginTop: 5 }}>Visualizar e edite seus dados pessoais</Text>

                </TouchableOpacity>

            </View>

            <View style={{ width: '90%', marginTop: 15, marginLeft: '5%' }}>

                <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderRadius: 30, padding: 15, borderWidth: 3, borderColor: '#04459b' }}
                

                        onPress={()=> navigation.navigate('Localizacao')}

                
                >

                    <Text style={{ color: "#04459b", fontWeight: 'bold', marginLeft: 10, fontSize: 17 }}>Localização:</Text>
                    <Text style={{ color: "#04459b", marginLeft: 10, marginTop: 5 }}>Escolha aqui sua unidade favorita</Text>

                </TouchableOpacity>

            </View>
            
            <View style={{ width: '90%', marginTop: 15, marginLeft: '5%' }}>

                <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderRadius: 30, padding: 15, borderWidth: 3, borderColor: '#04459b' }}
                
                
                    onPress={()=> navigation.navigate("Pagamento")}
                
                >

                    <Text style={{ color: "#04459b", fontWeight: 'bold', marginLeft: 10, fontSize: 17 }}>Forma de Pagamento</Text>
                    <Text style={{ color: "#04459b", marginLeft: 10, marginTop: 5 }}>Gerencie quais cartões quer utilizar</Text>

                </TouchableOpacity>

            </View>

            <View style={{ width: '90%', marginTop: 15, marginLeft: '5%' }}>

                <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderRadius: 30, padding: 15, borderWidth: 3, borderColor: '#04459b' }}
                    onPress={()=> navigation.navigate("termos")}
                
                >

                    <Text style={{ color: "#04459b", fontWeight: 'bold', marginLeft: 10, fontSize: 17 }}>Termos de Uso</Text>
                    <Text style={{ color: "#04459b", marginLeft: 10, marginTop: 5 }}>Algo que levamos muito a sério</Text>

                </TouchableOpacity>

            </View>

            <View style={{ width: '90%', marginTop: 15, marginLeft: '5%' }}>

                <TouchableOpacity style={{ width: '100%', backgroundColor: 'white', borderRadius: 30, padding: 15, borderWidth: 3, borderColor: '#04459b' }}
                
                onPress={()=> 
                  backAction()
                }
                
                >

                    <Text style={{ color: "#04459b", fontWeight: 'bold', marginLeft: 10, fontSize: 17 }}>Sair</Text>
                    <Text style={{ color: "#04459b", marginLeft: 10, marginTop: 5 }}>Desloque do aplicativo</Text>

                </TouchableOpacity>

            </View>

        </View>
        </ScrollView>

    )
}