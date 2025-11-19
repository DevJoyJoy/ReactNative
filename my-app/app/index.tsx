import { router } from "expo-router";
import React from "react";
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { StyleSheet, View, Text, TextInput,TouchableOpacity, Button, Image } from "react-native";
import Swal from 'sweetalert2';
import { app } from '../firebaseConfig';

export default function CreateUser() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [text, setText] = useState("")
  
  const minPassword = 6
  const auth = getAuth(app)


  const signUp = async () => {
    if(password.length >= minPassword) {
      if (password == confirmPassword) {
        try {
          await createUserWithEmailAndPassword(auth, email, password)
          Swal.fire({
            icon: "success",
            title: "Sucesso",
            text: "Usuário registrado com sucesso!"
          });
          return router.navigate('/login')
        } catch(e){
          return Swal.fire({
            icon: "error",
            title: "Erro",
            text: "As senhas não coincidem!",
        });        
      }
      } else {
        return Swal.fire({
          icon: "error",
          title: "Erro",
          text: "As senhas não coincidem!",
        });
      }
    }
  }

  useEffect(() => {
    console.log(email, password, confirmPassword)
  }, [email, password, confirmPassword])

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'thistle'}}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Nome de usuário" onChangeText={(e) => setText(e)} style={styles.box}/>
      <TextInput placeholder="E-mail" onChangeText={(e) => setEmail(e)} style={styles.box}/>
      <TextInput placeholder="Crie sua senha" onChangeText={(e) => setPassword(e)} style={styles.box}/>
      <TextInput placeholder="Repita sua senha" onChangeText={(e) => setConfirmPassword(e)} style={styles.box}/>
      <TouchableOpacity onPress={signUp} style={styles.button}>
        <View>
        Criar
        </View>
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