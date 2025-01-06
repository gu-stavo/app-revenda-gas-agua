import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawerContent = (props) => {
    // Imagem inicial como null
    const [profileImage, setProfileImage] = useState(null);

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
            setProfileImage(result.assets[0].uri);
        }
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                    <View style={styles.imageWrapper}>
                        {profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <View style={styles.emptyImagePlaceholder} />
                        )}
                    </View>
                    <View style={styles.editIconContainer}>
                        <Icon name="edit" size={27} color="black" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.profileName}>Nome do Cliente</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    imageContainer: {
        position: 'relative',
    },
    imageWrapper: {
        padding: 10, // Espaço em volta da imagem
        borderRadius: 100, // Para deixar a imagem circular com o espaço
        backgroundColor: 'white', // Cor de fundo para o espaço
    },
    profileImage: {
        width: 180, // Dimensões da imagem
        height: 180,
        borderRadius: 90, // Para garantir que a imagem fique circular
    },
    emptyImagePlaceholder: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: '#e0e0e0', // Cor de fundo para o espaço vazio
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 10, // Ajuste a posição do ícone conforme necessário
        right: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 8,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CustomDrawerContent;
