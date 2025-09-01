import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import DiscoverScreen from './DiscoverScreen';
import COLORS from '../../constants/color';
import { StatusBar } from 'react-native';
import { HomeIcon, Search } from 'lucide-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './DetailScreen';
import useDemo from '../../hooks/useDemo';

const Tab = createBottomTabNavigator();
const TabStack = createNativeStackNavigator();

const MovieTabStack = () => {
    return (
        <TabStack.Navigator screenOptions={{headerShown: false}}>
            <TabStack.Screen name="Home" component={HomeScreen} />
            {/* <TabStack.Screen name="DetailScreen" component={DetailScreen} /> */}
        </TabStack.Navigator>
    );
};

const MovieApp = () => {
    const {demoState} = useDemo();
    console.log("Demo State from MovieApp:", demoState);
    return (
        <>
            <StatusBar barStyle="light-content"/>
            <Tab.Navigator 
            screenOptions={{
                headerShown: false, 
                tabBarActiveTintColor: COLORS.orange, 
                tabBarInactiveTintColor: COLORS.gray,
                tabBarStyle: {
                    backgroundColor: COLORS.darkBlue, 
                    borderTopWidth: 0,
                },
            }}
            >
                <Tab.Screen 
                name="Home" 
                options={{ tabBarIcon: ({color, size, focused}) => <HomeIcon color={focused ? COLORS.yellow : COLORS.background} size={size} /> }}  
                component={MovieTabStack} 
                />

                <Tab.Screen name="Discover" options={{ tabBarIcon: ({color, size, focused}) => <Search color={focused ? COLORS.yellow : COLORS.background} size={size} /> }} component={DiscoverScreen} />
            </Tab.Navigator>
        </>
    );
};

export default MovieApp;
