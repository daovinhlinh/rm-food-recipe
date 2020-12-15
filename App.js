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
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/reducers';

const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
