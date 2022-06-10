import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Importando as telas
import Home from "./Home/index";
import Ajustes from "./Ajustes/index";
import Calendario from "./Calendario/index";
import Historico from './Historico/index';

//Importando os icones
import { Entypo } from '@expo/vector-icons';

export default function RotasTelas() {

    //instanciando o Tab
    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator initialRouteName='inicio'

            screenOptions={{
                tabBarStyle: { borderColor: 'black', borderTopWidth: 3, padding: 2 },
                tabBarLabelStyle: { fontSize: 12, color: '#04459b', fontWeight: 'bold' },
                tabBarActiveTintColor: "#04459b",
                tabBarInactiveTintColor: "grey",
            }}>

            <Tab.Screen name="historico" component={Historico} options={{
                headerShown: false, title: 'Historico',

                tabBarIcon: ({ color, size }) => (<Entypo name="text-document" size={size} color={color} />)
            }}
            />

            <Tab.Screen name="inicio" component={Home} options={{
                headerShown: false, title: 'Inicio',

                tabBarIcon: ({ color, size }) => (<Entypo name="home" size={size} color={color} />)
            }}
            />

            <Tab.Screen name="calendario" component={Calendario} options={{
                headerShown: false, title: 'Calendario',

                tabBarIcon: ({ color, size }) => (<Entypo name="calendar" size={size} color={color} />)

            }} />

            <Tab.Screen name="ajustes" component={Ajustes} options={{
                headerShown: false, title: 'Ajustes',

                tabBarIcon: ({ color, size }) => (<Entypo name="tools" size={size} color={color} />)
            }} />

        </Tab.Navigator>

    )
} 