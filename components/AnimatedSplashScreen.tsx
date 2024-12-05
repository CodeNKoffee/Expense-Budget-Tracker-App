import React from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
} from 'react-native';
import LottieView from 'lottie-react-native';
import Logo from '@/assets/images/splash.json';

export default function SplashScreen() {
  return (
    <View className='bg-budget-charcoal items-center justify-center h-screen bg-ocean-blue'>
      <LottieView
        style={styles.animatedLogo}
        source={Logo}
        autoPlay
        loop
      />
    </View>
  )
}


const styles = StyleSheet.create({
  animatedLogo: {
    width: '50%',
    height: '50%',   
  },
});