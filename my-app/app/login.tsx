import { Link } from "expo-router";
import React from "react";
import {router} from 'expo-router';
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { StyleSheet, View, Text, TextInput,TouchableOpacity, Button, Image } from "react-native";
import { app } from '../firebaseConfig'


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [text, setText] = useState()

  const auth = getAuth(app)

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
    router.navigate('/home')
    
  }

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'thistle'}}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="E-mail" onChangeText={(e) => setText(text)} style={styles.box}/>
      <TextInput placeholder="Senha" onChangeText={(e) => setText(text)} style={styles.box}/>
      <TouchableOpacity onPress={signIn} style={styles.button}>
        <View>
        Entrar
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        Criar conta 
      </TouchableOpacity>
      <TouchableOpacity>
        Esqueci minha senha 
      </TouchableOpacity>
      <Image style={styles.image} source={require('../assets/images/tokomaru-new.png')}></Image>
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
    backgroundColor: 'rebeccapurple',
    margin: 10,
    padding: 8,
    borderRadius: 10
  }
})