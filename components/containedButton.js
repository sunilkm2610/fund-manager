import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../theme/colors'

export default function ContainedButton({ ButtonText, onPressFunction }) {
    return (
        <View>
            <TouchableOpacity className="rounded-full shadow" style={{ backgroundColor: `${colors.theme.main}` }} onPress={onPressFunction}>
                <Text className={`text-center py-3 font-bold text-white text-xl`}>{ButtonText}</Text>
            </TouchableOpacity>
        </View>
    )
}