import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, Image, Platform } from 'react-native';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/connectionFirebase';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from "react-native-picker-select";  // Importação do RNPickerSelect

const AddCliente = ({ navigation }) => {
  const [nomeCliente, setNomeCliente] = useState('');
  const [cpfcnpj, setCpfCnpj] = useState('');
  const [rgie, setRgIe] = useState('');
  const [login, setLogin] = useState('');
  const [tipoCliente, setTipoCliente] = useState('');
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  const handleSave = async () => {
    if (!nomeCliente || !cpfcnpj || !rgie || !login || !tipoCliente || !image) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const imageUrl = await uploadImage(imageBlob);
      const clienteCollection = collection(db, "cliente");
      await addDoc(clienteCollection, {
        nomeCliente,
        cpfcnpj,
        rgie,
        login,
        tipoCliente,
        image: imageUrl,
      });
      Alert.alert("Sucesso", "Cliente adicionado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao adicionar o Cliente.");
    }
  };

  const uploadImage = async (blob) => {
    const filename = `${new Date().toISOString()}.jpg`;
    const storageRef = ref(storage, `clientesImagens/${filename}`);
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
      setImage(uri);
      setImageBlob(blob);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ position: 'relative' }}>
            <Image source={image ? { uri: image } : require('../../assets/image_icon.png')} style={styles.image} />
            <TouchableOpacity style={styles.btnAdd} onPress={pickImage}>
              <Icon name="create" size={25} color="#ffffff" />
            </TouchableOpacity>
            {image && <TouchableOpacity style={styles.btnRemove} onPress={() => { setImage(null); setImageBlob(null); }}>
              <Icon name="clear" size={25} color="#ffffff" />
            </TouchableOpacity>}
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
          placeholderTextColor="#888"
          value={nomeCliente}
          onChangeText={setNomeCliente}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF/CNPJ"
          placeholderTextColor="#888"
          value={cpfcnpj}
          onChangeText={setCpfCnpj}
        />
        <TextInput
          style={styles.input}
          placeholder="RG/IE"
          placeholderTextColor="#888"
          value={rgie}
          onChangeText={setRgIe}
        />
        <TextInput
          style={styles.input}
          placeholder="Login"
          placeholderTextColor="#888"
          value={login}
          onChangeText={setLogin}
        />
        {/* Componente de seleção de Tipo de Cliente usando RNPickerSelect */}
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={setTipoCliente}
            placeholder={{ label: "Selecione o Tipo de Cliente", value: null }}
            items={[
              { label: "Pessoa Física", value: "Pessoa Física" },
              { label: "Pessoa Jurídica", value: "Pessoa Jurídica" },
            ]}
            style={pickerSelectStyles}
            value={tipoCliente}
          />
        </View>
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
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50,
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    color: '#333',
    fontFamily: 'Roboto',
    fontSize: 16,
    shadowColor: '#000',
    borderColor: 'blue',
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
    backgroundColor: '#ff8c00',
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
  image: { width: 200, height: 200, marginBottom: 20, backgroundColor: 'white', borderRadius: 15 },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "blue", // Define a mesma cor de borda para ambos
    borderRadius: 4,
    color: "#333",
    marginTop: 10,
    backgroundColor: 'white',
    fontFamily: 'Roboto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "blue", // Define a mesma cor de borda para ambos
    borderRadius: 4,
    color: "#333",
    marginTop: 10,
    backgroundColor: 'white',
    fontFamily: 'Roboto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 6,
  },
});


export default AddCliente;
