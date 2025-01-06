import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './pages/principal/routes'; // Ajuste o caminho se necessário
import { CarrinhoProvider } from './pages/pedido/carrinhoContext'; // Ajuste o caminho

export default function App() {
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </CarrinhoProvider>
  );
}
