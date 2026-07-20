import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Images} from '../assets';

type Props = {
  children: React.ReactNode;
};

export function OceanBackground({children}: Props): React.JSX.Element {
  return (
    <ImageBackground
      source={Images.oceanBackground}
      resizeMode="cover"
      style={styles.background}>
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#00182f',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 13, 27, 0.08)',
  },
});
