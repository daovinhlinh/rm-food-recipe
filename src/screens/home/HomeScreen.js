import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import {Icon} from '../../component/Icon';
import {Category} from './Category';
import {Recipe} from './Recipe';
import Shimmer from 'react-native-shimmer';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

export const HomeScreen = ({navigation}) => {
  const [randomMeal, setRandomMeal] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAPI() {
      let randomMeal = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/random.php',
      );
      let category = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      setRandomMeal(randomMeal.data);
      setCategory(category.data.categories);
      setLoading(false);
    }
    fetchAPI();
  }, []);

  return (
    <>
      <View
        style={[
          styles.row,
          {
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: 'white',
          },
        ]}>
        <Text style={styles.header}>Hello, Michelle</Text>
        <View style={styles.avatar}>
          <Icon Ionicons name="ios-person" size={30} color="black" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={[styles.row, styles.inputWrapper]}>
            <Icon Ionicons name="md-search" size={25} color="black" />
            <TextInput style={styles.input} placeholder="Search for recipes" />
          </View>
          {loading ? (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Shimmer style={{width: 130, height: 130}}>
                <View
                  style={{
                    backgroundColor: 'gray',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Loading..</Text>
                </View>
              </Shimmer>
              <Shimmer style={{width: 130, height: 130}}>
                <View
                  style={{
                    backgroundColor: 'gray',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Loading..</Text>
                </View>
              </Shimmer>
              <Shimmer style={{width: 130, height: 130}}>
                <View
                  style={{
                    backgroundColor: 'gray',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Loading..</Text>
                </View>
              </Shimmer>
            </View>
          ) : (
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={category.slice(0, 5)}
              renderItem={({item}) => (
                <Category
                  title={item.strCategory}
                  img={item.strCategoryThumb}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.idCategory}
              ListFooterComponent={
                <TouchableOpacity>
                  <View
                    style={{justifyContent: 'center', height: height * 0.15}}>
                    <Text>See all</Text>
                  </View>
                </TouchableOpacity>
              }
            />
          )}
          <Text style={styles.text}>Recommend</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {loading === true ? (
              <View style={{flexDirection: 'row'}}>
                <Shimmer
                  animationOpacity={0.4}
                  style={{marginRight: 20, height: 300}}>
                  <View
                    style={{
                      backgroundColor: 'gray',
                      width: 150,
                      height: 50,
                    }}>
                    <Text>Loading...</Text>
                  </View>
                </Shimmer>
                <Shimmer
                  animationOpacity={0.4}
                  style={{marginRight: 20, height: 300}}>
                  <View
                    style={{
                      backgroundColor: 'gray',
                      width: 150,
                      height: 50,
                    }}>
                    <Text>Loading...</Text>
                  </View>
                </Shimmer>
              </View>
            ) : (
              <View style={styles.row}>
                <Recipe data={randomMeal} navigation={navigation} />
                <Recipe data={randomMeal} navigation={navigation} />
                <Recipe data={randomMeal} navigation={navigation} />
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    paddingHorizontal: 10,
    width: width * 0.85,
    fontSize: 17,
  },
  inputWrapper: {
    alignItems: 'center',
    width: width * 0.95,
    backgroundColor: 'white',
    marginVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 5,
    elevation: 10,
  },
});
