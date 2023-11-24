import {
  View,
  TextInput,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ContainedButton from '../components/containedButton';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {addDoc} from 'firebase/firestore';
import {fundsRef} from '../utils/config';
import Loading from '../components/loading';
import {useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import colors from '../theme/colors';

export default function AddFundScreen(props) {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expectedFundInterest, setExpectedFundInterest] = useState(null);

  const [fundName, setFundName] = useState(null);
  const [amount, setAmount] = useState();

  const onPressCreateFund = async () => {
    if (fundName && amount && expectedFundInterest) {
      setLoading(true);
      let doc = await addDoc(fundsRef, {
        fundName,
        amount,
        date: date.toDateString(date),
        fundTypeId: props.route.params,
        userId: user.uid,
        expectedFundInterest,
      });
      setLoading(false);
      if (doc && doc.id) navigation.goBack();
    } else {
      Snackbar.show({
        text: 'Fund Name, Expected Returns and amount is required!',
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
          <View className="bg-pink-300 rounded-lg">
            <Image
              source={require('../assets/addfund.png')}
              className="h-80 w-96 "
            />
          </View>
          <View>
            <TextInput
              className="p-4 mt-4 bg-white rounded-full mb-4 text-xl text-black"
              placeholderTextColor={colors.text.secondary}
              placeholder={'Fund Name'}
              value={fundName}
              onChangeText={value => setFundName(value)}
            />
            <TextInput
              className="p-4 bg-white rounded-full mb-4 text-xl text-black"
              placeholderTextColor={colors.text.secondary}
              keyboardType="numeric"
              placeholder={'Expected Returns (in % per year)'}
              value={expectedFundInterest}
              onChangeText={value => setExpectedFundInterest(value)}
            />
            <TextInput
              className="p-4 bg-white rounded-full mb-4 text-xl text-black"
              placeholderTextColor={colors.text.secondary}
              keyboardType="numeric"
              placeholder={'Amount'}
              value={amount}
              onChangeText={value => setAmount(value)}
            />
            <TouchableOpacity
              onPress={() => setOpen(true)}
              className="p-4 bg-white rounded-full mb-4 text-xl text-black">
              <Text className="text-xl font-bold text-black">
                {date ? `${date.toDateString()}` : 'Fund Investment Date'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View>
          {loading ? (
            <Loading />
          ) : (
            <ContainedButton
              ButtonText={'Create Fund'}
              onPressFunction={onPressCreateFund}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
