import * as types from "../events/AppEvents";
import { GET_OTP_FOR_TEST_ONLY, POST_ASK_FOR_OTP, GET_ROSTER, GET_THIS_DOCKET, GET_LANGUAGE_JSON, GET_CSC_PHONE, GET_DRIVER_DOCKET, GET_PLANT_SCOREBORD, GET_DRIVER_DOCKET_HISTORY, GET_SCOREBOARD, UPDATE_DRIVER_ADD_ON_REMARK } from "../../apiHelper/Api"
import { GET, GET_WITHOUT_LOAD, POST_MULTIPART_DATA, POST_WITHOUT_LOAD_MULTIPART_DATA } from "../../apiHelper/ApiServices"
import { APP_LOADER } from "../events/GeneralEvents";
import * as data_leg from "../../data_leg.json"


export const onGetThisDockets = (docketno, callback) => {
    return async dispatch => {
        await GET_WITHOUT_LOAD(GET_THIS_DOCKET + `?docketno=${docketno}`, function (response) {
            if (response.status) {
                callback(response.responseData)
                dispatch({ type: types.GET_THIS_DOCKET })
            }
        });
    }
}


// get language json data
export const onGetLanguageJsonData = () => {
    return async dispatch => {
        await GET_WITHOUT_LOAD(GET_LANGUAGE_JSON + `?lang=${global.LanguageSelect}`, function (response) {
            if (response.status) {
                dispatch({ type: types.GET_THIS_LANGUAGE, get_this_language: response.responseData.LangTexts })
            }
        });
    }
}



// get test range
export const onGetCscPhone = (callback) => {
    return async dispatch => {
        await GET_WITHOUT_LOAD(GET_CSC_PHONE, function (response) {
            if (response.status) {
                callback(response.responseData)
            }
        });
    }
}

/// Driver side
export const onGetRoasterList = (requestBody, appReducer) => {
    return async dispatch => {
        await POST_MULTIPART_DATA(GET_ROSTER, requestBody, dispatch, function (response) {
            if (response.response.IsSuccessful) {
                let array = response.RosterList;
                array.push(...appReducer.get_roster_list);
                dispatch({ type: types.GET_ROSTER, get_roster_list: array })
            }
        });
    }
}

export const onGetPlantScoreList = (requestBody) => {
    return async dispatch => {
        await POST_MULTIPART_DATA(GET_PLANT_SCOREBORD, requestBody, dispatch, function (response) {
            if (response.response.IsSuccessful) {
                dispatch({ type: types.GET_PLANT_SCOREBOARD, get_plant_scoreboard: response })
            }
        });
    }
}

export const onGetDriverDocketHistory = (truckId) => {
    return async dispatch => {
        await GET_WITHOUT_LOAD(GET_DRIVER_DOCKET_HISTORY + `?truckId=${truckId}`, function (response) {
            if (response.status) {
                dispatch({ type: types.GET_DRIVER_DOCKET_HISTORY, get_driver_docket_history: response.responseData?.DocketHistory })
            }
        });
    }
}

// Get driver docket
export const onGetDriverDockets = (truckId, callback) => {
    return async dispatch => {
        await GET_WITHOUT_LOAD(GET_DRIVER_DOCKET + `?truckId=${truckId}`, function (response) {
            if (response.status) {
                callback(response.responseData)
                dispatch({ type: types.GET_DRIVER_DOCKET })
            }
        });
    }
}

// Get score board
export const onGetScoreBord = (requestBody) => {
    return async dispatch => {
        await POST_WITHOUT_LOAD_MULTIPART_DATA(GET_SCOREBOARD, requestBody, function (response) {
            if (response.response.IsSuccessful) {
                dispatch({ type: types.GET_SCOREBOARD, get_scorebord: response })
            } else {
                dispatch({ type: types.GET_SCOREBOARD, get_scorebord: null })
            }
            //dispatch({ type: types.GET_SCOREBOARD, get_scorebord: data_leg })
        });
    }
}


export const onPostDriverRemark = (requestBody, callback) => {
    return async dispatch => {
        await POST_WITHOUT_LOAD_MULTIPART_DATA(UPDATE_DRIVER_ADD_ON_REMARK, requestBody, function (response) {
            callback(response)
        });
    }
}


export const clearUserDataScoreInRedux = () => {
    return async dispatch => {
        dispatch({ type: types.GET_SCOREBOARD, get_scorebord: null })
    }
}


export const onPostAskForOtp = (requestBody, callback) => {
    return async dispatch => {
        await POST_MULTIPART_DATA(POST_ASK_FOR_OTP, requestBody, dispatch, function (response) {
            callback(response)
        });
    }
}

export const onGetOtpForTest = (requestBody, callback) => {
    return async dispatch => {
        await POST_MULTIPART_DATA(GET_OTP_FOR_TEST_ONLY, requestBody, dispatch, function (response) {
            callback(response)
        });
    }
}




