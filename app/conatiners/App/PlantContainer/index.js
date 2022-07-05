
import React, { useState } from 'react';
import { View, Animated, Text, TouchableOpacity, Image } from 'react-native';
// styles and themes
import globalStyles from '../../../res/globalStyles';
import { Header } from '../../../components/Header';
import { colors } from '../../../res/colors';
import { images } from '../../../res/images';
import { Spacer } from '../../../res/spacer';
import { styles } from './style';
// Third party libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import * as Animatable from "react-native-animatable";
import { useSelector, useDispatch } from 'react-redux';

export default PlantContainer = (props) => {

    const generalReducer = useSelector(state => state.generalReducer)
    const appReducer = useSelector(state => state.appReducer)
    const dispatch = useDispatch();

    const [plantList, setPlantList] = useState([
        {
            "id": 0,
            "image": images.truck,
            "name": "STW",
            "key": "ACM_STW"
        },
        {
            "id": 1,
            "image": images.truck,
            "name": "TTS",
            "key": "ACM_TTS"
        },
        {
            "id": 2,
            "image": images.truck,
            "name": "CWP",
            "key": "ACM_CWP"
        },
        {
            "id": 3,
            "image": images.truck,
            "name": "YLP",
            "key": "ACM_YLP"
        }
    ])

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    const renderItem = ({ item, index }) => {
        return (
            <>
                <Animatable.View
                    duration={1200}
                    animation={"fadeInRightBig"}>
                    <TouchableOpacity key={index} onPress={() => { props.navigation.navigate("PlantDetail", { item: item.key, name: item.name }) }}
                        style={{ ...styles.wrapper, backgroundColor: colors.PIGEON_BLUE, }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image resizeMode='contain' source={item.image} style={{ ...styles.wrapper_ic, tintColor: colors.BLACK }} />
                            <Text style={{ ...styles.txt_fonts, color: colors.REGUAL_BLUE }}>{getLanguageValue(item.key)}</Text>
                        </View>
                    </TouchableOpacity>
                    <Spacer space={hp(1.5)} />
                </Animatable.View>
            </>
        )
    }
    return (
        <>
            <View style={globalStyles.flex}>
                <View style={{ flex: 1 }}>
                    <>
                        <Header
                            headerText={getLanguageValue('ACM_PLANT_STATUS')}
                            sub_headerText={moment(new Date()).format("DD MMMM, YYYY")}
                            onSetting={() => { props.navigation.navigate("Settings") }}
                        />
                        <View style={{ backgroundColor: colors.GRAY_SUIT, height: wp(0.3) }} />
                    </>
                    <Animated.FlatList
                        bounces={false}
                        ListHeaderComponent={
                            <>
                                <Spacer space={hp(1)} />
                                <Animated.FlatList
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    data={plantList}
                                    renderItem={renderItem}
                                />
                            </>
                        }
                        showsVerticalScrollIndicator={false}
                        data={null}
                        extraData={Math.random()}
                        contentContainerStyle={{ width: wp(100), alignSelf: "flex-end" }}
                        renderItem={<View />}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Spacer space={hp(5)} />
                        }
                    />
                </View>
            </View>
        </>
    );
}

