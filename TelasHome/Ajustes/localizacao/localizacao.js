import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  let [regiao, setRegiao] = useState({
    latitude: -23.5085241,
    longitude:  -46.8636916,
    latitudeDelta: 0.014,
    longitudeDelta: 0.014,
  });

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition( posicao => {
  //     console.log(posicao);
  //   }, e => console.log(e.message));
  // }, []);

  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [watchID, setWatchID] = useState(0);

  const callLocation = () => {
    if(Platform.OS === 'ios') {
      getLocation();
    } else {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permissão de Acesso à Localização",
            message: "Este aplicativo precisa acessar sua localização.",
            buttonNeutral: "Pergunte-me depois",
            buttonNegative: "Cancelar",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          alert('Permissão de Localização negada');
        }
      };
      requestLocationPermission();
    }
  }
  
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    const watchID = navigator.geolocation.watchPosition((position) => {
      const currentLatitude = JSON.stringify(position.coords.latitude);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      setCurrentLatitude(currentLatitude);
      setCurrentLongitude(currentLongitude);
    });

    setRegiao({latitude: parseFloat(currentLatitude),
      longitude: parseFloat(currentLongitude),
      latitudeDelta: 0.014,
      longitudeDelta: 0.014,})
    setWatchID(watchID);
  }

  const clearLocation = () => {
    navigator.geolocation.clearWatch(watchID);
  }

  return (
    <View style={styles.container}>
      <MapView
        
        style={{ width: "100%", height: "100%" }}
        region={regiao}
      >
        <Marker 
          coordinate={regiao}
          title={"Localização Atual"}
          
        />

        {/* <Marker coordinate={{latitude: parseFloat(currentLatitude), longitude: parseFloat(currentLongitude)}}/> */}

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});