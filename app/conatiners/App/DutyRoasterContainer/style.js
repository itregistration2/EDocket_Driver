import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
        resizeMode: "cover",
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
        color: colors.BLACK,
        fontSize: wp(4.8),
        fontFamily: fonts.REGULAR
    },
    txt_lm: {
        color: colors.BLACK,
        fontSize: wp(5),
        fontFamily: fonts.BOLD
    },
    detail_container: {
        marginTop: 5,
        color: colors.BLACK,
        paddingVertical: wp(4.5),
        paddingHorizontal: wp(2),
    },
    circle: {
        zIndex: 1,
        position: "absolute",
        left: hp(1.6),
        height: wp(9 / 2),
        width: wp(9 / 2),
        borderRadius: wp(9.3 / 4),
        alignItems: "center",
        justifyContent: "center"
    },
})