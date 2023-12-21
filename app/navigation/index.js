import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoListScreen from '../screens/TodoListScreen';
import TodoEditScreen from '../screens/TodoEditScreen';

const Stack = createStackNavigator();

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: {animation: 'timing', config: {duration: 300}},
          close: {animation: 'timing', config: {duration: 300}},
        },
        cardStyleInterpolator: ({current, next, layouts}) => ({
          cardStyle: {
            opacity: current.progress, // fade animation
            // slide animation
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
              {
                translateX: next
                  ? next.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -layouts.screen.width],
                    })
                  : 1,
              },
            ],
          },
        }),
      }}
      initialRouteName="TodoList">
      <Stack.Screen name="TodoList" component={TodoListScreen} />
      <Stack.Screen name="TodoEdit" component={TodoEditScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
