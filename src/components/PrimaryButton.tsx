import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {colors} from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export function PrimaryButton({
  title,
  onPress,
  style,
  disabled,
}: Props): React.JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 16,
    height: 68,
    justifyContent: 'center',
    minWidth: 160,
    paddingHorizontal: 28,
  },
  text: {
    color: '#00100a',
    fontSize: 17,
    fontWeight: '800',
  },
  disabled: {
    backgroundColor: colors.greenDark,
    opacity: 0.9,
  },
  pressed: {
    transform: [{scale: 0.98}],
  },
});
