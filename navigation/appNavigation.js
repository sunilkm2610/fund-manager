import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AddFundTypeScreen from '../screens/AddFundTypeScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import AddFundScreen from '../screens/AddFundScreen';
import SingleFundScreen from '../screens/SingleFundScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {
//   HomeIcon as HomeOutline,
//   CurrencyRupeeIcon as CurrencyOutline,
//   UserIcon as UserOutline,
// } from 'react-native-heroicons/outline';
// import {
//   HomeIcon as HomeSolid,
//   CurrencyRupeeIcon as CurrencySolid,
//   UserIcon as UserSolid,
// } from 'react-native-heroicons/solid';
import {LogBox, Platform, View} from 'react-native';
import {setFirstLoading, setUser} from '../redux/slices/user';
import {onAuthStateChanged} from 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from '../utils/config';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS == 'ios';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default AppNavigation = () => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, u => {
    dispatch(setUser(u));
    dispatch(setFirstLoading(false));
  });

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Portfolio"
            component={PortfolioScreen}
          />
          <Stack.Screen
            options={{headerShown: true, title: 'Add Fund Category'}}
            name="AddFundType"
            component={AddFundTypeScreen}
          />
          <Stack.Screen
            options={{headerShown: true, title: 'Add Fund'}}
            name="AddFund"
            component={AddFundScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="SingleFund"
            component={SingleFundScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{headerShown: true, title: 'Sign In'}}
            name="SignIn"
            component={SignInScreen}
          />
          <Stack.Screen
            options={{headerShown: true, title: 'Sign Up'}}
            name="SignUp"
            component={SignUpScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

// function HomeTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarIcon: ({focused}) => menuIcons(route, focused),
//         tabBarStyle: {
//           marginBottom: 20,
//           height: 75,
//           alignItems: 'center',

//           borderRadius: 100,
//           marginHorizontal: 20,
//           backgroundColor: 'rgba(0,0,0, 0.7)',
//           position: 'absolute',
//           borderWidth: 1,
//           borderColor: `${colors.theme.main}`,
//         },
//         tabBarItemStyle: {
//           marginTop: ios ? 30 : 0,
//         },
//       })}>
//       {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
//       <Tab.Screen name="Portfolio" component={PortfolioScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }

// const menuIcons = (route, focused) => {
//   let icon;

//   if (route.name === 'Home') {
//     icon = focused ? (
//       <HomeSolid size="40" color={`${colors.theme.main}`} />
//     ) : (
//       <HomeOutline size="30" strokeWidth={2} color={`${colors.text.primary}`} />
//     );
//   } else if (route.name === 'Portfolio') {
//     icon = focused ? (
//       <CurrencySolid size="50" color={`${colors.theme.main}`} />
//     ) : (
//       <CurrencyOutline
//         size="40"
//         strokeWidth={2}
//         color={`${colors.text.primary}`}
//       />
//     );
//   } else if (route.name === 'Profile') {
//     icon = focused ? (
//       <UserSolid size="40" color={`${colors.theme.main}`} />
//     ) : (
//       <UserOutline size="30" strokeWidth={2} color={`${colors.text.primary}`} />
//     );
//   }

//   let buttonClass = focused ? 'bg-white' : '';
//   return (
//     <View
//       className={'flex items-center rounded-full p-3 shadow ' + buttonClass}>
//       {icon}
//     </View>
//   );
// };
