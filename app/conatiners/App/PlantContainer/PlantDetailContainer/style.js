import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../../../res/colors";
import { fonts } from "../../../../res/fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: colors.WHITE
    },
    enter_head: {
        height: wp(15),
        backgroundColor: colors.PANTONE
    },
    weight_head: {
        height: wp(15),
        backgroundColor: colors.SILVER
    },
    text_title: {
        textAlign: "center",
        fontFamily: fonts.REGULAR,
        fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4),
        marginVertical: wp(4)
    },
    text_sub_title: {
        textAlign: "center",
        fontFamily: fonts.REGULAR,
        fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
        paddingVertical: wp(2)
    },
    wrapper: { flexDirection: 'row' },
});