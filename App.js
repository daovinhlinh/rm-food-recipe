import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {BottomTab} from './src/navigation/BottomTab';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigation} from './src/navigation/StackNavigation';

const App = () => {
  return (
    <NavigationContainer>
      {/* <BottomTab /> */}
      <StackNavigation />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
