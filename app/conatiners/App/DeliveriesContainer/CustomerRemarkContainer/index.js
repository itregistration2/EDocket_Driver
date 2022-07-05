import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
// styles and themes
import { Spacer } from '../../../../res/spacer';
import globalStyles from '../../../../res/globalStyles';
import { colors } from '../../../../res/colors';
import { AppHeader } from '../../../../components/AppHeader';
import { styles } from './style';
import { GradientButton } from '../../../../components/GradientButton';
import { Input_Line } from '../../../../components/input_line';
// Third party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import Modal from "react-native-modal";
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useSelector, useDispatch } from 'react-redux';
import { onPostDriverRemark } from '../../../../redux/actions/AppAction';
import BaseClass from '../../../../utils/BaseClass';

export default CustomerRemarkContainer = (props) => {

    const [remark, setRemark] = useState(props.item.DriverAddonRemark || '')
    const dispatch = useDispatch();
    const generalReducer = useSelector(state => state.generalReducer)
    const appReducer = useSelector(state => state.appReducer)
    const Base = new BaseClass();

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    useEffect(() => {
        if (props.isModalVisible) {
            Platform.OS == "android" && AndroidKeyboardAdjust.setAdjustPan();
        } else {
            Platform.OS == "android" && AndroidKeyboardAdjust.setAdjustResize();
        }
    }, [props.isModalVisible]);

    const onSubmit = () => {
        let s_requestBody = JSON.stringify({
            "DriverAddonRemark": remark,
            "UserId": generalReducer.userDetails?.UserID,
            "DocketId": props.item.DOCKETID,
        })
        dispatch(onPostDriverRemark(s_requestBody, (data) => {
            Keyboard.dismiss()
            props.onModalFalse()
            if (data.response.IsSuccessful) {
                setTimeout(() => {
                    Base.showToastSucess(data.response.Message);
                }, 350);
            }
        }))
    }

    return (
        <>
            <Modal style={styles.modal_container}
                isVisible={props.isModalVisible}
                backdropOpacity={0.7}
                onBackButtonPress={() => { props.onModalFalse() }}
            >
                <View style={{ ...globalStyles.flex }}>
                    <AppHeader
                        isShow
                        is_white
                        is_doggler_blue
                        is_modal
                        is_right_include_No
                        onBackPress={() => { props.onModalFalse() }}
                        hide_title={false}
                        _title={getLanguageValue('ACM_ADD_DRIVER_ADDON_REMARK')} />
                    <Spacer space={hp(0.2)} />
                    <View style={{ ...styles.divider, backgroundColor: colors.DARK_BORDER_MODEL }} />
                    <View style={{ ...globalStyles.subContainer, width: wp(100), backgroundColor: colors.BG_COMMON }}>
                        <ScrollView
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            keyboardDismissMode={'interactive'}
                            keyboardShouldPersistTaps={'handled'}
                        >
                            <Input_Line
                                multiline
                                maxLength={50}
                                value={remark}
                                onChange={(val) => { setRemark(val) }}
                                txtstyle={{ textAlignVertical: "top", height: hp(50) }}
                                headerline={getLanguageValue('ACM_DRIVER_ADDON_REMARK')}
                                placeholder={getLanguageValue('ACM_DRIVER_ADDON_REMARK_HINTS')}
                            />
                            <Spacer space={hp(1.2)} />
                        </ScrollView>
                        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={160} />
                        {Platform.OS == "ios" &&
                            <View style={{ paddingBottom: hp(isIphoneX() ? 15 : 10) }}>
                                <GradientButton
                                    is_light_blue
                                    is_border_more
                                    buttonText={getLanguageValue('ACM_SUBMIT')}
                                    buttonPress={() => { onSubmit() }}
                                />
                            </View>
                        }
                    </View>
                </View>
                {Platform.OS == "android" &&
                    <View style={{ paddingBottom: hp(10), backgroundColor: colors.BG_COMMON }} >
                        <GradientButton
                            is_light_blue
                            is_border_more
                            buttonText={getLanguageValue('ACM_SUBMIT')}
                            buttonPress={() => { onSubmit() }}
                        />
                    </View>
                }
            </Modal>

        </>
    )
}