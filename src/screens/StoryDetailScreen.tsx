import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ActionButtons} from '../components/ActionButtons';
import {HeaderBar} from '../components/HeaderBar';
import {OceanBackground} from '../components/OceanBackground';
import {SurfaceCard} from '../components/SurfaceCard';
import {stories} from '../data/content';
import {colors, useScreenMetrics} from '../theme';

type Props = {
  id: string;
  saved: boolean;
  onBack: () => void;
  onToggleSaved: () => void;
};

export function StoryDetailScreen({
  id,
  saved,
  onBack,
  onToggleSaved,
}: Props): React.JSX.Element {
  const metrics = useScreenMetrics();
  const story = stories.find(item => item.id === id) ?? stories[0];
  const paragraphs = story.content.split('\n\n');

  return (
    <OceanBackground>
      <View
        style={[
          styles.screen,
          {
            paddingTop: metrics.top,
            paddingBottom: metrics.bottom,
          },
        ]}>
        <HeaderBar title="Shark Route Stories" onBack={onBack} />
        <SurfaceCard
          style={[
            styles.card,
            {
              marginHorizontal: metrics.gutter,
            },
          ]}>
          <Text style={styles.title}>{story.title}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.textScroll}>
            {paragraphs.map((paragraph, index) => (
              <Text key={index} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </ScrollView>
          <ActionButtons
            saved={saved}
            title={story.title}
            message={`${story.title}\n\n${story.summary}`}
            onToggleSaved={onToggleSaved}
          />
        </SurfaceCard>
      </View>
    </OceanBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 24,
  },
  card: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 22,
    paddingTop: 32,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 22,
    textAlign: 'center',
  },
  textScroll: {
    flex: 1,
    marginBottom: 20,
  },
  paragraph: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 20,
    textAlign: 'center',
  },
});
