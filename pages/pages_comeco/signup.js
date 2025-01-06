import { StyleSheet, View, TouchableOpacity, Text, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../services/connectionFirebase';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Separator = () => <View style={styles.separator} />;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [nomeCliente, setNomeCliente] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!email || !password || !cpf) {
      Alert.alert('Erro', 'Email, senha e CPF não informados!');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Email inválido. Por favor, insira um email válido.');
      return;
    }

    if (!validateCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido. Por favor, insira um CPF válido.');
      return;
    }

    if (!nomeCliente) {
      Alert.alert("Erro", "O campo Nome está em branco.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuário cadastrado:', userCredential.user);

      const clienteCollection = collection(db, "cliente");
      await addDoc(clienteCollection, {
        nomeCliente,
        cpf,
        email,
        senha: password,
      });

      Alert.alert("Sucesso", "Cliente Cadastrado com sucesso!");
      navigation.navigate('HomeDrawer');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro ao Cadastrar', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            mode="outlined"
            placeholder="Digite o seu Nome"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
            outlineColor="#D3D3D3"
            activeOutlineColor="blue"
            value={nomeCliente}
            onChangeText={setNomeCliente}
          />
          <Separator />
          <Text style={styles.label}>CPF</Text>
          <TextInput
            mode="outlined"
            placeholder="Digite o seu CPF"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
            outlineColor="#D3D3D3"
            activeOutlineColor="blue"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
          />
          <Separator />
          <Text style={styles.label}>Email</Text>
          <TextInput
            mode="outlined"
            placeholder="Digite seu Email"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
            outlineColor="#D3D3D3"
            activeOutlineColor="blue"
            value={email}
            onChangeText={setEmail}
          />
          <Separator />
          <Text style={styles.label}>Senha</Text>
          <TextInput
            mode="outlined"
            placeholder="Digite sua Senha"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
            outlineColor="#D3D3D3"
            activeOutlineColor="blue"
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            value={password}
            onChangeText={setPassword}
          />
          <Separator />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.loginText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerContainer} onPress={() => navigation.navigate('Entrar')}>
            <Text style={styles.cadastrar}>Já possui uma conta? </Text>
            <Text style={styles.cadastrarBotao}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '80%',
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 8,
  },
  separator: {
    height: 10,
  },
  button: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cadastrar: {
    color: 'black',
    fontSize: 16,
    marginTop: 20,
  },
  cadastrarBotao: {
    color: '#ff8c00',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});
