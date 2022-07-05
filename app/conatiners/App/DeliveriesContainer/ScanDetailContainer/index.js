import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
// styles and themes
import globalStyles from '../../../../res/globalStyles';
import { images } from '../../../../res/images';
import { colors } from '../../../../res/colors';
import { AppHeader } from '../../../../components/AppHeader';
import { styles } from './style';
import DeleiveryDetailContent from '../../../../components/DeleiveryDetailContent';
import CommonQrCode from '../CommonQrCode';
import CustomerRemarkContainer from '../CustomerRemarkContainer';
import { Spacer } from '../../../../res/spacer';
import { saveData } from '../../../../utils/AsyncStorageHelper';
import LocalDeliveryDetailContainer from '../../../../components/LocalDeliveryDetailContainer';
// Third party libraries
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NetInfo from "@react-native-community/netinfo";


export default ScanDetailContainer = (props) => {
    const param = props.route.params;
    const [isQrCodeVisible, setQrCodeVisible] = useState(false);
    const [qr_page, setQrPage] = useState({ title: "Comfirmation QR code", type: 0 });
    const [isRemarkModalVisible, setRemarkModalVisible] = useState(false);
    const [netword_issue, setNetworkIssue] = useState(true)

    const appReducer = useSelector(state => state.appReducer)

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    const SECTIONS = [
        {
            id: 1,
            image: images.circle_check_ic,
            title: getLanguageValue("ACM_DELIVERY_STATUS"),
            data: []
        },
        {
            id: 2,
            image: images.d_box_ic,
            title: getLanguageValue("ACM_DOCKET_INFORMATION"),
            data: []
        },
        {
            id: 3,
            image: images.attach_ic,
            title: getLanguageValue("ACM_ATTACHMENT"),
            data: []
        },
    ];

    useEffect(() => {
        NetInfo.addEventListener((state) => {
            if (state.isConnected != true) {
                setNetworkIssue(true)
            } else {
                setNetworkIssue(false),
                    param.item != null &&
                    saveData('qrData', JSON.stringify(Object.assign({
                        "DOCKETID": param.item.DOCKETID,
                        "THK_TRUCKID": param.item.THK_TRUCKID,
                        "ORDERDATE": param.item.ORDERDATE,
                        "JobCode": param.item.JobCode,
                        "PLANTID": param.item.PLANTID
                    }))),
                    param.item != null &&
                    saveData('localData', param.item)
            }
        });
    }, []);

    return (
        <View style={globalStyles.flex}>
            <AppHeader is_white isShow onBackPress={() => { props.navigation.goBack() }} back_title={getLanguageValue('ACM_BACK')} hide_title={false} _title={param.is_home ? getLanguageValue('ACM_DELIVERY') : getLanguageValue('ACM_DELIVERY_HISTORY')} />
            <View style={{ ...globalStyles.subContainer, width: wp(100), backgroundColor: colors.BG_COMMON }}>
                {
                    netword_issue ?
                        <>
                            <CommonQrCode
                                navigation={props.navigation}
                                isModalVisible={isQrCodeVisible}
                                isConnected={false}
                                onModalFalse={() => { setQrCodeVisible(!isQrCodeVisible) }} />

                            <LocalDeliveryDetailContainer
                                SECTIONS={SECTIONS}
                                navigation={props.navigation}
                                openQrCode={(item) => { setQrCodeVisible(!isQrCodeVisible), setQrPage(item) }}
                            />
                        </>
                        :
                        (param.item != null) &&
                        <>
                            <CommonQrCode
                                navigation={props.navigation}
                                isModalVisible={isQrCodeVisible}
                                status={param.status}
                                item={param.item}
                                title={qr_page.title}
                                type={qr_page.type}
                                isConnected={true}
                                onModalFalse={() => { setQrCodeVisible(!isQrCodeVisible) }} />

                            <DeleiveryDetailContent
                                SECTIONS={SECTIONS}
                                status={param.status}
                                item={param.item}
                                navigation={props.navigation}
                                openQrCode={(item) => { setQrCodeVisible(!isQrCodeVisible), setQrPage(item) }}
                            />
                        </>
                }

                {
                    (param.item == null && netword_issue == false) ?
                        <>
                            <View style={styles.flex_align}>
                                <Image source={images.file_dock} style={styles.dock_file_ic} />
                                <Spacer space={hp(1)} />
                                <Text style={{ ...styles.txt_no_data }}>{getLanguageValue('ACM_NO_DELIVERY')}</Text>
                            </View>
                        </>
                        :
                        <>
                            {param.item != null &&
                                <CustomerRemarkContainer
                                    item={param.item}
                                    navigation={props.navigation}
                                    is_home={false}
                                    isModalVisible={isRemarkModalVisible}
                                    onModalFalse={() => { setRemarkModalVisible(!isRemarkModalVisible) }}
                                />
                            }
                        </>
                }

            </View>
            <View style={styles.bottom_container}>

                <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate(getLanguageValue('ACM_DELIVERY'), { screen: 'Deliveries' }) }} style={{ ...styles.bottom_wrapper, marginTop: 2 }}>
                    <Image source={images.dashboard_ic} style={styles.sm_image} />
                    <Text style={styles.txt_gray}>{getLanguageValue('ACM_HOME')}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={() => { setRemarkModalVisible(!isRemarkModalVisible) }} style={styles.bottom_wrapper}>
                    <Image source={images.remark} style={styles.mm_image} />
                    <Text style={styles.txt_gray}>{getLanguageValue('ACM_DRIVER_ADDON_REMARK')}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={() => { props.navigation.navigate("QrCode") }} style={styles.bottom_wrapper}>
                    <Image source={images.scan_sf} style={styles.mm_image} />
                    <Text style={styles.txt_gray}>{getLanguageValue('ACM_SCAN_TO_CONFIRM')}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={() => { setQrCodeVisible(true) }} style={{ ...styles.bottom_wrapper, top: -wp(10), right: wp(2) }}>
                    <Image source={global.LanguageSelect == 'en' ? images.scan_btn : images.scan_btn_ch} resizeMode={'contain'} style={styles.lm_image} />
                </TouchableOpacity>

            </View>
        </View >
    )
}