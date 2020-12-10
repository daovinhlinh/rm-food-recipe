import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '../../component/Icon';

const {width, height} = Dimensions.get('window');

const TextBox = ({header, border}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 2,
        borderLeftWidth: border || 0,
        borderRightWidth: border || 0,
      }}>
      <Text style={{fontWeight: '600', fontSize: 26}}>500</Text>
      <Text>{header}</Text>
    </View>
  );
};

export const Profile = ({navigation}) => {
  return (
    <>
      <View style={[styles.row, styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{flex: 2}}>
          <Icon Ionicons name="ios-arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Profile</Text>
        <View style={{flex: 2}}></View>
      </View>
      <View style={styles.container}>
        <Image
          source={{uri: 'https://www.w3schools.com/howto/img_avatar.png'}}
          style={styles.image}
        />
        <View style={{marginVertical: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: '400'}}>Vinh Linh</Text>
          <Text style={{fontSize: 17, fontWeight: '400'}}>Developer</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: width,
            alignItems: 'center',
          }}>
          <TextBox header="POST" />
          <TextBox header="FOLLOWER" border={1} />
          <TextBox header="FOLLOWING" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
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
});
