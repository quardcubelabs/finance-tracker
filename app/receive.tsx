import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import Colors from '@/constants/Colors';

export default function ReceiveScreen() {
  const router = useRouter();
  const [amount] = useState('150.00');

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Send me $${amount}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleCopy = () => {
    console.log('Copy payment link');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Receive Money',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Icon name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.content}>
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount to Receive</Text>
          <View style={styles.amountDisplay}>
            <Text style={styles.currencySymbol}>$</Text>
            <Text style={styles.amount}>{amount}</Text>
          </View>
        </View>

        <View style={styles.qrSection}>
          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCode}>
              <View style={styles.qrPattern}>
                {[...Array(8)].map((_, rowIndex) => (
                  <View key={rowIndex} style={styles.qrRow}>
                    {[...Array(8)].map((_, colIndex) => (
                      <View
                        key={colIndex}
                        style={[
                          styles.qrPixel,
                          (rowIndex + colIndex) % 2 === 0 && styles.qrPixelFilled,
                        ]}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </View>
            <Text style={styles.qrLabel}>Scan QR Code to Pay</Text>
          </View>

          <View style={styles.accountInfo}>
            <Text style={styles.accountLabel}>Account Number</Text>
            <View style={styles.accountNumberRow}>
              <Text style={styles.accountNumber}>**** **** **** 7281</Text>
              <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                <Icon name="content-copy" size={18} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Icon name="share" size={20} color={Colors.text} />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="download" size={20} color={Colors.text} />
            <Text style={styles.actionButtonText}>Save QR</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Amount</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  amountLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  amountDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.textSecondary,
    marginRight: 4,
  },
  amount: {
    fontSize: 56,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  qrCode: {
    backgroundColor: Colors.cardBackground,
    padding: 24,
    borderRadius: 24,
    marginBottom: 16,
  },
  qrPattern: {
    width: 200,
    height: 200,
  },
  qrRow: {
    flexDirection: 'row',
  },
  qrPixel: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.cardBackground,
    margin: 1,
  },
  qrPixelFilled: {
    backgroundColor: Colors.text,
  },
  qrLabel: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  accountInfo: {
    width: '100%',
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 16,
  },
  accountLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  accountNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountNumber: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  copyButton: {
    padding: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.cardBackground,
    paddingVertical: 16,
    borderRadius: 16,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  editButton: {
    backgroundColor: Colors.text,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.cardBackground,
  },
});
