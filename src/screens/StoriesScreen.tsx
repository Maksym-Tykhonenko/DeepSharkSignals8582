import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {HeaderBar} from '../components/HeaderBar';
import {OceanBackground} from '../components/OceanBackground';
import {PrimaryButton} from '../components/PrimaryButton';
import {SurfaceCard} from '../components/SurfaceCard';
import {stories} from '../data/content';
import {colors, useScreenMetrics} from '../theme';

type Props = {
  onOpenStory: (id: string) => void;
};

export function StoriesScreen({onOpenStory}: Props): React.JSX.Element {
  const metrics = useScreenMetrics();

  return (
    <OceanBackground>
      <View style={[styles.screen, {paddingTop: metrics.top}]}>
        <HeaderBar title="Shark Route Stories" icon="📚" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            {
              paddingHorizontal: metrics.gutter,
              paddingBottom: metrics.navHeight + metrics.bottom + 22,
            },
          ]}>
          {stories.map(story => (
            <SurfaceCard key={story.id} style={styles.card}>
              <Text style={styles.cardTitle}>{story.title}</Text>
              <Text style={styles.summary}>{story.summary}</Text>
              <PrimaryButton
                title="Open story"
                onPress={() => onOpenStory(story.id)}
                style={styles.button}
              />
            </SurfaceCard>
          ))}
        </ScrollView>
      </View>
    </OceanBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    paddingTop: 24,
    gap: 18,
  },
  card: {
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingVertical: 30,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  summary: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 24,
    textAlign: 'center',
  },
  button: {
    height: 68,
    marginTop: 24,
    width: 232,
  },
});
