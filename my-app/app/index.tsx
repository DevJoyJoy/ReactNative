import { StyleSheet, View, Text } from "react-native";



export default function HomeScreen() {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.square}></View>
      <Text style={styles.colorBlue}>Hello World!!</Text>
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
  }
})