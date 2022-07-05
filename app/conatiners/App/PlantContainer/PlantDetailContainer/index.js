
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
// styles and themes
import globalStyles from '../../../../res/globalStyles';
import { colors } from '../../../../res/colors';
import { Spacer } from '../../../../res/spacer';
import { fonts } from '../../../../res/fonts';
import { styles } from './style';
// Third party libraries
import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from "react-native-animatable";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Row, TableWrapper } from 'react-native-table-component';
import { AppHeader } from '../../../../components/AppHeader';
import moment from 'moment';
import { onGetPlantScoreList } from '../../../../redux/actions/AppAction';

export default PlantDetailContainer = (props) => {

    const dispatch = useDispatch();
    const generalReducer = useSelector(state => state.generalReducer)
    const appReducer = useSelector(state => state.appReducer)

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    const param = props.route.params.item;
    const param_name = props.route.params.name;

    const [tableHeadEnter, setTableHeadEnter] = useState([global.LanguageSelect == 'zh' ? '進場' : 'Enter'])
    const [tableHeadWait, setTableHeadWait] = useState([ global.LanguageSelect == 'zh' ? '等待' : 'Wait'])
    const [tableHeadData, setTableHeadData] = useState([])
    const [tableEnterData, setTableEnterData] = useState([])

    const [isEnter, setIsEnter] = useState(true)
    const [isWait, setIswait] = useState(true)

    useEffect(() => {
        let requestBody = JSON.stringify({ "plant": param_name })
        dispatch(onGetPlantScoreList(requestBody))
    }, [param])

    useEffect(() => {
        if (appReducer.get_plant_scoreboard != null) {
            setTableEnterData(appReducer.get_plant_scoreboard?.Enter.ScoreboardList)
            setIsEnter(appReducer.get_plant_scoreboard?.Enter?.IsColumnShown)
            setIswait(appReducer.get_plant_scoreboard?.Waiting?.IsColumnShown)

            setTableHeadData(appReducer.get_plant_scoreboard?.Waiting.ScoreboardList)
        }
    }, [appReducer.get_plant_scoreboard])

    return (
        <>
            <View style={globalStyles.flex}>
                <View style={{ flex: 1 }}>
                    <>
                        <AppHeader is_white isShow onBackPress={() => { props.navigation.goBack() }} hide_title={false} _title={getLanguageValue(param)} />
                        <View style={{ backgroundColor: colors.GRAY_SUIT, height: wp(0.3) }} />
                    </>

                    {(param_name == 'STW' || param_name == 'TTS') &&
                        <Text style={{ ...styles.text_title, color: colors.RED, textAlign: "left", fontFamily: fonts.BOLD, width: wp(90), alignSelf: "center" }}>{getLanguageValue('ACM_STW_TTS_INDICATOR')}</Text>
                    }
                    <Text style={{ ...styles.text_title, marginVertical: 0, marginBottom: 4, fontSize: wp(3.8), textAlign: "left", fontFamily: fonts.BOLD, width: wp(90), alignSelf: "center", marginTop: wp((param_name == 'STW' || param_name == 'TTS') ? 1 : 3), marginBottom: wp(2) }}>{getLanguageValue('ACM_LAST_UPDATE_TIME') + ' ' + moment().format("DD-MM-YYYY hh:mm:ss")}</Text>

                    <View style={{ flexDirection: "row" }}>
                        {isEnter &&
                            <View style={{ width:  wp(isWait ? 50 : 100) }}>
                                <Row data={tableHeadEnter} style={styles.enter_head} textStyle={{...styles.text_title,fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4)}} />
                                <TableWrapper style={{ width:  wp(isWait ? 50 : 100), flexDirection: "row" }}>
                                    <View style={{ alignSelf: "center", backgroundColor: colors.PANTONE, width: wp(10) }}>
                                        {
                                            tableEnterData.map((cellData, cellIndex) => (
                                                <Text style={{ ...styles.text_sub_title,
                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                }}>{cellIndex + 1}</Text>
                                            ))
                                        }
                                    </View>
                                    <View style={{ alignSelf: "center", backgroundColor: colors.PANTONE_LIGHT, width: wp(isWait ? 40 : 90) }}>
                                        {
                                            tableEnterData.map((cellData, cellIndex) => (
                                                <Text style={{ ...styles.text_sub_title, 
                                                    textAlign: "left", paddingLeft: wp(2), 
                                                    fontFamily: cellData.TextIsBold ? fonts.BOLD : fonts.REGULAR, 
                                                    color: cellData.TextColor ? cellData.TextColor : colors.BLACK, 
                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                    backgroundColor: cellData.TextBackgroundColor ? cellData.TextBackgroundColor : colors.PANTONE_LIGHT }}>{cellData.Truck}</Text>
                                            ))
                                        }
                                    </View>
                                </TableWrapper>
                            </View>
                        }
                        {isWait &&
                            <View style={{ width: wp(isEnter ? 50 : 100) }}>
                                <Row data={tableHeadWait} style={styles.weight_head} textStyle={{...styles.text_title,fontSize: wp(global.FontSizeSelect == 'M' ? 5 : global.FontSizeSelect == 'L' ? 6 : 4)}} />
                                <TableWrapper style={{ width: wp(isEnter ? 50 : 100), flexDirection: "row" }}>
                                    <View style={{ alignSelf: "center", backgroundColor: colors.SILVER, width: wp(10) }}>
                                        {
                                            tableHeadData.map((cellData, cellIndex) => (
                                                <Text style={{ ...styles.text_sub_title,
                                                    fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                
                                                }}>{cellIndex + 1}</Text>
                                            ))
                                        }
                                    </View>
                                    <View style={{ alignSelf: "center", backgroundColor: colors.SILVER_LIGHT, width: wp(isEnter ? 40 : 90) }}>
                                        {
                                            tableHeadData.map((cellData, cellIndex) => (
                                                <Text style={{ ...styles.text_sub_title, 
                                                    textAlign: "left", paddingLeft: wp(2),
                                                     fontFamily: cellData.TextIsBold ? fonts.BOLD : fonts.REGULAR, 
                                                     fontSize: wp(global.FontSizeSelect == 'M' ? 4.5 : global.FontSizeSelect == 'L' ? 5.5 : 3.5),
                                                     backgroundColor: cellData.TextBackgroundColor ? cellData.TextBackgroundColor : colors.SILVER_LIGHT }}>{cellData.Truck}</Text>
                                            ))
                                        }
                                    </View>
                                </TableWrapper>
                            </View>
                        }
                    </View>
                    <Spacer space={hp(1)} />
                </View>
            </View>
        </>
    );
}

