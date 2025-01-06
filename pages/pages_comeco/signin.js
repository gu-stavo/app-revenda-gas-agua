import { StyleSheet, View, TouchableOpacity, Text, Alert  } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../services/connectionFirebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Separator = () => {
  return <View style={styles.separator} />;
};

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Email e senha não informados!');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Email inválido. Por favor, insira um email válido.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('HomeDrawer');
      })
      .catch(() => {
        Alert.alert('Erro', 'Email ou senha incorretos!');
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          mode="outlined"
          placeholder="Digite o seu Email"
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
          placeholder="Digite a sua Senha"
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
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.recuperar}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerContainer} onPress={() => navigation.navigate('Cadastrar')}>
          <Text style={styles.cadastrar}>Você não tem uma conta? </Text>
          <Text style={styles.cadastrarBotao}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '80%', // Largura dos inputs
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
  recuperar: {
    color: '#ff8c00',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: -20
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});
