import { useState } from "react";
import { StyleSheet, View, Text, TextInput,TouchableOpacity, Button, Image } from "react-native";



export default function App() {
  const [text, setText] = useState()

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'thistle'}}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="E-mail" onChangeText={(e) => setText(text)} style={styles.box}/>
      <TextInput placeholder="Senha" onChangeText={(e) => setText(text)} style={styles.box}/>
      <Button title="Entrar" onPress={() => console.log("ola")} style={styles.button}></Button>
      {/* <Image style={styles.image} source={require('../assets/images/tokomaru.png')}></Image> */}
    </View>
  );
}

const styles = StyleSheet.create({
  colorBlue: {
    color: "Blue", 
    fontSize: 12,
  },
  square: {
    backgroundColor: "rebeccapurple",
    width: 300,
    height: 300
  },
  image: {
    height: 300,
    width: 300,
  },
  title: {
    fontSize: 40,
    color: 'rebeccapurple'
  },
  box: {
    backgroundColor: "silver",
    width: 270,
    height: 35,
    margin: 10,
    borderRadius: 10,
    padding: 8
  },
  button: {
    backgroundColor: 
  }
})