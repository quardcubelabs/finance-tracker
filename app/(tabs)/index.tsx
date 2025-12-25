import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { quickSendContacts, recentTransactions } from '@/mocks/transactions';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: () => (
            <View>
              <Text style={styles.headerName}>Andrew John</Text>
              <Text style={styles.headerSubtitle}>Welcome back</Text>
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.iconButton}>
                <Text style={styles.notificationDot}>🔔</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text>⚙️</Text>
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Balance</Text>
            <Text style={styles.visaText}>VISA</Text>
          </View>
          <Text style={styles.balanceAmount}>$15,398.87</Text>
          <View style={styles.balanceFooter}>
            <Text style={styles.cardNumber}>•••• •••• •••• 7281</Text>
            <Text style={styles.currency}>USD</Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardName}>Andrew John</Text>
            <TouchableOpacity 
              style={styles.setBudgetButton}
              onPress={() => router.push('/set-budget')}
            >
              <Text style={styles.setBudgetText}>⚡ Set Budget</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonBlue]}
            onPress={() => router.push('/transfer')}
          >
            <Ionicons name="arrow-up" size={24} color="#000" />
            <Text style={styles.actionText}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonYellow]}
            onPress={() => router.push('/receive')}
          >
            <Ionicons name="arrow-down" size={24} color="#000" />
            <Text style={styles.actionText}>Receive</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Send</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.quickSendList}>
            <TouchableOpacity style={styles.addContact}>
              <Ionicons name="add" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
            {quickSendContacts.map((contact) => (
              <TouchableOpacity key={contact.id} style={styles.contact}>
                <View style={styles.contactAvatar}>
                  <Text style={styles.contactAvatarText}>{contact.avatar}</Text>
                </View>
                <Text style={styles.contactName}>{contact.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.aiButton}
          onPress={() => router.push('/assistant')}
        >
          <Ionicons name="sparkles" size={20} color="#fff" />
          <Text style={styles.aiButtonText}>AI Assistant</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity style={styles.weekSelector}>
              <Text style={styles.weekText}>Week</Text>
              <Ionicons name="chevron-forward" size={16} color="#000" />
            </TouchableOpacity>
          </View>

          {recentTransactions.map((transaction) => (
            <TouchableOpacity 
              key={transaction.id} 
              style={styles.transaction}
              onPress={() => router.push(`/transaction/${transaction.id}` as any)}
            >
              <View style={styles.transactionLeft}>
                <View style={styles.transactionAvatar}>
                  <Text style={styles.transactionAvatarText}>
                    {transaction.avatar}
                  </Text>
                </View>
                <View>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.type === 'credit' && styles.transactionCredit,
                ]}
              >
                {transaction.type === 'credit' ? '+' : ''}$
                {transaction.amount.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    marginRight: 16,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    fontSize: 18,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  avatarText: {
    fontSize: 20,
  },
  balanceCard: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 24,
    margin: 16,
    marginTop: 8,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  visaText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  balanceAmount: {
    fontSize: 42,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  balanceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardNumber: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  currency: {
    fontSize: 12,
    color: Colors.text,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500' as const,
  },
  setBudgetButton: {
    backgroundColor: Colors.text,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  setBudgetText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600' as const,
  },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
  },
  actionButtonBlue: {
    backgroundColor: Colors.lightBlue,
  },
  actionButtonYellow: {
    backgroundColor: Colors.lightYellow,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  quickSendList: {
    flexDirection: 'row',
    gap: 16,
  },
  addContact: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed' as const,
  },
  contact: {
    alignItems: 'center',
    gap: 8,
  },
  contactAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactAvatarText: {
    fontSize: 28,
  },
  contactName: {
    fontSize: 13,
    color: Colors.text,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.text,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  aiButtonText: {
    color: Colors.cardBackground,
    fontSize: 15,
    fontWeight: '600' as const,
  },
  weekSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  weekText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionAvatarText: {
    fontSize: 24,
  },
  transactionName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  transactionCredit: {
    color: '#00AA00',
  },
  bottomPadding: {
    height: 40,
  },
});
