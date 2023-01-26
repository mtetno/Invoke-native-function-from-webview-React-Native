/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, StatusBar, NativeModules} from 'react-native';
import {View, Image, Text} from 'react-native';
import {Container, ButtonX} from '../../Components';
import NavigationService from '../../Navigation/index';
import Routes from '../../Navigation/Routes/index';
import AppIntroSlider from '../../Lib/AppIntroSlider';
import useTranslation from '../../i18n/index';
import {LOCALES} from '../../Constants/index';
import colors from '../../Themes/Colors';
import {WebView, WebViewSharedProps} from 'react-native-webview';
import {withWebViewBridge} from 'react-native-webview-bridge-seamless';
import htmlStr from './test.html'
const WebViewWithBridge = withWebViewBridge(WebView);

const LanguageSlideItem = props => {
  const {t, localeProvider, changeLocale} = useTranslation();

  const _changeLocale = () => {
    changeLocale(
      localeProvider.id == LOCALES.HINDI.id ? LOCALES.ENGLISH : LOCALES.HINDI,
    );
  };

  

  return (
    <View style={{flex: 1}}>
     
    </View>
  );
};

const slides = [
  {
    key: 'Loren Ipsum...',
    title: 'slide 1',
    text: 'something cool text.',
    // renderExtra: LanguageSlideItem,
    backgroundColor: colors.blueJeans,
  },
  {
    key: 'bla bla -dos',
    title: 'slide2',
    text: 'Other cool stuff',
    backgroundColor: colors.pineapple,
  },

  {
    key: 'There is more-dos',
    title: 'slide 3',
    text: 'Other cool stuff',
    backgroundColor: colors.mystic,
  },
  {
    key: 'And some final notes',
    title: 'FINAL SLIDE',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    //   image: require('./assets/3.jpg'),
    backgroundColor: colors.androidGreen,
  },
];

const AppIntro = props => {
  const _onDone = () => {
    NavigationService.navigate(Routes.LOGIN_SCREEN);
  };

  const getToken = async () => {
    let response = await new Promise((resolve) => {
      NativeModules.NativeSSO.getSSOToken((token) => {
        resolve(token) ;
      })
    });
    return response;
 }

  return (
    <Container>
      <WebViewWithBridge
            source={{uri : "https://ionicappv1.000webhostapp.com/test.html"}}
            style={{flex: 1, marginTop : 44}}
            reactNativeApi={{
                getToken: getToken
            }}
         />
    </Container>
  );
};

const _renderItem = item => {
  return (
    <Container
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: item.backgroundColor,
      }}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} />
      <Text style={styles.text}>{item.text}</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: 'white',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default AppIntro;
