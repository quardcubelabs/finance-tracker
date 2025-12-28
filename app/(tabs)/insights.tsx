import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import Icon from '@/components/Icon';
import Colors from '@/constants/Colors';

const spendingCategories = [
  { name: 'Food & Dining', amount: 1240, percentage: 35, color: '#FFE5A0' },
  { name: 'Transportation', amount: 680, percentage: 19, color: '#C5E8F5' },
  { name: 'Shopping', amount: 520, percentage: 15, color: '#FFD0E0' },
  { name: 'Entertainment', amount: 420, percentage: 12, color: '#E0D5FF' },
  { name: 'Bills', amount: 380, percentage: 11, color: '#FFE0CC' },
  { name: 'Others', amount: 280, percentage: 8, color: '#E5E5E5' },
];

const monthlyData = [
  { month: 'Jan', income: 5200, expense: 3800 },
  { month: 'Feb', income: 5400, expense: 4100 },
  { month: 'Mar', income: 5800, expense: 3520 },
  { month: 'Apr', income: 5600, expense: 4200 },
];

export default function InsightsScreen() {
  // Data for the design
  const categories = [
    { name: 'Food & Dining', color: '#F44F4F', amount: 432.5 },
    { name: 'Shopping', color: '#2DD6C1', amount: 289.0 },
    { name: 'Transportation', color: '#3B82F6', amount: 156.0 },
    { name: 'Entertainment', color: '#A3E635', amount: 98.0 },
    { name: 'Bills & Utilities', color: '#C084FC', amount: 580.0 },
  ];
  const budget = 2500;
  const spent = 1700;
  const remaining = budget - spent;
  const percentUsed = Math.round((spent / budget) * 100);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Insights',
        }}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Spending by Category */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Spending by Category</Text>
          {categories.map((cat, idx) => (
            <View key={cat.name} style={styles.categoryRow}>
              <View style={styles.categoryLabelRow}>
                <View style={[styles.dot, { backgroundColor: cat.color }]} />
                <Text style={styles.categoryLabel}>{cat.name}</Text>
              </View>
              <Text style={styles.categoryAmount}>${cat.amount.toFixed(2)}</Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[styles.progressBarFg, { backgroundColor: cat.color, width: `${Math.min(100, (cat.amount / budget) * 100)}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Budget Status */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Budget Status</Text>
          <View style={styles.budgetRow}>
            <View style={styles.budgetCircleWrap}>
              <View style={styles.budgetCircleBg}>
                <View
                  style={[styles.budgetCircleFg, { transform: [{ rotate: `${(percentUsed / 100) * 360}deg` }], borderColor: '#D1FF3D' }]} />
                <View style={styles.budgetCircleInner}>
                  <Text style={styles.budgetCircleText}>{percentUsed}%</Text>
                  <Text style={styles.budgetCircleSub}>Used</Text>
                </View>
              </View>
            </View>
            <View style={styles.budgetSummary}>
              <View style={styles.budgetSummaryRow}>
                <Text style={styles.budgetSummaryLabel}>Budget</Text>
                <Text style={styles.budgetSummaryValue}>${budget.toLocaleString()}</Text>
              </View>
              <View style={styles.budgetSummaryRow}>
                <Text style={styles.budgetSummaryLabel}>Spent</Text>
                <Text style={styles.budgetSummaryValue}>${spent.toLocaleString()}</Text>
              </View>
              <View style={styles.budgetSummaryRow}>
                <Text style={styles.budgetSummaryLabel}>Remaining</Text>
                <Text style={[styles.budgetSummaryValue, { color: '#00C853' }]}>${remaining.toLocaleString()}</Text>
              </View>
            </View>
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
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 20,
  },
  categoryRow: {
    marginBottom: 18,
  },
  categoryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  categoryAmount: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '700',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  progressBarBg: {
    width: '100%',
    height: 7,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 2,
    overflow: 'hidden',
  },
  progressBarFg: {
    height: 7,
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  budgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  budgetCircleWrap: {
    marginRight: 24,
  },
  budgetCircleBg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  budgetCircleFg: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 7,
    borderColor: '#D1FF3D',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: '#D1FF3D',
    top: 0,
    left: 0,
  },
  budgetCircleInner: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 90,
    height: 90,
    left: 0,
    top: 0,
  },
  budgetCircleText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#B2B200',
    textAlign: 'center',
  },
  budgetCircleSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: -2,
  },
  budgetSummary: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
  },
  budgetSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetSummaryLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  budgetSummaryValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  bottomPadding: {
    height: 40,
  },
});
