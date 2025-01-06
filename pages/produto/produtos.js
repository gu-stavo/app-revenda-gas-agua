import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import ProdutoCard from "./produtoCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";
import { useNavigation } from '@react-navigation/native';

// Importe suas imagens
import lista1Image from '../../assets/gas.png'; // Imagem do gás
import lista2Image from '../../assets/agua.png'; // Imagem da água

export default function Produtos() {
    const [produtoGas, setProdutoGas] = useState([]); // Estado para produtos de gás
    const [produtoAgua, setProdutoAgua] = useState([]); // Estado para produtos de água
    const [selectedProduct, setSelectedProduct] = useState(''); // Estado para o tipo de produto selecionado
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const navigation = useNavigation(); // Hook de navegação

    // useEffect para buscar produtos de Gás e Água das coleções separadas
    useEffect(() => {
        const unsubscribeGas = onSnapshot(collection(db, 'produtosGas'), (querySnapshot) => {
            const gasProductsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProdutoGas(gasProductsArray);
            setLoading(false);
        }, (error) => {
            Alert.alert("Erro", "Não foi possível carregar os produtos de gás.");
            setLoading(false);
        });

        const unsubscribeAgua = onSnapshot(collection(db, 'produtosAgua'), (querySnapshot) => {
            const aguaProductsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProdutoAgua(aguaProductsArray);
            setLoading(false);
        }, (error) => {
            Alert.alert("Erro", "Não foi possível carregar os produtos de água.");
            setLoading(false);
        });

        return () => {
            unsubscribeGas();
            unsubscribeAgua();
        };
    }, []);

    // Função para renderizar o item da lista
    const renderItem = ({ item }) => (
        <ProdutoCard navigation={navigation} produto={item} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tipos de Produtos</Text>
            <View style={styles.buttonsContainer}>
                {/* Botão Gás */}
                <TouchableOpacity
                    style={selectedProduct === 'gas' ? styles.selectedButton : styles.button}
                    onPress={() => setSelectedProduct('gas')}
                >
                    <Image source={lista1Image} style={styles.image} />
                    <Text style={styles.buttonText}>Gás</Text>
                </TouchableOpacity>

                {/* Botão Água */}
                <TouchableOpacity
                    style={selectedProduct === 'agua' ? styles.selectedButton : styles.button}
                    onPress={() => setSelectedProduct('agua')}
                >
                    <Image source={lista2Image} style={styles.image} />
                    <Text style={styles.buttonText}>Água</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.produtosContainer}>
                <Text style={styles.text}>Lista dos Produtos</Text>
                
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        {selectedProduct === 'gas' && (
                            <>
                                <FlatList
                                    data={produtoGas}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    style={styles.list}
                                />
                                {/* Botão para cadastrar produto de gás */}
                                <TouchableOpacity 
                                    style={styles.cadastroButton} 
                                    onPress={() => navigation.navigate('CadastrarProduto', { tipoProduto: 'produtosGas' })}
                                >
                                    <Text style={styles.cadastroButtonText}>Cadastrar Gás</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {selectedProduct === 'agua' && (
                            <>
                                <FlatList
                                    data={produtoAgua}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    style={styles.list}
                                />
                                {/* Botão para cadastrar produto de água */}
                                <TouchableOpacity 
                                    style={styles.cadastroButton} 
                                    onPress={() => navigation.navigate('CadastrarProduto', { tipoProduto: 'produtosAgua' })}
                                >
                                    <Text style={styles.cadastroButtonText}>Cadastrar Água</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {!selectedProduct && (
                            <Text style={styles.selectText}>Selecione um tipo de produto para visualizar.</Text>
                        )}
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#dcdcdc',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 8,
        color: '#333',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    button: {
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedButton: {
        flex: 1,
        backgroundColor: '#007AFF', // Azul para o botão selecionado
        margin: 5,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 150,
        height: 180,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    produtosContainer: {
        flex: 1,
    },
    list: {
        width: '100%',
    },
    selectText: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
    cadastroButton: {
        backgroundColor: '#4CAF50', // Verde para o botão de cadastro
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    cadastroButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
