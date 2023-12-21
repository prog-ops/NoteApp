import React from 'react';
import {List, IconButton, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Animated, View} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {formatDateTime} from '../utils/dateUtils';

const TodoListItem = ({todo, deleteTodo, editTodo, toggleTodoStatus}) => {
  const navigation = useNavigation();

  const handleToggleStatus = () => {
    if (todo) {
      toggleTodoStatus(todo.id);
      console.log(todo.done);
    }
    console.log(todo.done);
  };

  const handleEdit = () => {
    navigation.navigate('TodoEdit', {
      todoId: todo.id,
      todos: [],
      addTodo: () => {},
      editTodo,
      existingTodo: todo,
      toggleTodoStatus,
    });
  };

  return (
    <View style={styles.container}>
      <List.Item
        key={todo.id}
        title={todo.title}
        description={todo.description}
        left={() => (
          <TouchableNativeFeedback
            style={styles.checkbox}
            onPress={handleToggleStatus}>
            <List.Icon
              icon={todo.done ? 'check' : 'checkbox-blank-outline'}
              color={todo.done ? 'green' : 'black'}
            />
          </TouchableNativeFeedback>
        )}
        right={() => (
          <>
            <IconButton icon="pencil" onPress={handleEdit} />
            <IconButton
              icon="delete"
              color="red"
              onPress={() => deleteTodo(todo.id)}
            />
          </>
        )}
      />
      <Text style={styles.date}>{formatDateTime(todo.id)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 14,
    paddingLeft: 10,
    backgroundColor: '#eae9ea',
  },
  checkbox: {
    marginTop: 15,
    marginRight: 15,
  },
  date: {
    alignSelf: 'center',
    marginBottom: 4,
    color: '#8f8f8f',
  },
});

export default TodoListItem;
