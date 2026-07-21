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
  Text
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const ProdView = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const [product, setProduct] = useState(route.params?.product);
  //const [timeStampUserId, setTimeStampUserId] = useState(
  //  route.params?.timeStampUserId,
  //);

  const [customUserAgent] = useState(route.params?.customUserAgent);

  const [redirectUrl, setRedirectUrl] = useState(product);
  const [checkNineUrl, setCheckNineUrl] = useState();

  const [isLoading, setIsLoading] = useState(true); // Стан завантаження

  const externalAppOpenedRef = useRef(false);
  const loadingTimeoutRef = useRef(null);
  const gameTransitionRef = useRef(false);

  const refWebview = useRef(null);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextState => {
      console.log('APP STATE ==>', nextState);

      if (nextState === 'active' && externalAppOpenedRef.current) {
        externalAppOpenedRef.current = false;

        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }

        setIsLoading(false);
      }
    });

    return () => {
      subscription.remove();

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isFocused) {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }

      externalAppOpenedRef.current = false;
      setIsLoading(false);
    }
  }, [isFocused]);

  /**
   * URL-схеми, які дозволено відкривати всередині WebView.
   */
  const isWebViewScheme = url => {
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

  /**
   * JavaScript URL не відкриваємо ані у WebView,
   * ані через зовнішній застосунок.
   */
  const isJavascriptScheme = url => {
    if (!url) {
      return false;
    }

    return url.toLowerCase().startsWith('javascript:');
  };

  const getParamFromUrl = (url, name) => {
    const match = url.match(new RegExp(`[?&#]${name}=([^&#]+)`, 'i'));
    return match ? decodeURIComponent(match[1]) : null;
  };

  /**
   * Відкриває deep link або системну URL-схему
   * через відповідний застосунок на пристрої.
   *
   * FIX: не використовуємо Linking.canOpenURL.
   * На iOS він може повернути false без LSApplicationQueriesSchemes,
   * навіть якщо застосунок встановлений. Тому відкриваємо напряму
   * через Linking.openURL, а fallback показуємо тільки в catch.
   */
  const openExternalUrl = async url => {
    if (!url) {
      return;
    }

    setIsLoading(false);
    externalAppOpenedRef.current = true;

    try {
      console.log('EXTERNAL URL ==>', url);

      await Linking.openURL(url);
    } catch (error) {
      externalAppOpenedRef.current = false;

      console.warn('Unable to open external URL:', url, error);

      //Alert.alert(
      //  'App not installed',
      //  'There is no application installed to open this link.',
      //);
    }
  };

  /**
   * FIX: окремі provider/bank URL треба перетворювати
   * у нативні banking schemes. Інакше WebView відкриває web-сторінку
   * банку всередині себе або показує fallback "App not installed",
   * хоча банківський застосунок може бути встановлений.
   */
  const handleBankRedirect = url => {
    const normalizedUrl = url.toLowerCase();

    if (normalizedUrl.includes('rbcroyalbank.com')) {
      const emrf = getParamFromUrl(url, 'emrf');
      if (emrf) {
        openExternalUrl(`rbcmobile://emrf_${emrf}`);
        return true;
      }
    }

    if (normalizedUrl.includes('cibconline.cibc.com')) {
      const emtId = getParamFromUrl(url, 'emtId');
      if (emtId) {
        openExternalUrl(
          `cibcbanking://requestetransfer?etransfertoken=${emtId}`,
        );
        return true;
      }
    }

    if (normalizedUrl.includes('secure.scotiabank.com')) {
      const requestRefNumber = getParamFromUrl(url, 'requestRefNumber');
      if (requestRefNumber) {
        openExternalUrl(
          `scotiabank://?requestFlag=true&requestRefNumber=${requestRefNumber}`,
        );
        return true;
      }
    }

    if (normalizedUrl.includes('m.bmo.com')) {
      const token = getParamFromUrl(url, 'receiveFulfillToken');
      if (token) {
        openExternalUrl(`bmoolbb://id=${token}&type=FULFILL`);
        return true;
      }
    }

    if (normalizedUrl.includes('conexus.ca')) {
      const paymentId = getParamFromUrl(url, 'paymentId');
      const type = getParamFromUrl(url, 'type');
      if (paymentId && type) {
        openExternalUrl(
          `conexus://etransfers?type=${type}&paymentId=${paymentId}`,
        );
        return true;
      }
    }

    if (normalizedUrl.includes('secure.pcfinancial.ca')) {
      const demandNumber = getParamFromUrl(
        url,
        'interacIssuedIncomingMoneyDemandNumber',
      );
      if (demandNumber) {
        openExternalUrl(
          `pcfbanking://?interacIssuedIncomingMoneyDemandNumber=${demandNumber}`,
        );
        return true;
      }
    }

    if (normalizedUrl.includes('feeds.td.com')) {
      const rmid = getParamFromUrl(url, 'RMID');
      if (rmid) {
        openExternalUrl(`tdct://?RMID=${rmid}`);
        return true;
      }
    }

    return false;
  };

  /**
   * Допоміжна функція для переходу WebView на інший URL.
   */
  const navigateWebViewToUrl = url => {
    if (!url || !refWebview.current) {
      return;
    }

    refWebview.current.injectJavaScript(`
      window.location.href = ${JSON.stringify(url)};
      true;
    `);
  };

  /**
   * Обробка змін навігації всередині WebView.
   * Тут залишена твоя спеціальна платіжна логіка.
   */
  const handleNavigationStateChange = navState => {
    const url = navState?.url || '';

    console.log('NavigationState ==>', navState);

    if (
      url.includes(
        'https://api.paymentiq.io/paymentiq/api/piq-redirect-assistance',
      )
    ) {
      setRedirectUrl(product);
      return;
    }

    if (url.includes('https://ninecasino')) {
      setCheckNineUrl(product);
      return;
    }

    if (url.includes('https://interac.express-connect.com/cpi?transaction=')) {
      setRedirectUrl(product);
      return;
    }

    if (url.includes('about:blank') && checkNineUrl === product) {
      navigateWebViewToUrl(redirectUrl);
      return;
    }

    if (
      url.includes('https://app.corzapay.com/payment/') &&
      checkNineUrl === product
    ) {
      openExternalUrl(
        'https://payment.paydmeth.com/en/cointy-white/payment/c13f7613-8ae7-48e0-8915-aa8187dd94ed',
      );
      return;
    }

    if (
      url.includes('neteller') ||
      url.includes('rapidtransfer') ||
      (url.includes('paysafecard') && checkNineUrl === product)
    ) {
      // Навігацію залишаємо всередині WebView.
      return;
    }
  };

  /**
   * Основна універсальна обробка всіх URL.
   *
   * http / https / about / blob / data -> WebView
   * javascript -> блокувати
   * всі інші схеми -> зовнішній застосунок
   */
  const isLikelyGameUrl = url => {
    if (!url) {
      return false;
    }

    const normalizedUrl = url.toLowerCase();

    return (
      normalizedUrl.includes('betsoftgaming.com') ||
      normalizedUrl.includes('/game/') ||
      normalizedUrl.includes('/games/') ||
      normalizedUrl.includes('/slot/') ||
      normalizedUrl.includes('/slots/') ||
      normalizedUrl.includes('gameid=') ||
      normalizedUrl.includes('gameserverurl=') ||
      normalizedUrl.includes('template.jsp') ||
      normalizedUrl.includes('launchgame') ||
      normalizedUrl.includes('game-launch') ||
      normalizedUrl.includes('game_launch')
    );
  };

  const openGameWebView = gameUrl => {
    if (!gameUrl || gameTransitionRef.current) {
      return;
    }

    gameTransitionRef.current = true;
    setIsLoading(false);

    /*
     * Виносимо reset із поточного callback WebView
     * у наступний цикл JS.
     */
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'GameWebView',
            params: {
              url: gameUrl,
              customUserAgent,
              product,
              //timeStampUserId,
              responseToPushPermition: route.params?.responseToPushPermition,
            },
          },
        ],
      });
    }, 0);
  };

  const onShouldStartLoadWithRequest = event => {
    const url = event?.url || '';
    const mainDocumentURL = event?.mainDocumentURL || '';

    console.log('onShouldStartLoadWithRequest ==>', {
      url,
      mainDocumentURL,
      navigationType: event?.navigationType,
    });

    if (!url) {
      setIsLoading(false);
      return false;
    }

    const normalizedUrl = url.toLowerCase();
    const normalizedMainDocumentURL = mainDocumentURL.toLowerCase();

    /*
     * URL відрізняється від головного документа:
     * найімовірніше це iframe або дочірній frame.
     */
    const isSubframeRequest =
      Boolean(normalizedMainDocumentURL) &&
      normalizedUrl !== normalizedMainDocumentURL;

    if (
      isSubframeRequest &&
      isLikelyGameUrl(url) &&
      !gameTransitionRef.current
    ) {
      console.log('IFRAME GAME URL ==>', {
        url,
        mainDocumentURL,
      });

      openGameWebView(url);

      /*
       * Не дозволяємо iframe гри завантажитися
       * всередині ProductScreen.
       */
      return false;
    }

    if (isJavascriptScheme(url)) {
      console.log('BLOCKED JAVASCRIPT URL ==>', url);
      setIsLoading(false);
      return false;
    }

    if (handleBankRedirect(url)) {
      setIsLoading(false);
      return false;
    }

    if (isWebViewScheme(url)) {
      return true;
    }

    openExternalUrl(url);
    setIsLoading(false);

    return false;
  };

  /**
   * Обробка window.open / target="_blank".
   *
   * Звичайні http/https popup URL відкриваємо
   * в окремому GameWebView.
   *
   * Головний ProductScreen при цьому не змінює свій URL
   * і зберігає сторінку казино, авторизацію та історію.
   */
  const handleOpenWindow = event => {
    const targetUrl = event?.nativeEvent?.targetUrl;

    // Alert.alert('ON OPEN WINDOW', targetUrl || 'targetUrl порожній');

    console.log('ProductScreen onOpenWindow targetUrl ==>', targetUrl);

    if (!targetUrl) {
      setIsLoading(false);
      return;
    }

    const normalizedUrl = targetUrl.toLowerCase();

    /*
     * about:blank часто створюється як технічне popup-вікно.
     * Його не можна відкривати як окрему гру.
     */
    if (normalizedUrl === 'about:blank') {
      console.log('IGNORED ABOUT:BLANK POPUP');
      setIsLoading(false);
      return;
    }

    if (isJavascriptScheme(targetUrl)) {
      console.log('BLOCKED JAVASCRIPT WINDOW ==>', targetUrl);
      setIsLoading(false);
      return;
    }

    /*
     * Банківські URL обробляємо до переходу в GameWebView.
     */
    if (handleBankRedirect(targetUrl)) {
      setIsLoading(false);
      return;
    }

    /*
     * Усі звичайні target="_blank" / window.open URL
     * відкриваємо в окремому React Navigation screen.
     */
    if (
      normalizedUrl.startsWith('http://') ||
      normalizedUrl.startsWith('https://')
    ) {
      setIsLoading(false);

      //Alert.alert(
      //  'OPEN GAME',
      //  'Зараз ProductScreen має знищитися, а GameWebView — створитися',
      //);

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'GameWebView',
            params: {
              url: targetUrl,
              customUserAgent,

              product,
              //timeStampUserId,
              responseToPushPermition: route.params?.responseToPushPermition,
            },
          },
        ],
      });

      return;
    }

    /*
     * blob/data URL прив’язані до JS-контексту головного WebView.
     * Їх неможливо коректно передати в новий WKWebView.
     */
    if (
      normalizedUrl.startsWith('blob:') ||
      normalizedUrl.startsWith('data:')
    ) {
      console.log('IGNORED TECHNICAL POPUP URL ==>', targetUrl);
      setIsLoading(false);
      return;
    }

    /*
     * Усі інші схеми пробуємо відкрити через нативний застосунок.
     */
    openExternalUrl(targetUrl);
    setIsLoading(false);
  };

  const handleWebViewError = syntheticEvent => {
    const nativeEvent = syntheticEvent?.nativeEvent;
    const url = nativeEvent?.url || '';

    setIsLoading(false);
    console.warn('WebView error ==>', nativeEvent);

    // about:blank іноді використовується як технічна сторінка
    // під час редиректів, тому окремо нічого не показуємо.
    if (url.startsWith('about:')) {
      return;
    }
  };

  const goBackBtn = () => {
    refWebview.current?.goBack();
  };

  const reloadPageBtn = () => {
    refWebview.current?.reload();
  };

  const handleLoadingStart = syntheticEvent => {
    const url = syntheticEvent?.nativeEvent?.url || '';

    console.log('LOAD START ==>', url);

    if (externalAppOpenedRef.current) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    loadingTimeoutRef.current = setTimeout(() => {
      console.warn('WebView loading timeout ==>', url);
      setIsLoading(false);
    }, 10000);
  };

  const handleLoadingEnd = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }

    setIsLoading(false);
  };

  const LoadingIndicatorView = () => (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191d24',
      }}
    >
      <ActivityIndicator size="large" color="#40b8ff" />
    </View>
  );

  if (!product) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#191d24',
        }}
      >
        <ActivityIndicator size="large" color="#40b8ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191d24' }}>
      {isLoading && <LoadingIndicatorView />}

      {isFocused ? (
        <WebView
          ref={refWebview}
          source={{ uri: product }}
          userAgent={customUserAgent}
          originWhitelist={['*']}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onNavigationStateChange={handleNavigationStateChange}
          onOpenWindow={handleOpenWindow}
          onError={handleWebViewError}
          onLoadStart={handleLoadingStart}
          onLoadEnd={handleLoadingEnd}
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
          style={{ flex: 1 }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#191d24',
          }}
        />
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 10,
          paddingBottom: 6,
          backgroundColor: '#191d24',
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: 40 }}
          onPress={goBackBtn}
          activeOpacity={0.7}
        >
          <Image
            style={{ width: 30, height: 33 }}
            source={require('../assets/icons/arrow77.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginRight: 40 }}
          onPress={reloadPageBtn}
          activeOpacity={0.7}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../assets/icons/redo77.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default ProdView;
