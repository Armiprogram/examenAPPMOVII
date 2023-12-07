import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, FlatList } from 'react-native';
import { db } from '../components/Config';
import { ref, onValue } from "firebase/database";

const Screen2 = () => {
  const [idConsulta, setIdConsulta] = useState('');
  const [montoMostrado, setMontoMostrado] = useState('');
  const [categoriaMostrada, setCategoriaMostrada] = useState('');
  const [descripcionMostrada, setDescripcionMostrada] = useState('');
  const [montos, setMontos] = useState([]);
  const [selectedMonto, setSelectedMonto] = useState(null);

  useEffect(() => {
    const starCountRef = ref(db, 'usuarios/');

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      let montosArray: any = [];

      for (let key in data) {
        montosArray.push(data[key].mont || '');
      }

      setMontos(montosArray);
    });
  }, []); // El segundo parámetro [] asegura que useEffect solo se ejecute una vez al cargar el componente

  const leer = () => {
    const starCountRef = ref(db, 'usuarios/');

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      for (let key in data) {
        if (key === idConsulta) {
          setMontoMostrado(data[key].mont || '');
          setCategoriaMostrada(data[key].category || '');
          setDescripcionMostrada(data[key].description || '');
          setSelectedMonto(null); // Limpiamos la selección de monto
          return;
        }
      }

      console.log("No se encontró el ID en la base de datos");
    });
  };

  const handleMontoPress = (monto:any) => {
    const starCountRef = ref(db, 'usuarios/');

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      for (let key in data) {
        if (data[key].mont === monto) {
          setMontoMostrado(data[key].mont || '');
          setCategoriaMostrada(data[key].category || '');
          setDescripcionMostrada(data[key].description || '');
          setSelectedMonto(monto);
          return;
        }
      }

      console.log("No se encontró el monto en la base de datos");
    });
  };


  return (
    <View style={styles.container}>
      <Text>Ingresa un ID para leer datos:</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={idConsulta}
        onChangeText={(text) => setIdConsulta(text)}
      />
      <Button title="Leer" onPress={leer} />

      <Text>Monto: {montoMostrado}</Text>
      <Text>Categoría: {categoriaMostrada}</Text>
      <Text>Descripción: {descripcionMostrada}</Text>

      <Text>Lista de Montos:</Text>
      <FlatList
        data={montos}
        renderItem={({ item }) => (
          <Button title={item} onPress={() => handleMontoPress(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal visible={selectedMonto !== null} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>ID: {idConsulta}</Text>
          <Text>Monto: {selectedMonto}</Text>
          <Text>Categoría: {categoriaMostrada}</Text>
          <Text>Descripción: {descripcionMostrada}</Text>
          <Button title="Cerrar" onPress={() => setSelectedMonto(null)} />
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
    borderColor: "black"
  },
});

export default Screen2;

