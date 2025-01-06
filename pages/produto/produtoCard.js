import React from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

export default function ProdutoCard({ navigation, produto }) { 
  return (
    <View style={styles.card}>
      <Image source={{ uri: produto.imagem }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.nomeProduto}>{produto.nomeProduto}</Text>
        <Text style={styles.descricao}>{produto.descricao}</Text>
        <Text style={styles.preco}>R${produto.preco}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProdutoDetalhes', {produto: produto})} style={styles.button}>
          <Text style={styles.buttonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 150,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  nomeProduto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descricao: {
    color: '#666',
    marginVertical: 5,
  },
  preco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff8c00',
  },
  button: {
    backgroundColor: '#00008B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
