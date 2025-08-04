import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from "@expo/vector-icons";


export default function Layout() {
    return (
        <Tabs screenOptions={{headerShown: false}}>

            <Tabs.Screen 
            name="Gerenciador"
            options={{title: "Gerenciador", tabBarIcon({focused}) {
                if(focused){
                    return <MaterialIcons name="manage-search" size={24} color="blue" />
                }
                return <MaterialIcons name="manage-search" size={24} color="black" />
            },}}
            />

            <Tabs.Screen
            name="Analitcks"
            options={{title: "Analitcks", tabBarIcon({focused}) {
                if(focused){
                    return <AntDesign name="piechart" size={24} color="blue" />
                }
                return <AntDesign name="piechart" size={24} color="black" />
            },}}
            />
        </Tabs>
    )
}