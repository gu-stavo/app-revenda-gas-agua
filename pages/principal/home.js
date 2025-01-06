import * as React from 'react';
import { StyleSheet, View, Text} from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});