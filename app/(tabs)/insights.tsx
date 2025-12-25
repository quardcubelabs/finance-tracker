import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react-native';
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
  const [selectedPeriod, setSelectedPeriod] = useState('Month');

  const totalSpending = spendingCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0
  );

  const maxValue = Math.max(
    ...monthlyData.map((d) => Math.max(d.income, d.expense))
  );

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
        <View style={styles.periodSelector}>
          {['Week', 'Month', 'Year'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive,
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryCards}>
          <View style={[styles.summaryCard, { backgroundColor: Colors.primary }]}>
            <View style={styles.summaryIcon}>
              <TrendingUp size={20} color={Colors.text} />
            </View>
            <Text style={styles.summaryLabel}>Income</Text>
            <Text style={styles.summaryAmount}>$5,600</Text>
            <Text style={styles.summaryChange}>+12.5% from last month</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: Colors.cardBackground }]}>
            <View style={styles.summaryIcon}>
              <TrendingDown size={20} color="#FF4444" />
            </View>
            <Text style={styles.summaryLabel}>Expenses</Text>
            <Text style={styles.summaryAmount}>$3,520</Text>
            <Text style={styles.summaryChange}>-8.2% from last month</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Spending Breakdown</Text>
            <PieChart size={20} color={Colors.text} />
          </View>

          <View style={styles.pieChartContainer}>
            <View style={styles.pieChart}>
              <Text style={styles.pieChartAmount}>${totalSpending}</Text>
              <Text style={styles.pieChartLabel}>Total Spent</Text>
            </View>
          </View>

          <View style={styles.categoriesList}>
            {spendingCategories.map((category, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View
                    style={[
                      styles.categoryDot,
                      { backgroundColor: category.color },
                    ]}
                  />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <View style={styles.categoryRight}>
                  <Text style={styles.categoryAmount}>${category.amount}</Text>
                  <Text style={styles.categoryPercentage}>
                    {category.percentage}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Income vs Expenses</Text>
          <View style={styles.chartContainer}>
            {monthlyData.map((data, index) => (
              <View key={index} style={styles.barGroup}>
                <View style={styles.bars}>
                  <View
                    style={[
                      styles.bar,
                      styles.incomeBar,
                      { height: (data.income / maxValue) * 120 },
                    ]}
                  />
                  <View
                    style={[
                      styles.bar,
                      styles.expenseBar,
                      { height: (data.expense / maxValue) * 120 },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{data.month}</Text>
              </View>
            ))}
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.incomeDot]} />
              <Text style={styles.legendText}>Income</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.expenseDot]} />
              <Text style={styles.legendText}>Expenses</Text>
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
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: Colors.text,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.textSecondary,
  },
  periodButtonTextActive: {
    color: Colors.cardBackground,
  },
  summaryCards: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  summaryChange: {
    fontSize: 11,
    color: Colors.textSecondary,
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
  pieChartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pieChart: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChartAmount: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  pieChartLabel: {
    fontSize: 13,
    color: Colors.text,
    opacity: 0.7,
  },
  categoriesList: {
    gap: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 12,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  categoryPercentage: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.cardBackground,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  barGroup: {
    alignItems: 'center',
    gap: 8,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 120,
  },
  bar: {
    width: 20,
    borderRadius: 4,
  },
  incomeBar: {
    backgroundColor: Colors.primary,
  },
  expenseBar: {
    backgroundColor: Colors.lightBlue,
  },
  barLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  incomeDot: {
    backgroundColor: Colors.primary,
  },
  expenseDot: {
    backgroundColor: Colors.lightBlue,
  },
  legendText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  bottomPadding: {
    height: 40,
  },
});
