import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";

const AddAddress = ({ navigation }) => {
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const handleSave = async () => {
    if (!rua) {
      Alert.alert("Erro", "O campo Rua está em branco.");
      return;
    }
    if (!numero) {
      Alert.alert("Erro", "O campo Número está em branco.");
      return;
    }
    if (!bairro) {
      Alert.alert("Erro", "O campo Bairro está em branco.");
      return;
    }
    if (!cep) {
      Alert.alert("Erro", "O campo CEP está em branco.");
      return;
    }
    if (!cidade) {
      Alert.alert("Erro", "O campo Cidade está em branco.");
      return;
    }
    if (!uf) {
      Alert.alert("Erro", "O campo UF está em branco.");
      return;
    }

    try {
      const addressCollection = collection(db, "endereco");
      await addDoc(addressCollection, {
        rua,
        bairro,
        numero,
        cep,
        cidade,
        uf,
      });

      Alert.alert("Sucesso", "Endereço adicionado com sucesso!");
      navigation.goBack(); // Navega de volta à tela anterior
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao adicionar o endereço.");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Rua"
          placeholderTextColor="#888"
          value={rua}
          onChangeText={setRua}
        />
        <TextInput
          style={styles.input}
          placeholder="Número"
          placeholderTextColor="#888"
          value={numero}
          onChangeText={setNumero}
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          placeholderTextColor="#888"
          value={bairro}
          onChangeText={setBairro}
        />
        <TextInput
          style={styles.input}
          placeholder="CEP"
          placeholderTextColor="#888"
          value={cep}
          onChangeText={setCep}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#888"
          value={cidade}
          onChangeText={setCidade}
        />
        <TextInput
          style={styles.input}
          placeholder="UF"
          placeholderTextColor="#888"
          value={uf}
          onChangeText={setUf}
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
});

export default AddAddress;
