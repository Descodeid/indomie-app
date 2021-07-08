import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcHeartActive, IcPlus, Product} from '../../../assets';
import {Gap} from '../../atoms';

const ListProduct = ({onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.borderThumbnail}
        onPress={onPress}>
        <Image source={Product} />
        <View style={styles.favorite}>
          <IcHeartActive />
        </View>
      </TouchableOpacity>
      <Gap height={16} />
      <Text style={styles.name}>Mi Goreng Original</Text>
      <Gap height={2} />
      <View style={styles.row}>
        <Text style={styles.price}>Rp. 2.500</Text>
        <IcPlus />
      </View>
    </View>
  );
};

export default ListProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: normalize(8),
    paddingTop: normalize(10),
    paddingBottom: normalize(18),
    borderRadius: normalize(16),
    shadowColor: '#F0F0F0',
    shadowOffset: {
      width: 5,
      height: 6,
    },
    shadowOpacity: 13,
    shadowRadius: 6.27,
  },
  borderThumbnail: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(2),
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
  },
  favorite: {
    position: 'absolute',
    top: normalize(6),
    right: normalize(8),
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(14),
    color: '#C20C17',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(16),
    color: '#C20C17',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
