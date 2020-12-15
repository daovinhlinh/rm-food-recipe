import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeNavigation} from './HomeNavigation';
import {Icon} from '../component/Icon';
import {HomeScreen} from '../screens/home';
import {Meal} from '../screens/meal';
import Favorite from '../screens/favorite/Favorite';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'ios-home';
          } else if (route.name === 'Meal') {
            iconName = 'ios-list';
          } else if (route.name === 'Favorite') {
            iconName = 'heart-sharp';
          }

          return <Icon Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meal" component={Meal} />
      <Tab.Screen name="Favorite" component={Favorite} />
    </Tab.Navigator>
  );
};
