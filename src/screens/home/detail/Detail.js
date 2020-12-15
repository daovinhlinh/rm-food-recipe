import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {AddToFavorite} from '../../../actions';
const {width, height} = Dimensions.get('window');

import {Icon} from '../../../component/Icon';
import {Ingredient} from './Ingredient';
import {Instruction} from './Instruction';

const Detail = ({navigation, route, AddToFavorite}) => {
  const {data, ingredient} = route.params;
  const listIngredient = [];
  const instruction = [];

  for (let i = 1; i <= 20; i++) {
    if (
      data.meals[0]['strIngredient' + i] !== null &&
      data.meals[0]['strIngredient' + i] !== ''
    ) {
      let obj = {};
      obj['name'] = [data.meals[0]['strIngredient' + i]];
      obj['measure'] = [data.meals[0]['strMeasure' + i]];
      listIngredient.push(obj);
    }
  }
  for (let i = 0; i < data.meals[0].strInstructions.split('. ').length; i++) {
    instruction.push(
      `Step ${i + 1}: ${data.meals[0].strInstructions.split('. ')[i]}`,
    );
  }

  return (
    <>
      <View
        style={[
          styles.row,
          {
            justifyContent: 'space-between',
            width: width * 0.9,
            position: 'absolute',
          },
        ]}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}>
          <Icon Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => AddToFavorite(data)}>
          <Icon Ionicons name="heart" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={{height: height * 0.7, alignItems: 'center'}}>
            <Image
              source={{uri: data.meals[0].strMealThumb}}
              style={styles.image}
            />
            <View style={styles.card}>
              <Text style={styles.header}>{data.meals[0].strMeal}</Text>
              <Text style={[styles.header, {fontSize: 17, marginBottom: 5}]}>
                {data.meals[0].strCategory}
              </Text>
              <Text style={styles.text}>{ingredient} ingredients</Text>
              <View
                style={[
                  styles.row,
                  {
                    marginTop: 10,
                    width: width * 0.6,
                    justifyContent: 'space-between',
                  },
                ]}>
                <View style={[styles.row, {alignItems: 'center'}]}>
                  <Icon Ionicons name="md-timer" size={30} color="#ff9a00" />
                  <Text style={styles.text}>30 min</Text>
                </View>
                <View style={[styles.row, {alignItems: 'center'}]}>
                  <Icon Ionicons name="ios-flame" size={30} color="#ff9a00" />
                  <Text style={styles.text}>30 min</Text>
                </View>
                <View style={[styles.row, {alignItems: 'center'}]}>
                  <Icon Ionicons name="md-happy" size={30} color="#ff9a00" />
                  <Text style={styles.text}>30 min</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={[styles.header, {fontSize: 25}]}>Ingredients</Text>
          <FlatList
            data={listIngredient}
            renderItem={({item}) => (
              <Ingredient title={item.name} measure={item.measure} />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              marginVertical: 20,
              borderRadius: 15,
              paddingHorizontal: 20,
            }}
          />
          <Text style={[styles.header, {fontSize: 25}]}>
            Cooking instruction
          </Text>
          <View style={{alignItems: 'center'}}>
            {instruction.map((item, key) => (
              <Instruction data={item} key={key} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    _product: state.favoriteFood,
  };
};

export default connect(mapStateToProps, {AddToFavorite: AddToFavorite})(Detail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
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
  row: {
    flexDirection: 'row',
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
  icon: {
    backgroundColor: 'gray',
    zIndex: 1,
    top: 20,
    left: 20,
    padding: 5,
    borderRadius: 10,
  },
  backgroundVideo: {
    width: 200,
    height: 200,
  },
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
});
