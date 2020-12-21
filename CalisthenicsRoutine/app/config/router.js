import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screen/home';
import Setting from '../screen/setting';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        inactiveTintColor: 'gray',
        activeTintColor: '#000',
        showLabel: false,
        tabStyle: {
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 12,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon2
              name={focused ? 'fire' : 'fire-alt'}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'md-settings-sharp' : 'md-settings-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
