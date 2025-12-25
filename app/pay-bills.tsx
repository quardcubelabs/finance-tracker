import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Zap,
  Droplets,
  Wifi,
  Smartphone,
  Search,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface Bill {
  id: string;
  name: string;
  icon: string;
  amount: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  color: string;
}

export default function PayBillsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const bills: Bill[] = [
    {
      id: '1',
      name: 'Electricity',
      icon: 'zap',
      amount: '$125.50',
      dueDate: 'Due Dec 28',
      status: 'pending',
      color: Colors.primary,
    },
    {
      id: '2',
      name: 'Water',
      icon: 'droplets',
      amount: '$45.00',
      dueDate: 'Due Dec 30',
      status: 'pending',
      color: '#4A9EFF',
    },
    {
      id: '3',
      name: 'Internet',
      icon: 'wifi',
      amount: '$89.99',
      dueDate: 'Paid Dec 20',
      status: 'paid',
      color: '#10B981',
    },
    {
      id: '4',
      name: 'Phone',
      icon: 'smartphone',
      amount: '$55.00',
      dueDate: 'Due Jan 5',
      status: 'pending',
      color: '#F59E0B',
    },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap size={24} color={Colors.text} />;
      case 'droplets':
        return <Droplets size={24} color={Colors.text} />;
      case 'wifi':
        return <Wifi size={24} color={Colors.text} />;
      case 'smartphone':
        return <Smartphone size={24} color={Colors.text} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Pay Bills',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <Search size={20} color={Colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search bills..."
              placeholderTextColor={Colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Total Due This Month</Text>
            <Text style={styles.summaryAmount}>$315.49</Text>
            <Text style={styles.summarySubtitle}>3 bills pending</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Bills</Text>
            {bills
              .filter((bill) => bill.status === 'pending')
              .map((bill) => (
                <TouchableOpacity key={bill.id} style={styles.billCard}>
                  <View
                    style={[styles.billIcon, { backgroundColor: bill.color }]}
                  >
                    {getIconComponent(bill.icon)}
                  </View>
                  <View style={styles.billInfo}>
                    <Text style={styles.billName}>{bill.name}</Text>
                    <Text style={styles.billDueDate}>{bill.dueDate}</Text>
                  </View>
                  <View style={styles.billRight}>
                    <Text style={styles.billAmount}>{bill.amount}</Text>
                    <TouchableOpacity style={styles.payButton}>
                      <Text style={styles.payButtonText}>Pay</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Paid Bills</Text>
            {bills
              .filter((bill) => bill.status === 'paid')
              .map((bill) => (
                <View key={bill.id} style={styles.billCard}>
                  <View
                    style={[styles.billIcon, { backgroundColor: bill.color }]}
                  >
                    {getIconComponent(bill.icon)}
                  </View>
                  <View style={styles.billInfo}>
                    <Text style={styles.billName}>{bill.name}</Text>
                    <Text style={styles.billDueDate}>{bill.dueDate}</Text>
                  </View>
                  <View style={styles.billRight}>
                    <Text style={styles.billAmount}>{bill.amount}</Text>
                    <View style={styles.paidBadge}>
                      <Text style={styles.paidBadgeText}>Paid</Text>
                    </View>
                  </View>
                </View>
              ))}
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  summaryCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 40,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  summarySubtitle: {
    fontSize: 13,
    color: Colors.text,
    opacity: 0.7,
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
  billCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  billIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  billDueDate: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  billRight: {
    alignItems: 'flex-end',
  },
  billAmount: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  payButton: {
    backgroundColor: Colors.text,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 12,
  },
  payButtonText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.background,
  },
  paidBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paidBadgeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
});
