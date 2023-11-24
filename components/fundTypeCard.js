import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function FundTypeCard({data, amount, currentAmount}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className=""
      onPress={() => navigation.navigate('SingleFund', {...data})}>
      <View className="px-4 pb-4">
        <View className="flex flex-row justify-between">
          <View className="flex-1">
            <Text className="text-gray-300 text-xl font-bold">Fund type</Text>
            <Text className="text-gray-500 text-left text-2xl font-bold">
              {data?.type}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-right text-gray-300 text-xl font-bold">
              Avg. Returns
            </Text>
            <Text className="text-gray-500 text-right text-2xl font-bold">
              {(
                parseInt((data?.expectedValue - data?.totalValue) * 100) /
                data?.totalValue
              ).toLocaleString(1) === '-NaN'
                ? 0
                : (
                    parseInt((data?.expectedValue - data?.totalValue) * 100) /
                    data?.totalValue
                  ).toLocaleString(1)}
              %
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-right text-gray-400 text-lg font-bold">
            Total invested
          </Text>
          <Text className="text-gray-500 text-right text-2xl font-bold">
            {data?.totalValue.toLocaleString() || 0}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-right text-gray-400 text-lg font-bold">
            Current
          </Text>
          <Text className="text-gray-500 text-right text-2xl font-bold">
            {parseInt(data?.expectedValue).toLocaleString() || 0}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          marginBottom: 8,
        }}
      />
    </TouchableOpacity>
  );
}
