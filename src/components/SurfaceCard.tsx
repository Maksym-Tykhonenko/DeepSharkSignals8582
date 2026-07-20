import React from 'react';
import {StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native';
import {colors} from '../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function SurfaceCard({children, style}: Props): React.JSX.Element {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 18},
    shadowOpacity: 0.32,
    shadowRadius: 24,
    elevation: 12,
  },
});
