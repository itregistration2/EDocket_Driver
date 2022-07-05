
import React, { useEffect } from 'react'
// third party libraries
import { View } from 'react-native'
import { useSelector } from 'react-redux';
// styles
import { styles } from './style';
// import { Loading } from 'react-native-gradient-loading';
import Modal from "react-native-modal";
import { Pulse } from 'react-native-loader';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";


export const AppLodar = (props) => {
  // #region redux
  const appLoading = useSelector(state => state.generalReducer.appLoading)
  // #endregion redux

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={true}
      backdropColor="transparent"
      hardwareAccelerated={true}
      isVisible={appLoading}
      style={{ alignSelf: "center" }}
    >
         <Pulse size={wp(7)} color={"#004070"} />
    </Modal>
  );
};