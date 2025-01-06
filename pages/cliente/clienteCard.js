import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Alert, Image } from "react-native";
import { Card, Dialog, Portal, Button, IconButton } from 'react-native-paper';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";

const onDelete = async (clienteId) => {
    try {
        const clienteRef = doc(db, "cliente", clienteId);
        await deleteDoc(clienteRef);
        Alert.alert("Sucesso", "Cliente deletado com sucesso!");
    } catch (error) {
        Alert.alert("Erro", "Erro ao deletar o cliente: " + error.message);
    }
};

export default function ClienteCard({ navigation, cliente }) {
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const confirmDelete = () => {
        hideDialog();
        onDelete(cliente.id);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.photoContainer}>
                        <Image source={{ uri: cliente.image }} style={styles.image} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.clientName}>{cliente.nomeCliente}</Text>
                        <Text style={styles.clientInfo}>CPF/CNPJ: {cliente.cpfcnpj}</Text>
                        <Text style={styles.clientInfo}>RG/IE: {cliente.rgie}</Text>
                        <Text style={styles.clientInfo}>Login: {cliente.login}</Text>
                        <Text style={styles.clientInfo}>Senha: {cliente.senha}</Text>
                        <Text style={styles.clientInfo}>Tipo de Cliente: {cliente.tipoCliente}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            style={styles.detailsButton}
                            onPress={() => navigation.navigate('DetalhesCliente', { cliente })}
                        >
                            Ver Detalhes
                        </Button>
                        <IconButton
                            icon="pencil"
                            backgroundColor="blue"
                            iconColor="white"
                            size={24}
                            onPress={() => navigation.navigate('AlterarCliente', { cliente })}
                        />
                        <IconButton
                            icon="delete"
                            backgroundColor="red"
                            iconColor="white"
                            size={24}
                            onPress={showDialog}
                        />
                    </View>
                </View>
            </Card>

            {/* Diálogo de confirmação de exclusão */}
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
                    <Dialog.Title style={styles.dialogTitle}>Confirmar Exclusão</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.dialogContent}>Tem certeza que deseja excluir este cliente?</Text>
                    </Dialog.Content>
                    <Dialog.Actions style={styles.dialogActions}>
                        <Button onPress={confirmDelete}>Sim</Button>
                        <Button onPress={hideDialog}>Não</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        marginTop: 20
    },
    card: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        shadowColor: '#000',
        borderColor: 'blue',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4.65,
        elevation: 6,
    },
    cardContent: {
        alignItems: 'center',
    },
    photoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'blue',
    },
    clientName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5,
        textAlign: 'center',
    },
    clientInfo: {
        fontSize: 16,
        color: '#555',
        marginBottom: 2,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
        margin: 5
    },
    detailsButton: {
        backgroundColor: '#FF6F20',
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 10,
    },
    dialog: {
        backgroundColor: 'white',
    },
    dialogTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dialogContent: {
        textAlign: 'center',
    },
    dialogActions: {
        justifyContent: 'space-around',
    },
});
