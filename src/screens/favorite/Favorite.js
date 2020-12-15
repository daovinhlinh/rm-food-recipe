import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {RenderItem} from '../home/RenderItem';
import {Icon} from '../../component/Icon';

const {width, height} = Dimensions.get('window');

const Favorite = ({favoriteFood, navigation}) => {
  let ListCart = [];
  Object.keys(favoriteFood.Carts).forEach((item) => {
    ListCart.push(favoriteFood.Carts[item]);
  });

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
          Favorite
        </Text>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => navigation.push('Profile')}>
          <Icon Ionicons name="ios-person" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {ListCart.length === 0 ? (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            You don't have any favorite food
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {ListCart.map((item, key) => (
              <RenderItem
                title={item.name}
                image={item.image}
                navigation={navigation}
                key={key}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state.favoriteFood.Carts);
  return {
    favoriteFood: state.favoriteFood,
  };
};

export default connect(mapStateToProps)(Favorite);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 60,
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
});
