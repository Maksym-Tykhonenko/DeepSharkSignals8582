import React from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme';

type Props = {
  saved: boolean;
  title: string;
  message: string;
  onToggleSaved: () => void;
};

export function ActionButtons({
  saved,
  title,
  message,
  onToggleSaved,
}: Props): React.JSX.Element {
  const handleShare = async () => {
    await Share.share({title, message});
  };

  return (
    <View style={styles.actions}>
      <Pressable
        onPress={onToggleSaved}
        style={({pressed}) => [
          styles.bookmark,
          saved && styles.bookmarkSaved,
          pressed && styles.pressed,
        ]}>
        <Text style={styles.bookmarkIcon}>🔖</Text>
      </Pressable>
      <Pressable
        onPress={handleShare}
        style={({pressed}) => [styles.share, pressed && styles.pressed]}>
        <Text style={styles.shareText}>Share</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  bookmark: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderColor: colors.green,
    borderRadius: 16,
    borderWidth: 1,
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
  bookmarkSaved: {
    backgroundColor: 'transparent',
  },
  bookmarkIcon: {
    fontSize: 24,
  },
  share: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 16,
    height: 70,
    justifyContent: 'center',
    minWidth: 114,
    paddingHorizontal: 22,
  },
  shareText: {
    color: '#00100a',
    fontSize: 17,
    fontWeight: '900',
  },
  pressed: {
    transform: [{scale: 0.97}],
  },
});
