import React from 'react';

import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
const {width, height} = Dimensions.get('window');

export const Instruction = ({data}) => {
  return (
    <View
      style={[
        styles.card,
        {
          top: 0,
          position: 'relative',
          alignItems: 'flex-start',
          marginVertical: 5,
          borderRadius: 15,
        },
      ]}>
      <Text style={[styles.text, {color: 'black', fontSize: 16}]}>{data}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    backgroundColor: 'white',
    position: 'absolute',
    top: width * 0.85,
    alignItems: 'center',
    borderRadius: 30,
    padding: 17,
    elevation: 10,
  },
  text: {
    fontSize: 14,
    color: '#746868',
  },
});
