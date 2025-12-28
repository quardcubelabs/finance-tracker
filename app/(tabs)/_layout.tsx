import { Tabs } from 'expo-router';
import Icon from '@/components/Icon';
import React from 'react';
import Colors from '@/constants/Colors';
import { View, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.text,
        tabBarInactiveTintColor: Colors.textSecondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: 80,
          paddingBottom: 20,
          paddingTop: 15,
          position: 'absolute',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500' as const,
          marginTop: 5,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="home" size={focused ? 26 : 24} color={focused ? '#00D4AA' : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="trending-up" size={focused ? 26 : 24} color={focused ? '#00D4AA' : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#00D4AA',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -25,
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
              <Icon name="scan" size={28} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="card" size={focused ? 26 : 24} color={focused ? '#00D4AA' : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon name="settings" size={focused ? 26 : 24} color={focused ? '#00D4AA' : color} />
          ),
        }}
      />
    </Tabs>
  );
}
