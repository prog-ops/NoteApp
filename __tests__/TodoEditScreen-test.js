import React from 'react';
import renderer from "react-test-renderer";
import { render, fireEvent } from '@testing-library/react-native';
import TodoEditScreen from "../app/screens/TodoEditScreen";
import { NavigationContainer } from "@react-navigation/native";

test('renders TodoEditScreen correctly', () => {
  const tree = renderer.create(<TodoEditScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

/*test('handles text input change', () => {
  const { getByLabelText } = render(<TodoEditScreen />);
  const titleInput = getByLabelText('Title');
  fireEvent.changeText(titleInput, 'New Title');
  expect(titleInput.props.value).toBe('New Title');
});*/

// const Stack = createStackNavigator();

test('handles text input change', () => {
  const { getByLabelText } = render(
    <NavigationContainer>
      {/*<Stack.Navigator initialRouteName="TodoList">*/}
      {/*  <Stack.Screen name="TodoList" component={TodoListScreen} />*/}
      {/*  <Stack.Screen name="TodoEdit" component={TodoEditScreen} />*/}
      {/*</Stack.Navigator>*/}
      <TodoEditScreen/>
    </NavigationContainer>
  );

  const titleInput = getByLabelText('Title');
  fireEvent.changeText(titleInput, 'New Title');
  expect(titleInput.props.value).toBe('New Title');
});

test('handles checkbox press', () => {
  const { getByLabelText } = render(<TodoEditScreen />);
  const checkbox = getByLabelText('Toggle Status');
  fireEvent.press(checkbox);
  // Add assertions based on the expected behavior
});

test('handles save button press', () => {
  const { getByText } = render(<TodoEditScreen />);
  const saveButton = getByText('Add Todo');
  fireEvent.press(saveButton);
  // Add assertions based on the expected behavior
});

test('navigates back on save button press', () => {
  const { getByText } = render(<TodoEditScreen />);
  const saveButton = getByText('Add Todo');
  fireEvent.press(saveButton);
  // Add assertions based on the expected navigation behavior
});
