import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Category = ({navigation, title, img}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('List', {title: title})}
      style={{marginRight: 20}}>
      <View style={styles.container}>
        <Image source={{uri: img}} style={styles.image} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff9a00',
    width: 130,
    height: 120,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 20,
    elevation: 10,
  },
  image: {
    width: 110,
    height: 75,
    borderRadius: 20,
    marginLeft: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
