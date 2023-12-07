import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Alert } from 'react-native';
import { db } from '../components/Config';
import { getDatabase, ref, update, remove } from "firebase/database";

const Screen3 = () => {
  const [idConsulta, setIdConsulta] = useState('');
  const [montoMostrado, setMontoMostrado] = useState('');
  const [categoriaMostrada, setCategoriaMostrada] = useState('');
  const [descripcionMostrada, setDescripcionMostrada] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoMonto, setNuevoMonto] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);

  const editar = () => {
    const dbRef = ref(db, 'usuarios/' + idConsulta);
    update(dbRef, {
      mont: nuevoMonto || montoMostrado,
      category: nuevaCategoria || categoriaMostrada,
      description: nuevaDescripcion || descripcionMostrada,
    });
    setModalVisible(false);
    Alert.alert("Registro editado correctamente");
  };

  const confirmarEliminar = () => {
    setModalEliminarVisible(true);
  };

  const eliminar = () => {
    const dbRef = ref(db, 'usuarios/' + idConsulta);
    remove(dbRef);
    setModalEliminarVisible(false);
    Alert.alert("Registro eliminado correctamente");
  };

  return (
    <View style={styles.container}>
      <Text>Ingresa un ID para editar o eliminar el registro:</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={idConsulta}
        onChangeText={(text) => setIdConsulta(text)}
      />
      <Button title="Editar" onPress={() => setModalVisible(true)} />
      <Button title="Eliminar" onPress={confirmarEliminar} />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Editar Registro</Text>
          <TextInput
            style={styles.input}
            placeholder="Nuevo Monto"
            value={nuevoMonto}
            onChangeText={(text) => setNuevoMonto(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nueva Categoría"
            value={nuevaCategoria}
            onChangeText={(text) => setNuevaCategoria(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nueva Descripción"
            value={nuevaDescripcion}
            onChangeText={(text) => setNuevaDescripcion(text)}
          />
          <Button title="Guardar Cambios" onPress={editar} />
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <Modal visible={modalEliminarVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Confirmar Eliminación</Text>
          <Text>¿Estás seguro de que deseas eliminar este registro?</Text>
          <Button title="Cancelar" onPress={() => setModalEliminarVisible(false)} />
          <Button title="Eliminar" onPress={eliminar} />
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
    borderColor: "black",
  },
});

export default Screen3;
