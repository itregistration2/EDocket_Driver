
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Keyboard } from 'react-native';
// styles and themes
import { Spacer } from '../../../res/spacer';
import globalStyles from '../../../res/globalStyles';
import { images } from '../../../res/images';
import { fonts } from '../../../res/fonts';
import { colors } from '../../../res/colors';
import { styles } from './style';
import { AppHeader } from '../../../components/AppHeader';
import { onGetDriverDocketHistory } from '../../../redux/actions/AppAction';
// Third party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

export default HistoryContainer = (props) => {
    const sideAnimation = React.useMemo(() => new Animated.ValueXY({ x: 0, y: -120 }), [])
    const scrollY = useRef(new Animated.Value(0));
    const dispatch = useDispatch();
    const generalReducer = useSelector(state => state.generalReducer)
    const appReducer = useSelector(state => state.appReducer)

    const [history_data, setHistoryData] = useState([])

    // empty container
    const emptyContainer = () => {
        return (
            <View style={{ alignSelf: "center" }}>
                <Spacer space={hp(3)} />
                <Image source={images.file_dock} style={styles.ic_dock} />
                <Spacer space={hp(1)} />
                <Text style={{ ...styles.txt_fonts, color: colors.MANATEE, fontFamily: fonts.REGULAR }}>{getLanguageValue('ACM_NO_DELIVERY_HISTORY')}</Text>
            </View>
        )
    }

    useEffect(() => {
        dispatch(onGetDriverDocketHistory(generalReducer.userDetails?.UserID))
    }, [generalReducer.userDetails])

    useEffect(() => {
        setHistoryData(appReducer.get_driver_docket_history)
    }, [appReducer.get_driver_docket_history])

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    const handleScroll = Animated.event(
        [
            {
                nativeEvent: { contentOffset: { y: scrollY.current } },
            },
        ],
        {
            useNativeDriver: true,
            listener: event => {
                Keyboard.dismiss()
                const currentOffset = event.nativeEvent.contentOffset.y;
                if (currentOffset < 60) {
                    Animated.timing(sideAnimation, {
                        toValue: { x: 0, y: -120 },
                        duration: 60,
                        useNativeDriver: false,
                    }).start()
                } else if (currentOffset > 60) {
                    Animated.timing(sideAnimation, {
                        toValue: { x: 0, y: 0 },
                        duration: 10,
                        useNativeDriver: false,
                    }).start()
                }
            },
        },
    );


    const renderHistoryItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index}
                onPress={() => {
                    props.navigation.navigate("ScanDetails", { "item": item, "status": item?.STATUS, is_home: false })
                }}
                style={{ backgroundColor: colors.WHITE }}>
                {index == 0 && <View style={styles.b_border_color} />}
                <Spacer space={hp(2.5)} />
                <View style={{ width: wp(90), alignSelf: "center" }}>
                    <View style={styles.flex_row}>
                        <Text style={styles.txt_fonts}>{item.DOCKETID}</Text>
                        <Image source={images.right_arrow} style={styles.ic_right} />
                    </View>
                    <Spacer space={hp(0.6)} />
                    <View style={styles.flex_row}>
                        <View style={{ width: wp(65) }}>
                            <Text style={styles.txt_regular_fonts}>{getLanguageValue('ACM_THIS_LOAD_2') + ' ' + item.DLVQTY}</Text>
                            <Text style={styles.txt_regular_fonts}>{getLanguageValue('ACM_RETURN_PLANT_QTY') + ' ' + (item.STATUS == "accepted" ? 0 : item.STATUS == 'Dump' ? (item.DumpQty || '') : (item.RejectQty || ''))}</Text>
                            <Text style={styles.txt_regular_fonts}>{getLanguageValue('ACM_MIX_DESCR') + ' ' + item.MIX}</Text>
                        </View>
                        <View style={{ ...styles.round_wrapper, backgroundColor: item.STATUS == "accepted" ? colors.CARRABIAN_GREEN : item.STATUS == "dump" ? colors.DODGER_BLUE_1 : colors.RED }}>
                            <Text style={styles.wrapper_txt}>{item.STATUS == "accepted" ? getLanguageValue("ACM_ACCEPTED") : item.STATUS == "dump" ? getLanguageValue("ACM_DUMP") : getLanguageValue("ACM_REJECTED")}</Text>
                        </View>
                    </View>
                </View>
                <Spacer space={hp(2.5)} />
                <View style={styles.b_border_color} />
            </TouchableOpacity>
        )
    }


    return (
        <>
            <View style={{ ...globalStyles.flex, backgroundColor: colors.BG_COMMON }}>
                <AppHeader is_white isShow onBackPress={() => { props.navigation.goBack() }} hide_title={false} _title={getLanguageValue('ACM_DELIVERY_HISTORY')} />
                <Animated.FlatList
                    onScroll={handleScroll}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={history_data}
                    ListHeaderComponent={
                        <>
                            <Spacer space={hp(1)} />
                            <View style={styles.f_row}>
                                <Image source={images.completed_ic} style={{ ...styles.ic_complete_left }} />
                                <Text style={{ ...styles.txt_fonts, fontSize: wp(5), alignSelf: "center" }}>{getLanguageValue('ACM_COMPLETED_ON') + ' ' + moment().format("DD MMM YYYY")}</Text>
                            </View>
                            {history_data && history_data.length == 0 && emptyContainer()}
                        </>
                    }
                    contentContainerStyle={{ width: wp(100), alignSelf: "center" }}
                    renderItem={renderHistoryItem}
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={
                        <Spacer space={hp(2)} />
                    }
                />
            </View>
        </>
    );
}

