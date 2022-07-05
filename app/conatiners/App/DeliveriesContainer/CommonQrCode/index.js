import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Modal from "react-native-modal";
// Third party libraries
import QRCode from 'react-native-qrcode-svg';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '../../../../components/AppHeader';
import { colors } from '../../../../res/colors';
import globalStyles from '../../../../res/globalStyles';
// styles and themes
import { Spacer } from '../../../../res/spacer';
import { styles } from './style';
//#region third party libs
import { getData } from '../../../../utils/AsyncStorageHelper';

export default CommonQrCode = (props) => {
    const dispatch = useDispatch();
    const [local_qr_data, setLocalQRData] = useState(null)
    const appReducer = useSelector(state => state.appReducer)

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    useEffect(() => {
        getData("qrData", (data => { setLocalQRData(data) }), (err => { setLocalQRData(null) }))
    }, [])

    return (
        <>
            <Modal style={styles.modal_container}
                isVisible={props.isModalVisible}
                backdropOpacity={0.7}
                onBackButtonPress={() => { props.onModalFalse() }}>
                <View style={{ ...globalStyles.flex, }}>
                    <AppHeader is_white isShow back_title={getLanguageValue('ACM_BACK')} is_dark is_ic_right onBackPress={() => { props.onModalFalse() }} hide_title={false} _title={getLanguageValue('ACM_SHOW_QR_CODE')} />
                    <Spacer space={hp(0.2)} />
                    <View style={{ ...styles.divider, backgroundColor: colors.DARK_BORDER_MODEL }} />
                    <View style={{ ...globalStyles.subContainer, width: wp(100), backgroundColor: colors.BG_COMMON }}>
                        <View style={{ alignSelf: "center", alignItems: "center" }}>
                            <Spacer space={hp(1.5)} />
                            <Text style={styles.txt_fonts}>{getLanguageValue('ACM_QR_CODE_FOR_DOCKET_NO').replace('{0}', props.isConnected == true ? props.item.DOCKETID : (local_qr_data != null ? local_qr_data.DOCKETID : null))}</Text>
                            <Spacer space={hp(1.2)} />
                            <QRCode
                                value={
                                    props.isConnected == true ?
                                        JSON.stringify(Object.assign({
                                            "DOCKETID": props.item.DOCKETID,
                                            "THK_TRUCKID": props.item.THK_TRUCKID,
                                            "ORDERDATE": props.item.ORDERDATE,
                                            "JobCode": props.item.JobCode,
                                            "PLANTID": props.item.PLANTID
                                        }))
                                        :
                                        local_qr_data
                                }
                                size={wp(75)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}