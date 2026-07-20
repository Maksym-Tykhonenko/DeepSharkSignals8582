/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-webview', () => {
  const {View} = require('react-native');
  return {WebView: View};
});

jest.mock('react-native-maps', () => {
  const {View} = require('react-native');
  return {
    __esModule: true,
    default: View,
    MAP_TYPES: {NONE: 'none', STANDARD: 'standard'},
    Marker: View,
    PROVIDER_GOOGLE: 'google',
  };
});

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(() => Promise.resolve({assets: []})),
}));

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('renders correctly', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    await Promise.resolve();
  });

  await ReactTestRenderer.act(async () => {
    renderer?.unmount();
  });
});
