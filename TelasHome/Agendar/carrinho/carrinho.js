import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Button,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import imgFundo from '../../../assets/Login/fundoOficial.png';
import estilo from '../../Agendar/styleAgenda';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaymentScreen1({ navigation, route }) {


  useEffect(
    () => {
      console.log("Carregou a tels")
      async function pegarAgenda() {
        let response = await AsyncStorage.getItem('dadosAgendaConsulta');
        let json = JSON.parse(response);
        setIdUsuario(json.idUsuario);
        setId(json.id);

      }

      pegarAgenda();

    }, []);

  const [idUsuario, setIdUsuario] = useState();
  const [id, setId] = useState();

  const [atualizarHistorico, setAtualizar] = useState(false)
  async function AtualizarStatus() {

    let response = await fetch('http://192.168.0.101:3000/agendar/atualizar/' + idUsuario + '/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUsuario: idUsuario,
        id: id
      })
    })
    let json = await response.json();
    if(json === "erro"){
      alert("Não foi possivel realiza o pagamento, tente novamente mais tarde")
    }else{
      alert("Pagamento realizado! Acesse a tela Home para verificar suas consultas")
      navigation.navigate('home')
    }
  }

  return (
    <View style={styles.container}>

      <View style={estilo.viewParaImagem}>

        <Image source={imgFundo} style={{ width: '100%', height: '100%' }} />

      </View>



      <View style={styles.cartContainer}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cartTitleView}>
            <Icon name='shopping-cart' type='font-awesome-5' />
            <Text style={styles.cartTitle}>Meu Carrinho</Text>
          </View>

          <View>
            <View style={styles.productView}>

              <View style={styles.productMiddleView}>
                <Text style={styles.productTitle}>{route.params.especialidade}</Text>
                <Text style={styles.productCompanyTitle}>
                  {route.params.tipo}
                </Text>
              </View>
              <View style={styles.productRightView}>
                <Text
                  style={styles.productPriceText}
                >{route.params.preco}</Text>

              </View>
            </View>


            <View style={styles.subtotalView}>
              <Text style={styles.subtotalText}>Subtotal -</Text>
              <Text style={styles.subtotalPrice}>
                {route.params.preco}
              </Text>
            </View>

            <View style={styles.totalView}>
              <Text style={styles.totalText}>Total -</Text>



              <Text style={styles.totalPrice}>
                {route.params.preco}
              </Text>

            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => AtualizarStatus()}>
              <Text style={styles.checkoutButtonText}>
                Processar Pagamento
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',

  },
  header: {
    alignItems: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  paymentTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: "60%",
    height: "100%",
    position: 'absolute',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    width: '100%',
    paddingHorizontal: 16,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  cartTitleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#04459b'
  },
  cartTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 10,
  },
  productView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 8,
    // borderRadius: 10,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    // shadowRadius: 2,
    elevation: 2,
    marginTop: 14,
  },
  productImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  productMiddleView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  productCompanyTitle: {
    fontSize: 16,
    fontWeight: '300',
  },
  productRightView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productItemCounterView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  counterValue: {
    fontSize: 20,
    fontWeight: '500',
  },
  productPriceText: {
    alignSelf: 'flex-end',
    paddingRight: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  toggleCounterButton: {
    paddingHorizontal: 10,
  },
  couponInputView: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  couponInput: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  couponButton: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  couponButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  subtotalView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  subtotalPrice: {
    fontSize: 18,
    fontWeight: '300',
  },
  shippingView: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  shippingItemsView: {
    marginTop: 10,
  },
  shippingText: {
    fontSize: 18,
    fontWeight: '500',
  },
  shippingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shippingItemText: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: '300',
  },
  totalView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '300',
  },
  checkoutButton: {
    backgroundColor: '#333',
    paddingVertical: 14,
    marginTop: 30,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  emptyCartView: {
    flex: 1,
    marginTop: 140,
  },
  emptyCartViewText: {
    fontSize: 20,
    fontWeight: '300',
    alignSelf: 'center',
  },
});