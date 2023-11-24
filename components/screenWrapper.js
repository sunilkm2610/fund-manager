import { View, StatusBar, Platform } from 'react-native'
import React from 'react'
import colors from '../theme/colors';

export default ScreenWrapper = ({ children }) => {
    let statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : Platform.OS == 'ios' ? 30 : 0;
    return (
        <View>
            {
                children
            }
        </View>
    )
}