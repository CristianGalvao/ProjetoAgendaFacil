import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Alert, ScrollView, Dimensions } from "react-native";

import medico1 from "../../../assets/medicos/medico1.jpg";
import medico2 from "../../../assets/medicos/medico2.jpg";
import medico3 from "../../../assets/medicos/medico3.jpg";

import BackgroundImage from '../../../assets/Login/fundoOficial.png';

import { useNavigation } from '@react-navigation/native';

import { Rating } from "react-native-ratings";
export default function App() {

  const navigation = useNavigation();

  const { height, width } = Dimensions.get("screen")

  return (
    
    <View style={styles.container}>

      <View style={styles.viewParaImagem}>

        <Image style={styles.imgFundoCadastro} source={BackgroundImage} />

        <View style={styles.viewTxtAgendar}>
          <Text style={styles.txtAgendar}>Nossos profissionais</Text>
        </View>
      </View>
      <View style={styles.profissionais}>

        <View style={styles.fotos}>
          <Image
            style={{ width: "100%", height: 88, borderRadius: 16 }}
            source={medico2}
          />
        </View>

        <View style={styles.rating}>
          <Text style={styles.textNomes}> Antônio José</Text>
          <Text style={{color: 'grey'}}>Cardio</Text>
          <Rating
            type="heart"
            ratingCount={5}
            imageSize={15}
            onFinishRating={rating => {
              Alert.alert("Heart Rating: " + JSON.stringify(rating));
            }}
          />
        </View>
      </View>

      <View style={styles.profissionais}>
        <View style={styles.fotos}>
          <Image
            style={{ width: 88, height: 88, borderRadius: 16 }}
            source={medico1}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.textNomes}> Marcos Vini</Text>
          <Text style={{color: 'grey'}}>Neurologista</Text>
          <Rating
            type="heart"
            ratingCount={5}
            imageSize={15}
            onFinishRating={rating => {
              Alert.alert("Heart Rating: " + JSON.stringify(rating));
            }}
          />
        </View>
      </View>


      <View style={styles.profissionais}>
        <View style={styles.fotos}>
          <Image
            style={{ width: 88, height: 88, borderRadius: 16 }}
            source={medico3}
          />
        </View>
        <View style={styles.rating}>
          <Text style={styles.textNomes}>Cicera Macaiana</Text>
          <Text style={{color: 'grey'}}>Obstetra</Text>
          <Rating
            type="heart"
            ratingCount={5}
            imageSize={15}
            onFinishRating={rating => {
              Alert.alert("Heart Rating: " + JSON.stringify(rating));
            }}
          />
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
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
    resizeMode: 'stretch'
  },

  viewTxtAgendar: {

    width: '100%',
    height: 'auto',
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
    fontSize: 16,

  },

  textNomes: {
    color: "#0459ba",
    fontWeight: "bold",
    marginLeft: -2,
    fontSize: 16
    

  },
  profissionais: {
    width: "80%",
    height: 110,
    backgroundColor: "#FFF",
    borderRadius: 16,
    flexDirection: "row",
    margin: 10,
    elevation: 5,
    marginLeft: '10%',
    display: 'flex',
    justifyContent: 'space-between'
  },

  fotos: {
    width: '25%',
    height: 88,
    borderRadius: 20,
    marginLeft: 15,
    margin: 10,
  },
  rating: {
    flexDirection: 'column', 
    width: '65%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    
  },
});