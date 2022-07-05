
import React, { useEffect, useState } from 'react';
import { View, Animated, Text, Image, TouchableOpacity, Platform } from 'react-native';
// styles and themes
import { Spacer } from '../../../res/spacer';
import globalStyles from '../../../res/globalStyles';
import { Header } from '../../../components/Header';
import { images } from '../../../res/images';
import { colors } from '../../../res/colors';
import { styles } from './style';
import PushNotification from '../PushNotification';
import firebase from 'react-native-firebase';

import { onGetDriverDockets, onGetRoasterList, onGetScoreBord } from '../../../redux/actions/AppAction';
// Third party libraries
import { useSelector, useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import moment from 'moment';


export default DeliveriesContainer = (props) => {

    const [currentDocket, setCurrentDocket] = useState(null)
    const [currentRoster, setCurrentRoster] = useState(null)

    const [homeList, setHomeList] = useState([
        {
            "id": 0,
            "image": images.box_ut,
            "name": "Delivery",
            "key": "ACM_DELIVERY"
        },
        {
            "id": 1,
            "image": images.history_ut,
            "name": "Delivery History",
            "key": "ACM_DELIVERY_HISTORY"
        },
        {
            "id": 2,
            "image": images.duty_roster_ut,
            "name": "Duty Roster",
            "key": "ACM_ROSTERTIME"
        },
        {
            "id": 3,
            "image": images.score_board_ut,
            "name": "Score Board",
            "key": "ACM_SCOREBOARD"
        },
        {
            "id": 4,
            "image": images.score_board_ut_1,
            "name": "Plan Status",
            "key": "ACM_PLANT_STATUS"
        }
    ])

    const [selectIndex, setSelectedIndex] = useState(0)
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

    useEffect(() => {
        Platform.OS == "android" && AndroidKeyboardAdjust.setAdjustPan();
        const unsubscribe = props.navigation.addListener('focus', () => {
            Platform.OS == "android" && AndroidKeyboardAdjust.setAdjustPan();
        });
        return unsubscribe;
    }, [props.navigation]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(onGetDriverDockets(generalReducer.userDetails?.UserID, (data) => {
                 if (data && data?.Docket) {
                    setCurrentDocket(data?.Docket)
                } else {
                    setCurrentDocket(null)
                }
            }))
            let requestBody = JSON.stringify({ "username": generalReducer.userDetails?.UserID })
            dispatch(onGetScoreBord(requestBody))

            let _requestBody = JSON.stringify({ "username": generalReducer.userDetails?.UserID, "RoasterPage": 0 })
            dispatch(onGetRoasterList(_requestBody, appReducer))
        });
        return unsubscribe;
    }, [])

    const _isTodayDate = (someDate) => {
        const today = new Date()
        if (someDate &&
            someDate.split("/")[0] == today.getDate() &&
            someDate.split("/")[2] == today.getFullYear()
        ) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        setCurrentRoster(appReducer.get_roster_list[0])
    }, [appReducer.get_roster_list])

    const onRedirectDetail = () => {
       props.navigation.navigate("ScanDetails", { "item": currentDocket, "status": currentDocket?.STATUS, is_home: true })
    }

    const getPlanLnguageText = (value) => {
        let lang_text = null;
        switch (value) {
            case 'STW': {
                lang_text = getLanguageValue('ACM_STW')
                break;
            }
            case 'TTS': {
                lang_text = getLanguageValue('ACM_TTS')
                break;
            }
            case 'CWP': {
                lang_text = getLanguageValue('ACM_CWP')
                break;
            }
            case 'YLP': {
                lang_text = getLanguageValue('ACM_YLP')
                break;
            }
            default: {
                break;
            }
        }
        return lang_text;
    }

    const renderItem = ({ item, index }) => {
        return (
            <>
                <TouchableOpacity onPress={() => {
                    setSelectedIndex(index),
                        index == 0 ? onRedirectDetail() :
                            index == 1 ?
                                props.navigation.navigate(getLanguageValue('ACM_DELIVERY_HISTORY'), { screen: 'History' })
                                : index == 2 ?
                                    props.navigation.navigate(getLanguageValue('ACM_ONBOARDINGROSTERPAGETITLE'), { screen: 'DutyRoaster' })
                                    : index == 3 ?
                                        props.navigation.navigate(getLanguageValue('ACM_ONBOARDINGSCOREBOARDPAGETITLE'), { screen: 'ScoreBaord' })
                                        : index == 4 ?
                                            props.navigation.navigate(getLanguageValue('ACM_PLANT_STATUS'), { screen: 'Plant' })
                                            : null
                }} key={index}
                    style={{ ...styles.wrapper, backgroundColor: selectIndex == index ? colors.PIZZAS : colors.PIGEON_BLUE, }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={item.image} style={{ ...styles.wrapper_ic, tintColor: selectIndex == index ? colors.WHITE : colors.BLACK }} />
                        <Text style={{ ...styles.txt_fonts, color: selectIndex == index ? colors.WHITE : colors.REGUAL_BLUE }}>{getLanguageValue(item.key)}</Text>
                    </View>
                </TouchableOpacity>
                <Spacer space={hp(1.5)} />
            </>
        )
    }

    return (
        <>
            <View style={globalStyles.flex}>
                <View style={{ flex: 1 }}>
                    <>
                        <Header
                            headerText={getLanguageValue('ACM_HOME')}
                            sub_headerText={moment(new Date()).format("DD MMMM, YYYY")}
                            onSetting={() => { props.navigation.navigate("Settings") }}
                        />
                        <View style={{ backgroundColor: colors.GRAY_SUIT, height: wp(0.3) }} />
                    </>
                    <Animated.FlatList
                        bounces={false}
                        ListHeaderComponent={
                            <>
                                {!_isTodayDate(currentRoster?.AttendDateDsp) &&
                                    <>
                                        <Spacer space={hp(1)} />
                                        <View style={styles.wrapper_shadow}>
                                            <View style={{ padding: wp(4), paddingVertical: wp(3) }}>
                                                <Text style={styles.txt_sm}>{getLanguageValue('ACM_TODAY')}</Text>
                                                {<View style={{ flexDirection: "row", flexWrap: 'wrap' }}>{getLanguageValue("ACM_ REPORT_DUTY").split(' ').map(r => r == "{0}" ? <Text style={{ ...styles.txt_lm, textDecorationLine: 'underline' }}>{getPlanLnguageText(currentRoster?.AttendPlant) + ' '}</Text> : r == "{1}" ? <Text style={{ ...styles.txt_lm, textDecorationLine: 'underline' }}>{currentRoster?.AttendTime + ' '}</Text> : <Text style={{ ...styles.txt_lm }}>{r + ' '}</Text>)}</View>}
                                            </View>
                                        </View>
                                    </>
                                }
                                <Spacer space={hp(1)} />
                                <PushNotification />
                                <Animated.FlatList
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    data={homeList}
                                    renderItem={renderItem}
                                />
                            </>
                        }
                        showsVerticalScrollIndicator={false}
                        data={null}
                        extraData={Math.random()}
                        contentContainerStyle={{ width: wp(100), alignSelf: "flex-end" }}
                        renderItem={<View />}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Spacer space={hp(5)} />
                        }
                    />
                </View>

            </View>
        </>
    );
}

