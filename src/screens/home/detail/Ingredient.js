import React from 'react';

import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
const {width, height} = Dimensions.get('window');

export const Ingredient = ({title, measure}) => {
  return (
    <View style={{alignItems: 'center', width: 90, marginRight: 25}}>
      <View style={styles.ingredientIcon}>
        <Image
          source={{
            uri: `https://www.themealdb.com/images/ingredients/${title}.png`,
          }}
          style={{width: 50, height: 50}}
        />
      </View>
      <Text style={[styles.header, {fontSize: 16}]}>{title}</Text>
      <Text style={styles.text}>{measure}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: height * 0.55,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  ingredientIcon: {
    width: width * 0.2,
    height: height * 0.1,
    backgroundColor: '#fcdef0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
    marginBottom: 5,
  },

  header: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    color: '#746868',
  },
});
