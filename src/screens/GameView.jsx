import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  Image,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const GameView = ({navigation, route}) => {
  const initialUrl = route.params?.url;
  const customUserAgent = route.params?.customUserAgent;

  const webViewRef = useRef(null);
  const loadingTimeoutRef = useRef(null);
  const externalAppOpenedRef = useRef(false);
  const recoveryInProgressRef = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [webViewKey, setWebViewKey] = useState(0);

  const clearLoadingTimeout = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      console.log('GameWebView APP STATE ==>', nextState);

      if (nextState === 'active' && externalAppOpenedRef.current) {
        externalAppOpenedRef.current = false;

        clearLoadingTimeout();
        setIsLoading(false);
      }
    });

    return () => {
      subscription.remove();
      clearLoadingTimeout();
    };
  }, []);

  const isJavascriptScheme = url => {
    if (!url) {
      return false;
    }

    return url.toLowerCase().startsWith('javascript:');
  };

  const isInternalWebUrl = url => {
    if (!url) {
      return false;
    }

    const normalizedUrl = url.toLowerCase();

    return (
      normalizedUrl.startsWith('http://') ||
      normalizedUrl.startsWith('https://') ||
      normalizedUrl.startsWith('about:') ||
      normalizedUrl.startsWith('blob:') ||
      normalizedUrl.startsWith('data:')
    );
  };

  const openExternalUrl = async url => {
    if (!url) {
      return;
    }

    externalAppOpenedRef.current = true;
    setIsLoading(false);

    try {
      console.log('GameWebView EXTERNAL URL ==>', url);

      await Linking.openURL(url);
    } catch (error) {
      externalAppOpenedRef.current = false;

      console.warn('GameWebView external URL error:', url, error);

      Alert.alert(
        'App not installed',
        'There is no application installed to open this link.',
      );
    }
  };

  const navigateCurrentWebViewToUrl = url => {
    if (!url || !webViewRef.current) {
      return;
    }

    webViewRef.current.injectJavaScript(`
      window.location.href = ${JSON.stringify(url)};
      true;
    `);
  };

  const handleShouldStartLoad = event => {
    const url = event?.url || '';

    console.log('GameWebView should start ==>', event);

    if (!url) {
      setIsLoading(false);
      return false;
    }

    const normalizedUrl = url.toLowerCase();

    if (isJavascriptScheme(url)) {
      console.log('GameWebView blocked javascript URL ==>', url);
      setIsLoading(false);
      return false;
    }

    /*
     * Слот може перейти на about:blank під час закриття popup.
     * У такому випадку закриваємо GameWebView і повертаємося
     * до недоторканого ProductScreen.
     */
    if (normalizedUrl === 'about:blank') {
      console.log('GameWebView ignored about:blank navigation');
      setIsLoading(false);
      return false;
    }

    if (isInternalWebUrl(url)) {
      return true;
    }

    openExternalUrl(url);
    return false;
  };

  const handleOpenWindow = event => {
    const targetUrl = event?.nativeEvent?.targetUrl;

    console.log('GameWebView onOpenWindow ==>', targetUrl);

    if (!targetUrl) {
      setIsLoading(false);
      return;
    }

    const normalizedUrl = targetUrl.toLowerCase();

    if (normalizedUrl === 'about:blank') {
      console.log('GameWebView ignored about:blank popup');
      setIsLoading(false);
      return;
    }

    if (isJavascriptScheme(targetUrl)) {
      console.log('GameWebView blocked javascript popup ==>', targetUrl);

      setIsLoading(false);
      return;
    }

    /*
     * Якщо сама гра відкриває ще один web-popup,
     * завантажуємо його всередині дочірнього GameWebView.
     *
     * Головний ProductScreen це вже не зачіпає.
     */
    if (
      normalizedUrl.startsWith('http://') ||
      normalizedUrl.startsWith('https://')
    ) {
      navigateCurrentWebViewToUrl(targetUrl);
      return;
    }

    if (
      normalizedUrl.startsWith('blob:') ||
      normalizedUrl.startsWith('data:')
    ) {
      console.log('GameWebView ignored technical popup ==>', targetUrl);

      setIsLoading(false);
      return;
    }

    openExternalUrl(targetUrl);
  };

  const handleLoadStart = event => {
    const url = event?.nativeEvent?.url || '';

    console.log('GameWebView LOAD START ==>', url);

    if (externalAppOpenedRef.current) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    clearLoadingTimeout();

    loadingTimeoutRef.current = setTimeout(() => {
      console.warn('GameWebView loading timeout ==>', url);

      loadingTimeoutRef.current = null;
      setIsLoading(false);
    }, 15000);
  };

  const handleLoadEnd = () => {
    clearLoadingTimeout();
    setIsLoading(false);
  };

  const handleWebViewError = event => {
    const nativeEvent = event?.nativeEvent;
    const url = nativeEvent?.url || '';

    console.warn('GameWebView error ==>', nativeEvent);

    clearLoadingTimeout();
    setIsLoading(false);

    if (url.startsWith('about:')) {
      return;
    }
  };

  /*
   * Викликається, коли iOS завершує WKWebView content process,
   * наприклад через нестачу пам’яті.
   *
   * key змушує React знищити старий native WKWebView
   * і створити новий екземпляр.
   */
  const handleContentProcessDidTerminate = event => {
    console.warn(
      'GameWebView WKWebView CONTENT PROCESS TERMINATED ==>',
      event?.nativeEvent,
    );

    if (recoveryInProgressRef.current) {
      return;
    }

    recoveryInProgressRef.current = true;

    clearLoadingTimeout();

    externalAppOpenedRef.current = false;
    setIsLoading(true);

    setWebViewKey(previousKey => previousKey + 1);

    setTimeout(() => {
      recoveryInProgressRef.current = false;
    }, 2000);
  };

  const closeGameBtn = () => {
    navigation.goBack();
  };

  const reloadPageBtn = () => {
    setIsLoading(true);
    webViewRef.current?.reload();
  };

  const LoadingIndicatorView = () => (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191d24',
      }}>
      <ActivityIndicator size="large" color="#40b8ff" />
    </View>
  );

  if (!initialUrl) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#191d24',
        }}>
        <ActivityIndicator size="large" color="#40b8ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#191d24',
      }}>
      {isLoading && <LoadingIndicatorView />}

      <WebView
        key={webViewKey}
        ref={webViewRef}
        source={{uri: initialUrl}}
        userAgent={customUserAgent}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={handleShouldStartLoad}
        onOpenWindow={handleOpenWindow}
        onError={handleWebViewError}
        onHttpError={handleWebViewError}
        onContentProcessDidTerminate={handleContentProcessDidTerminate}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        textZoom={100}
        allowsBackForwardNavigationGestures
        domStorageEnabled
        javaScriptEnabled
        allowsInlineMediaPlayback
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess
        javaScriptCanOpenWindowsAutomatically
        style={{flex: 1}}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 10,
          paddingBottom: 6,
          backgroundColor: '#191d24',
        }}>
        <TouchableOpacity
          style={{marginLeft: 40}}
          onPress={closeGameBtn}
          activeOpacity={0.7}>
          <Image
            style={{width: 30, height: 33}}
            source={require('../assets/icons/arrow77.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginRight: 40}}
          onPress={reloadPageBtn}
          activeOpacity={0.7}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/icons/redo77.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default GameView;