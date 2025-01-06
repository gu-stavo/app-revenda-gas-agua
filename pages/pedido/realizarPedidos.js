import React, { useState } from "react";
import { Image, TouchableOpacity, View, Text, FlatList, StyleSheet, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useCarrinho } from './carrinhoContext'; // Ensure the path is correct
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/connectionFirebase"; // Ensure the path is correct

const back = require("../assets/back.png"); // Image for back
const remove = require("../assets/delete.png"); // Image for delete

function RealizarPedido({ navigation }) {
  const { carrinho, setCarrinho } = useCarrinho();
  const [formaPagamento, setFormaPagamento] = useState(null); // State to store the payment method

  const calcularTotal = () => {
    const subtotal = carrinho.reduce((acc, item) => acc + (parseFloat(item.preco) * item.quantidade), 0);
    const taxaEntrega = 5.00;
    return subtotal + taxaEntrega;
  };

  const handleDeleteItem = (id) => {
    const newCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(newCarrinho);
    Alert.alert("Item removido!", "O item foi removido do seu carrinho.");
  };

  const finalizarPedido = async () => {
    if (!formaPagamento) {
      Alert.alert("Erro", "Selecione uma forma de pagamento.");
      return;
    }

    // Validate cart is not empty
    if (carrinho.length === 0) {
      Alert.alert("Erro", "O carrinho está vazio.");
      return;
    }

    try {
      // Create the new order object
      const newPedido = {
        formaPagamento,
        status: "esperando confirmação",
        dataEntrega: new Date().toISOString(), // Current date
        // Collect product names for summary or main product name
        nomeProduto: carrinho.map(item => item.nomeProduto).join(", "), // Aggregated product names
      };

      // Save the order to the "pedidos" collection
      const pedidoCollection = collection(db, "pedido");
      const pedidoDoc = await addDoc(pedidoCollection, newPedido);

      // Save items to the "itemPedido" collection
      const itemPedidoCollection = collection(db, "itemPedido");
      const itemPromises = carrinho.map(item => {
        const itemData = {
          idItemPedido: item.id, // ID of the item
          idPedido: pedidoDoc.id, // Reference the order ID
          qtdItemPedido: item.quantidade, // Quantity of the item
          totalItemPedido: (parseFloat(item.preco) * item.quantidade).toFixed(2), // Total cost for that item
          valorItemPedido: item.preco, // Price per item
        };
        return addDoc(itemPedidoCollection, itemData); // Add item to Firestore
      });
      await Promise.all(itemPromises); // Wait for all item saves to complete

      Alert.alert("Sucesso", "Pedido realizado com sucesso!");
      setCarrinho([]); // Clear the cart after finalizing the order
      navigation.navigate("PedidosRealizados"); // Navigate to the registered orders screen
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao realizar o pedido.");
      console.error("Erro ao finalizar o pedido:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.containerBack} onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.titulo}>Detalhes do Pedido</Text>
      </View>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.produto}>
            <Image source={{ uri: item.imagem }} style={styles.foto} />
            <View style={styles.textos}>
              <Text style={styles.nome}>{item.nomeProduto}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.valor}>
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.preco * item.quantidade)}
              </Text>
              <TouchableOpacity style={styles.containerDelete} onPress={() => handleDeleteItem(item.id)}>
                <Image source={remove} style={styles.delete} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Dropdown to select payment method */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Forma de Pagamento:</Text>
        <RNPickerSelect
          onValueChange={(value) => setFormaPagamento(value)}
          placeholder={{ label: "Selecione uma forma", value: null }}
          items={[
            { label: "Cartão de Crédito", value: "credito" },
            { label: "Cartão de Débito", value: "debito" },
            { label: "Dinheiro", value: "dinheiro" },
            { label: "Pix", value: "pix" },
          ]}
          style={pickerSelectStyles}
          value={formaPagamento}
        />
      </View>

      <View style={styles.resumo}>
        <View style={styles.valores}>
          <Text style={[styles.valor, styles.valorSubtotal]}>Subtotal</Text>
          <Text style={[styles.valor, styles.valorSubtotal]}>
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
              carrinho.reduce((acc, item) => acc + parseFloat(item.preco * item.quantidade), 0)
            )}
          </Text>
        </View>
        <View style={styles.valores}>
          <Text style={[styles.valor, styles.valorTaxaEntrega]}>Taxa de entrega</Text>
          <Text style={[styles.valor, styles.valorTaxaEntrega]}>
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(5.00)}
          </Text>
        </View>
        <View style={styles.valores}>
          <Text style={[styles.total, styles.valorTotal]}>Total</Text>
          <Text style={[styles.total, styles.valorTotal]}>
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(calcularTotal())}
          </Text>
        </View>
        <View style={styles.containerBtn}>
          <TouchableOpacity style={styles.btn} onPress={finalizarPedido}>
            <Text style={styles.texto}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 25,
  },
  header: {
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
  containerBack: {
    position: "absolute",
    top: 7,
    left: 0,
  },
  back: {
    width: 30,
    height: 30,
  },
  titulo: {
    fontSize: 18,
    color: "#4F4F4F",
    textAlign: "center",
  },
  produto: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  foto: {
    width: "30%",
    height: '100%',
    borderRadius: 6,
    marginRight: 10,
  },
  textos: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  nome: {
    color: "#4F4F4F",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  descricao: {
    color: "#7D7D7D",
    fontSize: 14,
    marginBottom: 2,
  },
  valor: {
    fontSize: 16,
    color: "#4F4F4F",
    fontWeight: "bold",
  },
  containerDelete: {
    alignSelf: "flex-end",
    paddingRight: 5,
  },
  delete: {
    width: 24,
    height: 24,
    bottom: 35
  },
  resumo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  valores: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  total: {
    fontSize: 16,
    color: "#4F4F4F",
    fontWeight: "bold",
  },
  valorSubtotal: {
    color: "#FFA500", // Tom de laranja para o subtotal
  },
  valorTaxaEntrega: {
    color: "#00BFFF", // Tom de azul para a taxa de entrega
  },
  containerBtn: {
    marginTop: 10,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  texto: {
    color: "#FFF",
    fontSize: 16,
  },
  dropdownContainer: {
    marginVertical: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
});

// Estilos para o RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // Para espaço para o ícone
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // Para espaço para o ícone
  },
});

export default RealizarPedido;
