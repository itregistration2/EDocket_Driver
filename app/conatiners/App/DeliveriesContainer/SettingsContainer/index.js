import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
// styles and themes
import { Spacer } from '../../../../res/spacer';
import globalStyles from '../../../../res/globalStyles';
import { images } from '../../../../res/images';
import { fonts } from '../../../../res/fonts';
import { colors } from '../../../../res/colors';
import { removeData } from '../../../../utils/AsyncStorageHelper';
import { AppHeader } from '../../../../components/AppHeader';
import { styles } from './style';
import { clearAsyncUserDetails, onDriverLogoutOtp } from '../../../../redux/actions/GeneralAction';
import { APP_NAME } from '../../../../utils/Constants';
import { useSelector, useDispatch } from 'react-redux';
// Third party libraries & redux
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firebase from 'react-native-firebase';


export default Settings = (props) => {
    const dispatch = useDispatch();
    const generalReducer = useSelector(state => state.generalReducer)
    const appReducer = useSelector(state => state.appReducer)

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    const onLogout = () => {
        Alert.alert(
            APP_NAME,
            getLanguageValue('ACM_LOGOUT_CONFIRM'),
            [
                {
                    text: getLanguageValue('ACM_CANCEL'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        removeData('userDetails');
                        dispatch(clearAsyncUserDetails())
                        setTimeout(async () => {
                            let token = await firebase.messaging().getToken();
                            let s_requestBody = JSON.stringify({
                                "UserID": generalReducer.userDetails?.UserID,
                                "DriverPhone": generalReducer.userDetails?.DriverPhone,
                                "ExpoPushToken": "5-WynidUXdQGneUiAYJwNgrjMBoLt",
                                "DeviceRegistrationToken": token
                            })
                            dispatch(onDriverLogoutOtp(s_requestBody, (data) => { }))
                            props.navigation.replace("Auth");
                        }, 150);
                    },
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <View style={globalStyles.flex}>
            <AppHeader is_white isShow onBackPress={() => { props.navigation.goBack() }} hide_title={false} _title={getLanguageValue('ACM_SETTING')} />
            <View style={{ ...globalStyles.subContainer, width: wp(100), backgroundColor: colors.BG_COMMON }}>
                <View style={{ padding: wp(4) }}>
                    <Text style={{ ...styles.txt_fonts, textAlign: "center" }}>{generalReducer.userDetails && generalReducer.userDetails.DriverName}</Text>
                    <Text style={{ ...styles.txt_fonts, textAlign: "center", fontSize: wp(3.5), color: colors.GRAY_PLACEHOLDER }}>{generalReducer.userDetails && generalReducer.userDetails.UserID}</Text>
                </View>

                <TouchableOpacity style={styles.wrapper} onPress={() => { props.navigation.navigate('Language') }}>
                    <Text style={styles.txt_fonts}>{getLanguageValue('ACM_LANGUAGE')}</Text>
                    <Image source={images.next_grey} style={{ ...styles.ic_right, alignSelf: "center" }} resizeMode={"contain"} />
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.wrapper} onPress={() => { props.navigation.navigate("Introductions") }}>
                    <Text style={styles.txt_fonts}>{getLanguageValue('ACM_ONBOARDING')}</Text>
                    <Image source={images.next_grey} style={{ ...styles.ic_right, alignSelf: "center" }} resizeMode={"contain"} />
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity style={styles.wrapper} onPress={() => { props.navigation.navigate("FontChange") }} >
                    <Text style={styles.txt_fonts}>{getLanguageValue('ACM_INTERFACESETTING')}</Text>
                    <Image source={images.next_grey} style={{ ...styles.ic_right, alignSelf: "center" }} resizeMode={"contain"} />
                </TouchableOpacity>
                <Spacer space={hp(0.8)} />
                <>
                    <View style={styles.divider} />
                    <TouchableOpacity style={{ ...styles.wrapper, justifyContent: "center" }} onPress={() => { onLogout() }}>
                        <Text style={{ ...styles.txt_fonts, fontFamily: fonts.BOLD, color: colors.RED }}>{getLanguageValue('ACM_LOGOUT')}</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                </>
            </View>
        </View>
    )
}