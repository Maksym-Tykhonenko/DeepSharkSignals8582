import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {Images} from '../assets';
import {OceanBackground} from '../components/OceanBackground';

export function LoaderScreen(): React.JSX.Element {
  const motion = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(motion, {
          toValue: 1,
          duration: 1350,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(motion, {
          toValue: 0,
          duration: 1350,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [motion]);

  const translateY = motion.interpolate({
    inputRange: [0, 1],
    outputRange: [7, -9],
  });
  const rotate = motion.interpolate({
    inputRange: [0, 1],
    outputRange: ['-4deg', '4deg'],
  });
  const sharkScale = motion.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1.04],
  });
  const glowScale = motion.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.14],
  });
  const glowOpacity = motion.interpolate({
    inputRange: [0, 1],
    outputRange: [0.36, 0.72],
  });
  const glowAnimatedStyle = {
    opacity: glowOpacity,
    transform: [{scale: glowScale}],
  };
  const sharkAnimatedStyle = {
    transform: [{translateY}, {rotate}, {scale: sharkScale}],
  };

  return (
    <OceanBackground>
      <View style={styles.center}>
        <Animated.View style={[styles.glow, glowAnimatedStyle]} />
        <Animated.Image
          source={Images.sharkMascot}
          resizeMode="contain"
          style={[styles.shark, sharkAnimatedStyle]}
        />
      </View>
    </OceanBackground>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  glow: {
    backgroundColor: 'rgba(65, 212, 255, 0.34)',
    borderRadius: 110,
    height: 220,
    position: 'absolute',
    shadowColor: '#55d8ff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 36,
    width: 220,
  },
  shark: {
    height: 148,
    width: 148,
  },
});
