import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcCart, IcFavorite, IcHome, IcProfile} from '../../../assets';

const Icon = ({label, active}) => {
  switch (label) {
    case 'Home':
      return active ? <IcHome /> : <IcHome />;
    case 'Cart':
      return active ? <IcCart /> : <IcCart />;
    case 'Favorite':
      return active ? <IcFavorite /> : <IcFavorite />;
    case 'Profile':
      return active ? <IcProfile /> : <IcProfile />;

    default:
      <IcHome />;
  }
  return <IcHome />;
};

const BottomNavigation = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <View key={index} style={styles.center}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.menu}>
                <Icon label={label} active={isFocused} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#C20C17',
    justifyContent: 'space-between',
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(32),
    marginHorizontal: normalize(23),
    borderRadius: normalize(30),
    position: 'absolute',
    bottom: 28,
    elevation: 10,
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
