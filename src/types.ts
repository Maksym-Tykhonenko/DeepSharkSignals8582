import type {ImageSourcePropType} from 'react-native';

export type TabId = 'stories' | 'map' | 'photos' | 'quiz' | 'facts' | 'saved';

export type SavedEntityType = 'story' | 'location' | 'fact';

export type DetailRoute =
  | {type: 'story'; id: string}
  | {type: 'location'; id: string};

export type Story = {
  id: string;
  title: string;
  summary: string;
  content: string;
};

export type LocationSpot = {
  id: string;
  title: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  image?: ImageSourcePropType;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
};

export type FactItem = {
  id: string;
  title: string;
  text: string;
};

export type SavedItem = {
  type: SavedEntityType;
  id: string;
};

export type PhotoLog = {
  id: string;
  title: string;
  date: string;
  imageUri: string;
};
