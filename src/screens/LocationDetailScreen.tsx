import React from 'react';
import {
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
import {SurfaceCard} from '../components/SurfaceCard';
import {locations} from '../data/content';
import {colors, useScreenMetrics} from '../theme';

type Props = {
  id: string;
  saved: boolean;
  onBack: () => void;
  onToggleSaved: () => void;
};

export function LocationDetailScreen({
  id,
  saved,
  onBack,
  onToggleSaved,
}: Props): React.JSX.Element {
  const metrics = useScreenMetrics();
  const location = locations.find(item => item.id === id) ?? locations[0];
  const coordinateText = `${location.coordinates.latitude.toFixed(
    4,
  )}, ${location.coordinates.longitude.toFixed(4)}`;

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
        <HeaderBar title="Deep Water Map" onBack={onBack} />
        <SurfaceCard style={[styles.card, {marginHorizontal: metrics.gutter}]}>
          <ImageBackground
            source={location.image ?? Images.oceanBackground}
            resizeMode="cover"
            imageStyle={styles.imageRadius}
            style={styles.image}
          />
          <Text style={styles.title}>
            {location.title} - {location.country}
          </Text>
          <Text style={styles.coordinates}>Coordinates: {coordinateText}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scroll}>
            <Text style={styles.description}>{location.description}</Text>
          </ScrollView>
          <ActionButtons
            saved={saved}
            title={location.title}
            message={`${location.title} - ${location.country}\nCoordinates: ${coordinateText}\n\n${location.description}`}
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
    padding: 28,
  },
  image: {
    height: 146,
    overflow: 'hidden',
    width: '100%',
  },
  imageRadius: {
    borderRadius: 14,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 24,
    textAlign: 'center',
  },
  coordinates: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  scroll: {
    flex: 1,
    marginBottom: 18,
    marginTop: 26,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
});
