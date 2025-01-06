import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { Card, Dialog, Portal, Button, IconButton } from 'react-native-paper';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";

// Função para deletar o endereço do Firestore
const onDelete = async (enderecoId) => {
    try {
        const enderecoRef = doc(db, "endereco", enderecoId);
        await deleteDoc(enderecoRef);
        Alert.alert("Sucesso", "Endereço deletado com sucesso!");
    } catch (error) {
        Alert.alert("Erro", "Erro ao deletar o endereço: " + error.message);
    }
};

export default function AddressCard({ navigation, endereco }) {
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const confirmDelete = () => {
        hideDialog();
        onDelete(endereco.id);
    };

    return (
        <View>
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textAddress}>Rua: {endereco.rua}</Text>
                        <Text style={styles.textAddress}>Bairro: {endereco.bairro}</Text>
                        <Text style={styles.textAddress}>Número: {endereco.numero}</Text>
                        <Text style={styles.textAddress}>CEP: {endereco.cep}</Text>
                        <Text style={styles.textAddress}>Cidade: {endereco.cidade} - {endereco.uf}</Text>
                    </View>

                    {/* Botões de editar e excluir no lado direito em coluna */}
                    <View style={styles.buttonContainer}>
                        <IconButton
                            icon="pencil"
                            color="blue"
                            size={24}
                            onPress={() => navigation.navigate('AlterarEndereco', {endereco: endereco})}
                        />
                        <IconButton
                            icon="delete"
                            color="red"
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
                        <Text style={styles.dialogContent}>Tem certeza que deseja excluir este endereço?</Text>
                    </Dialog.Content>
                    <Dialog.Actions style={styles.dialogActions}>
                        <Button onPress={confirmDelete}>
                            Sim
                        </Button>
                        <Button onPress={hideDialog}>
                            Não
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: "5%",
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },
    cardContent: {
        flexDirection: 'row',  // Organiza o conteúdo em linha (textos e botões lado a lado)
        justifyContent: 'space-between',
        padding: 16,
    },
    textContainer: {
        flex: 1,  // Deixa os textos ocuparem o máximo de espaço possível
    },
    textAddress: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 2,
    },
    buttonContainer: {
        flexDirection: 'column',  // Coloca os botões em coluna
        justifyContent: 'flex-start',  // Alinha os botões no topo da coluna
        marginLeft: 10,  // Dá um pequeno espaço à esquerda para separar dos textos
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
