/* eslint-disable prettier/prettier */
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const ShimmerUiUserList = () => {
  return (
    <>
      <View style={styles.ShimmerUiContainer}>
        <View style={styles.ShimmerUiCircle}>
          <ShimmerPlaceholder
            style={{width: 60, height: 60, borderRadius: 50}}
            shimmerColors={['#5C7CFA80', '#474FB680', '#5C7CFA80']}
          />
        </View>
        <View style={styles.ShimmerUiCircle}>
          <ShimmerPlaceholder
            isReversed={true}
            style={{width: 10, height: 10, borderRadius: 50}}
            shimmerColors={['#5C7CFA80', '#474FB680', '#5C7CFA80']}
          />
        </View>
        <View>
          <ShimmerPlaceholder
            style={{width: 250, height: 60, borderRadius: 20}}
            shimmerColors={['#5C7CFA80', '#474FB680', '#5C7CFA80']}
          />
        </View>
      </View>
    </>
  );
};

export const ShimmerUiButton = () => {
  return (
    <>
      <View style={styles.ShimmerUiContainer}>
        <View style={styles.ShimmerUiButton}>
          <ShimmerPlaceholder
            style={{width: 250, height: 55, borderRadius: 15}}
            shimmerColors={['#5C7CFA80', '#474FB680', '#5C7CFA80']}
          />
        </View>
      </View>
    </>
  );
};

export default ShimmerUiUserList;

const styles = StyleSheet.create({
  ShimmerUiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 10,
    marginHorizontal: 25,
  },
  ShimmerUiCircle: {
    marginRight: 20,
    justifyContent: 'center',
  },
  ShimmerUiButton: {
    alignSelf: 'center',
  },
});
