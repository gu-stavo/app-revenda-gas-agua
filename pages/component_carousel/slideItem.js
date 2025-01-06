import React from 'react';
import { View, Animated, Easing, StyleSheet, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native'

const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item }) => {
  if (!item) {
    return null;
  }

  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1500,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  const navigation = useNavigation();

  const handlePress = () => {
    if (item.id === 3) {
      console.log('Item 3 foi clicado!');
      navigation.navigate('Welcome');
    }
  };


  return (
    <View style={styles.container}>
      <Animated.Image
        source={item.img}
        resizeMode="contain"
        style={[styles.image, { transform: [{ translateY: translateYImage }] }]}
      />
      {item.id === 3 && (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    position: 'relative', // Adiciona um contexto de posicionamento para o botão absoluto
  },
  image: {
    width: '100%',
    height: '100%',
    marginBottom: 90, // Ajustado para dar espaço para o botão, se necessário
  },
  button: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '80%',
    borderRadius: 10,
    position: 'absolute', // Permite que o botão seja posicionado sobre a imagem
    bottom: 20, // Ajuste a distância do botão do fundo do container
    marginBottom: 105,
    borderColor: 'white',
    borderWidth: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
