import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {auth} from '../utils/config';
import {signOut} from 'firebase/auth';
import {UserCircleIcon} from 'react-native-heroicons/outline';
import colors from '../theme/colors';

export default function ProfileScreen() {
  const {user} = useSelector(state => state.user);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View className="flex-1">
      <View className="flex-1">
        <View className="flex justify-center items-center py-4" style={{backgroundColor:`${colors.theme.main}`}}>
          <UserCircleIcon color={'white'} size={60} />
        </View>
        <View className="mt-10">
          <Text className="text-center">{user?.email}</Text>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-300 h-10 justify-center m-10">
            <Text className="text-center font-bold text-white text-lg">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
