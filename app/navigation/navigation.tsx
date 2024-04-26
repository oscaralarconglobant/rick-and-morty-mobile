import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';

export enum ROUTES {
  HOME = 'Home',
  DETAIL = 'Detail',
}

export type AppRootList = {
  Home: undefined;
  Detail: {id: number};
};

export type ScreenNames = ROUTES;
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<AppRootList>;

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
          options={{title: 'Rick and Morty'}}
        />
        <Stack.Screen
          name={ROUTES.DETAIL}
          component={DetailScreen}
          options={{title: 'Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
