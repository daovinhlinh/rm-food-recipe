import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';

export const List = ({route}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let data = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${route.params.title}`,
      );
      console.log(data);
      setData(data.data.meals);
    }
    fetchData();
  }, []);
  return (
    <ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text>{route.params.title}</Text>
        {data.slice(0, 8).map((item, key) => (
          <View key={key}>
            <Text>{item.strMeal}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
