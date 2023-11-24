import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import expectedCalculator from '../utils/expectedCalculator';

export default function FundCard({data, onLongPressFunction}) {
    const expected = expectedCalculator(data?.date,data?.amount,data?.expectedFundInterest)


  return (
    <TouchableOpacity
      className=""
      onPress={() => {}}
      onLongPress={() => onLongPressFunction(data.id)}>
      <View className="px-4 pb-4">
        <View className="flex flex-row justify-between">
          <View className="flex-1">
            <Text className="text-gray-300 text-xl font-bold">Fund Name</Text>
            <Text className="text-gray-500 text-left text-2xl font-bold overflow-scroll">
              {data?.fundName}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-right text-gray-300 text-xl font-bold">
              Expected Returns
            </Text>
            <Text className="text-gray-500 text-right text-2xl font-bold">
              {data?.expectedFundInterest || 0}%
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <Text className="flex-1 text-left text-gray-400 text-lg font-bold">
            Total invested
          </Text>
          <Text className="flex-1 text-gray-500 text-right text-2xl font-bold">
            {data?.amount || 0}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="flex-1 text-left text-gray-400 text-lg font-bold">
            Current
          </Text>
          <Text className="flex-1 text-gray-500 text-right text-2xl font-bold">
            {expected}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="flex-1 text-left text-gray-400 text-lg font-bold">
            Invested Date
          </Text>
          <Text className="flex-1 text-gray-500 text-right text-2xl font-bold">
            {data?.date}
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
