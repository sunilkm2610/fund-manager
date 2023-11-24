import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
// import { PieChart, LineChart } from 'react-native-chart-kit';
import PieChart from 'react-native-pie-chart';
import {useSelector} from 'react-redux';
import {getDoc, getDocs, query, where} from 'firebase/firestore';
import {fundsRef} from '../utils/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import FundTypeCard from '../components/fundTypeCard';
import EmptyList from '../components/emptyList';
import {useIsFocused} from '@react-navigation/native';

// const data = [
//     {
//         name: "Seoul",
//         population: 21500000,
//         color: "rgba(131, 167, 234, 1)",
//         legendFontColor: "#7F7F7F",
//         legendFontSize: 15
//     },
//     {
//         name: "Toronto",
//         population: 2800000,
//         color: "#F00",
//         legendFontColor: "#7F7F7F",
//         legendFontSize: 15
//     },
//     {
//         name: "Beijing",
//         population: 527612,
//         color: "red",
//         legendFontColor: "#7F7F7F",
//         legendFontSize: 15
//     },
//     {
//         name: "New York",
//         population: 8538000,
//         color: "#ffffff",
//         legendFontColor: "#7F7F7F",
//         legendFontSize: 15
//     },
//     {
//         name: "Moscow",
//         population: 11920000,
//         color: "rgb(0, 0, 255)",
//         legendFontColor: "#7F7F7F",
//         legendFontSize: 15
//     }
// ];

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  }, // optional
};

const widthAndHeight = 250;
const seriesd = [123, 321, 123, 789, 537];
const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00'];

export default HomeScreen = () => {
  const isFocused = useIsFocused();

  const {fundType} = useSelector(state => state.fundType);
  const {user} = useSelector(state => state.user);
  const [recetFunds, setRecentFunds] = useState([]);
  //   const [series, setSeries] = useState([]);

  const fetchFunds = async () => {
    const q = query(fundsRef, where('userId', '==', user?.uid));
    const querySnapshot = await getDocs(q);
    let data = [];

    querySnapshot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    });

    const sortedData = data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    setRecentFunds(sortedData);
  };

  //   useEffect(() => {
  //     if (fundType) {
  //       const nonZeroTotalValues = fundType
  //         .filter(item => item.totalValue !== 0)
  //         .map(item => item.totalValue);
  //     //   setSeries(nonZeroTotalValues);
  //     }
  //   }, [fundType]);

  useEffect(() => {
    if (user) {
      fetchFunds();
    }
  }, [user, isFocused]);

  return (
    <View style={styles.container}>
      <Text>Bezier Line Chart</Text>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={seriesd}
        sliceColor={sliceColor}
      />
      <Text className="bg-slate-500 p-2 font-bold text-lg text-white">
        React Added Funds
      </Text>
      <SafeAreaView className="flex-1">
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyList message={"You haven't recorded any funds yet"} />
          }
          data={recetFunds}
          renderItem={({item}) => (
            <View>
              <View className="flex flex-row justify-between p-3">
                {/* <FundTypeCard data={item} /> */}
                {/* <View></View> */}
                <Text>{item?.fundName}</Text>
                <Text>{(+item?.amount).toLocaleString()}</Text>
              </View>
              <View
                style={{
                    borderBottomColor: '#39AE85',
                    borderBottomWidth: 1,
                    // marginBottom: 8
                }}
            />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
