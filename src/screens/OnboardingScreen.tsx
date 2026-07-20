import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {Images} from '../assets';
import {OceanBackground} from '../components/OceanBackground';
import {PrimaryButton} from '../components/PrimaryButton';
import {SurfaceCard} from '../components/SurfaceCard';
import {colors, useScreenMetrics} from '../theme';

type Slide = {
  title: string;
  text: string;
  image: ImageSourcePropType;
  button: string;
};

const slides: Slide[] = [
  {
    title: 'Deep Sea Routes',
    text: "Hi, I'm Cindy! Together we will explore ocean routes, reefs and mysterious underwater places. You can always find something interesting in deep water.",
    image: Images.sharkMascot,
    button: 'Continue',
  },
  {
    title: 'Ocean Stories and Signals',
    text: 'I have collected for you atmospheric stories, underwater notes and interesting signals from different corners of the ocean. There are many strange finds and unexpected facts.',
    image: Images.onboardingStories,
    button: 'Okay',
  },
  {
    title: 'Interactive Ocean Map',
    text: 'On the map you will find special labels with underwater locations. Click on them, open the coordinates, read the descriptions and explore the ocean with me.',
    image: Images.onboardingMap,
    button: 'Nice',
  },
  {
    title: 'Saved Expedition',
    text: 'Did you like a place or story? Save them to your own expedition to quickly return to your favorite ocean discoveries.',
    image: Images.onboardingSaved,
    button: 'Start now',
  },
];

type Props = {
  onDone: () => void;
};

export function OnboardingScreen({onDone}: Props): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const metrics = useScreenMetrics();
  const slide = slides[index];
  const imageSize = metrics.compact ? 170 : index === 0 ? 250 : 230;
  const next = () => {
    if (index === slides.length - 1) {
      onDone();
      return;
    }
    setIndex(current => current + 1);
  };

  return (
    <OceanBackground>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            minHeight: metrics.height,
            paddingTop: metrics.top,
            paddingBottom: metrics.bottom,
            paddingHorizontal: metrics.gutter,
          },
        ]}>
        <SurfaceCard
          style={[
            styles.card,
            metrics.compact ? styles.cardCompact : styles.cardRegular,
            {
              minHeight: Math.min(
                metrics.height - metrics.top - metrics.bottom,
                metrics.compact ? 620 : 704,
              ),
            },
          ]}>
          <View style={styles.copy}>
            <Text
              style={[styles.title, metrics.compact && styles.titleCompact]}>
              {slide.title}
            </Text>
            <Text style={[styles.body, metrics.compact && styles.bodyCompact]}>
              {slide.text}
            </Text>
          </View>

          <Image
            source={slide.image}
            resizeMode="contain"
            style={[
              styles.image,
              {
                height: imageSize,
                width: imageSize,
              },
            ]}
          />

          <View style={styles.footer}>
            <View style={styles.dots}>
              {slides.map((_, dotIndex) => (
                <View
                  key={dotIndex}
                  style={[styles.dot, dotIndex <= index && styles.dotActive]}
                />
              ))}
            </View>
            <PrimaryButton
              title={slide.button}
              onPress={next}
              style={[styles.button, metrics.compact && styles.buttonCompact]}
            />
            <Pressable onPress={onDone} hitSlop={12}>
              <Text style={styles.skip}>skip</Text>
            </Pressable>
          </View>
        </SurfaceCard>
      </ScrollView>
    </OceanBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 34,
  },
  cardRegular: {
    paddingVertical: 44,
  },
  cardCompact: {
    paddingVertical: 26,
  },
  copy: {
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 18,
  },
  body: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 26,
    textAlign: 'center',
  },
  bodyCompact: {
    fontSize: 14,
    lineHeight: 18,
    marginTop: 18,
  },
  image: {
    marginVertical: 18,
  },
  footer: {
    alignItems: 'center',
    width: '100%',
  },
  dots: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 58,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 5,
    width: 48,
  },
  dotActive: {
    backgroundColor: colors.text,
  },
  button: {
    width: 232,
  },
  buttonCompact: {
    height: 58,
    width: 210,
  },
  skip: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 26,
    textDecorationLine: 'underline',
  },
});
