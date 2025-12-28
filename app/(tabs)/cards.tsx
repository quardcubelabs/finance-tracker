import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import Icon from '@/components/Icon';
import Colors from '@/constants/Colors';

const cards = [
  {
    id: 1,
    type: 'VISA',
    number: '7281',
    balance: 15398.87,
    cardHolder: 'Andrew John',
    expiry: '12/25',
    color: Colors.primary,
  },
  {
    id: 2,
    type: 'Mastercard',
    number: '4892',
    balance: 8250.45,
    cardHolder: 'Andrew John',
    expiry: '09/26',
    color: Colors.lightBlue,
  },
];

export default function CardsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Cards',
          headerRight: () => (
            <TouchableOpacity style={styles.addButton}>
              <Icon name="add" size={20} color={Colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.cardsSection}>
          {cards.map((card) => (
            <TouchableOpacity key={card.id} style={styles.cardContainer}>
              <View style={[styles.card, { backgroundColor: card.color }]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardType}>{card.type}</Text>
                  <Icon name="eye" size={20} color={Colors.text} />
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardBalance}>${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                  <Text style={styles.cardLabel}>Balance</Text>
                </View>
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardNumber}>•••• •••• •••• {card.number}</Text>
                    <Text style={styles.cardHolder}>{card.cardHolder}</Text>
                  </View>
                  <Text style={styles.cardExpiry}>{card.expiry}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addCardButton}>
            <View style={styles.addCardIcon}>
              <Icon name="add" size={32} color={Colors.text} />
            </View>
            <Text style={styles.addCardText}>Add New Card</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Actions</Text>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.lightBlue }]}>
                <Icon name="card" size={20} color={Colors.text} />
              </View>
              <Text style={styles.actionText}>Card Details</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.lightYellow }]}>
                <Icon name="lock-closed" size={20} color={Colors.text} />
              </View>
              <Text style={styles.actionText}>Freeze Card</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Limits</Text>
          <View style={styles.limitCard}>
            <View style={styles.limitRow}>
              <Text style={styles.limitLabel}>Daily Limit</Text>
              <Text style={styles.limitValue}>$5,000</Text>
            </View>
            <View style={styles.limitBar}>
              <View style={[styles.limitBarFill, { width: '45%' }]} />
            </View>
            <Text style={styles.limitUsed}>$2,250 used today</Text>
          </View>
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
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 24,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardType: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  cardBody: {
    marginBottom: 32,
  },
  cardBalance: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.7,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  cardHolder: {
    fontSize: 12,
    color: Colors.text,
    opacity: 0.7,
  },
  cardExpiry: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  addCardButton: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed' as const,
  },
  addCardIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  actionArrow: {
    fontSize: 28,
    color: Colors.textSecondary,
  },
  limitCard: {
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 16,
  },
  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  limitLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  limitValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  limitBar: {
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
    marginBottom: 8,
  },
  limitBarFill: {
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  limitUsed: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  bottomPadding: {
    height: 40,
  },
});
