
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
// styles and themes
import globalStyles from '../../../res/globalStyles';
import { Header } from '../../../components/Header';
import { colors } from '../../../res/colors';
import { Spacer } from '../../../res/spacer';
import { fonts } from '../../../res/fonts';
import { styles } from './style';
import { onGetRoasterList } from '../../../redux/actions/AppAction';
// Third party libraries
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from "react-native-animatable";
import Timeline from 'react-native-timeline-flatlist'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default DutyRoasterContainer = (props) => {
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const generalReducer = useSelector(state => state.generalReducer)
    const appReducer = useSelector(state => state.appReducer)
    const [roster, setRoster] = useState(0)
    const wordsToHighlight = ['{0}', '{1}'];

    useEffect(() => {
        let requestBody = JSON.stringify({ "username": generalReducer.userDetails?.UserID, "RoasterPage": 0 })
        dispatch(onGetRoasterList(requestBody, appReducer))
    }, [generalReducer.userDetails])

    useEffect(() => {
        setData(appReducer.get_roster_list)
    }, [appReducer.get_roster_list])

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    const _isNewDate = (someDate) => {
        // console.log(date + '')
        // var inputDate = new Date(date + "");
        // var todaysDate = new Date();
        const today = new Date()
        if (
            someDate.split("/")[0] == today.getDate() &&
            someDate.split("/")[2] == today.getFullYear()
        ) {
            return true
        } else {
            return false
        }
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

    const renderDetail = (rowData, sectionID, rowID) => {
        let title = <Text style={{ ...styles.txt_lm, fontFamily: fonts.BOLD, color: sectionID == 0 ? colors.BLACK : colors.GRAY_96 }}>{`${_isNewDate(rowData.AttendDateDsp) ? getLanguageValue('ACM_TODAY') : ''} ${rowData.AttendDateDsp}`}</Text>
        var description = null;
        if (rowData.AttendPlant)
            description = (
                <Animatable.View
                    duration={800}
                    animation={"slideInRight"}
                    style={{ ...styles.detail_container, backgroundColor: sectionID == 0 ? colors.PIZZAS : colors.GRAY_86 }}>
                    {/* <Text style={{ ...styles.txt_sm }}>{getLanguageValue('ACM_ REPORT_DUTY').replace('{0}', getPlanLnguageText(rowData?.AttendPlant)).replace('{1}', rowData?.AttendTime)}</Text> */}
                    {<View style={{ flexDirection: "row", flexWrap: 'wrap' }}>{getLanguageValue("ACM_ REPORT_DUTY").split(' ').map(r => r == "{0}" ? <Text style={{ ...styles.txt_sm, textDecorationLine: 'underline' }}>{getPlanLnguageText(rowData.AttendPlant) + ' '}</Text> : r == "{1}" ? <Text style={{ ...styles.txt_sm, textDecorationLine: 'underline' }}>{rowData.AttendTime + ' '}</Text> : <Text style={{ ...styles.txt_sm }}>{r + ' '}</Text>)}</View>}
                    <Text style={{ ...styles.txt_sm, textAlign: "right", fontSize: wp(2.5) }}>{rowData.SendDateDsp + ' ' + rowData.SendTime}</Text>
                </Animatable.View>
            )

        return (
            <View style={{ flex: 1 }}>
                {title}
                {description}
            </View>
        )
    }

    const renderCircle = (rowData, sectionID, rowID) => {
        return (
            <View style={{ ...styles.circle, backgroundColor: sectionID == 0 ? colors.PIZZAS : colors.GRAY_86 }} />
        )
    }

    return (
        <>
            <View style={globalStyles.flex}>
                <View style={{ flex: 1 }}>
                    <>
                        <Header
                            headerText={getLanguageValue('ACM_ONBOARDINGROSTERPAGETITLE')}
                            sub_headerText={moment(new Date()).format("DD MMMM, YYYY")}
                            onSetting={() => { props.navigation.navigate("Settings") }}
                        />
                        <View style={{ backgroundColor: colors.GRAY_SUIT, height: wp(0.3) }} />
                    </>
                    <Spacer space={hp(1)} />
                    {data.length > 0 &&
                        <Timeline
                            style={{ width: wp(95), alignSelf: "center" }}
                            showTime={false}
                            circleSize={wp(3.5)}
                            circleColor={colors.GRAY_86}
                            lineColor={colors.GRAY_86}
                            options={{
                                showsVerticalScrollIndicator: false,
                                style: { paddingTop: 2 },
                                onEndReached: () => {
                                    setRoster(roster + 1)
                                    let requestBody = JSON.stringify({ "username": generalReducer.userDetails?.UserID, "RoasterPage": roster + 1 })
                                    dispatch(onGetRoasterList(requestBody, appReducer))
                                },
                            }}
                            renderDetail={renderDetail}
                            renderCircle={renderCircle}
                            data={data} />
                    }
                    <Spacer space={hp(1)} />
                </View>
            </View>
        </>
    );
}

