import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, useScreenMetrics} from '../theme';

type Props = {
  title: string;
  icon?: string;
  onBack?: () => void;
};

export function HeaderBar({
  title,
  icon = '📦',
  onBack,
}: Props): React.JSX.Element {
  const metrics = useScreenMetrics();

  return (
    <View
      style={[
        styles.header,
        metrics.compact ? styles.headerCompact : styles.headerRegular,
        {
          height: metrics.headerHeight,
          marginHorizontal: metrics.gutter,
        },
      ]}>
      <Pressable
        onPress={onBack}
        disabled={!onBack}
        hitSlop={14}
        style={[
          styles.iconBox,
          metrics.compact ? styles.iconBoxCompact : styles.iconBoxRegular,
        ]}>
        <Text
          style={[
            styles.icon,
            metrics.compact && styles.iconCompact,
            onBack && styles.back,
            onBack && metrics.compact && styles.backCompact,
          ]}>
          {onBack ? '←' : icon}
        </Text>
      </Pressable>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[styles.title, metrics.compact && styles.titleCompact]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
  },
  headerRegular: {
    paddingHorizontal: 30,
  },
  headerCompact: {
    borderRadius: 21,
    paddingHorizontal: 20,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxRegular: {
    height: 36,
    marginRight: 14,
    width: 36,
  },
  iconBoxCompact: {
    height: 30,
    marginRight: 10,
    width: 30,
  },
  icon: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  iconCompact: {
    fontSize: 20,
  },
  back: {
    fontSize: 32,
    lineHeight: 34,
  },
  backCompact: {
    fontSize: 28,
    lineHeight: 30,
  },
  title: {
    color: colors.text,
    flex: 1,
    fontSize: 24,
    fontWeight: '900',
  },
  titleCompact: {
    fontSize: 21,
  },
});
