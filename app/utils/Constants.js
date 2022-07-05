import { Dimensions, Alert, Platform, StatusBar, PixelRatio } from 'react-native'

var { height, width } = Dimensions.get('window')

export const DEVICE = {
  DEVICE_HEIGHT: height,
  DEVICE_WIDTH: width,
  ANDROID_DEVICE_HEIGHT:
    Platform.OS === 'android' && Platform.Version > 26
      ? Dimensions.get('screen').height - StatusBar.currentHeight
      : Dimensions.get('window').height,
}

export const getWP = (progress) => {
  return PixelRatio.roundToNearestPixel(DEVICE.DEVICE_WIDTH * progress / 100)
}

export const DEVICE_OS = Platform.OS

export const APP_NAME = "Edocket"
export const SECRET_KEY = "4B873157-EA0D-4DBB-B0BA-EEA289C9463F"
export const MERCHANT_IDENTIFIER = "rn3zk7gzvjxcvjj9"

export const removeNonNumber = (string = "") => string.replace(/[^\d]/g, "");
export const removeLeadingSpaces = (string = "") => string.replace(/^\s+/g, "");

export const StorageKey = {
  IS_USER_LOGGED_IN: 'is_user_logged_in',
  USER_DETAIL: 'userDetails',
  IS_SECURITY_LOCK: 'is_security_lock'
}

export function fmtMSS(e) { 
  //return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s

  //function secondsToTime(e){
    var h = Math.floor(e / 3600).toString().padStart(2,'0'),
        m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
        s = Math.floor(e % 60).toString().padStart(2,'0');
    
    return h + ':' + m + ':' + s;
    //return `${h}:${m}:${s}`;
 }

export function fnumberFormat(lang, currency, frax, amount) {
  let nf = new Intl.NumberFormat(lang, {
    // style: 'currency',
    currency: currency,
    minimumFractionDigits: frax,
    maximumFractionDigits: frax
  });
  return nf.format(amount)
}

export function _getEncryptedCardNumber(card_number) {
  let data = card_number + "";
  return "**** **** **** **" + data.slice(-2)
}

export function showAlert(msg) {
  Alert.alert(
    APP_NAME,
    '' + msg,
    [
      {
        text: 'OK',
        onPress: () => { },
      },
    ],
    {
      cancelable: false,
    }
  )
}

export function getCurrentLocation(success, failure) {
  console.log(' getCurrentLocation  ')
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(' LOCATION POSITION ', position)
      success(position)
      // this.setCurrentLocation(position);
    },
    function (error) {
      failure(error)
      console.log(error)
    },
    {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 0,
      distanceFilter: 5,
    }
  )
}

export function showAlertRedirection(msg, onYesClick) {
  Alert.alert(
    APP_NAME,
    msg,
    [
      {
        text: 'OK',
        onPress: () => {
          onYesClick()
        },
      },
    ],
    { cancelable: false }
  )
}

export function showConfirmationDialogYesNoClick(msg, onYesClick) {
  Alert.alert(
    APP_NAME,
    msg,
    [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          console.log('LOGOUT YES CLICK ')
          onYesClick()
        },
      },
    ],
    { cancelable: false }
  )
}



export function showConfirmationDialogAddMoneyClick(msg, onYesClick) {
  Alert.alert(
    APP_NAME,
    msg,
    [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Add money',
        onPress: () => {
          onYesClick()
        },
      },
    ],
    { cancelable: false }
  )
}


export function showAlertWithMessageClick(title,message,btntext) {
  Alert.alert(
    title,
    message,
    [
      {
          text: btntext,
          onPress: () => {
             
          },
      }
  ],
  { cancelable: false },
  )
}
