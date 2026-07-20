import React, {useMemo} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Images} from '../assets';
import {ActionButtons} from '../components/ActionButtons';
import {HeaderBar} from '../components/HeaderBar';
import {OceanBackground} from '../components/OceanBackground';
import {PrimaryButton} from '../components/PrimaryButton';
import {SurfaceCard} from '../components/SurfaceCard';
import {facts, locations, stories} from '../data/content';
import {colors, useScreenMetrics} from '../theme';
import type {FactItem, LocationSpot, SavedItem, Story} from '../types';

type Props = {
  savedItems: SavedItem[];
  onToggleSaved: (item: SavedItem) => void;
  onOpenStory: (id: string) => void;
  onOpenLocation: (id: string) => void;
};

type ResolvedSavedItem =
  | {kind: 'story'; item: SavedItem; story: Story}
  | {kind: 'location'; item: SavedItem; location: LocationSpot}
  | {kind: 'fact'; item: SavedItem; fact: FactItem};

export function SavedScreen({
  savedItems,
  onToggleSaved,
  onOpenStory,
  onOpenLocation,
}: Props): React.JSX.Element {
  const metrics = useScreenMetrics();
  const resolved = useMemo(() => {
    return savedItems.reduce<ResolvedSavedItem[]>((items, item) => {
      if (item.type === 'story') {
        const story = stories.find(value => value.id === item.id);
        return story ? [...items, {kind: 'story', item, story}] : items;
      }
      if (item.type === 'location') {
        const location = locations.find(value => value.id === item.id);
        return location
          ? [...items, {kind: 'location', item, location}]
          : items;
      }
      const fact = facts.find(value => value.id === item.id);
      return fact ? [...items, {kind: 'fact', item, fact}] : items;
    }, []);
  }, [savedItems]);

  return (
    <OceanBackground>
      <View style={[styles.screen, {paddingTop: metrics.top}]}>
        <HeaderBar title="Saved" icon="🔖" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            {
              paddingHorizontal: metrics.gutter,
              paddingBottom: metrics.navHeight + metrics.bottom + 22,
            },
          ]}>
          {resolved.length === 0 ? (
            <>
              <SurfaceCard style={styles.emptyCard}>
                <Image
                  source={Images.sharkMascot}
                  resizeMode="contain"
                  style={styles.emptyImage}
                />
                <Text style={styles.emptyTitle}>Information:</Text>
                <Text style={styles.emptyText}>
                  There is no save, save it and it will appear here.
                </Text>
              </SurfaceCard>
              <Text style={styles.recommended}>Recommended:</Text>
              <FactSavedCard
                title={facts[0].title}
                text={facts[0].text}
                saved={false}
                onToggleSaved={() =>
                  onToggleSaved({type: 'fact', id: facts[0].id})
                }
              />
            </>
          ) : (
            resolved.map(entry => {
              if (entry.kind === 'story') {
                return (
                  <SurfaceCard
                    key={`story-${entry.story.id}`}
                    style={styles.storyCard}>
                    <Text style={styles.cardTitle}>{entry.story.title}</Text>
                    <Text style={styles.cardText}>{entry.story.summary}</Text>
                    <PrimaryButton
                      title="Open story"
                      onPress={() => onOpenStory(entry.story.id)}
                      style={styles.openStory}
                    />
                  </SurfaceCard>
                );
              }
              if (entry.kind === 'location') {
                return (
                  <SurfaceCard
                    key={`location-${entry.location.id}`}
                    style={styles.locationCard}>
                    <ImageBackground
                      source={entry.location.image ?? Images.oceanBackground}
                      resizeMode="cover"
                      imageStyle={styles.locationImageRadius}
                      style={styles.locationImage}
                    />
                    <View style={styles.locationBottom}>
                      <Text numberOfLines={2} style={styles.locationTitle}>
                        {entry.location.title} - {entry.location.country}
                      </Text>
                      <PrimaryButton
                        title="Open"
                        onPress={() => onOpenLocation(entry.location.id)}
                        style={styles.openLocation}
                      />
                    </View>
                  </SurfaceCard>
                );
              }
              return (
                <FactSavedCard
                  key={`fact-${entry.fact.id}`}
                  title={entry.fact.title}
                  text={entry.fact.text}
                  saved
                  onToggleSaved={() =>
                    onToggleSaved({type: 'fact', id: entry.fact.id})
                  }
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </OceanBackground>
  );
}

function FactSavedCard({
  title,
  text,
  saved,
  onToggleSaved,
}: {
  title: string;
  text: string;
  saved: boolean;
  onToggleSaved: () => void;
}) {
  return (
    <SurfaceCard style={styles.factCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
      <ActionButtons
        saved={saved}
        title={title}
        message={text}
        onToggleSaved={onToggleSaved}
      />
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    paddingTop: 24,
    gap: 16,
  },
  emptyCard: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 34,
  },
  emptyImage: {
    height: 92,
    width: 92,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 24,
  },
  emptyText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 26,
    textAlign: 'center',
  },
  recommended: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
    marginTop: 20,
    textAlign: 'center',
  },
  storyCard: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 32,
  },
  factCard: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  cardText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 26,
    marginTop: 26,
    textAlign: 'center',
  },
  openStory: {
    width: 232,
  },
  locationCard: {
    padding: 24,
  },
  locationImage: {
    height: 148,
    overflow: 'hidden',
    width: '100%',
  },
  locationImageRadius: {
    borderRadius: 14,
  },
  locationBottom: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    marginTop: 22,
  },
  locationTitle: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '900',
  },
  openLocation: {
    height: 58,
    minWidth: 108,
  },
});
