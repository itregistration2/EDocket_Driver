
import React, { useState, useEffect, useRef } from 'react';
import { View, Alert, Text, Platform, Image, ActivityIndicator, Animated } from 'react-native';
// styles and themes
import globalStyles from '../../../res/globalStyles';
import { Header } from '../../../components/Header';
import { colors } from '../../../res/colors';
import { images } from '../../../res/images';
import { Spacer } from '../../../res/spacer';
import { styles } from './style';
// Third party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import StepIndicator from 'react-native-step-indicator';
import { fonts } from '../../../res/fonts';
import { Row, TableWrapper } from 'react-native-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { onGetScoreBord } from '../../../redux/actions/AppAction';
import { ScrollView } from 'react-native-gesture-handler';

let iconConfig = null;
export default ScoreBoardContainer = (props) => {
    const generalReducer = useSelector(state => state.generalReducer)
    const appReducer = useSelector(state => state.appReducer)

    const dispatch = useDispatch();

    const [tableHeadEnter, setTableHeadEnter] = useState([global.LanguageSelect == 'zh' ? '進場' : 'Enter'])
    const [tableHeadWait, setTableHeadWait] = useState([global.LanguageSelect == 'zh' ? '等待' : 'Wait'])
    const [tableHeadData, setTableHeadData] = useState([])
    const [tableEnterData, setTableEnterData] = useState([])

    const [tableHeadLegA, setTableHeadLegA] = useState(['A'])
    const [tableHeadLegB, setTableHeadLegB] = useState(['B'])
    const [tableHeadLegC, setTableHeadLegC] = useState(['C'])
    const [tableHeadLegD, setTableHeadLegD] = useState(['D'])
    const [tableHeadLegE, setTableHeadLegE] = useState(['E'])

    const [tableLegAData, setTableLegAData] = useState([])
    const [tableLegBData, setTableLegBData] = useState([])
    const [tableLegCData, setTableLegCData] = useState([])
    const [tableLegDData, setTableLegDData] = useState([])
    const [tableLegEData, setTableLegEData] = useState([])


    const [isEnter, setIsEnter] = useState(true)
    const [isWait, setIswait] = useState(true)
    const [isLegA, setIsLegA] = useState(true)
    const [isLegB, setIsLegB] = useState(true)
    const [isLegC, setIsLegC] = useState(true)
    const [isLegD, setIsLegD] = useState(true)
    const [isLegE, setIsLegE] = useState(true)

    const [mathRandom, setMathRandom] = useState(Math.random())

    const timer = useRef(null);
    const [is_null, setIsNull] = useState(true)
    const sideAnimation = React.useMemo(() => new Animated.ValueXY({ x: 0, y: -120 }), [])
    const scrollY = useRef(new Animated.Value(0));

    useEffect(
        () => {
            timer.current = setInterval(() => {
                setMathRandom(Math.random())
                let requestBody = JSON.stringify({ "username": generalReducer.userDetails?.UserID })
                dispatch(onGetScoreBord(requestBody))
            }, 10000)
            return () => { clearInterval(timer.current) };
        },
        [generalReducer.userDetails]
    );

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    useEffect(() => {
        setTimeout(() => {
            if (appReducer.get_scorebord == null || appReducer?.get_scorebord?.CurrentTruckStatus == null ||
                appReducer?.get_scorebord?.Plant == null) {
                setIsNull(true)
                clearInterval(timer.current)
                Alert.alert(
                    `${getLanguageValue("ACM_WARNING")}`,
                    `${getLanguageValue("ACM_NOSCOREBOARD")}`,
                    [
                        {
                            text: "OK",
                            onPress: () => { props.navigation.navigate(getLanguageValue('ACM_DELIVERY'), { screen: 'Deliveries' }) },
                        },
                    ],
                    {
                        cancelable: false,
                    }
                )
            } else {
                setTableEnterData(appReducer.get_scorebord?.Enter.ScoreboardList)
                setTableHeadData(appReducer.get_scorebord?.Waiting.ScoreboardList)
                setTableLegAData(appReducer.get_scorebord?.LegA.ScoreboardList)
                setTableLegBData(appReducer.get_scorebord?.LegB.ScoreboardList)
                setTableLegCData(appReducer.get_scorebord?.LegC.ScoreboardList)
                setIsEnter(appReducer.get_scorebord?.Enter.IsColumnShown)
                setIswait(appReducer.get_scorebord?.Waiting.IsColumnShown)
                setIsLegA(appReducer.get_scorebord?.LegA.IsColumnShown)
                setIsLegB(appReducer.get_scorebord?.LegB.IsColumnShown)
                setIsLegC(appReducer.get_scorebord?.LegC.IsColumnShown)
                setIsLegD(appReducer.get_scorebord?.LegD.IsColumnShown)
                setIsLegE(appReducer.get_scorebord?.LegE.IsColumnShown)
                setIsNull(false)
            }
        }, 1200);
    }, [appReducer?.get_scorebord, mathRandom])

    const renderStepIndicator = (params) => (
        <Image resizeMode={'contain'} source={getStepIndicatorIconConfig(params)}
            style={{
                width: wp(9), height: wp(9),
                tintColor: appReducer?.get_scorebord?.CurrentTruckStatus == "Waiting" ? appReducer?.get_scorebord?.Lightbulds[0].Color != null ? colors.DARK_BLUE : colors.PLACE_GRAY :
                    appReducer?.get_scorebord?.CurrentTruckStatus == "EnterPlant" ? appReducer?.get_scorebord?.Lightbulds[1].Color != null ? colors.DARK_BLUE : colors.PLACE_GRAY
                        : appReducer?.get_scorebord?.Lightbulds[2].Color != null ? colors.DARK_BLUE : colors.PLACE_GRAY
            }} />
    );

    const getStepIndicatorIconConfig = ({
        position,
        stepStatus,
    }) => {
        switch (position) {
            case 0: {
                iconConfig = images.process_grey;
                break;
            }
            case 1: {
                iconConfig = images.fleet_grey
                break;
            }
            case 2: {
                iconConfig = images.batch_ic_unfinish
                break;
            }
            default: {
                break;
            }
        }
        return iconConfig;
    };


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

    const handleScroll = Animated.event(
        [
            {
                nativeEvent: { contentOffset: { y: scrollY.current } },
            },
        ],
        {
            useNativeDriver: false,
            listener: event => {
                const currentOffset = event.nativeEvent.contentOffset.y;
                if (currentOffset < 90) {
                    Animated.timing(sideAnimation, {
                        toValue: { x: 0, y: -120 },
                        duration: 60,
                        useNativeDriver: false,
                    }).start()
                } else if (currentOffset > 90) {
                    Animated.timing(sideAnimation, {
                        toValue: { x: 0, y: 0 },
                        duration: 10,
                        useNativeDriver: false,
                    }).start()
                }
            },
        },
    );


    return (
        <>
            <View style={globalStyles.flex}>
                {is_null == false ?
                    <>
                        <Animated.FlatList
                            bounces={false}
                            onScroll={handleScroll}
                            ListHeaderComponent={
                                <>
                                    <View style={{ flex: 1 }}>
                                        <>
                                            <Header
                                                headerText={getPlanLnguageText(appReducer?.get_scorebord?.Plant)}
                                                sub_headerText={moment(new Date()).format("DD MMMM, YYYY")}
                                                onSetting={() => { props.navigation.navigate("Settings") }}
                                            />
                                            <View style={{ backgroundColor: colors.GRAY_SUIT, height: wp(0.3) }} />
                                        </>

                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            <Text style={{ ...styles.text_title, color: colors.RED, textAlign: "left", fontFamily: fonts.BOLD, width: wp(90), alignSelf: "center", marginBottom: wp(0), }}>{getLanguageValue('ACM_STW_TTS_INDICATOR')}</Text>
                                            <Text style={{ ...styles.text_title, marginTop: wp(1), fontSize: wp(6), color: colors.DARK_BLUE, textAlign: "left", fontFamily: fonts.BOLD, width: wp(90), alignSelf: "center" }}>{appReducer?.get_scorebord?.CurrentTruckStatus == 'Waiting' ? getLanguageValue('ACM_WAIT') : appReducer?.get_scorebord?.CurrentTruckStatus == 'EnterPlant' ? getLanguageValue('ACM_ENTER') : getLanguageValue('ACM_PLEASEREADYAPPROACHTO')}</Text>
                                            <Spacer space={hp(2)} />

                                            {
                                                appReducer?.get_scorebord?.CurrentTruckStatus == "Waiting" || appReducer?.get_scorebord?.CurrentTruckStatus == 'EnterPlant' ?
                                                    <Image source={getStepIndicatorIconConfig(appReducer?.get_scorebord?.CurrentTruckStatus == 'Waiting' ? { position: 0 } : { position: 1 })} resizeMode={"contain"} style={styles.center_image} />
                                                    :
                                                    <Text style={styles.center_ic}>{appReducer?.get_scorebord?.CurrentTruckStatus == 'LegA' ? 'A' : appReducer?.get_scorebord?.CurrentTruckStatus == 'LegB' ? 'B' : 'C'}</Text>
                                            }
                                            <Spacer space={hp(2)} />
                                            <View style={{ marginVertical: wp(2) }}>

                                                <StepIndicator
                                                    customStyles={{
                                                        ...secondIndicatorStyles,
                                                        stepIndicatorCurrentColor: appReducer?.get_scorebord?.CurrentTruckStatus == "Waiting" ? appReducer?.get_scorebord?.Lightbulds[0].Color != null ? appReducer?.get_scorebord?.Lightbulds[0].Color : colors.ACTIVE_COLOR :
                                                            appReducer?.get_scorebord?.CurrentTruckStatus == "EnterPlant" ? appReducer?.get_scorebord?.Lightbulds[1].Color != null ? appReducer?.get_scorebord?.Lightbulds[1].Color : colors.ACTIVE_COLOR
                                                                : appReducer?.get_scorebord?.Lightbulds[2].Color != null ? appReducer?.get_scorebord?.Lightbulds[2].Color : colors.ACTIVE_COLOR
                                                    }}
                                                    currentPosition={appReducer?.get_scorebord?.CurrentTruckStatus == 'Waiting' ? 0 : appReducer?.get_scorebord?.CurrentTruckStatus == 'EnterPlant' ? 1 : 2}
                                                    stepCount={3}
                                                    renderStepIndicator={renderStepIndicator}
                                                    labels={[
                                                        getLanguageValue('ACM_WAIT'),
                                                        getLanguageValue('ACM_ENTER'),
                                                        getLanguageValue('ACM_APPORACHLEG'),
                                                    ]}
                                                />

                                            </View>
                                            <Spacer space={hp(1)} />
                                            <View style={{ flexDirection: "row" }}>

                                                {appReducer?.get_scorebord?.CurrentTruckStatus == 'Waiting' || appReducer?.get_scorebord?.CurrentTruckStatus == 'EnterPlant' ?
                                                    <>
                                                        {isEnter &&
                                                            <View style={{ width: wp(isWait ? 50 : 100) }}>
                                                                {(appReducer?.get_scorebord?.Waiting.ColumnReminder != '' || appReducer?.get_scorebord?.Enter.ColumnReminder != '') && <Row data={[appReducer?.get_scorebord?.Enter.ColumnReminder]} style={{ backgroundColor: appReducer?.get_scorebord?.Enter.ColumnReminder == null ? colors.WHITE : appReducer?.get_scorebord?.Enter.ColumnReminderColor, height: wp(16) }} textStyle={{ ...styles.text_title, color: colors.BLACK, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4) }} />}
                                                                <Row data={tableHeadEnter} style={styles.enter_head} textStyle={{ ...styles.text_title, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4) }} />
                                                                <TableWrapper style={{ width: wp(isWait ? 50 : 100), flexDirection: "row" }}>
                                                                    <View style={{ alignSelf: "center", backgroundColor: colors.PANTONE, width: wp(10) }}>
                                                                        {
                                                                            tableEnterData.map((cellData, cellIndex) => (
                                                                                <Text style={{
                                                                                    ...styles.text_sub_title,
                                                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                                                    color: colors.BLACK
                                                                                }}>{cellData.Sequence}</Text>
                                                                            ))
                                                                        }
                                                                    </View>
                                                                    <View style={{ alignSelf: "center", backgroundColor: colors.PANTONE_LIGHT, width: wp(isWait ? 40 : 90) }}>
                                                                        {
                                                                            tableEnterData.map((cellData, cellIndex) => (
                                                                                <Text style={{
                                                                                    ...styles.text_sub_title,
                                                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                                                    textAlign: "left", paddingLeft: wp(2),
                                                                                    fontFamily: cellData.TextIsBold ? fonts.BOLD : fonts.REGULAR,
                                                                                    color: cellData.TextColor == '' ? colors.BLACK : cellData.TextColor,
                                                                                    backgroundColor: cellData.TextBackgroundColor ? cellData.TextBackgroundColor : colors.PANTONE_LIGHT
                                                                                }}>{cellData.Truck}</Text>
                                                                            ))
                                                                        }
                                                                    </View>
                                                                </TableWrapper>
                                                            </View>
                                                        }
                                                        {isWait &&
                                                            <View style={{ width: wp(isEnter ? 50 : 100) }}>
                                                                {(appReducer?.get_scorebord?.Waiting.ColumnReminder != '' || appReducer?.get_scorebord?.Enter.ColumnReminder != '') && <Row data={[appReducer?.get_scorebord?.Waiting.ColumnReminder]} style={{ backgroundColor: appReducer?.get_scorebord?.Waiting.ColumnReminder == null ? colors.WHITE : appReducer?.get_scorebord?.Waiting.ColumnReminderColor, height: wp(16) }} textStyle={{ ...styles.text_title, color: colors.BLACK, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4) }} />}
                                                                <Row data={tableHeadWait} style={styles.weight_head} textStyle={{ ...styles.text_title, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4) }} />
                                                                <TableWrapper style={{ width: wp(isEnter ? 50 : 100), flexDirection: "row" }}>
                                                                    <View style={{ alignSelf: "center", backgroundColor: colors.SILVER, width: wp(10) }}>
                                                                        {
                                                                            tableHeadData.map((cellData, cellIndex) => (
                                                                                <Text style={{
                                                                                    ...styles.text_sub_title,
                                                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                                                    color: colors.BLACK
                                                                                }}>{cellData.Sequence}</Text>
                                                                            ))
                                                                        }
                                                                    </View>
                                                                    <View style={{ alignSelf: "center", backgroundColor: colors.SILVER_LIGHT, width: wp(isEnter ? 40 : 90) }}>
                                                                        {
                                                                            tableHeadData.map((cellData, cellIndex) => (
                                                                                <Text style={{
                                                                                    ...styles.text_sub_title,
                                                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                                                    textAlign: "left",
                                                                                    paddingLeft: wp(2),
                                                                                    color: cellData.TextColor == '' ? colors.BLACK : cellData.TextColor,
                                                                                    fontFamily: cellData.TextIsBold ? fonts.BOLD : fonts.REGULAR,
                                                                                    backgroundColor: cellData.TextBackgroundColor ? cellData.TextBackgroundColor : colors.SILVER_LIGHT
                                                                                }}>{cellData.Truck}</Text>
                                                                            ))
                                                                        }
                                                                    </View>
                                                                </TableWrapper>
                                                            </View>
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        {isLegA &&
                                                            <View style={{ width: wp((isLegB && isLegC) ? 33 : (isLegB || isLegC) ? 49.5 : 100) }}>
                                                                {(appReducer?.get_scorebord?.LegA.ColumnReminder != '' || appReducer?.get_scorebord?.LegB.ColumnReminder != '' || appReducer?.get_scorebord?.LegC.ColumnReminder != '') &&
                                                                    <Row data={[appReducer?.get_scorebord?.LegA.ColumnReminder]} style={{ backgroundColor: appReducer?.get_scorebord?.LegA.ColumnReminder == null ? colors.WHITE : appReducer?.get_scorebord?.LegA.ColumnReminderColor, height: wp(16) }}
                                                                        textStyle={{ ...styles.text_title, color: colors.BLACK, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4) }} />}
                                                                <Row data={tableHeadLegA} style={styles.leg_head} textStyle={{ ...styles.text_title, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4) }} />
                                                                <TableWrapper style={{ width: wp((isLegB && isLegC) ? 33 : (isLegB || isLegC) ? 49.5 : 100), flexDirection: "row" }}>
                                                                    <View style={{ alignSelf: "center", backgroundColor: colors.LEGA_DARK, width: wp(8) }}>
                                                                        {
                                                                            tableLegAData.map((cellData, cellIndex) => (
                                                                                <Text style={{
                                                                                    ...styles.text_sub_title,
                                                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                                                    color: colors.BLACK
                                                                                }}>{cellData.Sequence}</Text>
                                                                            ))
                                                                        }
                                                                    </View>
                                                                    <View style={{ alignSelf: "center", backgroundColor: colors.LEGA_LIGHT, width: wp((isLegB && isLegC) ? 25 : (isLegB || isLegC) ? 42 : 92) }}>
                                                                        {
                                                                            tableLegAData.map((cellData, cellIndex) => (
                                                                                <Text style={{
                                                                                    ...styles.text_sub_title,
                                                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                                                    textAlign: "left", paddingLeft: wp(2),
                                                                                    fontFamily: cellData.TextIsBold ? fonts.BOLD : fonts.REGULAR,
                                                                                    color: cellData.TextColor == '' ? colors.BLACK : cellData.TextColor,
                                                                                    backgroundColor: cellData.TextBackgroundColor ? cellData.TextBackgroundColor : colors.LEGA_LIGHT
                                                                                }}>{cellData.Truck}</Text>
                                                                            ))
                                                                        }
                                                                    </View>
                                                                </TableWrapper>
                                                            </View>
                                                        }
                                                        <View style={{ width: wp(0.5), backgroundColor: colors.WHITE }}></View>
                                                        {isLegB &&
                                                            <View style={{ width: wp((isLegA && isLegC) ? 33 : (isLegA || isLegC) ? 49.5 : 100) }}>
                                                                {(appReducer?.get_scorebord?.LegA.ColumnReminder != '' || appReducer?.get_scorebord?.LegB.ColumnReminder != '' || appReducer?.get_scorebord?.LegC.ColumnReminder != '') &&
                                                                    <Row data={[appReducer?.get_scorebord?.LegB.ColumnReminder]} style={{ backgroundColor: appReducer?.get_scorebord?.LegB.ColumnReminder == null ? colors.WHITE : appReducer?.get_scorebord?.LegB.ColumnReminderColor, height: wp(16) }}
                                                                        textStyle={{ ...styles.text_title, color: colors.BLACK, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4) }} />}
                                                                <Row data={tableHeadLegB} style={{ ...styles.leg_head, backgroundColor: colors.LEGB_DARK }} textStyle={{ ...styles.text_title, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4) }} />
                                                                <TableWrapper style={{ width: wp((isLegA && isLegC) ? 33 : (isLegA || isLegC) ? 49.5 : 100), flexDirection: "row" }}>
                                                                    <View style={{ alignSelf: "center", backgroundColor: colors.LEGB_DARK, width: wp(8) }}>
                                                                        {
                                                                            tableLegBData.map((cellData, cellIndex) => (
                                                                                <Text style={{
                                                                                    ...styles.text_sub_title,
                                                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                                                    color: colors.BLACK
                                                                                }}>{cellData.Sequence}</Text>
                                                                            ))
                                                                        }
                                                                    </View>
                                                                    <View style={{ alignSelf: "center", backgroundColor: colors.LEGB_LIGHT, width: wp((isLegA && isLegC) ? 25 : (isLegA || isLegC) ? 42 : 92) }}>
                                                                        {
                                                                            tableLegBData.map((cellData, cellIndex) => (
                                                                                <Text style={{
                                                                                    ...styles.text_sub_title,
                                                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                                                    textAlign: "left", paddingLeft: wp(2),
                                                                                    fontFamily: cellData.TextIsBold ? fonts.BOLD : fonts.REGULAR,
                                                                                    color: cellData.TextColor == '' ? colors.BLACK : cellData.TextColor,
                                                                                    backgroundColor: cellData.TextBackgroundColor ? cellData.TextBackgroundColor : colors.LEGB_LIGHT
                                                                                }}>{cellData.Truck}</Text>
                                                                            ))
                                                                        }
                                                                    </View>
                                                                </TableWrapper>
                                                            </View>
                                                        }
                                                        <View style={{ width: wp(0.5), backgroundColor: colors.WHITE }}></View>
                                                        {isLegC &&
                                                            <View style={{ width: wp((isLegA && isLegB) ? 33 : (isLegA || isLegB) ? 49.5 : 100) }}>
                                                                {(appReducer?.get_scorebord?.LegA.ColumnReminder != '' || appReducer?.get_scorebord?.LegB.ColumnReminder != '' || appReducer?.get_scorebord?.LegC.ColumnReminder != '') &&
                                                                    <Row data={[appReducer?.get_scorebord?.LegC.ColumnReminder]} style={{ backgroundColor: appReducer?.get_scorebord?.LegC.ColumnReminder == null ? colors.WHITE : appReducer?.get_scorebord?.LegC.ColumnReminderColor, height: wp(16) }} textStyle={{ ...styles.text_title, color: colors.BLACK, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4) }} />}
                                                                <Row data={tableHeadLegC} style={{ ...styles.leg_head, backgroundColor: colors.LEGC_DARK }} textStyle={{ ...styles.text_title, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4) }} />
                                                                <TableWrapper style={{ width: wp((isLegA && isLegB) ? 33 : (isLegA || isLegB) ? 49.5 : 100), flexDirection: "row" }}>
                                                                    <View style={{ alignSelf: "center", backgroundColor: colors.LEGC_DARK, width: wp(8) }}>
                                                                        {
                                                                            tableLegCData.map((cellData, cellIndex) => (
                                                                                <Text style={{
                                                                                    ...styles.text_sub_title,
                                                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                                                    color: colors.BLACK
                                                                                }}>{cellData.Sequence}</Text>
                                                                            ))
                                                                        }
                                                                    </View>
                                                                    <View style={{ alignSelf: "center", backgroundColor: colors.LEGC_LIGHT, width: wp((isLegA && isLegB) ? 25 : (isLegA || isLegB) ? 42 : 92) }}>
                                                                        {
                                                                            tableLegCData.map((cellData, cellIndex) => (
                                                                                <Text style={{
                                                                                    ...styles.text_sub_title,
                                                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                                                    textAlign: "left", paddingLeft: wp(2),
                                                                                    fontFamily: cellData.TextIsBold ? fonts.BOLD : fonts.REGULAR,
                                                                                    color: cellData.TextColor == '' ? colors.BLACK : cellData.TextColor,
                                                                                    backgroundColor: cellData.TextBackgroundColor ? cellData.TextBackgroundColor : colors.LEGC_LIGHT
                                                                                }}>{cellData.Truck}</Text>
                                                                            ))
                                                                        }
                                                                    </View>
                                                                </TableWrapper>
                                                            </View>
                                                        }
                                                    </>
                                                }

                                            </View>

                                            <Spacer space={wp(10)} />
                                        </ScrollView>


                                    </View>
                                </>
                            }
                            showsVerticalScrollIndicator={false}
                            data={null}
                            renderItem={null}
                            keyExtractor={(item, index) => index}
                            ListFooterComponent={
                                <Spacer space={hp(1)} />
                            }
                        />
                        <Animated.View style={[{ ...styles.f_position }, sideAnimation.getLayout()]} >
                            <Header
                                headerText={getPlanLnguageText(appReducer?.get_scorebord?.Plant)}
                                sub_headerText={moment(new Date()).format("DD MMMM, YYYY")}
                                onSetting={() => { props.navigation.navigate("Settings") }}
                                is_shrink
                            />
                            <View style={{ backgroundColor: colors.GRAY_SUIT, height: wp(0.3) }} />

                        </Animated.View>
                    </>
                    :
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size={"large"} color={colors.DODGER_BLUE} />
                    </View>
                }
            </View>

        </>
    );
}

const secondIndicatorStyles = {
    stepIndicatorSize: wp(20),
    currentStepIndicatorSize: wp(20),
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.DARK_BLUE,
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: colors.GRAY_TXT,
    stepStrokeUnFinishedColor: colors.GRAY_TXT,
    separatorFinishedColor: colors.GRAY_TXT,
    separatorUnFinishedColor: colors.GRAY_TXT,
    stepIndicatorFinishedColor: colors.WHITE,
    stepIndicatorUnFinishedColor: colors.WHITE,
    labelColor: colors.GRAY_SUIT,
    labelSize: wp(4),
    labelFontFamily: fonts.SEMI_BOLD,
    currentStepLabelColor: colors.DARK_BLUE,
};