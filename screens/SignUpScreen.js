import {View, Image, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ContainedButton from '../components/containedButton';
import Snackbar from 'react-native-snackbar';
import Loading from '../components/loading';
import {useDispatch, useSelector} from 'react-redux';
import {setUserLoading} from '../redux/slices/user';
import {auth} from '../utils/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import colors from '../theme/colors';

export default SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onPressSignUp = async () => {
    if (email != '' && password != '') {
      try {
        dispatch(setUserLoading(true));
        await createUserWithEmailAndPassword(auth, email, password);
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
        text: 'Name, Email and Password are required!',
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
            source={require('../assets/signup.png')}
            className="h-72 w-96 "
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
            secureTextEntry
            placeholder={'Password'}
            placeholderTextColor={colors.text.secondary}
            value={password}
            onChangeText={value => setPassword(value)}
          />
        </View>
        <View>
          {userLoading ? (
            <Loading />
          ) : (
            <ContainedButton
              ButtonText={'Sign Up'}
              onPressFunction={onPressSignUp}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};
