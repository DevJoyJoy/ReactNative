import { Image } from 'expo-image';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";
import {router} from 'expo-router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebaseConfig'
import Swal from 'sweetalert2'

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
          return router.navigate('/')
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

  const login = async () => {
    return router.navigate('/');
  }

  useEffect(() => {
    console.log(email, password, confirmPassword)
  }, [email, password, confirmPassword])

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'thistle'}}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Nome de usuário" onChangeText={(e) => setText(e)} style={styles.box}/>
      <TextInput placeholder="E-mail" onChangeText={(e) => setEmail(e)} style={styles.box}/>
      <TextInput placeholder="Crie sua senha" onChangeText={(e) => setPassword(e)} style={styles.box}/>
      <TextInput placeholder="Repita sua senha" onChangeText={(e) => setConfirmPassword(e)} style={styles.box}/>
      <TouchableOpacity onPress={signUp} style={styles.button}>
        <View>
        Create
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={login}>
        <View>
        Already have an account? Sign in!
        </View>
      </TouchableOpacity>
      <Image style={styles.image} source={require('../assets/images/something.png')}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  image: {
    height: 310,
    width: 300,
  },
  title: {
    fontSize: 40,
    color: 'rebeccapurple'
  },
  box: {
    backgroundColor: "lavender",
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
});
