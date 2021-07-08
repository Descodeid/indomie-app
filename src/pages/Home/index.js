import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {IcCategory, IcSearch, IcSend} from '../../assets';
import {Gap, ListProduct} from '../../components';
import Banner from '../../assets/JSON/Banner';

const Home = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const {width} = useWindowDimensions();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const slidersRef = React.useRef(null);

  const viewableItemsChanged = React.useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;
  return (
    <View style={styles.page}>
      <StatusBar hidden />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={57} />
        <View style={styles.row}>
          <IcCategory />
          <View style={styles.borderSend}>
            <IcSend />
          </View>
        </View>
        <Gap height={30} />
        <Text style={styles.welcome}>Hello, Lisa!</Text>
        <Gap height={16} />
        <View style={styles.inputContainer}>
          <IcSearch />
          <Gap width={12} />
          <TextInput
            placeholder="Search Your Favorite Indomie"
            placeholderTextColor="#B5B5B5"
            style={styles.input}
          />
        </View>
        <Gap height={20} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingHorizontal: normalize(24)}}>
          <View style={styles.borderActive}>
            <Text style={styles.textWhite}>All</Text>
          </View>
          <Gap width={12} />
          <View style={styles.border}>
            <Text style={styles.textGray}>Mi Coto Makassar</Text>
          </View>
          <Gap width={12} />
          <View style={styles.border}>
            <Text style={styles.textGray}>Mi Kaldu Ayam</Text>
          </View>
        </ScrollView>
        <Gap height={15} />
        <View>
          <FlatList
            data={Banner}
            renderItem={({item}) => (
              <Image source={item.image} resizeMethod="scale" />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            // bounces={false}
            snapToInterval={width}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidersRef}
          />
          <View style={styles.container}>
            {Banner.map((_, i) => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
              });
              return (
                <Animated.View
                  style={[styles.dot, {opacity}]}
                  key={i.toString()}
                />
              );
            })}
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.row}>
          <Text style={styles.label}>Top Search</Text>
          <Text style={styles.more}>See all</Text>
        </View>
        <Gap height={20} />
        <View style={styles.product}>
          <ListProduct onPress={() => navigation.navigate('Detail')} />
          <ListProduct />
        </View>
        <Gap height={100} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(24),
  },
  borderSend: {
    backgroundColor: '#FFFFFF',
    width: normalize(48),
    height: normalize(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(10),
    shadowColor: '#F0F0F0',
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 14,
    shadowRadius: 6.27,
  },
  welcome: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(24),
    color: '#000000',
    paddingHorizontal: normalize(24),
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: normalize(16),
    borderRadius: normalize(12),
    shadowColor: '#F7F7F7',
    shadowOffset: {
      width: 12,
      height: 6,
    },
    shadowOpacity: 24,
    shadowRadius: 6.27,
    paddingHorizontal: normalize(24),
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: '#3D3D3D',
  },
  borderActive: {
    backgroundColor: '#E20613',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
    borderRadius: normalize(40),
  },
  border: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
    borderRadius: normalize(40),
  },
  textWhite: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(16),
    color: '#FFFFFF',
  },
  textGray: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(16),
    color: '#B6B6B6',
  },
  dot: {
    width: normalize(8),
    height: normalize(8),
    backgroundColor: '#A0A0A0',
    borderRadius: normalize(8),
    marginHorizontal: normalize(3),
    marginTop: normalize(-20),
  },
  content: {
    paddingHorizontal: normalize(24),
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(20),
    color: '#130F26',
  },
  more: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(16),
    color: '#C20C17',
  },
  product: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(24),
  },
});
