import { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import Storage from "../componentes/Storage"
import { useRouter } from "expo-router";



export default function index() {

  let [usuario, setUsuario] = useState('')
  let [senha, setSenha] = useState('')

  let router = useRouter()

  async function Entrar() {

    try {
      if (usuario != "") {
        if (senha != "") {
          const request = await fetch("http://192.168.1.8:3000/api/loginadm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              Usuario: usuario,
              Senha: senha
            })
          })

          const res = await request.json()

          console.log("Resposta esperada: " + res.verificar)

          setSenha("")
          setUsuario("")

          if(res.verificar) {
            Storage.set(res.token)
            let a = await Storage.get()
            router.replace("./(tab)/Gerenciador")
          }
        }
        else {
          return console.log({ Erro: "Preencha todos os campos!" })
        }
      }
      else {
        return console.log({ Erro: "Preencha todos os campos!" })
      }
    }
    catch (erro) {
      console.log(erro)
    }
  }

  return (
    <View style={styled.Main}>

      <View style={styled.Conteiner}>

        <Text style={styled.Titulo}>Login</Text>

        <Text style={styled.texto}>Usuario:</Text>
        <TextInput
          onChangeText={(txt) => setUsuario(txt)}
          value={usuario}
          placeholder="Nome do usuario" style={styled.input}></TextInput>

        <Text style={styled.texto}>Senha:</Text>
        <TextInput
          onChangeText={(txt) => setSenha(txt)}
          value={senha}
          placeholder="Senha" secureTextEntry={true} style={styled.input}></TextInput>

        <View style={styled.BtnEntrar}>
          <Button
          /*() => {router.replace("./(tab)/Gerenciador")}*/
            onPress={() => {router.replace("./(tab)/Gerenciador")}}
            title="Entrar"
            color={"#1dc71d"}
          />
        </View>

      </View>

    </View>
  )
}

const styled = StyleSheet.create({
  Main: {
    backgroundColor: "#363636",
    height: "100%",

    alignItems: "center",
    justifyContent: "center"
  },

  Conteiner: {
    width: "90%",
    height: "70%",

    display: "flex",

    backgroundColor: "#ffffff",
    borderRadius: 10,

    justifyContent: "center"
  },

  texto: {
    marginLeft: 20,
    marginBottom: 5
  },

  input: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,

    width: "80%",
    alignSelf: "center",

    marginBottom: 20
  },

  Titulo: {
    fontWeight: "500",

    alignSelf: "center"
  },

  BtnEntrar: {
    width: "50%",
    alignSelf: "center"
  }
})