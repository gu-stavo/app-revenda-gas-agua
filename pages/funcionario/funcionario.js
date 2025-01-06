import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import FuncionarioCard from "./funcionarioCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";
import { FAB } from 'react-native-paper';

export default function Funcionario({ navigation }) {
    const [funcionario, setFuncionario] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para exibir um indicador de carregamento

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'funcionario'),
            (querySnapshot) => {
                const funcionarioArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFuncionario(funcionarioArray);
                setLoading(false); // Dados carregados
            },
            (error) => {
                console.error("Erro ao buscar os funcionarios: ", error);
                setLoading(false); // Finaliza o loading mesmo com erro
            }
        );

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <FuncionarioCard navigation={navigation} funcionario={item} />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>Carregando funcionários...</Text>
            ) : funcionario.length === 0 ? (
                <Text style={styles.emptyText}>Nenhum funcionário cadastrado.</Text>
            ) : (
                <FlatList
                    data={funcionario}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('CadastrarFuncionario')}
                color="white"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc'
    },
    loadingText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
    emptyText: {
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'blue',
    },
});
