import React, {useMemo, useRef, useState} from 'react';
import {
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {
  MAP_TYPES,
  Marker,
  PROVIDER_GOOGLE,
  type Region,
} from 'react-native-maps';
import {Images} from '../assets';
import {HeaderBar} from '../components/HeaderBar';
import {OceanBackground} from '../components/OceanBackground';
import {PrimaryButton} from '../components/PrimaryButton';
import {locations} from '../data/content';
import {colors, useScreenMetrics} from '../theme';

type Props = {
  onOpenLocation: (id: string) => void;
};

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#a8adb2'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#5b6168'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#d9dcdf'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#8b9298'}],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{color: '#bfc3c7'}],
  },
  {featureType: 'poi', stylers: [{visibility: 'off'}]},
  {featureType: 'road', elementType: 'geometry', stylers: [{color: '#cfd2d4'}]},
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#8f969d'}],
  },
];

const initialRegion: Region = {
  latitude: 2,
  longitude: -35,
  latitudeDelta: 120,
  longitudeDelta: 180,
};

export function MapScreen({onOpenLocation}: Props): React.JSX.Element {
  const mapRef = useRef<MapView>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>(initialRegion);
  const metrics = useScreenMetrics();
  const selected = useMemo(
    () => locations.find(location => location.id === selectedId),
    [selectedId],
  );
  const animateToRegion = (nextRegion: Region) => {
    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, 280);
  };
  const openMarker = (id: string) => {
    const location = locations.find(item => item.id === id);
    if (!location) {
      return;
    }

    setSelectedId(id);
    animateToRegion({
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
      latitudeDelta: Math.min(region.latitudeDelta, 24),
      longitudeDelta: Math.min(region.longitudeDelta, 34),
    });
  };
  const zoom = (factor: number) => {
    animateToRegion({
      ...region,
      latitudeDelta: Math.max(
        1.5,
        Math.min(120, region.latitudeDelta * factor),
      ),
      longitudeDelta: Math.max(
        1.5,
        Math.min(180, region.longitudeDelta * factor),
      ),
    });
  };
  const resetMap = () => {
    setSelectedId(null);
    animateToRegion(initialRegion);
  };

  return (
    <OceanBackground>
      <View style={[styles.screen, {paddingTop: metrics.top}]}>
        <HeaderBar title="Deep Water Map" icon="📍" />
        <View
          style={[
            styles.mapWrap,
            {
              marginHorizontal: metrics.gutter,
              marginBottom: metrics.navHeight + metrics.bottom + 22,
            },
          ]}>
          <MapView
            ref={mapRef}
            style={styles.map}
            customMapStyle={mapStyle}
            mapType={MAP_TYPES.STANDARD}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            toolbarEnabled={false}
            showsCompass={false}
            showsUserLocation={false}
            initialRegion={initialRegion}
            onRegionChangeComplete={setRegion}
            onPress={() => setSelectedId(null)}>
            {locations.map(location => (
              <Marker
                key={location.id}
                coordinate={location.coordinates}
                stopPropagation
                onPress={() => openMarker(location.id)}>
                <View style={styles.marker}>
                  <View style={styles.markerHead} />
                  <View style={styles.markerTail} />
                </View>
              </Marker>
            ))}
          </MapView>

          <View style={styles.mapControls}>
            <MapControlButton title="+" onPress={() => zoom(0.55)} />
            <MapControlButton title="-" onPress={() => zoom(1.65)} />
            <MapControlButton title="⌖" onPress={resetMap} />
          </View>

          {selected && (
            <View pointerEvents="box-none" style={styles.previewLayer}>
              <View style={styles.preview}>
                <Pressable
                  hitSlop={12}
                  onPress={() => setSelectedId(null)}
                  style={styles.close}>
                  <Text style={styles.closeText}>×</Text>
                </Pressable>
                <ImageBackground
                  source={selected.image ?? Images.oceanBackground}
                  imageStyle={styles.previewImageRadius}
                  resizeMode="cover"
                  style={styles.previewImage}
                />
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={styles.previewTitle}>
                  {selected.title} - {selected.country}
                </Text>
                <Text numberOfLines={2} style={styles.previewCoordinates}>
                  Coordinates: {selected.coordinates.latitude.toFixed(4)},{' '}
                  {selected.coordinates.longitude.toFixed(4)}
                </Text>
                <View style={styles.previewActions}>
                  <PrimaryButton
                    title="Open detail"
                    onPress={() => onOpenLocation(selected.id)}
                    style={styles.openButton}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </OceanBackground>
  );
}

function MapControlButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.controlButton,
        pressed && styles.controlButtonPressed,
      ]}>
      <Text style={styles.controlText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 24,
  },
  mapWrap: {
    borderRadius: 16,
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    alignItems: 'center',
    height: 72,
    width: 34,
  },
  markerHead: {
    backgroundColor: colors.red,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    borderWidth: 2,
    height: 30,
    width: 30,
  },
  markerTail: {
    backgroundColor: colors.red,
    borderRadius: 4,
    height: 46,
    marginTop: -3,
    width: 6,
  },
  mapControls: {
    gap: 10,
    position: 'absolute',
    right: 14,
    top: 14,
  },
  controlButton: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.22,
    shadowRadius: 10,
    width: 44,
  },
  controlButtonPressed: {
    transform: [{scale: 0.94}],
  },
  controlText: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '900',
    lineHeight: 26,
  },
  previewLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  preview: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderRadius: 20,
    padding: 24,
    width: '100%',
  },
  previewImage: {
    height: 118,
    overflow: 'hidden',
    width: '100%',
  },
  previewImageRadius: {
    borderRadius: 12,
  },
  previewTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 18,
    textAlign: 'center',
  },
  previewCoordinates: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 10,
    textAlign: 'center',
  },
  previewActions: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 18,
  },
  openButton: {
    height: 56,
    minWidth: 160,
  },
  close: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 14, 28, 0.62)',
    borderRadius: 15,
    height: 44,
    justifyContent: 'center',
    position: 'absolute',
    right: 14,
    top: 14,
    width: 44,
    zIndex: 2,
  },
  closeText: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 34,
  },
});
