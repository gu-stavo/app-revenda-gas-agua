import * as React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native'

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/login.jpg')} style={styles.imageBackground} />
      <LinearGradient
        colors={['transparent', '#ffffff', '#ffffff']}
        style={styles.background}
      />
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.imageLogo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('Entrar')}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}
          onPress={() => navigation.navigate('Cadastrar')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '30%',
    height: '55%',
  },
  imageBackground: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  containerLogo: {
    flex: 2,
    position: 'absolute',
    bottom: '0%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: '100%',
    height: '80%',
  },
  imageLogo: {
    width: 350,
    height: 350,
  },
  containerButton: {
    flex: 1,
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%'
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  }
});
