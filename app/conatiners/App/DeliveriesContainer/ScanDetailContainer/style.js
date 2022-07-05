import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../../res/colors';
import { fonts } from '../../../../res/fonts';
import { getBottomSpace, ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
    bottom_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.MERCURY,
        borderTopColor: colors.GRAY_93,
        borderTopWidth: 1,
    },
    bottom_wrapper: {
        alignSelf: 'center',
        paddingTop: isIphoneX() ? wp(3) : wp(2),
        //width: wp(25),
        height: isIphoneX() ? wp(22) : wp(16),
    },
    sm_image: {
        width: wp(4.8),
        height: wp(4.8),
        alignSelf: "center"
    },
    mm_image: {
        width: wp(5.8),
        height: wp(5.8),
        alignSelf: "center"
    },
    lm_image: {
        width: wp(20),
        height: wp(20),
    },
    txt_gray: {
        textAlign: "center",
        fontSize: wp(2.5),
        width: wp(18),
        alignSelf: "center",
        color: colors.GRAY_SUIT,
        paddingTop: wp(1),
        fontFamily: fonts.SEMI_BOLD
    },
    dock_file_ic: {
        width: wp(30),
        alignSelf: "center",
        height: wp(30),
        resizeMode: "contain"
    },
    txt_no_data: {
        fontFamily: fonts.REGULAR,
        width: wp(80),
        color: colors.GRAY_SUIT,
        paddingTop: wp(1),
        alignSelf: "center",
        textAlign: "center",
        fontSize: wp(4)
    },
    flex_align: {
        justifyContent: "center",
        alignSelf: "center",
        flex: 1
    }
})