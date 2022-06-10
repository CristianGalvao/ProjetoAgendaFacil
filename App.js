import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Consulta from './Consulta/consulta';

//Importando as navegações
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Importando as telas de acesso do usuario
import Cadastro from './AcessosUsuario/cadastroTela';
import Login from './AcessosUsuario/login';
import Consultas from './Consulta/consulta';
import AreaRestritaUsuario from './AcessosUsuario/AreaUsuario/areaRestritaUsuario';
import RotasTab from './TelasHome/rotasTelas';
import Historico from './TelasHome/Historico/index';

//Telas de ajustes
import Termos from './TelasHome/Ajustes/Termos/termos';
import Perfil from './TelasHome/Ajustes/Perfil/index';

//Serviços Agenda
import EscolhaServicos from './TelasHome/Agendar/escolhaServicoAgenda';
import ConsultaAgenda from './TelasHome/Agendar/consultaAgendar';
import Agendar from './TelasHome/Agendar/agendar';
import Carrinho from './TelasHome/Agendar/carrinho/carrinho';
import CarrinhoHome from './TelasHome/Home/CarrinhoHome/carrinhoHome';
import Exames from './TelasHome/Agendar/Exames/exames';
import Vacinas from './TelasHome/Agendar/vacinas/vacinas';

//importações Home
import FaleConosco from './TelasHome/Home/FaleConosco/faleConosco';

//Profissionais
import Profissionais from './TelasHome/Home/Profissionais/index';


export default function App() {

  //Instanciando o Stack para fazer a navegação
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='login'>

        <Stack.Screen name="login" component={Login}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="faleConosco" component={FaleConosco}
          options={{
            headerTitle: ' '
          }}
        />

        <Stack.Screen name='carrinhoHome' component={CarrinhoHome} />

        <Stack.Screen name="profissionais" component={Profissionais}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="exames" component={Exames}
          options={{
            headerTitle: ' '
          }}
        />

        <Stack.Screen name="vacinas" component={Vacinas}
          options={{
            headerTitle: ' '
          }}
        />

        <Stack.Screen name="historico" component={Historico}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="home" component={RotasTab}
          options={{
            headerShown: false,

          }}
        />

        <Stack.Screen name="consulta" component={Consultas}
          options={{
            headerTitle: 'Consultas'
          }}
        />

        <Stack.Screen name='cadastro' component={Cadastro}
          options={{
            headerTitle: 'Cadastre-se'
          }}

        />

        <Stack.Screen name='agendar' component={Agendar} />

        <Stack.Screen name='termos' component={Termos} />
        <Stack.Screen name='perfil' component={Perfil} />


        <Stack.Screen name="areaRestrita" component={AreaRestritaUsuario} />

        {/* Telas da Agenda */}
        <Stack.Screen name='consultaAgenda' component={ConsultaAgenda} options={{ headerTitle: " " }} />
        <Stack.Screen name="escolhaServico" component={EscolhaServicos} options={{ headerTitle: " " }} />
        <Stack.Screen name="carrinho" component={Carrinho} options={{ headerTitle: " " }} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}


