import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
// styles and themes
import globalStyles from '../../../../res/globalStyles';
import { colors } from '../../../../res/colors';
import { AppHeader } from '../../../../components/AppHeader';
import { styles } from './style';
import { images } from '../../../../res/images';
import { Spacer } from '../../../../res/spacer';
import BaseClass from '../../../../utils/BaseClass';
import { saveData } from '../../../../utils/AsyncStorageHelper';
// Third party libraries & redux
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

export default FontChange = (props) => {
    const appReducer = useSelector(state => state.appReducer)
    const Base = new BaseClass();

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }


    const onSubmitClick = async (item) => {
        global.FontSizeSelect = item
        saveData("fontsize", item)
        setTimeout(() => {
            props.navigation.replace('Splash');
            Base.showToastSucess(global.LanguageSelect == 'en' ? "Change Scoreboard font size" : "改變排位表字體大小");
        }, 200);
    }


    return (
        <View style={globalStyles.flex}>
            <AppHeader is_white isShow onBackPress={() => { props.navigation.goBack() }} hide_title={false} _title={getLanguageValue('ACM_SETTING')} />
            <View style={{ ...globalStyles.subContainer, width: wp(100), backgroundColor: colors.BG_COMMON }}>
                <View style={{ padding: wp(4) }}>
                    <Text style={{ ...styles.txt_fonts, textAlign: "center" }}>{getLanguageValue('ACM_CHANGEFONTSIZE_INSTRUCTION')}</Text>
                </View>
                <Spacer space={hp(1)} />
                <TouchableOpacity onPress={() => { onSubmitClick('L') }}>
                    <Image source={images.STW_1} style={{ width: wp(100), height: wp(40) }} resizeMode={"stretch"} />
                </TouchableOpacity>
                <Spacer space={hp(1)} />
                <TouchableOpacity onPress={() => { onSubmitClick('M') }}>
                    <Image source={images.STW_2} style={{ width: wp(100), height: wp(40) }} resizeMode={"stretch"} />
                </TouchableOpacity>
                <Spacer space={hp(1)} />
                <TouchableOpacity onPress={() => { onSubmitClick('S') }}>
                    <Image source={images.STW_3} style={{ width: wp(100), height: wp(40) }} resizeMode={"stretch"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}