import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default TextField = ({ label, placeholder }) => {
    return (
        <View>
            {label && <Text className="text-black font-bold text-xl ml-3">{label}</Text>}
            <TextInput className="p-4 bg-white rounded-full mb-3 text-xl text-black" placeholder={placeholder} />
        </View>
    )
}