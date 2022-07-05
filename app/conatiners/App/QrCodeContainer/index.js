import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Alert, AppState } from 'react-native';
// Third party libraries
import { check, PERMISSIONS, request } from 'react-native-permissions';
import Permissions from 'react-native-permissions';
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NetInfo from "@react-native-community/netinfo";
import { useSelector, useDispatch } from 'react-redux';

// styles & themes
import { fonts } from '../../../res/fonts';
import globalStyles from '../../../res/globalStyles';
import { colors } from '../../../res/colors';
import { images } from '../../../res/images';
import { onGetDriverDockets } from '../../../redux/actions/AppAction';
import { getData, saveData } from '../../../utils/AsyncStorageHelper';
Icon.loadFont();

export default QrCodeContainer = (props) => {

    const qrCodeRef = useRef(null);
    const appReducer = useSelector(state => state.appReducer)
    const generalReducer = useSelector(state => state.generalReducer)
    const [currentDocket, setCurrentDocket] = useState(null)
    const dispatch = useDispatch();
    const [viewFocused, setViewFocused] = useState(false);

    useEffect(() => {
        NetInfo.addEventListener((state) => {
            if (state.isConnected != true) {
                getData("localData", (data => { setCurrentDocket(data) }), (err => { setCurrentDocket(null) }))
            } else {
                dispatch(onGetDriverDockets(generalReducer.userDetails?.UserID, (data) => {
                    if (data && data?.Docket) {
                        setCurrentDocket(data?.Docket)
                    }
                }))
            }
        });
    }, []);

    const openSettings = () => {
        Alert.alert(
            "Edocket",
            `${"Permission"}`,
            [
                {
                    text: "OK",
                    onPress: () => { Permissions.openSettings() },
                },
            ],
            {
                cancelable: false,
            }
        )
    }

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    useEffect(() => {
        const listener = AppState.addEventListener('change', (status) => {
            if (Platform.OS === 'ios' && status === 'active') {
                check(PERMISSIONS.IOS.CAMERA).then(response => {
                    if (response === "granted") {
                        setViewFocused(true);
                    }
                    else {
                        openSettings()
                    }
                });
            }
        });

        return listener.remove;
    }, []);

    const onSuccess = e => {
        let e_data = JSON.parse(e.data)
        if (e_data?.DOCKETID == currentDocket?.DOCKETID) {
            Alert.alert(
                `${getLanguageValue('ACM_DELIVERY_UPDATE')}`,
                `${getLanguageValue('ACM_DELIVERY_UPDATE_CONTENT').replace('{0}', e_data.DOCKETID)}`,
                [{
                    text: `${getLanguageValue('ACM_OK')}`,
                    onPress: () => {
                        NetInfo.addEventListener((state) => {
                            if (state.isConnected != true) {
                                let item = Object.assign(currentDocket, { "STATUS": e_data?.STATUS })
                                saveData('localData', item)
                                setTimeout(() => {
                                    props.navigation.navigate(getLanguageValue('ACM_DELIVERY'), { screen: 'Deliveries' })
                                }, 100);
                            } else {
                                setTimeout(() => {
                                    props.navigation.goBack()
                                }, 100);
                            }
                        })
                    },
                }
                ],
                { cancelable: false },
            );
        } else {
            Alert.alert(
                `${getLanguageValue('ACM_DELIVERY_UPDATE_FAILED')}`,
                `${getLanguageValue('ACM_DELIVERY_UPDATE_FAILED_CONTENT ').replace('{0}', e_data.DOCKETID)}`,
                [{
                    text: `${getLanguageValue('ACM_OK')}`,
                    onPress: () => {
                        setTimeout(() => {
                            props.navigation.goBack()
                        }, 100);
                    },
                }
                ],
                { cancelable: false },
            );
        }
    };


    useEffect(() => {
        const onFocus = props.navigation.addListener('focus', () => {
            if (Platform.OS === 'ios') {
                request(PERMISSIONS.IOS.CAMERA).then(response => {
                    if (response === "granted") {
                        setViewFocused(true);
                    }
                    else {
                        openSettings()
                    }
                });
            } else {
                setViewFocused(true);
            }
        });

        const onBlur = props.navigation.addListener('blur', () => {
            setViewFocused(false);
        });

        return { onFocus, onBlur };
    }, [props.navigation]);


    const makeSlideOutTranslation = (translationType, fromValue) => {
        return {
            from: {
                [translationType]: wp(100) * 0.10
            },
            to: {
                [translationType]: fromValue
            }
        };
    }

    return (
        <>
            {viewFocused &&
                <QRCodeScanner
                    showMarker
                    ref={qrCodeRef}
                    onRead={onSuccess}
                    cameraStyle={{ height: hp(100) }}
                    customMarker={
                        <View style={styles.rectangleContainer}>
                            <StatusBar backgroundColor={overlayColor} barStyle={"light-content"} />

                            <View style={{ ...globalStyles.header, backgroundColor: overlayColor, zIndex: 1, padding: 16 }}>
                                <View style={{ ...globalStyles.headerSubContainer, width: wp(100) }}>
                                    <TouchableOpacity style={styles.back_wrapper} onPress={() => props.navigation.goBack()}>
                                        <Image resizeMode={'contain'} source={images.prev_ic} style={{ ...styles.backIcon, tintColor: colors.WHITE }} />
                                        <Text style={{ ...styles.txt_back, color: colors.WHITE }}>{getLanguageValue("ACM_BACK")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.topOverlay} />
                            <View style={{ flexDirection: "row" }}>

                                <View style={styles.leftAndRightOverlay} />
                                <View style={styles.rectangle}>
                                    <>
                                        <Image source={images.top_left_curve} style={{ ...styles.position_ic, top: -6, left: -6, }} />
                                        <Image source={images.top_right_curve} style={{ ...styles.position_ic, top: -6, right: -6, }} />
                                        <Image source={images.bottom_left_curve} style={{ ...styles.position_ic, bottom: -6, left: -6, }} />
                                        <Image source={images.bottom_right_curve} style={{ ...styles.position_ic, bottom: -6, right: -6, }} />
                                    </>
                                    <Animatable.View
                                        style={styles.scanBar}
                                        direction="alternate-reverse"
                                        iterationCount="infinite"
                                        duration={1700}
                                        easing="linear"
                                        animation={makeSlideOutTranslation("translateY", wp(100) * 0.60)}
                                    />
                                </View>
                                <View style={styles.leftAndRightOverlay} />
                            </View>

                            <View style={styles.bottomOverlay} >
                                <Text style={styles.txt_bold}>{getLanguageValue('ACM_SCAN_CUSTOMER_QR_CODE')}</Text>
                            </View>
                        </View>
                    }
                />
            }
        </>

    )
}

const overlayColor = "rgba(0,0,0,0.4)"; // this gives us a black color with a 50% transparency

const rectDimensions = wp(100) * 0.70; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = wp(100) * 0.005; // this is equivalent to 2 from a 393 device width

const scanBarWidth = wp(100) * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = wp(90) * 0.0025; //this is equivalent to 1 from a 393 device width


const styles = StyleSheet.create({
    back_wrapper: {
        flexDirection: "row",
        position: "absolute",
        zIndex: 1,
        marginLeft: 6,
    },
    rectangleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: overlayColor
    },
    rectangle: {
        height: rectDimensions,
        width: rectDimensions,
        borderWidth: wp(0.5),
        borderRadius: wp(5),
        borderColor: colors.WHITE,
        alignItems: "center",
        zIndex: 1,
        backgroundColor: overlayColor
    },
    topOverlay: {
        flex: 1,
        height: wp(100),
        width: wp(100),
        backgroundColor: overlayColor,
        // justifyContent: "center",
        alignItems: "center"
    },
    bottomOverlay: {
        flex: 1,
        height: wp(100),
        width: wp(100),
        backgroundColor: overlayColor,
        paddingBottom: wp(100) * 0.25,
        paddingTop: wp(10)
    },
    leftAndRightOverlay: {
        // height: wp(100) * 0.55,
        width: wp(100),
        backgroundColor: overlayColor
    },
    scanBar: {
        width: scanBarWidth,
        height: scanBarHeight,
        backgroundColor: colors.PIZZAS
    },
    position_ic: {
        width: wp(14),
        height: wp(14),
        position: "absolute",
    },
    txt_bold: {
        fontSize: wp(4),
        fontFamily: fonts.SEMI_BOLD,
        color: colors.WHITE,
        alignSelf: "center"
    },
    backIcon: {
        width: wp(5),
        height: wp(5),
        resizeMode: "contain",
        alignSelf: 'center',
    },
    txt_back: {
        fontSize: wp(4),
        fontFamily: fonts.REGULAR,
        color: colors.WHITE
    },
});
