import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {Background, IcPlus} from '../../assets';
import Detail from '../../assets/JSON/ProductDetail';
import {Gap} from '../../components';

const {width, height} = Dimensions.get('screen');

const ProductDetail = ({navigation}) => {
  const topRef = useRef(null);
  const thumbRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = index => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (60 + 10) - 60 / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (60 + 10) - width / 2 + 10 / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.page}>
      <ImageBackground source={Background} style={styles.containerCarousel}>
        <FlatList
          data={Detail}
          renderItem={({item}) => {
            return <Image source={item.image} style={styles.imagesContainer} />;
          }}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={topRef}
        />
      </ImageBackground>
      <View>
        <FlatList
          ref={thumbRef}
          data={Detail}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.thumbnail}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
                <View style={styles.border(activeIndex, index)}>
                  <Image source={item.image} style={styles.images} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Gap height={16} />
      <Text style={styles.name}>Mi Goreng Hype Mieghetti Bolognese</Text>
      <Gap height={4} />
      <Text style={styles.price}>Rp. 2.500</Text>
      <View style={styles.containerDesc}>
        <Text style={styles.labelDesc}>Deskripsi</Text>
        <Gap height={8} />
        <Text style={styles.text}>
          Indomie Hype Abis Mieghetti Bolognese flavor, the latest innovation, a
          combination of noodles and spaghetti, complemented by a delicious and
          delicious Bolognese flavored creamy seasoning.
        </Text>
      </View>
      <View style={styles.row}>
        <IcPlus />
        <Gap width={12} />
        <View style={styles.borderAmount}>
          <Text style={styles.qty}>1</Text>
        </View>
        <Gap width={12} />
        <IcPlus />
      </View>
      <Gap height={20} />
      <View style={styles.button}>
        <Text style={styles.textButton}>Add to Cart</Text>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  containerCarousel: {
    height: height * 0.42,
    margin: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagesContainer: {
    width,
    height: height * 0.42,
    resizeMode: 'contain',
  },
  thumbnail: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(30),
  },
  border: (activeIndex, index) => ({
    backgroundColor: activeIndex === index ? 'rgba(0, 0, 0, 0.4)' : '#F2F2F2',
    width: normalize(100),
    height: normalize(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: normalize(3),
    borderColor: activeIndex === index ? '#FFFFFF' : 'transparent',
    borderRadius: normalize(8),
  }),
  images: {
    width: 60,
    height: 60,
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(16),
    color: '#E20613',
    paddingHorizontal: normalize(24),
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(20),
    color: '#E20613',
    paddingHorizontal: normalize(24),
  },
  containerDesc: {
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(8),
  },
  labelDesc: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(14),
    color: '#333333',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: '#B5B5B5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderAmount: {
    padding: normalize(6),
    borderWidth: 0.2,
    borderColor: '#B5B5B5',
    borderRadius: normalize(4),
  },
  qty: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: '#C20C17',
  },
  button: {
    backgroundColor: '#C20C17',
    marginHorizontal: normalize(54),
    paddingVertical: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(20),
  },
  textButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(22),
    color: '#FFD600',
  },
});
