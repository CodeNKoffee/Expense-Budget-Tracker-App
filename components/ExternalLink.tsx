import { ExternalLinkProps } from '@/types';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  const handlePress = async () => {
    if (Platform.OS !== 'web') {
      // Prevent the default behavior of linking to the default browser on native.
      await openBrowserAsync(href);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text className={className}>{children}</Text>
    </TouchableOpacity>
  );
}