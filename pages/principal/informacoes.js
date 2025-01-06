import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, Linking, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InformacoesEmpresa() {
  const openUrl = (url) => {
    // Verifica se o URL é válido e abre-o
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log('URL inválida: ' + url);
        }
      })
      .catch((err) => console.error('Erro ao abrir a URL: ', err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.imageLogo}
          resizeMode="contain" 
        />
      </View>

      <View style={styles.card}>
        <View style={styles.section}>
          <View style={styles.row}>
            <Icon name="information-outline" size={24} color="blue" />
            <Text style={styles.subtitle}>Sobre Nós</Text>
          </View>
          <Text style={styles.text}>
            Nossa empresa é referência no fornecimento de gás, água e acessórios, destacando-se pela praticidade, excelência no atendimento e produtos de alta qualidade, com o objetivo de proporcionar a melhor experiência possível para nossos clientes.
          </Text>
        </View>

        {/* Contato */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Icon name="phone" size={24} color="blue" />
            <Text style={styles.subtitle}>Contato</Text>
          </View>
          <View style={styles.row}>
            <Icon name="map-marker" size={20} color="#FF6F00" />
            <Text style={styles.iconText}>Endereço: Rua Street 123, Centro, Jales - SP</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" size={20} color="#FF6F00" />
            <Text style={styles.iconText}>Telefone: (17) 99799.9999</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" size={20} color="#FF6F00" />
            <Text style={styles.iconText}>Email: clickgas@gmail.com</Text>
          </View>
          <View style={styles.row}>
            <Icon name="web" size={20} color="#FF6F00" />
            <Text style={styles.iconText}>
              Site: <Text style={styles.link} onPress={() => openUrl('https://www.fatecjales.edu.br/')}>https://www.clickgas.com</Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#dcdcdc',
    },
  header: {
    alignItems: 'center',
    marginBottom: 20, // Espaço abaixo do header
  },
  imageLogo: {
    marginTop: -40, // Mantive a margem negativa para posicionar a logo corretamente
    marginBottom: -40, // Mantive a margem inferior negativa
    width: 290, // Mantendo o tamanho original da logo
    height: 290,
  },
  card: {
    backgroundColor: '#fff', // Fundo branco para o card
    borderRadius: 12,
    padding: 20,
    marginTop: -20,
    marginBottom: 30,
  },
  section: {
    marginBottom: 10, // Diminuição do espaço entre seções
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'blue', // Azul da empresa
    marginLeft: 8, // Espaço entre o ícone e o texto
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555', // Cor de texto suave
    marginLeft: 32, // Espaço para o texto alinhado após o ícone
  },
  iconText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8, // Espaço entre ícone e texto
  },
  link: {
    color: '#FF6F00', // Laranja para links
    textDecorationLine: 'underline',
  },
});
