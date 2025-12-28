import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Icon from '@/components/Icon';
import Colors from '@/constants/Colors';
import { recentTransactions } from '@/mocks/transactions';

export default function TransactionDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const transaction = recentTransactions.find(t => t.id === id);

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: Colors.background },
            headerTitle: 'Transaction Details',
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
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Transaction not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Transaction Details',
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
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Icon name="checkmark-circle" size={64} color="#00AA00" />
          </View>
          <Text style={styles.statusText}>Transaction Successful</Text>
          <Text
            style={[
              styles.amount,
              transaction.type === 'credit' && styles.amountCredit,
            ]}
          >
            {transaction.type === 'credit' ? '+' : '-'}$
            {Math.abs(transaction.amount).toFixed(2)}
          </Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.recipientSection}>
            <View style={styles.recipientAvatar}>
              <Text style={styles.recipientAvatarText}>{transaction.avatar}</Text>
            </View>
            <View style={styles.recipientInfo}>
              <Text style={styles.recipientLabel}>
                {transaction.type === 'credit' ? 'From' : 'To'}
              </Text>
              <Text style={styles.recipientName}>{transaction.name}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValue}>#TRX{transaction.id}2024</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>
              {transaction.type === 'credit' ? 'Received' : 'Sent'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method</Text>
            <Text style={styles.detailValue}>VISA •••• 7281</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Completed</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction Fee</Text>
            <Text style={styles.detailValue}>$0.00</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="download" size={20} color={Colors.text} />
            <Text style={styles.actionButtonText}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={20} color={Colors.text} />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
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
  backButton: {
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  statusCard: {
    alignItems: 'center',
    padding: 32,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 24,
    marginBottom: 16,
  },
  statusIcon: {
    marginBottom: 16,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  amount: {
    fontSize: 42,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  amountCredit: {
    color: '#00AA00',
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  detailsCard: {
    marginHorizontal: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  recipientSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  recipientAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipientAvatarText: {
    fontSize: 32,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  recipientName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  statusBadge: {
    backgroundColor: '#E5F5E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#00AA00',
  },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
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
  bottomPadding: {
    height: 40,
  },
});
