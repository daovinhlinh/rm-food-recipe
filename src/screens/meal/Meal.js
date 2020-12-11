import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Icon} from '../../component/Icon';
import ProgressLoader from 'rn-progress-loader';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const RenderItem = ({data, navigation}) => {
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
      <View style={styles.renderItem}>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Image
            source={{uri: data.meals[0].strMealThumb}}
            style={styles.image}
          />
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: 'space-between',
            marginLeft: 10,
            paddingVertical: 10,
          }}>
          <Text style={styles.title}>
            {data.meals[0].strMeal.length > 40
              ? data.meals[0].strMeal.substring(0, 37) + '...'
              : data.meals[0].strMeal}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon AntDesign name="like2" size={22} color="black" />
            <Text style={{fontSize: 20, color: 'black', marginLeft: 5}}>
              100
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.tag}>{data.meals[0].strCategory}</Text>
            <Text style={styles.tag}>{data.meals[0].strArea}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Meal = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      let newData = [];
      for (let i = 0; i < 3; i++) {
        let randomMeal = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/random.php',
        );
        newData.push(randomMeal.data);
      }
      //   setData(randomMeal.data);
      setData(newData);
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
              <Text
                style={[
                  styles.header,
                  {
                    fontSize: 25,
                    fontWeight: 'bold',
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                  },
                ]}>
                Hello, Linh
              </Text>
              <TouchableOpacity
                style={styles.avatar}
                onPress={() => navigation.push('Profile')}>
                <Icon Ionicons name="ios-person" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={[
                  styles.text,
                  {alignSelf: 'center', marginBottom: 20, marginLeft: 0},
                ]}>
                Generate random meal
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setRefresh(!refresh)}>
                <Text style={{fontSize: 25}}>Generate</Text>
              </TouchableOpacity>
              <Text style={styles.text}>Breakfast</Text>
              <RenderItem data={data[0]} navigation={navigation} />
              <Text style={styles.text}>Launch</Text>
              <RenderItem data={data[1]} navigation={navigation} />
              <Text style={styles.text}>Dinner</Text>
              <RenderItem data={data[2]} navigation={navigation} />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  renderItem: {
    flexDirection: 'row',
    width: width * 0.95,
    height: height * 0.2,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    elevation: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  tag: {
    backgroundColor: '#ff9a00',
    marginRight: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ff9a00',
    borderRadius: 30,
    marginBottom: 20,
  },
});
