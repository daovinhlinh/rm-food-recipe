import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {Icon} from '../../component/Icon';
import axios from 'axios';
const {width, height} = Dimensions.get('window');

export const RenderItem = ({title, image, navigation}) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`,
      );
      setData(res.data);
      let counter = 0;
      for (let i = 1; i <= 20; i++) {
        if (res.data.meals[0]['strIngredient' + i] !== '') {
          counter++;
        }
      }
      setCount(counter);
    }
    fetchData();
  }, []);
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.push('Detail', {data: data, ingredient: count})
        }>
        <View style={styles.renderItem}>
          <View style={{flex: 3}}>
            <Image source={{uri: image}} style={styles.image} />
          </View>
          <View style={{flex: 6, justifyContent: 'space-between'}}>
            <Text style={styles.title}>{title}</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon AntDesign name="like2" size={22} color="black" />
                <Text style={styles.text}>100</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.tag}>food</Text>
                <Text style={styles.tag}>fastfood</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  renderItem: {
    flexDirection: 'row',
    width: width * 0.95,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 20,
  },
  tag: {
    backgroundColor: '#ff9a00',
    marginLeft: 5,
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
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
  },
});
