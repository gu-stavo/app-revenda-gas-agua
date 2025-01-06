import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, Image, Platform } from 'react-native';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/connectionFirebase';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddFuncionario = ({ navigation }) => {
    const [nomeFuncionario, setNomeFuncionario] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cargo, setCargo] = useState('');
    const [imagem, setImagem] = useState(null); // Armazenar URI da imagem
    const [imageBlob, setImageBlob] = useState(null); // Armazenar blob da imagem

    const handleSave = async () => {
        if (!nomeFuncionario) {
            Alert.alert("Erro", "O campo Nome do Funcionário está em branco.");
            return;
        }
        if (!cpf) {
            Alert.alert("Erro", "O campo CPF está em branco.");
            return;
        }
        if (!telefone) {
            Alert.alert("Erro", "O campo Telefone está em branco.");
            return;
        }
        if (!cargo) {
            Alert.alert("Erro", "O campo Cargo do Funcionário está em branco.");
            return;
        }
        if (!imagem) {
            Alert.alert("Erro", "O campo da Imagem está em branco.");
            return;
        }

        try {
            const imageUrl = await uploadImage(imageBlob);

            const funcionarioCollection = collection(db, "funcionario");
            await addDoc(funcionarioCollection, {
                nomeFuncionario,
                cpf,
                telefone,
                cargo,
                imagem: imageUrl, // Armazenar URL da imagem no Firestore
            });

            Alert.alert("Sucesso", "Funcionário adicionado com sucesso!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao adicionar o funcionário.");
        }
    };

    const uploadImage = async (blob) => {
        const filename = `${new Date().toISOString()}.jpg`; // Nome único para a imagem
        const storageRef = ref(storage, `funcionariosImagens/${filename}`);
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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome do Funcionário"
                placeholderTextColor="#888"
                value={nomeFuncionario}
                onChangeText={setNomeFuncionario}
            />
            <TextInput
                style={styles.input}
                placeholder="CPF"
                placeholderTextColor="#888"
                value={cpf}
                onChangeText={setCpf}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#888"
                value={telefone}
                onChangeText={setTelefone}
            />
            <TextInput
                style={styles.input}
                placeholder="Cargo do Funcionário"
                placeholderTextColor="#888"
                value={cargo}
                onChangeText={setCargo}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ position: 'relative' }} >
                    <Image source={imagem ? { uri: imagem } : require('../../assets/image_icon.png')} style={{ width: 200, height: 200, marginBottom: 20, backgroundColor: 'white', borderRadius: 15 }} />
                    <TouchableOpacity style={styles.btnAdd} onPress={pickImage}>
                        <Icon name="create" size={25} color="#ffffff" />
                    </TouchableOpacity>
                    {imagem && <TouchableOpacity style={styles.btnRemove} onPress={() => { setImagem(null); setImageBlob(null); }}>
                        <Icon name="clear" size={25} color="#ffffff" />
                    </TouchableOpacity>}
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>SALVAR</Text>
            </TouchableOpacity>
        </View>
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
        shadowColor: '#000',
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
        padding: 5
    },
    btnRemove: {
        position: 'absolute',
        right: -20,
        bottom: 30,
        borderRadius: 10,
        backgroundColor: '#B5B5B5',
        padding: 5
    },
});

export default AddFuncionario;
