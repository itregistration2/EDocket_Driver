
import React, { useState, useEffect } from 'react';
import { Image, View, StatusBar, ScrollView, KeyboardAvoidingView, Keyboard, Platform, NativeModules } from 'react-native';
// styles and themes
import { images } from '../../../res/images';
import { Spacer } from '../../../res/spacer';
import globalStyles from '../../../res/globalStyles';
import { GradientButton } from '../../../components/GradientButton';
import { Input } from '../../../components/Input';
import { styles } from './style';
import BaseClass from '../../../utils/BaseClass';
// third party library
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { onDriverLogin } from '../../../redux/actions/GeneralAction';
// redux files
import { Row, TableWrapper } from 'react-native-table-component';


export default LoginContainer = (props) => {
    const [username, setUsername] = useState('')
    const [img_load, setImgLoad] = useState(false)
    const dispatch = useDispatch();

    const appReducer = useSelector(state => state.appReducer)

    const [password, setPassword] = useState('')
    const [show, setShow] = useState(true)
    const Base = new BaseClass();

    const deviceLanguage =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;

    useEffect(() => {
      //  console.log(deviceLanguage)
        Platform.OS == "android" && AndroidKeyboardAdjust.setAdjustResize();
        const unsubscribe = props.navigation.addListener('focus', () => {
            Platform.OS == "android" && AndroidKeyboardAdjust.setAdjustResize();
        });
        return unsubscribe;
    }, [props.navigation]);


    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    const onLogin = () => {
        Keyboard.dismiss()
        if (username == '') {
            Base.showToastAlert(getLanguageValue('ACM_EMAIL_PHONE_NUMBER'));
        } else if (password == '') {
            Base.showToastAlert(getLanguageValue('ACM_ENTER_PASSWORD'));
        } else {
            let requestBody = JSON.stringify({
                "UserID": username,
                "OneTimePassword": password,
                "Password": password,
            })
            dispatch(onDriverLogin(requestBody, (data) => {
                if (data) {
                    props.navigation.replace("Tab");
                }
            }))
        }
    }


    return (
        <>
            <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />
            {Platform.OS == 'ios' && <Image source={images.header_gradient} style={styles.stausbar_img_ic} resizeMode={"cover"} />}
            <View style={globalStyles.flex}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={'interactive'}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <View>
                        <Image
                            source={images.image_bg}
                            onLoadStart={() => setImgLoad(false)}
                            onLoadEnd={() => setImgLoad(true)}
                            style={styles.logo_ic}
                            resizeMode={"stretch"} />
                        {img_load && <Image source={images.linear_bg} resizeMode={"cover"} style={styles.linear_img_ic} />}
                    </View>
                    <View style={{ ...globalStyles.subContainer }}>
                        <Spacer space={hp(1.5)} />
                        <>
                            <Input
                                value={username}
                                onChange={(val) => setUsername(val)}
                                headerText={getLanguageValue('ACM_EMAIL_PHONE_NUMBER')}
                                keyboardType={'email-address'}
                            />
                            <Spacer space={hp(1.2)} />
                            <Input
                                value={password}
                                onChange={(val) => setPassword(val)}
                                headerText={getLanguageValue('ACM_PASSWORD')}
                                passwordInput
                                secureTextEntry={show}
                                onHideShow={() => { setShow(!show) }}
                            />
                        </>
                        <Spacer space={hp(1.2)} />
                        <GradientButton
                            buttonText={getLanguageValue('ACM_SIGN_IN')}
                            buttonPress={() => { onLogin() }}
                            is_blue
                        />
                        <Spacer space={hp(0.2)} />
                        <Image source={images.logo} style={styles.bottom_img} resizeMode={"cover"} />
                        <Spacer space={hp(0.5)} />
                    </View>
                </ScrollView>
                {Platform.OS == 'ios' && <KeyboardAvoidingView behavior={'padding'} />}
            </View>
        </>
    );
}

