import { Image } from 'expo-image';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from "react";
import {router} from 'expo-router';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { app } from '../firebaseConfig'
import { db } from '../firebaseConfig'

export default function HomeScreen() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [friend, setFriend] = useState("")
  const [color, setColor] = useState("")
  const [img, setImg] = useState("")
  
  // const auth = getAuth(app)
  // const user = auth.currentUser;
    async function fetchUsers() {
        try{
            // if (!user) {
            // console.log("User not signed-in!");
            // return;
            // }
        
            if (!name || !age || !friend || !color){
            console.log("Missing any info!");
            return;
            } 
        
            const userSanrio = {
            name,
            age,
            friend,
            color,
            // userId: user.uid,
            imageUrl: img,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
            };
        
            await addDoc(collection(db, 'userSanrio'), userSanrio);
            console.log("You made it!")
            return router.navigate('/');
        } catch (err) {
          console.log("Erro ao cadastrar:", err);
        }
    }

  
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'thistle'}}>
        <Image style={styles.image} source={require('../assets/images/something.png')}></Image>
      <Text style={styles.title}>Create your profile</Text>
      <TextInput placeholder="Name" onChangeText={(name) => setName(name)} style={styles.box}/>
      <TextInput placeholder="Age" onChangeText={(age) => setAge(age)} style={styles.box}/>
      <TextInput placeholder="Your sanrio friend" onChangeText={(friend) => setFriend(friend)} style={styles.box}/>
      <TextInput placeholder="Your favorite color" onChangeText={(color) => setColor(color)} style={styles.box}/>
      <TextInput placeholder="A link to a picture of you" onChangeText={(img) => setImg(img)} style={styles.box}/>
      <TouchableOpacity onPress={fetchUsers} style={styles.button}>
        <View>
          Create user
        </View>
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
