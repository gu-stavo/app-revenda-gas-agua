import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Icon from 'react-native-vector-icons/FontAwesome5'; // Ou qualquer outro pacote de ícones
import { Provider as PaperProvider } from 'react-native-paper';
import { Icon, IconButton } from 'react-native-paper';



import Slider from '../component_carousel/slider';
import Welcome from '../pages_comeco/welcome';
import Entrar from '../pages_comeco/signin';
import Cadastrar from '../pages_comeco/signup';
import DivisaoPrincipal from './tabsbar'; // Mantenha apenas o import necessário
import Endereco from '../endereco/address';
import NovoEndereco from '../endereco/cadastrarEndereco';
import AlterarEndereco from '../endereco/addressEditar';
import Cliente from '../cliente/cliente';
import NovoCliente from '../cliente/cadastrarCliente';
import AlterarCliente from '../cliente/clienteEditar';
import Funcionario from '../funcionario/funcionario';
import NovoFuncionario from '../funcionario/cadastrarFuncionario';
import AlterarFuncionario from '../funcionario/funcionarioEditar';
import Fornecedor from '../fornecedor/fornecedor';
import NovoFornecedor from '../fornecedor/cadastrarFornecedor';
import AlterarFornecedor from '../fornecedor/fornecedorEditar';
import CustomDrawerContent from '../cliente/CustomDrawerContent'; // Importando o componente do drawer personalizado
import PedidosRealizados from '../pedido/pedidosCadastrados';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function EnderecoNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Endereços" component={Endereco} />
      <Stack.Screen name="CadastrarEndereco" component={NovoEndereco} />
      <Stack.Screen name="AlterarEndereco" component={AlterarEndereco} />
    </Stack.Navigator>
  );
}
function ClienteNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cliente" component={Cliente} />
      <Stack.Screen name="CadastrarCliente" component={NovoCliente} />
      <Stack.Screen name="AlterarCliente" component={AlterarCliente} />
    </Stack.Navigator>
  );
}

function FuncionarioNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Funconarios " component={Funcionario} />
      <Stack.Screen name="CadastrarFuncionario" component={NovoFuncionario} />
      <Stack.Screen name="AlterarFuncionario" component={AlterarFuncionario} />
    </Stack.Navigator>
  );
}

function FornecedorNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Fornecedores " component={Fornecedor} />
      <Stack.Screen name="CadastrarFornecedor" component={NovoFornecedor} />
      <Stack.Screen name="AlterarFornecedor" component={AlterarFornecedor} />
    </Stack.Navigator>
  );
}

function PedidoNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PedidosRealizados" component={PedidosRealizados} />
    </Stack.Navigator>
  );
}



function DrawerNavigator() {
  return (
    <PaperProvider>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />} // Usando o conteúdo personalizado do drawer
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: 'white',
          drawerStyle: { backgroundColor: '#ff8c00' },
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: 'black',
        }}
      >
        <Drawer.Screen
          name="Home"
          component={DivisaoPrincipal}
          options={{
            title: 'Home', 
            drawerLabel: 'Home', // Nome exibido na barra lateral do Drawer
            drawerIcon: ({ color, size }) => (
              <Icon source="home" color={color} size={size} />
            ),
            headerRight: () => (
              <IconButton
                icon="cart" // Nome do ícone
                size={30}
                iconColor="white" // Cor do ícone
                onPress={() => {
                  navigation.navigate('PedidoNavigation');
                }}
                style={{ marginRight: 10 }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Clientes"
          component={ClienteNavigation}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon source="account" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Endereços"
          component={EnderecoNavigation}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon source="map-marker" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Funcionarios"
          component={FuncionarioNavigation}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon source="account" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Fornecedores"
          component={FornecedorNavigation}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon source="account" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Meus Pedidos"
          component={PedidoNavigation}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon source="cart" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </PaperProvider>
  );
}

export default function Routes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Slider"
          component={Slider}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Entrar"
          component={Entrar}
          options={{ headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Cadastrar"
          component={Cadastrar}
          options={{ headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="HomeDrawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
