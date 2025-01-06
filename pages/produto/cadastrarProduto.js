import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, Image, Platform } from 'react-native';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/connectionFirebase';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';

const AddProduto = ({ navigation, route }) => {
  const { tipoProduto } = route.params; // Receber o tipo de produto da navegação
  const [nomeProduto, setNomeProduto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState(null); // Armazenar URI da imagem
  const [imageBlob, setImageBlob] = useState(null); // Armazenar blob da imagem

  const handleSave = async () => {
    if (!nomeProduto) {
      Alert.alert("Erro", "O campo Nome do Produto está em branco.");
      return;
    }
    if (!descricao) {
      Alert.alert("Erro", "O campo Descrição está em branco.");
      return;
    }
    if (!preco) {
      Alert.alert("Erro", "O campo Preço está em branco.");
      return;
    }
    if (!imagem) {
      Alert.alert("Erro", "O campo da Imagem está em branco.");
      return;
    }

    try {
      const imageUrl = await uploadImage(imageBlob);

      const produtoCollection = collection(db, tipoProduto); // Usar o tipo de produto recebido
      await addDoc(produtoCollection, {
        nomeProduto,
        descricao,
        preco: parseFloat(preco), // Garantir que o preço seja um número
        imagem: imageUrl, // Armazenar URL da imagem no Firestore
      });

      Alert.alert("Sucesso", "Produto adicionado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao adicionar o Produto.");
    }
  };

  const uploadImage = async (blob) => {
    const filename = `${new Date().toISOString()}.jpg`; // Nome único para a imagem
    const storageRef = ref(storage, `produtosImagens/${filename}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const pickImage = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'O aplicativo precisa de acesso à galeria para selecionar imagens.');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const response = await fetch(uri);
      const blob = await response.blob();
      setImagem(uri); // Armazenar URI da imagem
      setImageBlob(blob); // Armazenar blob da imagem
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ position: 'relative' }}>
            <Image source={imagem ? { uri: imagem } : require('../../assets/image_icon.png')} style={{ width: 200, height: 200, marginBottom: 20, backgroundColor: 'white', borderRadius: 15 }} />
            <TouchableOpacity style={styles.btnAdd} onPress={pickImage}>
              <Icon name="create" size={25} color="#ffffff" />
            </TouchableOpacity>
            {imagem && <TouchableOpacity style={styles.btnRemove} onPress={() => { setImagem(null); setImageBlob(null); }}>
              <Icon name="clear" size={25} color="#ffffff" />
            </TouchableOpacity>}
          </View>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          placeholderTextColor="#888"
          value={nomeProduto}
          onChangeText={setNomeProduto}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          placeholderTextColor="#888"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          placeholderTextColor="#888"
          value={preco}
          keyboardType="numeric"
          onChangeText={setPreco}
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Fundo branco acinzentado
  },
  input: {
    height: 50,
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white', // Fundo branco nos inputs
    color: '#333', // Texto preto nos inputs
    fontFamily: 'Roboto',
    fontSize: 16,
    shadowColor: '#000',
    borderColor: 'blue', // Borda azul
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 6,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff8c00', // Botão laranja
    paddingVertical: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnAdd: {
    position: 'absolute',
    right: -20,
    top: 0,
    borderRadius: 10,
    backgroundColor: '#B5B5B5',
    padding: 5,
  },
  btnRemove: {
    position: 'absolute',
    right: -30,
    top: 0,
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 5,
  },
});

export default AddProduto;
