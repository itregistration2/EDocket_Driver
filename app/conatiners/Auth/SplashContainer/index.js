
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
// styles and themes
import { getData } from '../../../utils/AsyncStorageHelper';
import { StorageKey } from '../../../utils/Constants';
import {  onGetLanguageJsonData } from '../../../redux/actions/AppAction';
import { clearAsyncUserDetails, storeAsyncUserDetails } from '../../../redux/actions/GeneralAction';
//redux files & thirdpart libraries
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { WebView } from 'react-native-webview';
import { Platform } from 'react-native';

export default SplashContainer = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        getData("language", (data => {
            data != null ?
                (global.LanguageSelect = data, dispatch(onGetLanguageJsonData()))
                :
                (global.LanguageSelect = 'en', dispatch(onGetLanguageJsonData()))
        }), (err => {
            (global.LanguageSelect = 'en', dispatch(onGetLanguageJsonData()))
        }))

        getData("fontsize", (data => {
            data != null ?
                (global.FontSizeSelect = data)
                :
                (global.FontSizeSelect = 'M')
        }), (err => {
            (global.LanguageSelect = 'M')
        }))
        SplashScreen.hide()
        setTimeout(() => {
            getData(StorageKey.USER_DETAIL, (data => {
                console.log(data)
                dispatch(storeAsyncUserDetails(data))
                data != null ?
                    (props.navigation.replace('Tab'))
                    :
                    (props.navigation.replace('Auth'), dispatch(clearAsyncUserDetails()));
            }), (err => {
                dispatch(clearAsyncUserDetails())
                props.navigation.replace('Auth')
            }))
        }, 1000);
    }, [])



    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
    return (
        <>
            <StatusBar translucent backgroundColor='transparent' barStyle={"dark-content"} />
            <WebView
                style={{ flex: 1 }}
                source={Platform.OS == "android" ? { uri: 'file:///android_asset/index.html' } : require("../../../assets/index.html")}
                scrollEnabled
                scalesPageToFit={true}
                injectedJavaScript={INJECTEDJAVASCRIPT}
            />
        </>
    );
}

