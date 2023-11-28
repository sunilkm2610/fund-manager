import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../theme/colors'

export default function OutlinedButton({ ButtonText, onPressFunction }) {
    return (
        <View>
            <TouchableOpacity className="rounded-full shadow" style={{ borderColor: `${colors.theme.main}`, borderWidth: 2 }} onPress={onPressFunction}>
                <Text className={`text-center py-2 font-bold text-white text-xl`} style={{ color: `${colors.theme.main}` }}>{ButtonText}</Text>
            </TouchableOpacity>
        </View>
    )
}