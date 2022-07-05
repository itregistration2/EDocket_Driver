import { DRIVER_LOGIN, POST_LOGIN_BY_OTP, POST_LOGOUT_BY_OTP } from "../../apiHelper/Api";
import { POST_MULTIPART_DATA } from "../../apiHelper/ApiServices";
import { saveData } from "../../utils/AsyncStorageHelper";
import BaseClass from "../../utils/BaseClass";
import { showAlertWithMessageClick } from "../../utils/Constants";
import * as types from "../events/GeneralEvents";

const Base = new BaseClass();

export const onSaveSelectedScreen = (data) => {
    return async dispatch => {
        if (data) {
            dispatch({ type: types.TYPE_SAVE_SELECTED_SCREEN, value: data })
        }
    }
}

export const onSaveUserDataInRedux = (data) => {
    return async dispatch => {
        if (data) {
            dispatch({ type: types.TYPE_SAVE_USER_DATA, value: data })
        }
    }
}

export const clearUserDataInRedux = () => {
    return async dispatch => {
        dispatch({ type: types.TYPE_CLEAR_USER_DATA })
    }
}


export const storeAsyncUserDetails = (userDetails) => {
    return async dispatch => {
        dispatch({ type: types.CUSTOMER_LOGIN, userDetails });
    }
}

export const clearAsyncUserDetails = () => {
    return async dispatch => {
        dispatch({ type: types.CUSTOMER_LOGIN, userDetails: null });
    }
}

const storeUserDetails = (response, dispatch) => {
    saveData('userDetails', response);
    dispatch({ type: types.CUSTOMER_LOGIN, userDetails: response });
}


export const onDriverLogin = (requestBody, callback) => {
    return async dispatch => {
         dispatch({ type: types.APP_LOADER, flag: true });
        await POST_MULTIPART_DATA(DRIVER_LOGIN, requestBody, dispatch, function (response) {
            dispatch({ type: types.APP_LOADER, flag: false });
            console.log(response.response.IsSuccessful)
            if (response.response.IsSuccessful) {
                storeUserDetails(response, dispatch)
                callback(response)
            } else {
                setTimeout(() => {
                    showAlertWithMessageClick(global.LanguageSelect == "zh" ? "登入失敗" : "Login Failed", global.LanguageSelect == "zh" ? "用戶名或密碼無效" : "invalid credentials. invalid username or password", 'OK');
                }, 500);
            }
        });
    }
}


export const onDriverLoginOtp = (requestBody, callback) => {
    return async dispatch => {
        dispatch({ type: types.APP_LOADER, flag: true });
        await POST_MULTIPART_DATA(POST_LOGIN_BY_OTP, requestBody, dispatch, function (response) {
            dispatch({ type: types.APP_LOADER, flag: false });
            console.log(response)
            if (response.response.IsSuccessful) {
                storeUserDetails(response, dispatch)
                callback(response)
            } else {
                setTimeout(() => {
                    showAlertWithMessageClick(global.LanguageSelect == "zh" ? "密碼錯誤" : "Incorrect otp", global.LanguageSelect == "zh" ? "請檢查短訊並取得一次性密碼,然後重試" : 'Please check OTP in your SMS and try again', 'OK');
                }, 500);
            }
        });
    }
}


export const onDriverLogoutOtp = (requestBody, callback) => {
    return async dispatch => {
        dispatch({ type: types.APP_LOADER, flag: true });
        await POST_MULTIPART_DATA(POST_LOGOUT_BY_OTP, requestBody, dispatch, function (response) {
            dispatch({ type: types.APP_LOADER, flag: false });
            if (response.response.IsSuccessful) {
               callback(response)
            }
        });
    }
}


