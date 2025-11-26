import { Image } from 'expo-image';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { useState, useEffect } from "react";
import {router} from 'expo-router';
import { collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { app } from '../firebaseConfig'
import { db } from '../firebaseConfig'

export default function HomeScreen() {

  const [sanrio, setSanrio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchSanrio() {
    try {
      const q = query(collection(db, "userSanrio"));
      const snapshot = await getDocs(q);

      console.log(snapshot.docs)

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSanrio(list);
      console.log(list);

    } catch (err) {
      console.log("Error on finding Sanrio:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateSanrio(id: string, data: any) {
    try {
      const ref = doc(db, "sanrio", id);
      await updateDoc(ref, data);

      alert("Sanrio updated!");
      fetchSanrio();

    } catch (err) {
      console.log("Error on updating:", err);
    }
  }

  async function deleteSanrio(id: string) {
    try {
      const ref = doc(db, "vehicles", id);
      await deleteDoc(ref);

      alert("Sanrio deleted!");
      fetchSanrio();

    } catch (err) {
      console.log("Error on deleting:", err);
    }
  }

  useEffect(() => {
    fetchSanrio();
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (sanrio.length === 0) {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'thistle'}}>
        <Image style={styles.image} source={require('../assets/images/something.png')}></Image>
      <Text style={styles.title}>No Sanrio Friend found...</Text>
    </View>
    );
  }
    

  
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'thistle'}}>
        <Image style={styles.image} source={require('../assets/images/something.png')}></Image>
      <Text style={styles.title}>Friends</Text>
      <FlatList
        data={sanrio}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.box}>

            {/* Caixinha */}
            <View style={styles.littleBox}>

              <View style={styles.textBox}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.name}</Text>
                <Text style={{ opacity: 0.7 }}>Friend: {item.friend}</Text>
                <Text style={{ opacity: 0.7 }}>Color: {item.color}</Text>
              </View>

              <Image style={styles.userImg} source={item.imageUrl}></Image>

            </View>

            {/* Botões */}
            <View style={{ flexDirection: "row", marginTop: 12, gap: 12 }}>

              <TouchableOpacity style={styles.button} onPress={() => updateSanrio(item.id, { brand: "Atualizado" })}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => deleteSanrio(item.id)}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>Excluir</Text>
              </TouchableOpacity>

            </View>
          
          </View>
        )}
      />
      </View>
  );
}


const styles = StyleSheet.create({
  userImg: {
    height: 70,
    width: 70
  },
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
    height: 215,
    width: 200,
  },
  title: {
    fontSize: 40,
    color: 'rebeccapurple'
  },
  box: {
    backgroundColor: "lavender",
    width: 270,
    height: 130,
    margin: 10,
    borderRadius: 10,
    display: 'flex',
    padding: 8
  },
  button: {
    backgroundColor: "rebeccapurple",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  littleBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  textBox:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'    
  }
});
