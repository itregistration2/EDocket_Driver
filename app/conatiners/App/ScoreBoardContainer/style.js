import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../../res/colors';
import { fonts } from '../../../res/fonts';

export const styles = StyleSheet.create({
    txt_fonts: {
        fontFamily: fonts.SEMI_BOLD,
        fontSize: wp(7),
        marginLeft: wp(3),
        alignSelf: "center",
        color: colors.BLACK
    },
    wrapper: {
        borderRadius: wp(10),
        width: wp(92),
        alignSelf: "center",
        paddingHorizontal: wp(6),
        paddingVertical: wp(4)
    },
    wrapper_ic: {
        width: wp(10),
        height: wp(10),
    },
    wrapper_shadow: {
        width: wp(92),
        alignSelf: "center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: colors.WHITE,
        elevation: 2
    },
    txt_sm: {
        fontSize: wp(3),
        fontFamily: fonts.REGULAR,
    },
    txt_lm: {
        fontSize: wp(5.5),
        fontFamily: fonts.REGULAR
    },
    text_title: {
        textAlign: "center",
        fontFamily: fonts.REGULAR,
        fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4),
        marginVertical: wp(2)
    },
    text_sub_title: {
        textAlign: "center",
        fontFamily: fonts.REGULAR,
        fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
        paddingVertical: wp(2)
    },
    wrapper: { flexDirection: 'row' },
    center_image: {
        tintColor: colors.BLACK,
        width: hp(15),
        height: hp(15),
        alignSelf: "center"
    },
    enter_head: {
        height: wp(15),
        backgroundColor: colors.PANTONE
    },
    weight_head: {
        height: wp(15),
        backgroundColor: colors.SILVER
    },

    leg_head: {
        height: wp(15),
        backgroundColor: colors.LEGA_DARK
    },
    center_ic: {
        textAlign: "center",
        alignSelf: "center",
        fontSize: wp(30),
        fontFamily: fonts.BOLD
    },
    f_position: {
        position: "absolute",
        width: wp(100),
        zIndex: 0
    },
})