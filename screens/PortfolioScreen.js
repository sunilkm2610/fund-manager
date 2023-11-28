import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import colors from '../theme/colors';
import FundTypeCard from '../components/fundTypeCard';
import {useDispatch, useSelector} from 'react-redux';
import {getDocs, query, where} from 'firebase/firestore';
import {auth, fundTypesRef, fundsRef} from '../utils/config';
import EmptyList from '../components/emptyList';
import {setFundType, setFundTypeLoading} from '../redux/slices/fundType';
import Loading from '../components/loading';
import expectedCalculator from '../utils/expectedCalculator';
import {signOut} from 'firebase/auth';

export default function PortfolioScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {fundType} = useSelector(state => state.fundType);
  const {fundTypeLoading} = useSelector(state => state.fundType);
  const {user} = useSelector(state => state.user);

  const fetchFunds = async id => {
    const q = query(fundsRef, where('fundTypeId', '==', id));
    const querySnapshot = await getDocs(q);
    let data = [];

    querySnapshot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    });
    return data;
  };

  const fetchFundTypes = async () => {
    const q = query(fundTypesRef, where('userId', '==', user?.uid));
    dispatch(setFundTypeLoading(true));

    try {
      const querySnapshot = await getDocs(q);
      const fundTypeDataPromises = [];

      for (const doc of querySnapshot.docs) {
        const funds = await fetchFunds(doc.id);

        if (Array.isArray(funds)) {
          const totalAmount = funds.reduce(
            (accumulator, item) => accumulator + parseInt(item.amount),
            0,
          );

          const ExpectedAmount = funds.reduce(
            (accumulator, item) =>
              accumulator +
              expectedCalculator(
                item?.date,
                item?.amount,
                item?.expectedFundInterest,
              ),
            0,
          );

          const data = doc.data();
          const fundTypeData = {
            ...data,
            id: doc.id,
            totalValue: totalAmount,
            expectedValue: ExpectedAmount,
          };

          fundTypeDataPromises.push(fundTypeData);
        } else {
          console.error(
            `fetchFunds for doc ${doc.id} did not return an array.`,
          );
        }
      }

      const fundTypedata = await Promise.all(fundTypeDataPromises);
      dispatch(setFundType(fundTypedata));
      dispatch(setFundTypeLoading(false));
    } catch (error) {
      console.error('Error fetching fund types:', error);
    } finally {
      dispatch(setFundTypeLoading(false));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (isFocused) {
      fetchFundTypes();
    }
  }, [isFocused]);

  const totalInvested = useMemo(() => {
    return (
      fundType?.reduce(
        (accumulator, item) => accumulator + (parseInt(item.totalValue) ?? 0),
        0,
      ) ?? '0'
    );
  }, [fundType]);

  const totalExpected = useMemo(() => {
    return (
      fundType?.reduce(
        (accumulator, item) =>
          accumulator + (parseInt(item.expectedValue) ?? 0),
        0,
      ) ?? '0'
    );
  }, [fundType]);

  return (
    <View>
      <View className="h-full bg-white relative">
        <View className="flex flex-row justify-between items-center px-3 pt-3">
          <Text className="text-lg uppercase font-bold text-black">
            Portfolio
          </Text>
          <TouchableOpacity
            className="rounded-lg p-2 border-2 cursor-pointer"
            style={{borderColor: 'rgb(248 113 113)'}}
            onPress={handleLogout}>
            <Text style={{color: 'rgb(248 113 113)'}} className="font-bold">
              LOGOUT
            </Text>
          </TouchableOpacity>
        </View>

        <View
          className="p-4 m-3 rounded-lg mb-3 z-10"
          style={{backgroundColor: `${colors.theme.main}`}}>
          <View className="flex flex-row justify-between">
            <View className="flex-1">
              <Text className="text-gray-300 text-xl font-bold">Invested</Text>
              <Text className="text-white text-left text-2xl font-bold">
                ₹{totalInvested?.toLocaleString() || 0}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-right text-gray-300 text-xl font-bold">
                Expected
              </Text>
              <Text className="text-white text-right text-2xl font-bold">
                ₹{totalExpected?.toLocaleString() || 0}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginVertical: 16,
            }}
          />
          <View className="flex-row justify-between">
            <Text className="text-right text-gray-300 text-xl font-bold">
              Profit
            </Text>
            <Text className="text-white text-right text-2xl font-bold">
              ₹{(totalExpected - totalInvested).toLocaleString()}
              <Text className="text-white text-right text-lg">
                {' '}
                (
                {(
                  ((totalExpected - totalInvested) / totalInvested) *
                  100
                ).toFixed(2)}
                %)
              </Text>
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between px-3 mb-3">
          <Text className="text-lg font-bold text-black">
            All Fund Category
          </Text>
          <TouchableOpacity
            className="bg-black justify-center p-2 rounded-lg"
            style={{backgroundColor: `${colors.theme.main}`}}
            onPress={() => navigation.navigate('AddFundType')}>
            <Text className="text-white font-bold">Add Fund Type</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView className="flex-1">
          {fundTypeLoading ? (
            <Loading />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <EmptyList message={"You haven't recorded any funds yet"} />
              }
              data={fundType}
              renderItem={({item}) => (
                <View>
                  <FundTypeCard data={item} />
                </View>
              )}
              keyExtractor={item => item.id}
            />
          )}
        </SafeAreaView>
      </View>
    </View>
  );
}
