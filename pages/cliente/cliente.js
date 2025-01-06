import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import ClienteCard from "./clienteCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";
import { FAB } from 'react-native-paper';

export default function Cliente({ navigation }) {
  const [cliente, setCliente] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para exibir um indicador de carregamento

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'cliente'),
      (querySnapshot) => {
        const clienteArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCliente(clienteArray);
        setLoading(false); // Dados carregados
      },
      (error) => {
        console.error("Erro ao buscar os clientes: ", error);
        setLoading(false); // Finaliza o loading mesmo com erro
      }
    );

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <ClienteCard navigation={navigation} cliente={item} />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Carregando clientes...</Text>
      ) : cliente.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum cliente cadastrado.</Text>
      ) : (
        <FlatList
          data={cliente}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CadastrarCliente')}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',

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
