import { ExternalLinkProps } from '@/types';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';

export function ExternalLink({ href, children, style }: ExternalLinkProps) {
  const handlePress = async () => {
    if (Platform.OS !== 'web') {
      // Prevent the default behavior of linking to the default browser on native.
      await openBrowserAsync(href);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );
}