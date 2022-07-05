import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Platform, Image, View, Text } from 'react-native';
//Third Party libraries
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { useSelector, useDispatch } from 'react-redux';

//Auth Container
import LoginContainer from '../conatiners/Auth/LoginContainer';
import SplashContainer from '../conatiners/Auth/SplashContainer';
//App Container
import Deliveries from '../conatiners/App/DeliveriesContainer';
import History from '../conatiners/App/HistoryContainer';
import Settings from '../conatiners/App/DeliveriesContainer/SettingsContainer';
import ImagePreviewContainer from '../conatiners/App/DeliveriesContainer/ImagePreviewContainer';
//Themes & custom components
import { Network } from '../NetworkProvider';
import { images } from '../res/images';
import { colors } from '../res/colors';
//redux configuration
import { Provider } from 'react-redux';
import configureStore from "../redux/store/store";
import { fonts } from '../res/fonts';
import { AppLodar } from '../components/AppLoader';
import ScanDetailContainer from '../conatiners/App/DeliveriesContainer/ScanDetailContainer';
import QrCodeContainer from '../conatiners/App/QrCodeContainer';
import PlantContainer from '../conatiners/App/PlantContainer';
import ScoreBoardContainer from '../conatiners/App/ScoreBoardContainer';
import DutyRoasterContainer from '../conatiners/App/DutyRoasterContainer';
import PlantDetailContainer from '../conatiners/App/PlantContainer/PlantDetailContainer';
import LanguageContainer from '../conatiners/App/DeliveriesContainer/LanguageContainer';
import FontChangeContainer from '../conatiners/App/DeliveriesContainer/FontChangeContainer';
import LoginOtpContainer from '../conatiners/Auth/LoginOtpContainer';
import OtpVerificationContainer from '../conatiners/Auth/OtpVerificationContainer';
import ImageIntroductions from '../conatiners/App/DeliveriesContainer/ImageIntroductions';
// constants
const Stack = Platform.OS == "ios" ? createStackNavigator() : createNativeStackNavigator();
const store = configureStore();
const Tab = createBottomTabNavigator();

const options = {
    headerShown: false,
    animation: "slide_from_right",
    gestureEnabled: Platform.OS == "android" ? false : true,
    ...TransitionPresets.SlideFromRightIOS,
};

export default function AppNavigator() {
    return (
        <Provider store={store}>
            {/* check for the network issue globally */}
            <Network />
            <AppLodar />
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Splash'} >
                    <Stack.Screen name={'Splash'} component={SplashContainer} options={options}></Stack.Screen>
                    <Stack.Screen name={'Auth'} component={AuthtackNavigator} options={options}></Stack.Screen>
                    <Stack.Screen name={'Tab'} component={TabNavigator} options={options}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const AuthtackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'Splash'}>
            {/* <Stack.Screen name={'Login'} component={LoginContainer} options={options}></Stack.Screen> */}
            <Stack.Screen name={'Login'} component={LoginOtpContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'Otp'} component={OtpVerificationContainer} options={options}></Stack.Screen>

        </Stack.Navigator>
    )
}

const DeliveryStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'Deliveries'} >
            <Stack.Screen name={'Deliveries'} component={Deliveries} options={options}></Stack.Screen>
            <Stack.Screen name={'Settings'} component={Settings} options={options}></Stack.Screen>
            <Stack.Screen name={'Language'} component={LanguageContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'ScanDetails'} component={ScanDetailContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'ImagePreview'} component={ImagePreviewContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'QrCode'} component={QrCodeContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'Introductions'} component={ImageIntroductions} options={options}></Stack.Screen>
            <Stack.Screen name={'FontChange'} component={FontChangeContainer} options={options}></Stack.Screen>
        </Stack.Navigator>
    )
}

const HistoryStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'History'} >
            <Stack.Screen name={'History'} component={History} options={options}></Stack.Screen>
            <Stack.Screen name={'Settings'} component={Settings} options={options}></Stack.Screen>
            <Stack.Screen name={'Language'} component={LanguageContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'ScanDetails'} component={ScanDetailContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'ImagePreview'} component={ImagePreviewContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'QrCode'} component={QrCodeContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'Introductions'} component={ImageIntroductions} options={options}></Stack.Screen>
            <Stack.Screen name={'FontChange'} component={FontChangeContainer} options={options}></Stack.Screen>
        </Stack.Navigator>
    )
}

const PlantStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'Plant'} >
            <Stack.Screen name={'Plant'} component={PlantContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'PlantDetail'} component={PlantDetailContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'Settings'} component={Settings} options={options}></Stack.Screen>
            <Stack.Screen name={'Language'} component={LanguageContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'Introductions'} component={ImageIntroductions} options={options}></Stack.Screen>
            <Stack.Screen name={'FontChange'} component={FontChangeContainer} options={options}></Stack.Screen>
        </Stack.Navigator>
    )
}

const DutyRoasterStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'DutyRoaster'} >
            <Stack.Screen name={'DutyRoaster'} component={DutyRoasterContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'Settings'} component={Settings} options={options}></Stack.Screen>
            <Stack.Screen name={'Language'} component={LanguageContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'Introductions'} component={ImageIntroductions} options={options}></Stack.Screen>
            <Stack.Screen name={'FontChange'} component={FontChangeContainer} options={options}></Stack.Screen>
        </Stack.Navigator>
    )
}

const ScoreBoardStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'ScoreBaord'} >
            <Stack.Screen name={'ScoreBaord'} component={ScoreBoardContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'Settings'} component={Settings} options={options}></Stack.Screen>
            <Stack.Screen name={'Language'} component={LanguageContainer} options={options}></Stack.Screen>
            <Stack.Screen name={'Introductions'} component={ImageIntroductions} options={options}></Stack.Screen>
            <Stack.Screen name={'FontChange'} component={FontChangeContainer} options={options}></Stack.Screen>
        </Stack.Navigator>
    )
}

const TabNavigator = () => {
    React.useEffect(() => {
        SplashScreen.hide()
    }, [])

    const appReducer = useSelector(state => state.appReducer)
    const generalReducer = useSelector(state => state.generalReducer)

    const getLanguageValue = (key) => {
        let index = appReducer && appReducer.get_this_language.findIndex(l => l.TEXT_ID === key)
        if (index > -1) {
            return appReducer.get_this_language[index].TEXT
        }
        else return key
    }

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, }}
            initialRouteName={"Delivery"}
            tabBarOptions={{
                tabStyle: { width: 'auto', backgroundColor: colors.MERCURY, height: isIphoneX() ? wp(22) : wp(16) },
                labelStyle: styles.tab_label,
            }}

            tabBar={(props) => {
                return (
                    <BottomTabBar
                        {...props}
                        style={{
                            paddingBottom: 0,
                            height: isIphoneX() ? wp(22) : wp(16),
                            backgroundColor: colors.MERCURY,
                        }}
                        labelPosition={'below-icon'}
                    />
                );
            }}
        >
            <Tab.Screen
                name={getLanguageValue('ACM_DELIVERY')}
                component={DeliveryStackNavigator}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIcon}>
                            <Image
                                resizeMode={'contain'}
                                style={{ ...styles.tabImage, tintColor: focused ? colors.DODGER_BLUE : colors.GRAY_SUIT }}
                                source={images.box_ut} />
                        </View>
                    ),
                    unmountOnBlur: true,
                    tabBarShowLabel: true,
                    tabBarStyle: { display: getTabBarVisibility(route) ? "flex" : "none" }
                })}
            />

            <Tab.Screen
                name={getLanguageValue('ACM_DELIVERY_HISTORY')}
                component={HistoryStackNavigator}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIcon}>
                            <Image
                                resizeMode={'contain'}
                                style={{ ...styles.tabImage, tintColor: focused ? colors.DODGER_BLUE : colors.GRAY_SUIT }}
                                source={images.box_ut} />
                        </View>
                    ),
                    unmountOnBlur: true,
                    tabBarShowLabel: true,
                    tabBarStyle: { display: getTabBarVisibility(route) ? "flex" : "none" }
                })}
            />


            <Tab.Screen
                name={getLanguageValue('ACM_ONBOARDINGROSTERPAGETITLE')}
                component={DutyRoasterStackNavigator}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIcon}>
                            <Image
                                resizeMode={'contain'}
                                style={{ ...styles.tabImage, tintColor: focused ? colors.DODGER_BLUE : colors.GRAY_SUIT }}
                                source={images.duty_roster_ut} />
                        </View>
                    ),
                    unmountOnBlur: true,
                    tabBarShowLabel: true,
                    tabBarStyle: { display: getTabBarVisibility(route) ? "flex" : "none" }
                })}
            />


            <Tab.Screen
                name={getLanguageValue('ACM_ONBOARDINGSCOREBOARDPAGETITLE')}
                component={ScoreBoardStackNavigator}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIcon}>
                            <Image
                                resizeMode={'contain'}
                                style={{ ...styles.tabImage, tintColor: focused ? colors.DODGER_BLUE : colors.GRAY_SUIT }}
                                source={images.score_board_ut} />
                        </View>
                    ),
                    unmountOnBlur: true,
                    tabBarShowLabel: true,
                    tabBarStyle: { display: getTabBarVisibility(route) ? "flex" : "none" }
                })}
            />

            <Tab.Screen
                name={getLanguageValue('ACM_PLANT_STATUS')}
                component={PlantStackNavigator}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIcon}>
                            <Image
                                resizeMode={'contain'}
                                style={{ ...styles.tabImage, tintColor: focused ? colors.DODGER_BLUE : colors.GRAY_SUIT }}
                                source={images.score_board_ut_1} />
                        </View>
                    ),
                    unmountOnBlur: true,
                    tabBarShowLabel: true,
                    tabBarStyle: { display: getTabBarVisibility(route) ? "flex" : "none" }
                })}
            />

        </Tab.Navigator >
    );
}

// Hide Show Tab bar Visiblity
const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens =  ['ScanDetails', 'ImagePreview', 'QrCode','Introductions'];
    if (hideOnScreens.indexOf(routeName) > -1) return false;
    return true;
};

const styles = StyleSheet.create({
    tabImage: {
        width: wp(6),
        height: wp(6),
    },
    tab_style: {
        height: isIphoneX() ? wp(22) : wp(16),
    },
    tab_label: {
        fontSize: wp(2.8),
        fontFamily: fonts.REGULAR,
        marginBottom: isIphoneX() ? 24 : 10,
        marginTop: isIphoneX() ? -10 : -5,
        padding: 0,
    },
    tabIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})


