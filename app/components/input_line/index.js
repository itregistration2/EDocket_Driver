
import React, { useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, Animated, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// styles & themes
import { styles } from './style';
import { images } from '../../res/images';

export const Input_Line = (props) => {

    return (
        <View style={styles.viewContainer}>
            <Text style={{ ...styles.headertxt }}>{props.headerline}</Text>
            <TextInput
                value={props.value}
                autoCompleteType='off'
                placeholder={props.placeholder}
                onChangeText={(value) => props.onChange(value)}
                style={{ ...styles.textInput, ...props.txtstyle }}
                keyboardType={props.keyboardType ? props.keyboardType : "default"}
                returnKeyType={props.returnKeyType ? props.returnKeyType : "default"}
                blurOnSubmit={props.blurOnSubmit}
                multiline={props.multiline}
                numberOfLines={props.multiline ? 6 : 1}
                maxLength={props.maxLength}
                placeholderTextColor={'rgba(60, 60, 67, 0.33)'}
                editable={props.editable == false ? false : true}
            />
        </View>
    )
}