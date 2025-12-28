import { View, StyleSheet, Text } from 'react-native';

interface AvatarProps {
  name?: string;
  size?: number;
  variant?: 'user' | 'contact1' | 'contact2' | 'contact3' | 'contact4';
  style?: any;
}

export default function Avatar({ name, size = 40, variant = 'user', style }: AvatarProps) {
  // Using gradient backgrounds with initials for realistic look
  const getAvatarData = () => {
    switch (variant) {
      case 'user':
        return {
          initials: name ? name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'AJ',
          bgColor: '#4A90E2',
        };
      case 'contact1':
        return {
          initials: 'SM',
          bgColor: '#E94B3C',
        };
      case 'contact2':
        return {
          initials: 'JD',
          bgColor: '#F5A623',
        };
      case 'contact3':
        return {
          initials: 'LM',
          bgColor: '#7B68EE',
        };
      case 'contact4':
        return {
          initials: 'RK',
          bgColor: '#50C878',
        };
      default:
        return {
          initials: 'NA',
          bgColor: '#9B9B9B',
        };
    }
  };

  const avatarData = getAvatarData();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: avatarData.bgColor,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.initials,
          {
            fontSize: size * 0.4,
          },
        ]}
      >
        {avatarData.initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
