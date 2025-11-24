import { Image } from 'expo-image';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { app } from '../firebaseConfig'
import { db } from '../firebaseConfig'

export default function HomeScreen() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [friend, setFriend] = useState("")
  const [color, setColor] = useState("")
  const [img, setImg] = useState("")
  
  const auth = getAuth(app)
  const user = auth.currentUser;
    async function name(params:type) {
        try{
            if (!user) {
            console.log("User not signed-in!");
            return;
            }
        
            if (!name || !age || !friend || !color){
            console.log("Missing any info!");
            return;
            } 
        
            const userSanrio = {
            name,
            age,
            friend,
            color,
            userId: user.uid,
            imageUrl,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
            };
        
            await addDoc(collection(db, 'userSanrio', userSanrio));
            console.log("You made it!")
        } catch (){
            
        }
    }

  
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'thistle'}}>
        <Image style={styles.image} source={require('../assets/images/something.png')}></Image>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Name" onChangeText={(e) => setName(name)} style={styles.box}/>
      <TextInput placeholder="Age" onChangeText={(e) => setAge(age)} style={styles.box}/>
      <TextInput placeholder="Your sanrio friend" onChangeText={(e) => setFriend(friend)} style={styles.box}/>
      <TextInput placeholder="Your favorite color" onChangeText={(e) => setColor(color)} style={styles.box}/>
      <TextInput placeholder="A picture of you" onChangeText={(e) => setImg(img)} style={styles.box}/>
      <TouchableOpacity onPress={signIn} style={styles.button}>
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
