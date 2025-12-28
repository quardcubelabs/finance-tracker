import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import Avatar from '@/components/Avatar';
import Colors from '@/constants/Colors';

export default function TransferScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('398.00');
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleNumberPress = (num: string) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();

    if (num === 'del') {
      setAmount((prev) => {
        const newAmount = prev.slice(0, -1);
        return newAmount || '0';
      });
    } else if (num === '.') {
      if (!amount.includes('.')) {
        setAmount((prev) => prev + '.');
      }
    } else {
      setAmount((prev) => {
        if (prev === '0') return num;
        return prev + num;
      });
    }
  };

  const getButtonColor = (key: string) => {
    if (key === 'C') return Colors.primary;
    if (key === ',') return Colors.lightYellow;
    if (key === 'del') return Colors.lightBlue;
    return Colors.cardBackground;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Eleanor Pena',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Icon name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>👩🏻‍💼</Text>
            </View>
          ),
        }}
      />

      <View style={styles.content}>
        <View style={styles.transferFromSection}>
          <View style={styles.transferFromHeader}>
            <Text style={styles.transferFromLabel}>Transfer From</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All {'>'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.accountCard}>
            <View style={styles.accountLeft}>
              <View style={styles.accountIcon}>
                <Text style={styles.accountIconText}>🏦</Text>
              </View>
              <View>
                <Text style={styles.accountName}>My Account</Text>
                <Text style={styles.accountNumber}>•••• •••• •••• 7281</Text>
              </View>
            </View>
            <View style={styles.cardIconButton}>
              <Text>💳</Text>
            </View>
          </View>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.currencySymbol}>$</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.scheduleButton}>
            <Icon name="calendar" size={20} color={Colors.text} />
            <Text style={styles.buttonText}>Schedule Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noteButton}>
            <Icon name="add" size={20} color="#FF4444" />
            <Text style={styles.noteButtonText}>Add Note</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.numpad}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            [',', '0', '.'],
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.numpadRow}>
              {row.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.numpadButton,
                    { backgroundColor: getButtonColor(key) },
                  ]}
                  onPress={() => handleNumberPress(key)}
                >
                  <Text style={styles.numpadButtonText}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <View style={styles.numpadRow}>
            <TouchableOpacity
              style={[styles.numpadButton, styles.numpadButtonSpecial]}
              onPress={() => handleNumberPress('C')}
            >
              <Text style={styles.numpadButtonText}>C</Text>
            </TouchableOpacity>
            <View style={styles.numpadButton} />
            <TouchableOpacity
              style={[
                styles.numpadButton,
                { backgroundColor: Colors.lightBlue },
              ]}
              onPress={() => handleNumberPress('del')}
            >
              <Icon name="backspace" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    marginLeft: 16,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerAvatarText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  transferFromSection: {
    marginBottom: 32,
  },
  transferFromHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transferFromLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  accountCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 16,
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountIconText: {
    fontSize: 24,
  },
  accountName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  accountNumber: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  cardIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  currencySymbol: {
    fontSize: 32,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  amount: {
    fontSize: 64,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  scheduleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.cardBackground,
    paddingVertical: 14,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  noteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.cardBackground,
    paddingVertical: 14,
    borderRadius: 16,
  },
  noteButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FF4444',
  },
  numpad: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },
  numpadRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  numpadButton: {
    flex: 1,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
  },
  numpadButtonSpecial: {
    backgroundColor: Colors.primary,
  },
  numpadButtonText: {
    fontSize: 22,
    fontWeight: '600' as const,
    color: Colors.text,
  },
});
