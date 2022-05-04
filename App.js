import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import MovieInformation from "./MovieInformation";
import MoviesScreen from "./MoviesScreen";
import Home from './Home';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Movies"
          component={MoviesScreen}
        />

        <Stack.Screen name="Movie" component={MovieInformation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
