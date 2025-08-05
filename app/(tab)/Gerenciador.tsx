import { useState, useEffect } from "react"
import { View, Text, FlatList, TextInput, Switch, Button, TouchableHighlight, Modal } from "react-native"
import { StyleSheet } from "react-native"
import Storage from "../../componentes/Storage"

export default function Gerenciador() {

  const [Disponivel, setDisponivel] = useState(false)
  const [Sabor, setSabor] = useState("")
  const [Valor, setValor] = useState("")
  const [Quantidade, setQuantidade] = useState("")

  const [Editar, setEditar] = useState([])
  const [ModalVisivel, setModalVisivel] = useState(false)

  const [DB, setDB] = useState()

  useEffect(() => {
    const getDados = async () => {
      try {
        const token = await Storage.get()
        fetch("http://192.168.1.8:3000/api/get_gerenciador", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => res.json()).then((res) => (setDB(res)))

      }
      catch (err) {
        console.warn(err)
      }
    }


    getDados()
    console.log(DB)
  }, [])

  function PegarDados() {
    const getDados = async () => {
      try {
        const token = await Storage.get()
        fetch("http://192.168.1.8:3000/api/get_gerenciador", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => res.json()).then((res) => (setDB(res)))

      }
      catch (err) {
        console.warn(err)
      }
    }

    getDados()
  }

  async function AdicionarItem() {
    const token = await Storage.get()
    if (Sabor != "") {
      if (Valor != "") {
        if (Quantidade != "") {
          const request = await fetch("http://192.168.1.8:3000/api/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              sabor: Sabor,
              quantidade: Quantidade,
              valor: Valor,
              disponivel: Disponivel == true ? "1" : "0"
            })
          })
        }
        else {
          console.log("Preencha todos os campos!")
        }
      }
      else {
        console.log("Preencha todos os campos!")
      }
    }
    else {
      console.log("Preencha todos os campos!")
    }

    setValor("")
    setSabor("")
    setDisponivel(false)
    setQuantidade("")

    PegarDados()
  }

  if (true) {
    return (

      <View style={style.Main}>
        <Modal
          animationType="slide"
          backdropColor="#161616b3"
          visible={ModalVisivel}
          onRequestClose={() => { setModalVisivel(!ModalVisivel) }}
        >
          <View
            style={{
              paddingTop: 50,
              paddingHorizontal: 30,
              backgroundColor: "#a0a0a0",
              top: 25,
              height: "100%",
              borderRadius: 10
            }}
          >

            <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              position: "absolute",
              alignSelf: "center"

            }}
            >Edição</Text>

            <View
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 40,
                height: 50,
                zIndex: 10,
              }}
            >
              <Button
                title="X"
                color="red"
                onPress={() => { setModalVisivel(!ModalVisivel) }}
              />
            </View>

            <View>
              <View>
                <Text>Nome do produto:</Text>
                <TextInput
                  value={Sabor}
                  onChangeText={(txt) => setSabor(txt)}
                  style={style.inputPadrao}
                  placeholder="Ex: Caju"></TextInput>
              </View>

              <View>
                <Text>Preço:</Text>
                <TextInput
                  keyboardType="numeric"
                  value={Valor}
                  onChangeText={(txt) => setValor(txt)}
                  style={style.inputPadrao}
                  placeholder="Ex: 3"></TextInput>
              </View>

              <View>
                <Text>Quantidade:</Text>
                <TextInput
                  keyboardType="numeric"
                  value={Quantidade}
                  onChangeText={(txt) => setQuantidade(txt)}
                  style={style.inputPadrao}
                  placeholder="Ex: 13"></TextInput>
              </View>

              <View>
                <Text>Disponivel:</Text>
                <Switch
                  style={{ alignSelf: "flex-start" }}
                  thumbColor={Disponivel ? "#60fd30" : "#d1d1d1"}
                  trackColor={{ true: "#d4fff8", false: "#ffffff" }}
                  onValueChange={() => { setDisponivel(!Disponivel) }}
                  value={Disponivel}
                />
              </View>

              <View>
                <Button
                title="Salvar"
                onPress={() => {}}
                />
              </View>
            </View>

          </View>

        </Modal>

        <View style={style.conteiner}>

          <Text style={style.h3}>Cadastro:</Text>

          {/* Formulario de cadastro de produtos */}
          <View style={style.cadastro}>

            <View>
              <Text>Nome do produto:</Text>
              <TextInput
                value={Sabor}
                onChangeText={(txt) => setSabor(txt)}
                style={style.inputPadrao}
                placeholder="Ex: Caju"></TextInput>
            </View>

            <View>
              <Text>Preço:</Text>
              <TextInput
                keyboardType="numeric"
                value={Valor}
                onChangeText={(txt) => setValor(txt)}
                style={style.inputPadrao}
                placeholder="Ex: 3"></TextInput>
            </View>

            <View>
              <Text>Quantidade:</Text>
              <TextInput
                keyboardType="numeric"
                value={Quantidade}
                onChangeText={(txt) => setQuantidade(txt)}
                style={style.inputPadrao}
                placeholder="Ex: 13"></TextInput>
            </View>

            <View>
              <Text>Disponivel:</Text>
              <Switch
                style={{ alignSelf: "flex-start" }}
                thumbColor={Disponivel ? "#60fd30" : "#d1d1d1"}
                trackColor={{ true: "#d4fff8", false: "#ffffff" }}
                onValueChange={() => { setDisponivel(!Disponivel) }}
                value={Disponivel}
              />
            </View>
            {/* Botão para salvar novos produtos */}
            <View style={{ alignSelf: "center", width: "70%" }}>
              <Button
                onPress={AdicionarItem}
                title="Salvar" />
            </View>

          </View>

          {/* Lista de produtos cadastrado */}
          <View
            style={{ height: "41%" }}
          >
            <FlatList
              scrollEnabled
              style={{ top: 10 }}
              data={DB}
              renderItem={({ item }) =>
                <View style={{
                  borderWidth: 2,
                  borderColor: "#000",
                  borderRadius: 3,
                  padding: 20,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 2,
                }}>

                  <Text style={{ flex: 1, flexBasis: "33%" }}>{item.sabor}</Text>
                  <Text style={{ flex: 1, flexBasis: "33%" }}>R$: {item.preço}</Text>
                  <Text style={{ flex: 1, flexBasis: "33%" }}>Quantidade: {item.quantidade}</Text>
                  <Text style={{ flex: 1, flexBasis: "50%" }}>Disponivel: {item.disponivel ? "✔️" : "❌"}</Text>
                  <TouchableHighlight
                    style={{
                      backgroundColor: "#16e00f",
                      width: 25,
                      height: 25,
                      alignItems: "center",
                      justifyContent: "center",
                      flexBasis: "10%",
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      var db = []
                      db.push(item)
                      setEditar(Editar + item)
                      setModalVisivel(!ModalVisivel)
                    }}
                  >
                    <Text>✏️</Text>
                  </TouchableHighlight>
                </View>}
              keyExtractor={item => item.ID.toString()}
            />
          </View>


        </View>

      </View>
    )
  }
  else {
    return (
      <View>
        <Text>Acesso Negado!</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  Main: {
    backgroundColor: "#6e6e6e",

    alignItems: "center",

    height: "100%",
  },

  conteiner: {
    backgroundColor: "#d3d3d3",

    borderRadius: 10,

    padding: 5,

    height: "94%",
    width: "98%",

    top: 40,

    display: "flex",
  },

  h3: {
    fontSize: 20,
    fontWeight: "500",

    alignSelf: "center"
  },

  cadastro: {
    gap: 15,
  },

  inputPadrao: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  }
})