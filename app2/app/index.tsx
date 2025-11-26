import { Image } from 'expo-image';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from "react";
import {router} from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebaseConfig'

export default function HomeScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const auth = getAuth(app)

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
    router.navigate('/Home') 
  }

  const createAccount = async () => {
    router.navigate('/Sign')
  }

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'thistle'}}>
        <Image style={styles.image} source={require('../assets/images/something.png')}></Image>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="E-mail" onChangeText={(email) => setEmail(email)} style={styles.box}/>
      <TextInput placeholder="Password" onChangeText={(password) => setPassword(password)} style={styles.box}/>
      <TouchableOpacity onPress={signIn} style={styles.button}>
        <View>
        Sign in
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={createAccount}>
        Create an account 
      </TouchableOpacity>
      <TouchableOpacity>
        Forgot your password?
      </TouchableOpacity>
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
    height: 315,
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
