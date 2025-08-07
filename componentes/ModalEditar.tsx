import { useState } from "react"
import { Modal, View, Text, TextInput, Button, Switch } from "react-native"
import { StyleSheet } from "react-native"

interface Props {
  On: boolean
  Off: Function
  Dados: {
    ID: string
    sabor: string
    preço: string
    quantidade: number
    disponivel: boolean
  }
}

const ModalEditar = ({ On, Off, Dados}: Props) => {


  const [ID, setID] = useState("")
  const [Sabor, setSabor] = useState("")
  const [Valor, setValor] = useState("")
  const [Quantidade, setQuantidade] = useState("")
  const [Disponivel, setDisponivel] = useState(false)

  function Carregar() {
    setID(Dados.ID)
    setSabor(Dados.sabor)
    setValor(Dados.preço)
    let quantidade = Dados.quantidade.toString()
    setQuantidade(quantidade)
    setDisponivel(Dados.disponivel)
  }

  return (
    <Modal
      animationType="slide"
      backdropColor="#161616b3"
      visible={On}
      onRequestClose={() => {Off()}}
      onShow={() => {Carregar()}}
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

          }}>Edição</Text>

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
            onPress={() => {Off()}}
          />
        </View>

        <View>
          <View>
            <Text>Nome do produto:</Text>
            <TextInput
              value={Sabor}
              onChangeText={(txt) => {setSabor(txt)}}
              style={style.inputPadrao}
              placeholder="Ex: Caju"></TextInput>
          </View>

          <View>
            <Text>Preço:</Text>
            <TextInput
              keyboardType="numeric"
              value={Valor}
              onChangeText={(txt) => {setValor(txt)}}
              style={style.inputPadrao}
              placeholder="Ex: 3"></TextInput>
          </View>

          <View>
            <Text>Quantidade:</Text>
            <TextInput
              keyboardType="numeric"
              value={Quantidade}
              onChangeText={(txt) => {setQuantidade(txt)}}
              style={style.inputPadrao}
              placeholder="Ex: 13"></TextInput>
          </View>

          <View>
            <Text>Disponivel:</Text>
            <Switch
              style={{ alignSelf: "flex-start" }}
              thumbColor={Disponivel ? "#60fd30" : "#d1d1d1"}
              trackColor={{ true: "#d4fff8", false: "#ffffff" }}
              onValueChange={() => {setDisponivel(!Disponivel)}}
              value={Disponivel}
            />
          </View>

          <View>
            <Button
              title="Salvar"
              onPress={() => { }}
            />
          </View>
        </View>

      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  inputPadrao: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  }
})

export default ModalEditar