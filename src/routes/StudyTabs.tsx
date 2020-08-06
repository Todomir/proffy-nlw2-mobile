import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Favorites from '../pages/GiveClasses/Favorites';
import TeacherList from '../pages/TeacherList';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        inactiveTintColor: '#c1bccc',
        activeBackgroundColor: '#ebebf5',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        name='TeacherList'
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                color={focused ? '#9871f5' : color}
                size={size}
                name='ios-easel'
              />
            );
          },
        }}
      />
      <Screen
        name='Favorites'
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                color={focused ? '#9871f5' : color}
                size={size}
                name='ios-heart'
              />
            );
          },
        }}
      />
    </Navigator>
  );
}

export default StudyTabs;
