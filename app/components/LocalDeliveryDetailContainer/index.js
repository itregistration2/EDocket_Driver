import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
// styles and themes
import { Spacer } from '../../res/spacer';
import { images } from '../../res/images';
import { fonts } from '../../res/fonts';
import { colors } from '../../res/colors';
import { styles } from './style';
import { GradientButton } from '../GradientButton';
import { fmtMSS } from '../../utils/Constants';
import { GET_DOCKET_PDF, GET_HOUSING_DOCKET_PDF } from '../../apiHelper/Api';
// Third party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SectionList from 'react-native-tabs-section-list';
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { getData } from '../../utils/AsyncStorageHelper';

export default LocalDeliveryDetailContainer = (props) => {
    const dispatch = useDispatch();
    const appReducer = useSelector(state => state.appReducer)
    const [phone, setPhone] = useState('123')
    const [mathRandom, setMathRandom] = useState(Math.random())

    const [currentDelivery, setCurrentDelivery] = useState(null)
    const timer = useRef(null);

    useEffect(() => {
        getData("localData", (data => { setCurrentDelivery(data) }), (err => { setCurrentDelivery(null) }))
    }, [])

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    return (
        <SectionList
            sections={props.SECTIONS}
            keyExtractor={item => item.title}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            scrollToLocationOffset={0}
            tabBarStyle={styles.tabBar}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderTab={({ title, isActive }) => (
                <>
                    <View style={[styles.tabContainer, { borderBottomWidth: isActive ? 2 : 0 }]}>
                        <Text style={[styles.tabText, { fontSize: wp(global.FontSizeSelect == 'M' ? 3.8 : global.FontSizeSelect == 'L' ? 4.8 : 2.8) }]}>{title}</Text>
                    </View>
                </>
            )}
            renderSectionHeader={({ section }) => (
                <View>
                    <View style={styles.sectionHeaderContainer} />
                    <View style={styles.section_title_wrapper}>
                        <Image source={section.image} style={styles.icon_style} />
                        <Text style={{ ...styles.sectionHeaderText, fontSize: wp(global.FontSizeSelect == 'M' ? 5.5 : global.FontSizeSelect == 'L' ? 6.5 : 4.5) }}>{section.title}</Text>
                    </View>
                    {section.id == 1 ?
                        <>
                            <View style={styles.seperate_row_st}>
                                <Spacer space={hp(1)} />
                                <Text style={{ ...styles.lbl_Bold, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4), color: currentDelivery?.STATUS == null ? colors.PIZZAS : currentDelivery?.STATUS == "accepted" ? colors.CARRABIAN_GREEN : currentDelivery?.STATUS == "dump" ? colors.DODGER_BLUE : colors.REJECTED }}>{currentDelivery?.STATUS == null ? getLanguageValue('ACM_DELIVERY_WAITING_FOR_CONFIRMATION') : currentDelivery?.STATUS == "accepted" ? getLanguageValue('ACM_DELIVERY_ACCEPTED') : currentDelivery?.STATUS == "dump" ? getLanguageValue('ACM_DELIVERY_ACCEPTED_DUMP') : getLanguageValue('ACM_DELIVERY_REJECTED')}</Text>
                                {
                                    (currentDelivery?.STATUS == "rejected" || currentDelivery?.STATUS == "dump") &&
                                    <>
                                        <Spacer space={hp(1)} />
                                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                            <GradientButton
                                                is_light_blue
                                                is_icon
                                                is_border_more
                                                txtStyle={{ fontSize: wp(global.FontSizeSelect == 'M' ? 3.5 : global.FontSizeSelect == 'L' ? 4.5 : 2.5), }}
                                                buttonstyle={{ width: wp(35) }}
                                                buttonText={getLanguageValue("ACM_CONTACT_CSC")}
                                                buttonPress={() => { Linking.openURL(`tel:${phone}`) }}
                                            />

                                            <GradientButton
                                                is_light_blue
                                                is_icon
                                                is_border_more
                                                is_ic_pass
                                                ic_pass={images.union}
                                                txtStyle={{ fontSize: wp(global.FontSizeSelect == 'M' ? 3.5 : global.FontSizeSelect == 'L' ? 4.5 : 2.5), }}
                                                buttonstyle={{ width: wp(35) }}
                                                buttonText={getLanguageValue('ACM_CONTACT_PLANT')}
                                                buttonPress={() => { Linking.openURL(`tel:${item.PLANTPHONE}`) }}
                                            />
                                        </View>
                                    </>
                                }
                                <Spacer space={hp(2)} />
                            </View>
                        </>
                        : section.id == 2 ?
                            <View style={styles.seperate_row_st}>
                                <Spacer space={hp(1.5)}></Spacer>
                                <Text style={{ ...styles.sm_sl, fontSize: wp(global.FontSizeSelect == 'M' ? 3.5 : global.FontSizeSelect == 'L' ? 4.5 : 2.5), }}>{getLanguageValue("ACM_DELIVERY_DATE")}</Text>
                                <Spacer space={hp(0.2)}></Spacer>
                                <Text style={{ ...styles.sm_sl, fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4), fontFamily: fonts.BOLD }}>{moment(currentDelivery?.ACTUALLOADDATE).format("DD MMMM YYYY")}</Text>
                                <Spacer space={hp(1.2)}></Spacer>
                                <>
                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6), }}>{getLanguageValue("ACM_SITE_ADDRESS")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.JOBCHINESEADDRESS}</Text>
                                    </View>
                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_HEADER_DELIVERY_INSTRUCTIONS")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.THK_CSORDERTAKEDLVINSTRLISTHDR}</Text>
                                    </View>
                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_DOCKET_NO")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.DOCKETID}</Text>
                                    </View>
                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_SITE_CONTACT")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(48), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.SITECONTACT}</Text>
                                    </View>
                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_THIS_LOAD")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.DLVQTY}</Text>
                                    </View>
                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_DRIVER_REMARK")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.REMARK}</Text>
                                    </View>

                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_FLEET_NO")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.THK_TRUCKID + " (" + currentDelivery?.TRUCKREGNO + ")"}</Text>
                                    </View>

                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_ORDER_DATE")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontFamily: fonts.BOLD, fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.ORDERDATE} <Text style={{ fontSize: wp(2.5) }}> (DD/MM/YYYY)</Text></Text>
                                    </View>

                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_TIME_LOADED")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{fmtMSS(currentDelivery?.CREATEDTIME)}</Text>
                                    </View>

                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_MIX_NAME")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.MIX}</Text>
                                    </View>

                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_TC")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.TemperatureControl}</Text>
                                    </View>

                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_CUM_TOTAL")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontFamily: fonts.BOLD, fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.QTYCUMTOTAL}</Text>
                                    </View>

                                    <View style={styles.itemRow}>
                                        <Text style={{ ...styles.item_txt, width: wp(38), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{getLanguageValue("ACM_PLANT")}</Text>
                                        <Text style={{ ...styles.item_txt, width: wp(44), fontSize: wp(global.FontSizeSelect == 'M' ? 3.6 : global.FontSizeSelect == 'L' ? 4.6 : 2.6) }}>{currentDelivery?.PLANTID}</Text>
                                    </View>
                                </>
                                <Spacer space={hp(2)} />
                                <View style={{ alignSelf: "center", alignItems: "center" }}>
                                    <QRCode value={
                                        JSON.stringify(Object.assign({
                                            "DOCKETID": currentDelivery?.DOCKETID,
                                            "THK_TRUCKID": currentDelivery?.THK_TRUCKID,
                                            "ORDERDATE": currentDelivery?.ORDERDATE,
                                            "JobCode": currentDelivery?.JobCode,
                                            "PLANTID": currentDelivery?.PLANTID
                                        }))
                                    } size={wp(55)} />
                                </View>
                                <Spacer space={hp(2)} />
                            </View>
                            :
                            <>
                                <TouchableOpacity onPress={() => props.navigation.navigate("ImagePreview", { "image_url": GET_DOCKET_PDF + `?fileName=${currentDelivery?.DOCKETID}`, type: "Docket Preview" })} style={{ ...styles.section_title_wrapper, justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image source={images.attbox} style={styles.icon_style} />
                                        <Text style={{ ...styles.sectionHeaderText, fontFamily: fonts.SEMI_BOLD, fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5) }}>{getLanguageValue("ACM_DOCKET_PREVIEW")}</Text>
                                    </View>
                                    <Image source={images.next_grey} style={styles.icon_style} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => props.navigation.navigate("ImagePreview", { "image_url": GET_HOUSING_DOCKET_PDF + `?fileName=${currentDelivery?.DOCKETID}`, type: "Housing Certificate" })} style={{ ...styles.section_title_wrapper, justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image source={images.home_ic} style={{ ...styles.icon_style, width: wp(5), height: wp(5), alignSelf: "center", marginLeft: wp(3), marginRight: wp(1), tintColor: colors.PIZZAS }} />
                                        <Text style={{ ...styles.sectionHeaderText, fontFamily: fonts.SEMI_BOLD, fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5), opacity: 1 }}>{getLanguageValue("ACM_HOUSING_CERTIFICATE")}</Text>
                                    </View>
                                    <Image source={images.next_grey} style={styles.icon_style} />
                                </TouchableOpacity>
                                <Spacer space={hp(isIphoneX() ? 28.5 : 29.5)}></Spacer>
                            </>
                    }
                </View>
            )}
            renderItem={({ item }) => (null)}
        />
    )
}