import React from "react";
import { View, Text, ScrollView,TouchableOpacity } from "react-native";
import estiloTelaAjustes from "./estiloTermos";
import { useNavigation } from '@react-navigation/native';

export default function Termos() {

 const navigation = useNavigation();

  return (
    // View que conterá todos os elementos
    <ScrollView>
      <View
        style={{ flex: 1, alignItems: "center", backgroundColor: "#d3d3d3" }}
      >
        <View style={{ flex: 1, backgroundColor: "#FFFF", width: '90%' }}>

        <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 5,
              textAlign: 'center'
            }}
          >
          
            Termos de uso
          </Text>

          <Text style={estiloTelaAjustes.termos}>Política de Privacidade</Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 3,
              marginLeft: 12,
              marginRight: 10,
            }}
          >
            Na AGENDAFÁCIL, privacidade e segurança são prioridades e nos
            comprometemos com a transparência do tratamento de dados pessoais
            dos nossos usuários/clientes. Por isso, esta presente Política de
            Privacidade estabelece como é feita a coleta, uso e transferência de
            informações de clientes ou outras pessoas que acessam ou usam nosso
            site.
            </Text>
          

          <Text
          
              style={{
              fontSize: 12,
              marginTop: 3,
              marginLeft: 12,
              marginRight: 10,
            }}
          
          >
          
             Ao utilizar nossos serviços, você entende que coletaremos e
            usaremos suas informações pessoais nas formas descritas nesta
            Política, sob as normas de Proteção de Dados (LGPD, Lei Federal
            13.709/2018), das disposições consumeristas da Lei Federal 8078/1990
            e as demais normas do ordenamento jurídico brasileiro aplicáveis.
          
          </Text>

          <Text style={estiloTelaAjustes.termos}>
            1. Quais dados coletamos sobre você e para qual finalidade?
          </Text>

          <Text
            style={{
              fontSize: 12,
              marginTop: 3,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            Nosso site coleta e utiliza alguns dados pessoais seus, 
            de forma a viabilizar a prestação de serviços e aprimorar a experiência de uso.
          </Text>

          <Text style={estiloTelaAjustes.termos}>
          2. Consentimento
          </Text>

          <Text
            style={{
              fontSize: 12,
              marginTop: 3,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            É a partir do seu consentimento que tratamos os seus dados pessoais. O consentimento é a manifestação livre, informada e inequívoca pela qual você autoriza a (nome empresarial simplificado) a tratar seus dados.
            Assim, em consonância com a Lei Geral de Proteção de Dados, seus dados só serão coletados, tratados e armazenados mediante prévio e expresso consentimento. 
            O seu consentimento será obtido de forma específica para cada finalidade acima descrita, evidenciando o compromisso de transparência e boa-fé da (nome empresarial simplificado) para com seus usuários/clientes, seguindo as regulações legislativas pertinentes.
            Ao utilizar os serviços da (nome empresarial simplificado) e fornecer seus dados pessoais, você está ciente e consentindo com as disposições desta Política de Privacidade, além de conhecer seus direitos e como exercê-los. 
            A qualquer tempo e sem nenhum custo, você poderá revogar seu consentimento. 
            É importante destacar que a revogação do consentimento para o tratamento dos dados pode implicar a impossibilidade da performance adequada de alguma funcionalidade do site que dependa da operação. Tais consequências serão informadas previamente.
           </Text>

          <Text style={estiloTelaAjustes.termos}>
          3. Quais são os seus direitos?
          </Text>

          <Text
            style={{
              fontSize: 12,
              marginTop: 3,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            A AGENDAFÁCIL  assegura a seus usuários/clientes seus direitos de titular previstos no artigo 18 da Lei Geral de Proteção de Dados. Dessa forma, você pode, de maneira gratuita e a qualquer tempo:
            Confirmar a existência de tratamento de dados, de maneira simplificada ou em formato claro e completo.
            Acessar seus dados, podendo solicitá-los em uma cópia legível sob forma impressa ou por meio eletrônico, seguro e idôneo.
            Corrigir seus dados, ao solicitar a edição, correção ou atualização destes.
            Limitar seus dados quando desnecessários, excessivos ou tratados em desconformidade com a legislação através da anonimização, bloqueio ou eliminação.
            Solicitar a portabilidade de seus dados, através de um relatório de dados cadastrais que a (nome empresarial simplificado) trata a seu respeito.
            Eliminar seus dados tratados a partir de seu consentimento, exceto nos casos previstos em lei.
            Revogar seu consentimento, desautorizando o tratamento de seus dados.
            Informar-se sobre a possibilidade de não fornecer seu consentimento e sobre as consequências da negativa.
          </Text>

          <Text style={estiloTelaAjustes.termos}>
            4. Como e por quanto tempo seus dados serão armazenados?
          </Text>

          <Text
            style={{
              fontSize: 12,
              marginTop: 3,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 30
            }}
          >
            Seus dados pessoais coletados pela AGENDAFÁCIL serão utilizados e armazenados durante o tempo necessário para a prestação do serviço ou para que as finalidades elencadas na presente Política de Privacidade sejam atingidas, considerando os direitos dos titulares dos dados e dos controladores.
            De modo geral, seus dados serão mantidos enquanto a relação contratual entre você e a AGENDAFÁCIL perdurar. Findado o período de armazenamento dos dados pessoais, estes serão excluídos de nossas bases de dados ou anonimizados, ressalvadas as hipóteses legalmente previstas no artigo 16 lei geral de proteção de dados.
          </Text>
        </View>

            <TouchableOpacity style={{width: 100, height: 30, backgroundColor: '#04459b', padding: 5, marginTop: 10, marginBottom: 10, borderRadius: 20}}
            
              onPress={()=>

                navigation.goBack()
              
              }
            
            >
            
                <Text style={{textAlign: 'center', color :'white', fontWeight: 'bold'}}>Voltar</Text>
            
            </TouchableOpacity>

      </View>
    </ScrollView>
  );
}