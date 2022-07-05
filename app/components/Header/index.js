import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, Image, StatusBar, Platform } from 'react-native';
// Styles
import globalStyles from '../../res/globalStyles';
import { images } from '../../res/images';
import { colors } from '../../res/colors';
import { styles } from './style';
import { Spacer } from '../../res/spacer';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fonts } from '../../res/fonts';

export const Header = (props) => {
    const inputRef = useRef(null);

    return (
        <>
            <StatusBar backgroundColor={colors.LIGHT_SHADE} barStyle="dark-content" translucent={false} />
            <View style={globalStyles.header}>
                <View style={globalStyles.headerSubContainer}>
                    <View style={{ flex: 1 }}>
                        {props.is_shrink ?
                            <View>
                                <Spacer space={hp(2)} />
                                <Text style={{ ...styles.headerText, position: "absolute", top: wp(2), textAlign: "center", fontFamily: fonts.BOLD, fontSize: wp(Platform.isPad ? 5.5 : 4), alignSelf: "center" }}>{props.headerText}</Text>
                                <View style={{ position: "absolute", right: 0, top: wp(2), }}>

                                    <TouchableOpacity onPress={() => { props.onSetting() }}>
                                        <Image source={images.setting_line} style={{ ...styles.img_ic, tintColor: colors.DODGER_BLUE, alignSelf: "flex-end" }} />
                                    </TouchableOpacity>
                                </View>
                                <Spacer space={hp(0.5)} />
                            </View>
                            :
                            <>
                                <Spacer space={5} />
                                <Text style={[styles.topheaderText]}>{props.sub_headerText}</Text>
                                <View style={styles.flexing_row}>
                                    <Text style={[styles.headerText]}>{props.headerText}</Text>
                                    <View style={{ flexDirection: "row" }}>

                                        <TouchableOpacity onPress={() => { props.onSetting() }}>
                                            <Image source={images.setting_line} style={{ ...styles.img_ic, tintColor: colors.DODGER_BLUE }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Spacer space={3} />
                            </>
                        }
                    </View>
                </View>
            </View >
        </>
    )
}