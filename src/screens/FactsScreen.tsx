import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ActionButtons} from '../components/ActionButtons';
import {HeaderBar} from '../components/HeaderBar';
import {OceanBackground} from '../components/OceanBackground';
import {SurfaceCard} from '../components/SurfaceCard';
import {facts} from '../data/content';
import {colors, useScreenMetrics} from '../theme';

type Props = {
  isSaved: (id: string) => boolean;
  onToggleSaved: (id: string) => void;
};

export function FactsScreen({
  isSaved,
  onToggleSaved,
}: Props): React.JSX.Element {
  const metrics = useScreenMetrics();

  return (
    <OceanBackground>
      <View style={[styles.screen, {paddingTop: metrics.top}]}>
        <HeaderBar title="Shark facts" icon="✅" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            {
              paddingHorizontal: metrics.gutter,
              paddingBottom: metrics.navHeight + metrics.bottom + 22,
            },
          ]}>
          {facts.map(fact => (
            <SurfaceCard key={fact.id} style={styles.card}>
              <Text style={styles.title}>{fact.title}</Text>
              <Text style={styles.text}>{fact.text}</Text>
              <ActionButtons
                saved={isSaved(fact.id)}
                title={fact.title}
                message={fact.text}
                onToggleSaved={() => onToggleSaved(fact.id)}
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
    gap: 16,
  },
  card: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 28,
    marginTop: 26,
    textAlign: 'center',
  },
});
