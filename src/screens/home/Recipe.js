import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
const image = require('../../asset/salad.jpg');
import {Icon} from '../../component/Icon';

const {width, height} = Dimensions.get('window');

export const Recipe = ({navigation, title, data}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let counter = 0;
    for (let i = 1; i <= 20; i++) {
      if (data.meals[0]['strIngredient' + i] !== '') {
        counter++;
      }
    }
    setCount(counter);
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('Detail', {data: data, ingredient: count})
      }>
      <View style={styles.container}>
        <Image
          source={{uri: data.meals[0].strMealThumb}}
          style={styles.image}
        />
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            {data.meals[0].strMeal}
          </Text>
          <View style={styles.row}>
            <Text style={styles.text}>{count} ingredients</Text>
            <Text style={styles.text}>60 min</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.icon}>
        <Icon Ionicons name="heart-circle" size={70} color={'white'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    // marginRight: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  row: {
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: width * 0.95,
    height: height * 0.5,
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
    color: '#746868',
  },
  icon: {
    position: 'absolute',
    top: height * 0.4,
    left: width * 0.75,
  },
});
