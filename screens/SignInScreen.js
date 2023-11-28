import {
  View,
  Image,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ContainedButton from '../components/containedButton';
import {useNavigation} from '@react-navigation/native';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from '../utils/config';
import {setUserLoading} from '../redux/slices/user';
import Loading from '../components/loading';
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import colors from '../theme/colors';

export default SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const sendPassowrd = async () => {
    if (email != '') {
      try {
        dispatch(setUserLoading(true));
        await sendPasswordResetEmail(auth, email);
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: 'Please check your email',
          backgroundColor: 'green',
        });
      } catch (e) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Email is required for password reset!',
        backgroundColor: 'red',
      });
    }
  };

  const onPressSignIn = async () => {
    if (email != '' && password != '') {
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (e) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Email and Password are required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View className="h-full justify-between p-4">
        <View className="">
          <Image
            source={require('../assets/login.png')}
            className="h-80 w-96 "
          />
        </View>
        <View>
          <TextInput
            className="p-4 bg-white rounded-full mb-4 text-xl text-black"
            placeholderTextColor={colors.text.secondary}
            placeholder={'Email'}
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <TextInput
            className="p-4 bg-white rounded-full mb-4 text-xl text-black"
            placeholderTextColor={colors.text.secondary}
            placeholder={'Password'}
            value={password}
            secureTextEntry
            onChangeText={value => setPassword(value)}
          />
          <TouchableOpacity onPress={sendPassowrd} className="mr-1">
            <Text className="text-blue-800 text-right text-xl font-bold">
              Forgot?
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {userLoading ? (
            <Loading />
          ) : (
            <ContainedButton
              ButtonText={'Sign In'}
              onPressFunction={onPressSignIn}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};
