import { View, Text, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { useNavigation } from '@react-navigation/native';
import ContainedButton from '../components/containedButton';
import OutlinedButton from '../components/outlinedButton';

export default function WelcomeScreen() {
    const navigation = useNavigation();

    const onPressSignIn = () => navigation.navigate('SignIn')
    const onPressSignUp = () => navigation.navigate('SignUp')

    return (
        <ScreenWrapper>
            <View className="h-full">
                <View className="pt-10">
                    <Image source={require("../assets/welcome.png")} className="h-96 w-96 " />
                </View>
                <View>
                    <Text className="font-bold text-4xl text-black text-center mb-10">Fund Manager</Text>
                </View>
                <View>
                    <View className="m-4">
                        <ContainedButton ButtonText={"Sign In"} onPressFunction={onPressSignIn} />
                    </View>
                    <View className="m-4">
                        <OutlinedButton ButtonText={"Sign Up"} onPressFunction={onPressSignUp} />
                    </View>
                    {/* <Text className="text-center font-bold">Or</Text>
                    <View className="m-4">
                        <OutlinedButton ButtonText={"Sign Up"} onPressFunction={onPressSignUp} />
                    </View> */}
                </View>
            </View>
        </ScreenWrapper >
    )
}