import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';

// TabLayout component defines the layout and behavior of the tab navigator
export default function TabLayout() {
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

// getIconName function returns the appropriate icon name based on the tab name
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

// Styles for the tab bar and icons
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    elevation: 50,
  },
});

// iconWrapperStyle function returns the style for the icon wrapper based on whether the tab is focused
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