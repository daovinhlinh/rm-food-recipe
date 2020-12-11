import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, Detail, List} from '../screens/home';
import {Profile} from '../screens/profile';
import {BottomTab} from './BottomTab';

const Stack = createStackNavigator();

export const StackNavigation = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animationEnabled: true}}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        navigation={navigation}
      />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
