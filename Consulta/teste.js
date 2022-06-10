import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, TextInput, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Historico() {

    const [idUsuario, setIdUsuario] = useState();
    const [data, setData] = useState();




    async function enviarFormulario() {

        let response = fetch('http://10.68.23.123:3000/teste', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idUsuario: idUsuario
            })
        }).then(response => response.json())
            .then(response => {
                setData(response || [])
                console.log(data)
            })
            .catch((error) => {
                console.error(error);
            });
    }

  
         
                
 

    return (

<View>

    <TextInput style={{width: '100%', height: 40, borderColor: 'black', borderWidth: 1}} onChangeText={setIdUsuario}></TextInput>
    <Button title="few" onPress={()=>enviarFormulario()}></Button>

        <FlatList data={data} renderItem={({ item }) => 

            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>

                    <View style={{
                        backgroundColor: '#04459b', width: '80%', height: 50, marginLeft: '10%', padding: 10,
                        display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 'auto'
                    }}>

                        <Text style={{ color: 'white', fontWeight: 'bold' }}>greg</Text>
            
                    </View>
            </View>

        }/>

        </View>



    )
}