import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '../../component/Icon';
import {Category} from './Category';
import {Recipe} from './Recipe';
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader';

const {width, height} = Dimensions.get('window');

export const HomeScreen = ({navigation}) => {
  const [randomMeal, setRandomMeal] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
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
  }, [refresh]);

  return (
    <>
      {loading ? (
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ProgressLoader
            visible={loading}
            isModal={true}
            isHUD={true}
            hudColor={'#000000'}
            color={'#FFFFFF'}
          />
        </View>
      ) : (
        <View>
          <View
            style={[
              styles.row,
              {
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: 'white',
                alignItems: 'center',
              },
            ]}>
            <Text style={styles.header}>Hello, Linh</Text>
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => navigation.push('Profile')}>
              <Icon Ionicons name="ios-person" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={[styles.row, styles.inputWrapper]}>
                <Icon Ionicons name="md-search" size={25} color="black" />
                <TextInput
                  style={styles.input}
                  placeholder="Search for recipes"
                />
              </View>

              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={category}
                renderItem={({item}) => (
                  <Category
                    title={item.strCategory}
                    img={item.strCategoryThumb}
                    navigation={navigation}
                  />
                )}
                keyExtractor={(item) => item.idCategory}
                initialNumToRender={4}
                maxToRenderPerBatch={3}
                updateCellsBatchingPeriod={50}
                windowSize={5}
              />
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <Text style={styles.text}>Recommend</Text>
                <TouchableOpacity onPress={() => setRefresh(!refresh)}>
                  <Text style={styles.text}>Next</Text>
                </TouchableOpacity>
              </View>
              <Recipe data={randomMeal} navigation={navigation} />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 0.9,
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 60,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 25,
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
