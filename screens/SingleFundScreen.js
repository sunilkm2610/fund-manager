import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  PlusIcon,
  ArrowLeftIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';
import {db, fundsRef} from '../utils/config';
import FundCard from '../components/fundCard';
import EmptyList from '../components/emptyList';
import {deleteDoc, doc, getDocs, query, where} from 'firebase/firestore';
import Loading from '../components/loading';
import colors from '../theme/colors';
import {theme} from '../tailwind.config';

export default function SingleFundScreen(props) {
  const {id, type} = props.route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteFundConfirm, setDeleteFundConfirm] = useState(false);

  const fetchFunds = async () => {
    const q = query(fundsRef, where('fundTypeId', '==', id));
    setLoading(true);
    const querySnapshot = await getDocs(q);
    let data = [];

    querySnapshot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    });
    setFunds(data);
    setLoading(false);
  };

  const deleteFundType = async () => {
    try {
      const q = query(fundsRef, where('fundTypeId', '==', id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        deleteDoc(doc.ref);
      });

      const deleteFundTypesRef = doc(db, 'fundTypes', id);
      await deleteDoc(deleteFundTypesRef);

      navigation.goBack();
    } catch (error) {
      Snackbar.show({
        text: error.message,
        backgroundColor: 'red',
      });
    }
  };

  const onPressFundTypeDelete = () => {
    Alert.alert(
      'Delete All Funds',
      `Are you sure, to delete this fund category`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Confirm', onPress: () => deleteFundType()},
      ],
    );
  };

  const deleteFund = async id => {
    try {
      const deleteFundsRef = doc(db, 'funds', id);
      await deleteDoc(deleteFundsRef);
      setDeleteFundConfirm(!deleteFundConfirm);
    } catch (error) {
      Snackbar.show({
        text: error.message,
        backgroundColor: 'red',
      });
    }
  };

  const longPressToFunds = id => {
    Alert.alert('Delete Fund', `Are you sure to delete this fund`, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'Confirm', onPress: () => deleteFund(id)},
    ]);
  };

  useEffect(() => {
    if (isFocused) fetchFunds();
  }, [isFocused]);

  useEffect(()=>{
    fetchFunds();
  },[deleteFundConfirm])

  return (
    <View className="flex-1 bg-white">
      <View className="flex flex-row justify-between items-center p-2">
        <TouchableOpacity
          className="rounded-full p-2"
          style={{backgroundColor: colors.theme.main}}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon color={'white'} size="30" />
        </TouchableOpacity>
        <Text className="text-lg uppercase font-bold text-black">{type}</Text>
        <TouchableOpacity
          className="rounded-full p-2"
          onPress={onPressFundTypeDelete}>
          <TrashIcon color={' rgb(248 113 113)'} size="33" />
        </TouchableOpacity>
      </View>

      <SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyList
                message={`You haven't recorded any funds in  ${type || 'list'}`}
              />
            }
            data={funds}
            renderItem={({item}) => (
              <View>
                <FundCard data={item} onLongPressFunction={longPressToFunds} />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </SafeAreaView>
      <TouchableOpacity
        className="bg-red-400 z-10 absolute bottom-6 right-6 rounded-full p-4"
        onPress={() => navigation.navigate('AddFund', id)}>
        <PlusIcon size="40" color={'white'} />
      </TouchableOpacity>
    </View>
  );
}
