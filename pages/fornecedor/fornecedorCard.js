import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Portal, Dialog, Button } from 'react-native-paper';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/connectionFirebase";

// Função para deletar fornecedor
const onDelete = async (fornecedorId) => {
    try {
        const fornecedorRef = doc(db, "fornecedor", fornecedorId);
        await deleteDoc(fornecedorRef);
        Alert.alert("Sucesso", "Fornecedor deletado com sucesso!");
    } catch (error) {
        Alert.alert("Erro", "Erro ao deletar o fornecedor: " + error.message);
    }
};

export default function FornecedorCard({ navigation, fornecedor }) {
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState([]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const confirmDelete = () => {
    hideDialog();
    onDelete(fornecedor.id);
  };

  const handleSave = useCallback(
    id => {
      if (saved.includes(id)) {
        setSaved(saved.filter(val => val !== id));
      } else {
        setSaved([...saved, id]);
      }
    },
    [saved],
  );

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardLikeWrapper}>
            <TouchableOpacity onPress={() => handleSave(fornecedor.id)}>
              <View style={styles.cardLike}>
                <FontAwesome
                  color={saved.includes(fornecedor.id) ? '#ea266d' : '#222'}
                  name="heart"
                  solid={saved.includes(fornecedor.id)}
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.cardTop}>
            <Image
              alt=""
              resizeMode="cover"
              style={styles.cardImg}
              source={{ uri: fornecedor.imagem }}
            />
          </View>

          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{fornecedor.nomeFornecedor}</Text>
            </View>
            <Text style={styles.cardDates}>CNPJ: {fornecedor.cnpj}</Text>
            <Text style={styles.cardDates}>Endereco: Rua: {fornecedor.rua}, Nº {fornecedor.numero}, Bairro: {fornecedor.bairro}, CEP: {fornecedor.cep}, {fornecedor.cidade} - {fornecedor.uf} </Text>
            <Text style={styles.cardDates}>Telefone: {fornecedor.telefone}</Text>
            <Text style={styles.cardDates}>Contrato: {fornecedor.contrato}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonEdit]}
                onPress={() => navigation.navigate('AlterarFornecedor', {fornecedor: fornecedor})}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={showDialog}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Diálogo de confirmação de exclusão */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirmar Exclusão</Dialog.Title>
            <Dialog.Content>
              <Text>Tem certeza que deseja excluir este fornecedor?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={confirmDelete}>Sim</Button>
              <Button onPress={hideDialog}>Não</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#232425',
    textAlign: 'center',  // Centraliza o texto
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDates: {
    marginTop: 4,
    fontSize: 16,
    color: '#595a63',
    textAlign: 'center',  // Centraliza o texto
  },
  cardPrice: {
    marginTop: 6,
    fontSize: 16,
    color: '#232425',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonEdit: {
    backgroundColor: 'blue',
  },
  buttonDelete: {
    backgroundColor: '#ff8c00',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
