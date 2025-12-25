import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface Investment {
  id: string;
  name: string;
  symbol: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  shares: string;
}

export default function InvestScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'portfolio' | 'discover'>(
    'portfolio'
  );

  const investments: Investment[] = [
    {
      id: '1',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      value: '$8,450.20',
      change: '+$124.50',
      changePercent: '+1.5%',
      isPositive: true,
      shares: '45 shares',
    },
    {
      id: '2',
      name: 'Tesla Inc.',
      symbol: 'TSLA',
      value: '$5,320.00',
      change: '-$89.00',
      changePercent: '-1.6%',
      isPositive: false,
      shares: '20 shares',
    },
    {
      id: '3',
      name: 'Microsoft Corp.',
      symbol: 'MSFT',
      value: '$6,890.50',
      change: '+$215.30',
      changePercent: '+3.2%',
      isPositive: true,
      shares: '25 shares',
    },
  ];

  const recommendations = [
    {
      id: '1',
      name: 'Amazon.com Inc.',
      symbol: 'AMZN',
      trend: '+2.8%',
      isPositive: true,
    },
    {
      id: '2',
      name: 'NVIDIA Corp.',
      symbol: 'NVDA',
      trend: '+5.2%',
      isPositive: true,
    },
    {
      id: '3',
      name: 'Meta Platforms',
      symbol: 'META',
      trend: '+1.9%',
      isPositive: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Invest',
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
          <View style={styles.portfolioCard}>
            <View style={styles.portfolioHeader}>
              <Text style={styles.portfolioLabel}>Total Portfolio Value</Text>
              <View style={styles.portfolioChange}>
                <TrendingUp size={16} color="#10B981" />
                <Text style={styles.portfolioChangeText}>+4.2%</Text>
              </View>
            </View>
            <Text style={styles.portfolioValue}>$20,660.70</Text>
            <Text style={styles.portfolioSubtext}>
              +$250.80 today • $5,200 invested
            </Text>

            <View style={styles.portfolioStats}>
              <View style={styles.statItem}>
                <PieChart size={18} color={Colors.textSecondary} />
                <Text style={styles.statItemText}>3 Holdings</Text>
              </View>
              <View style={styles.statItem}>
                <BarChart3 size={18} color={Colors.textSecondary} />
                <Text style={styles.statItemText}>+296% Return</Text>
              </View>
            </View>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'portfolio' && styles.tabActive,
              ]}
              onPress={() => setSelectedTab('portfolio')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'portfolio' && styles.tabTextActive,
                ]}
              >
                Portfolio
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'discover' && styles.tabActive,
              ]}
              onPress={() => setSelectedTab('discover')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'discover' && styles.tabTextActive,
                ]}
              >
                Discover
              </Text>
            </TouchableOpacity>
          </View>

          {selectedTab === 'portfolio' && (
            <View style={styles.section}>
              {investments.map((investment) => (
                <TouchableOpacity
                  key={investment.id}
                  style={styles.investmentCard}
                >
                  <View style={styles.investmentLeft}>
                    <View
                      style={[
                        styles.investmentIcon,
                        {
                          backgroundColor: investment.isPositive
                            ? Colors.primary
                            : '#FFE5E5',
                        },
                      ]}
                    >
                      <Text style={styles.investmentSymbol}>
                        {investment.symbol.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.investmentInfo}>
                      <Text style={styles.investmentName}>
                        {investment.name}
                      </Text>
                      <Text style={styles.investmentShares}>
                        {investment.shares}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.investmentRight}>
                    <Text style={styles.investmentValue}>
                      {investment.value}
                    </Text>
                    <View style={styles.investmentChange}>
                      {investment.isPositive ? (
                        <TrendingUp size={12} color="#10B981" />
                      ) : (
                        <TrendingDown size={12} color="#FF4444" />
                      )}
                      <Text
                        style={[
                          styles.investmentChangeText,
                          {
                            color: investment.isPositive
                              ? '#10B981'
                              : '#FF4444',
                          },
                        ]}
                      >
                        {investment.change} ({investment.changePercent})
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {selectedTab === 'discover' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended for You</Text>
              {recommendations.map((rec) => (
                <TouchableOpacity key={rec.id} style={styles.recommendationCard}>
                  <View style={styles.recommendationLeft}>
                    <View style={styles.recommendationIcon}>
                      <Text style={styles.recommendationSymbol}>
                        {rec.symbol.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.recommendationName}>{rec.name}</Text>
                      <Text style={styles.recommendationSymbolText}>
                        {rec.symbol}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.recommendationRight}>
                    <Text style={styles.recommendationTrend}>
                      {rec.trend}
                    </Text>
                    <TouchableOpacity style={styles.buyButton}>
                      <Text style={styles.buyButtonText}>Buy</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore More Stocks</Text>
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
  portfolioCard: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  portfolioLabel: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
  },
  portfolioChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  portfolioChangeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#10B981',
  },
  portfolioValue: {
    fontSize: 48,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  portfolioSubtext: {
    fontSize: 13,
    color: Colors.text,
    opacity: 0.7,
    marginBottom: 16,
  },
  portfolioStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statItemText: {
    fontSize: 13,
    color: Colors.text,
    opacity: 0.8,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: Colors.text,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.background,
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
  investmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  investmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  investmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  investmentSymbol: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  investmentInfo: {
    flex: 1,
  },
  investmentName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  investmentShares: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  investmentRight: {
    alignItems: 'flex-end',
  },
  investmentValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  investmentChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  investmentChangeText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  recommendationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  recommendationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recommendationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recommendationSymbol: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  recommendationSymbolText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  recommendationRight: {
    alignItems: 'flex-end',
  },
  recommendationTrend: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#10B981',
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: Colors.text,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 12,
  },
  buyButtonText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.background,
  },
  exploreButton: {
    backgroundColor: Colors.cardBackground,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  exploreButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
});
