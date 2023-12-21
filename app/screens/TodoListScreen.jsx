import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, FAB, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import TodoListItem from '../components/TodoListItem';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const TodoListScreen = () => {
  const [todos, setTodos] = useState([]);
  const navigation = useNavigation();
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [showDone, setShowDone] = useState(true);
  const [showUndone, setShowUndone] = useState(true);
  const [pressedDone, setPressedDone] = useState(false);
  const [pressedUndone, setPressedUndone] = useState(false);

  useEffect(() => {
    loadTodos(); // Load todos from AsyncStorage
  }, []);

  useEffect(() => {
    filterTodos(); // Update filtered todos when showDone or showUndone changes
  }, [showDone, showUndone, todos]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos', error);
    }
  };

  const filterTodos = () => {
    const filtered = todos.filter(todo => {
      if (showDone && showUndone) {
        return true;
      } else if (showDone) {
        return todo.done;
      } else if (showUndone) {
        return !todo.done;
      }
      return false;
    });
    setFilteredTodos(filtered);
  };

  const saveTodos = async updatedTodos => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error saving todos', error);
    }
  };

  const addTodo = newTodo => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const editTodo = editedTodo => {
    const updatedTodos = todos.map(todo =>
      todo.id === editedTodo.id ? editedTodo : todo,
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = todoId => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const toggleTodoStatus = todoId => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? {...todo, done: !todo.done} : todo,
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const renderItem = ({item}) => (
    <TodoListItem
      todo={item}
      deleteTodo={deleteTodo}
      editTodo={editTodo}
      toggleTodoStatus={toggleTodoStatus}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterButtons}>
        <Button
          title="Show Done"
          onPress={() => {
            setShowDone(!showDone);
            setPressedDone(!pressedDone);
          }}
          disabled={pressedUndone}
          style={{backgroundColor: showDone ? Colors.secondary : 'gray'}}
          children={<Text>{showDone ? 'Show Not Done' : 'All'}</Text>}
        />
        <Button
          title="Show Undone"
          onPress={() => {
            setShowUndone(!showUndone);
            setPressedUndone(!pressedUndone);
          }}
          disabled={pressedDone}
          style={{backgroundColor: showUndone ? Colors.primary : 'gray'}}
          children={<Text>{showUndone ? 'Show Done' : 'All'}</Text>}
        />
      </View>
      <FlashList
        data={filteredTodos}
        renderItem={renderItem}
        estimatedItemSize={100}
        keyExtractor={item => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          navigation.navigate('TodoEdit', {
            todoId: undefined,
            todos,
            addTodo,
            editTodo,
            toggleTodoStatus,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TodoListScreen;
