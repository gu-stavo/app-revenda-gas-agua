import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import FornecedorCard from "./fornecedorCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";
import { FAB } from 'react-native-paper';

export default function Fornecedor({ navigation }) {
    const [fornecedor, setFornecedor] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para exibir um indicador de carregamento

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'fornecedor'),
            (querySnapshot) => {
                const fornecedorArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFornecedor(fornecedorArray);
                setLoading(false); // Dados carregados
            },
            (error) => {
                console.error("Erro ao buscar os fornecedores: ", error);
                setLoading(false); // Finaliza o loading mesmo com erro
            }
        );

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <FornecedorCard navigation={navigation} fornecedor={item} />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>Carregando fornecedores...</Text>
            ) : fornecedor.length === 0 ? (
                <Text style={styles.emptyText}>Nenhum fornecedor cadastrado.</Text>
            ) : (
                <FlatList
                    data={fornecedor}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('CadastrarFornecedor')}
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
