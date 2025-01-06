import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

// import Principal from './home';
import Products from '../produto/produtos';
import NovoProduto from '../produto/cadastrarProduto';
import AlterarProduto from '../produto/produtoEditar';
import ProdutoDetalhes from '../produto/produtoDetalhes';
import Information from './informacoes';
import RealizarPedidos from '../pedido/realizarPedidos'
import PedidosRealizados from '../pedido/pedidosCadastrados'


const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function ProdutoNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Produtos " component={Products} />
      <Stack.Screen name="CadastrarProduto" component={NovoProduto} />
      <Stack.Screen name="AlterarProduto" component={AlterarProduto} />
      <Stack.Screen name="ProdutoDetalhes" component={ProdutoDetalhes} />
      <Stack.Screen name="RealizarPedidos" component={RealizarPedidos} />
      <Stack.Screen name="PedidosRealizados" component={PedidosRealizados} />
    </Stack.Navigator>
  );
}

function TabsBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* <Tab.Screen name="Cadastrados" component={Principal} /> */}
      <Tab.Screen name="Produtos" component={ProdutoNavigation} />
      <Tab.Screen name="Informações" component={Information} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontWeight: 'bold', // Peso da fonte
  },
  tabBar: {
    backgroundColor: '#ff8c00', // Cor de fundo da tab bar
    borderBottomWidth: 2, // Bordas inferiores
    borderColor: 'orange', // Cor da borda
  },
});

export default TabsBar;
