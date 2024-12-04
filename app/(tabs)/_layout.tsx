import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          Platform.select({
            ios: styles.iosShadow,
          }),
        ],
      }}
    >
      {['index', 'breakdown', 'transactions', 'history', 'settings'].map((name) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <View style={iconWrapperStyle(focused)}>
                <IconSymbol
                  size={28}
                  name={getIconName(name)}
                  color={focused ? '#FFF' : '#ACACAC'}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

// Define the dynamic icon name
const getIconName = (name: string) => {
  switch (name) {
    case 'index':
      return 'house.fill';
    case 'breakdown':
      return 'chart.pie.fill';
    case 'transactions':
      return 'plus.circle.fill';
    case 'history':
      return 'list.bullet';
    case 'settings':
      return 'gearshape.fill';
    default:
      return 'questionmark.circle';
  }
};

// Refactored Styles
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    borderRadius: 25,
    backgroundColor: '#000',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  androidElevation: {
    elevation: 5,
  },
});

const iconWrapperStyle = (focused: boolean) =>
  StyleSheet.create({
    iconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: focused ? '#F76D35' : 'transparent',
    },
  }).iconWrapper;