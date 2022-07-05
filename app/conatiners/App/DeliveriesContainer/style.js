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
    txt_sm:{
        fontSize: wp(3),
        fontFamily: fonts.REGULAR,
    },
    txt_lm:{
        fontSize: wp(5),
        fontFamily: fonts.REGULAR
    }
})