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
    width: width * 0.3,
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 20,
    elevation: 10,
  },
  image: {
    width: 120,
    height: 90,
    borderRadius: 20,
    marginLeft: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
