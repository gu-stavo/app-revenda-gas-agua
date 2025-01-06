import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, ScrollView, Image, Platform } from 'react-native';
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/connectionFirebase';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditFornecedor = ({ route, navigation }) => {
  const { fornecedor } = route.params;

  const [nomeFornecedor, setNomeFornecedor] = useState(fornecedor.nomeFornecedor);
  const [cnpj, setCnpj] = useState(fornecedor.cnpj);
  const [rua, setRua] = useState(fornecedor.rua);
  const [numero, setNumero] = useState(fornecedor.numero);
  const [bairro, setBairro] = useState(fornecedor.bairro);
  const [cep, setCep] = useState(fornecedor.cep);
  const [cidade, setCidade] = useState(fornecedor.cidade);
  const [uf, setUf] = useState(fornecedor.uf);
  const [telefone, setTelefone] = useState(fornecedor.telefone);
  const [contrato, setContrato] = useState(fornecedor.contrato);
  const [imagem, setImagem] = useState(fornecedor.imagem); // URI da imagem
  const [imageBlob, setImageBlob] = useState(null); // Blob da imagem para upload

  const handleSave = async () => {
    if (!nomeFornecedor || !cnpj || !rua || !numero || !bairro || !cep || !cidade || !uf) {
      Alert.alert("Erro", "Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    try {
      let imageUrl = imagem;
      if (imageBlob) {
        imageUrl = await uploadImage(imageBlob);
      }

      const fornecedorRef = doc(db, "fornecedor", fornecedor.id);
      await updateDoc(fornecedorRef, {
        nomeFornecedor,
        cnpj,
        rua,
        numero,
        bairro,
        cep,
        cidade,
        uf,
        telefone,
        contrato,
        imagem: imageUrl,
      });

      Alert.alert("Sucesso", "Fornecedor atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao atualizar o fornecedor.");
    }
  };

  const uploadImage = async (blob) => {
    const filename = `${new Date().toISOString()}.jpg`;
    const storageRef = ref(storage, `fornecedoresImagens/${filename}`);
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const response = await fetch(uri);
      const blob = await response.blob();
      setImagem(uri);
      setImageBlob(blob);
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
        <TextInput style={styles.input} placeholder="Nome do Fornecedor" placeholderTextColor="#888" value={nomeFornecedor} onChangeText={setNomeFornecedor} />
        <TextInput style={styles.input} placeholder="CNPJ" placeholderTextColor="#888" value={cnpj} onChangeText={setCnpj} />
        <TextInput style={styles.input} placeholder="Rua" placeholderTextColor="#888" value={rua} onChangeText={setRua} />
        <TextInput style={styles.input} placeholder="Número" placeholderTextColor="#888" value={numero} onChangeText={setNumero} />
        <TextInput style={styles.input} placeholder="Bairro" placeholderTextColor="#888" value={bairro} onChangeText={setBairro} />
        <TextInput style={styles.input} placeholder="CEP" placeholderTextColor="#888" value={cep} onChangeText={setCep} />
        <TextInput style={styles.input} placeholder="Cidade" placeholderTextColor="#888" value={cidade} onChangeText={setCidade} />
        <TextInput style={styles.input} placeholder="UF" placeholderTextColor="#888" value={uf} onChangeText={setUf} />
        <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor="#888" value={telefone} onChangeText={setTelefone} />
        <TextInput style={styles.input} placeholder="Inserir Documento" placeholderTextColor="#888" value={contrato} onChangeText={setContrato} />
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 3 },
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

export default EditFornecedor;
