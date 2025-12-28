import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import Colors from '@/constants/Colors';

interface Account {
  id: string;
  name: string;
  type: string;
  balance: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

export default function BalanceScreen() {
  const router = useRouter();

  const accounts: Account[] = [
    {
      id: '1',
      name: 'Checking Account',
      type: '•••• 7281',
      balance: '$12,847.50',
      change: '+$247.50',
      changePercent: '+2.0%',
      isPositive: true,
    },
    {
      id: '2',
      name: 'Savings Account',
      type: '•••• 3492',
      balance: '$25,420.00',
      change: '+$1,420.00',
      changePercent: '+5.9%',
      isPositive: true,
    },
    {
      id: '3',
      name: 'Credit Card',
      type: '•••• 8765',
      balance: '-$1,234.56',
      change: '-$234.56',
      changePercent: '-23.5%',
      isPositive: false,
    },
  ];

  const totalBalance = '$36,032.94';

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Balance',
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.totalCard}>
            <View style={styles.totalHeader}>
              <Text style={styles.totalLabel}>Total Balance</Text>
              <TouchableOpacity style={styles.eyeButton}>
                <Icon name="eye" size={20} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <Text style={styles.totalAmount}>{totalBalance}</Text>
            <View style={styles.totalChange}>
              <Icon name="trending-up" size={16} color="#10B981" />
              <Text style={styles.totalChangeText}>+$1,432.94 this month</Text>
            </View>
          </View>

          <View style={styles.quickStats}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="trending-up" size={20} color="#10B981" />
              </View>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={styles.statValue}>$5,240</Text>
              <Text style={styles.statChange}>+12%</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="trending-down" size={20} color="#FF4444" />
              </View>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={styles.statValue}>$3,807</Text>
              <Text style={styles.statChange}>-8%</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Accounts</Text>
            {accounts.map((account) => (
              <TouchableOpacity key={account.id} style={styles.accountCard}>
                <View
                  style={[
                    styles.accountIcon,
                    {
                      backgroundColor: account.isPositive
                        ? Colors.primary
                        : '#FFE5E5',
                    },
                  ]}
                >
                  <Icon name="logo-usd"
                    size={24}
                    color={account.isPositive ? Colors.text : '#FF4444'}
                  />
                </View>
                <View style={styles.accountInfo}>
                  <Text style={styles.accountName}>{account.name}</Text>
                  <Text style={styles.accountType}>{account.type}</Text>
                </View>
                <View style={styles.accountRight}>
                  <Text style={styles.accountBalance}>{account.balance}</Text>
                  <View style={styles.accountChange}>
                    {account.isPositive ? (
                      <Icon name="trending-up" size={12} color="#10B981" />
                    ) : (
                      <Icon name="trending-down" size={12} color="#FF4444" />
                    )}
                    <Text
                      style={[
                        styles.accountChangeText,
                        {
                          color: account.isPositive ? '#10B981' : '#FF4444',
                        },
                      ]}
                    >
                      {account.change}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addAccountButton}>
            <Text style={styles.addAccountButtonText}>+ Add Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  totalCard: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  totalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
  },
  eyeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 48,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  totalChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  totalChangeText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600' as const,
  },
  quickStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600' as const,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  accountIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  accountType: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  accountRight: {
    alignItems: 'flex-end',
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  accountChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  accountChangeText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  addAccountButton: {
    backgroundColor: Colors.cardBackground,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  addAccountButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
});
