import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet, Alert } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";

// Função para deletar funcionário
const onDelete = async (funcionarioId) => {
    try {
        const funcionarioRef = doc(db, "funcionario", funcionarioId);
        await deleteDoc(funcionarioRef);
        Alert.alert("Sucesso", "Funcionário deletado com sucesso!");
    } catch (error) {
        Alert.alert("Erro", "Erro ao deletar o funcionário: " + error.message);
    }
};

export default function FuncionarioCard({ navigation, funcionario }) {
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const confirmDelete = () => {
        hideDialog();
        onDelete(funcionario.id);
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: funcionario.imagem }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.nomeFuncionario}>{funcionario.nomeFuncionario}</Text>
                <Text style={styles.descricao}>CPF: {funcionario.cpf}</Text>
                <Text style={styles.descricao}>Telefone: {funcionario.telefone}</Text>
                <Text style={styles.descricao}>Cargo: {funcionario.cargo}</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonEdit]}
                        onPress={() => navigation.navigate('AlterarFuncionario', {funcionario: funcionario})}
                    >
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonDelete]}
                        onPress={showDialog}
                    >
                        <Text style={styles.buttonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Diálogo de confirmação de exclusão */}
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
                    <Dialog.Title style={styles.dialogTitle}>Confirmar Exclusão</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.dialogContent}>Tem certeza que deseja excluir este funcionário?</Text>
                    </Dialog.Content>
                    <Dialog.Actions style={styles.dialogActions}>
                        <Button onPress={confirmDelete}>Sim</Button>
                        <Button onPress={hideDialog}>Não</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        marginHorizontal: 20,
        marginBottom: 20,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        elevation: 5,
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },
    image: {
        width: 150,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    nomeFuncionario: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    descricao: {
        color: '#666',
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonEdit: {
        backgroundColor: 'blue',
    },
    buttonDelete: {
        backgroundColor: '#ff8c00',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
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
