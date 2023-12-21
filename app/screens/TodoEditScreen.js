import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoEditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {todoId, addTodo, editTodo, existingTodo} = route.params || {};
  const isEditing = typeof todoId === 'number';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (todoId && existingTodo) {
      setTitle(existingTodo.title);
      setDescription(existingTodo.description);
    }
  }, [existingTodo, isEditing, todoId]);

  const saveTodos = async updatedTodos => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error saving todos', error);
    }
  };

  const handleSave = () => {
    const newTodo = {id: Date.now(), title, description, done: false};

    if (todoId) {
      editTodo({id: todoId, title, description, done: false});
    } else {
      addTodo(newTodo);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={text => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        {isEditing ? 'Edit Todo' : 'Add Todo'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default TodoEditScreen;
