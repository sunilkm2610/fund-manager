import {
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import ContainedButton from '../components/containedButton';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import {fundTypesRef} from '../utils/config';
import {addDoc} from 'firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {useSelector} from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import colors from '../theme/colors';

export default function AddFundTypeScreen() {
  const navigation = useNavigation();

  const [fundType, setFundType] = useState(null);
  const {user} = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  const [fundNames, setFundNames] = useState([
    'Mutual Funds',
    'Stocks',
    'Gold',
    'Properties',
    'Fixed Deposite',
  ]);

  const data = [
    'Mutual Funds',
    'Stocks',
    'Gold Bond or Physical',
    'Properties',
    'Fixed Deposite',
  ];

  const onPressCreateFund = async () => {
    if (fundType) {
      try {
        setLoading(true);
        let doc = await addDoc(fundTypesRef, {
          type: fundType,
          userId: user.uid,
        });
        setLoading(false);
        if (doc && doc.id) {
          navigation.goBack();
        }
      } catch (error) {
        setLoading(false);
        Snackbar.show({
          text: error.message,
          backgroundColor: 'red',
        });
      }
    } else {
      //error
      Snackbar.show({
        text: 'Fund Type is required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View className="h-full justify-between p-4">
        <View>
          <View className="bg-gray-500 rounded-lg">
            <Image
              source={require('../assets/addfundtype.png')}
              className="h-80 w-96 "
            />
          </View>
          <View>
            <TextInput
              className="p-4 mt-4 bg-white rounded-full mb-4 text-xl text-black"
              placeholderTextColor={colors.text.secondary}
              placeholder={'Fund Type'}
              value={fundType}
              onChangeText={value => setFundType(value)}
            />
          </View>

          <View className="flex flex-row flex-wrap justify-between gap-3">
            {fundNames.map(name => {
              return (
                <TouchableOpacity
                  key={name}
                  className="bg-white p-3 rounded-full"
                  style={{
                    backgroundColor: `${
                      fundType == name ? colors.theme.main : 'white'
                    }`,
                  }}
                  onPress={() => setFundType(name)}>
                  <Text
                    className="text-sm font-bold"
                    style={{
                      color: `${
                        fundType == name ? "white" : colors.text.secondary
                      }`,
                    }}>
                    {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View>
          {loading ? (
            <Loading />
          ) : (
            <ContainedButton
              ButtonText={'Create Fund Type'}
              onPressFunction={onPressCreateFund}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
