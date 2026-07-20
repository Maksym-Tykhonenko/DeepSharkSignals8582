import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {TabId} from '../types';
import {colors, useScreenMetrics} from '../theme';

type Props = {
  active: TabId;
  onChange: (tab: TabId) => void;
};

const tabs: Array<{id: TabId; icon: string; label: string}> = [
  {id: 'stories', icon: '📚', label: 'Stories'},
  {id: 'map', icon: '📍', label: 'Map'},
  {id: 'photos', icon: '🖼️', label: 'Photos'},
  {id: 'quiz', icon: '🧾', label: 'Quiz'},
  {id: 'facts', icon: '✅', label: 'Facts'},
  {id: 'saved', icon: '🔖', label: 'Saved'},
];

export function FloatingTabBar({active, onChange}: Props): React.JSX.Element {
  const metrics = useScreenMetrics();

  return (
    <View
      style={[
        styles.wrap,
        metrics.compact && styles.wrapCompact,
        {
          bottom: metrics.bottom,
          height: metrics.navHeight,
          width: metrics.navWidth,
          marginLeft: -metrics.navWidth / 2,
        },
      ]}>
      {tabs.map(tab => {
        const selected = tab.id === active;
        return (
          <Pressable
            accessibilityLabel={tab.label}
            hitSlop={8}
            key={tab.id}
            onPress={() => onChange(tab.id)}
            style={({pressed}) => [
              styles.item,
              metrics.compact && styles.itemCompact,
              selected && styles.active,
              pressed && styles.pressed,
            ]}>
            <Text
              style={[
                styles.icon,
                metrics.compact && styles.iconCompact,
                selected && styles.activeIcon,
              ]}>
              {tab.icon}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    left: '50%',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 14},
    shadowOpacity: 0.34,
    shadowRadius: 22,
    elevation: 18,
    zIndex: 20,
  },
  wrapCompact: {
    borderRadius: 20,
  },
  item: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  itemCompact: {
    borderRadius: 15,
    height: 42,
    width: 42,
  },
  active: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderColor: 'rgba(255, 255, 255, 0.26)',
  },
  icon: {
    fontSize: 22,
    opacity: 0.62,
  },
  iconCompact: {
    fontSize: 20,
  },
  activeIcon: {
    opacity: 1,
  },
  pressed: {
    transform: [{scale: 0.95}],
  },
});
