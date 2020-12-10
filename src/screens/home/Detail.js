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
import Video from 'react-native-video';
import {Icon} from '../../component/Icon';
const {width, height} = Dimensions.get('window');

const Ingredient = ({title, measure}) => {
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

const Instruction = ({data}) => {
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

export const Detail = ({navigation, route}) => {
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
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}>
        <Icon Ionicons name="ios-arrow-back" size={30} color="white" />
      </TouchableOpacity>
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
            style={{marginVertical: 20, borderRadius: 15}}
          />
          <Text style={[styles.header, {fontSize: 25}]}>
            Cooking instruction
          </Text>
          <View>
            {instruction.map((item, key) => (
              <Instruction data={item} key={key} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );

  // return (
  //   <View>
  //     <Text>hello</Text>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  backIcon: {
    position: 'absolute',
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
});
