import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useCarrinho } from '../pedido/carrinhoContext'; // Ajuste o caminho
import back2 from "../assets/back2.png";
import menos from "../assets/menos.png";
import mais from "../assets/mais.png";

const ProdutoDetalhes = ({ route, navigation }) => {
    const { produto } = route.params;
    const [quantidade, setQuantidade] = useState(1);
    const { adicionarAoCarrinho } = useCarrinho();

    const incrementarQuantidade = () => setQuantidade(prev => prev + 1);
    const decrementarQuantidade = () => setQuantidade(prev => (prev > 1 ? prev - 1 : 1));

    const adicionar = () => {
        adicionarAoCarrinho(produto, quantidade);
        console.log(`Adicionado ao carrinho: ${produto.nome}, Quantidade: ${quantidade}`);
        // Navegar para a tela do carrinho ou mostrar uma mensagem de sucesso
        navigation.navigate('RealizarPedidos'); // Ou o nome da sua tela de carrinho
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerFoto}>
                <Image source={{ uri: produto.imagem }} style={styles.foto} resizeMode="cover" />

                <TouchableOpacity style={styles.containerBack} onPress={() => navigation.goBack()}>
                    <Image source={back2} style={styles.back} />
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
                <View style={styles.headerTextos}>
                    <Text style={styles.nome}>{produto.nome}</Text>
                    <Text style={styles.descricao}>{produto.descricao}</Text>
                    <Text style={styles.valor}>Preço: R$ {(produto.preco * quantidade).toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.headerObs}>
                <Text style={styles.descricao}>Observações</Text>
                <TextInput
                    style={styles.multiline}
                    multiline={true}
                    numberOfLines={5}
                    placeholder="Adicione suas observações aqui"
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={decrementarQuantidade}>
                    <Image source={menos} style={styles.imgQtd} />
                </TouchableOpacity>

                <Text style={styles.qtd}>{quantidade}</Text>

                <TouchableOpacity onPress={incrementarQuantidade}>
                    <Image source={mais} style={styles.imgQtd} />
                </TouchableOpacity>

                <View style={styles.footerBtn}>
                    <TouchableOpacity style={styles.btn} onPress={adicionar}>
                        <Text style={styles.texto}>Adicionar ao Carrinho</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF", // Branco
    },
    containerFoto: {
        alignItems: "center",
    },
    foto: {
        height: 300, // Aumentando a altura da imagem
        width: "100%",
    },
    containerBack: {
        position: "absolute",
        top: 30,
        left: 15,
    },
    back: {
        width: 40,
        height: 40,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        padding: 10,
    },
    headerTextos: {
        flex: 1,
        alignItems: 'center', // Centraliza os textos
    },
    nome: {
        fontSize: 30, // Aumentando o tamanho
        fontWeight: "bold",
        color: "#000000", // Preto
        marginBottom: 4,
        textAlign: 'center', // Centralizando
    },
    descricao: {
        fontSize: 20, // Aumentando o tamanho
        fontWeight: "bold", // Negrito
        color: "black", // Cinza médio
        marginBottom: 8,
        textAlign: 'left', // Centralizando
    },
    valor: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#007AFF", // Azul
        marginBottom: 10,
        textAlign: 'center', // Centralizando
    },
    headerObs: {
        width: "100%",
        padding: 10,
    },
    multiline: {
        flex: 1,
        backgroundColor: "#E0E0E0", // Cinza claro
        padding: 10,
        color: "#4F4F4F", // Cinza escuro
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#BDBDBD", // Cinza
        minHeight: 100,
        textAlignVertical: "top",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
    },
    imgQtd: {
        height: 40,
        width: 40,
    },
    qtd: {
        fontSize: 20,
        color: "#4F4F4F", // Cinza escuro
        width: 35,
        fontWeight: "bold",
        textAlign: "center",
    },
    footerBtn: {
        flex: 1,
        marginRight: 5,
        marginLeft: 15,
    },
    btn: {
        width: "100%",
        backgroundColor: "blue", // Laranja
        borderRadius: 6,
    },
    texto: {
        color: "white",
        padding: 14,
        textAlign: "center",
    },
});

export default ProdutoDetalhes;
