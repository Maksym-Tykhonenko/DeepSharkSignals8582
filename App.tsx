import React, {useEffect, useState}  from 'react';
import {StatusBar} from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { LogLevel, OneSignal } from 'react-native-onesignal';

function App(): React.JSX.Element {
  const [initialUrl, setInitialUrl] = useState('https://fast-gate-sys.top/');
  const [initialId, setInitialId] = useState('4sSVdul0');
  const [oneSignKkkk, setOneSignKkkk] = useState('0989f91f-15fd-4030-ae71-4a5dd8c543ce')

  useEffect(() => {

    const initOnsignall = async () => {
      try {
        // Verbose-логи лишаємо тільки в дебазі
        if (__DEV__) {
          OneSignal.Debug.setLogLevel(LogLevel.Verbose);
        }

        // OneSignal ініціалізація
        if (oneSignKkkk) {
          OneSignal.initialize(oneSignKkkk);
        }
      } catch (e) {
        console.log('OneSignal init error:', e);
      }
    };
    
    initOnsignall();
    
  }, []);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AppNavigator
        initialUrl={initialUrl}
        initialId={initialId}
        oneSignKkkk={oneSignKkkk}
      />
    </>
  );
}

export default App;
