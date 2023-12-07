import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { db } from '../components/Config';
import { getDatabase, ref, set, onValue, update, remove } from "firebase/database";
import { useNavigation } from '@react-navigation/native';
const Screen1 = () => {
  const navigation = useNavigation(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleIngresar = () => {
    setModalVisible(true);
    setId('');
    setMonto('');
    setCategoria('');
    setDescripcion('');
    navigation.navigate("BottomTab");
  };
  function guardar(id:string, monto:string, categoria:string,descripcion:string) {
    //const db = getDatabase();
    set(ref(db, 'usuarios/' + id), {
      mont: monto,
      category:categoria,
      description:descripcion
  
    });
    setId("")
    setMonto("")
    setCategoria("")
    setDescripcion("")
    handleIngresar();
   
  }
  
  return (
    <View style={styles.container}>
      <Text>Ingresa un registro de gasto:</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={(text) => setId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        value={monto}
        onChangeText={(text) => setMonto(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={(text) => setCategoria(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={(text) => setDescripcion(text)}
      />
      <Button title="Ingresar" onPress={()=> guardar(id,monto,categoria,descripcion)}/>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>¡Gasto ingresado correctamente!</Text>
          <Button
            title="Cerrar"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:"black"
  },
});

export default Screen1;
