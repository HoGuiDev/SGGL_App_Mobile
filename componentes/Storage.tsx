import AsyncStorage from "@react-native-async-storage/async-storage";

async function set(token: string) {
    try {
        await AsyncStorage.setItem("token", token)
    }
    catch(erro) {
        console.log(erro)
    }
}

async function get() {
    try {
        const token = await AsyncStorage.getItem("token")
        return token
    }
    catch(erro) {
        console.log(erro)
    }
}

async function delet() {
    try {
        await AsyncStorage.removeItem("token")
    }
    catch(erro) {
        console.log(erro)
    }
}

export default {set, get, delet}