import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import Avatar from '@/components/Avatar';
import Colors from '@/constants/Colors';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Profile',
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
        <View style={styles.profileHeader}>
          <Avatar name="Andrew John" size={80} variant="user" />
          <Text style={styles.profileName}>Andrew John</Text>
          <Text style={styles.profileEmail}>andrew.john@email.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: Colors.lightBlue }]}>
                <Icon name="person" size={20} color={Colors.text} />
              </View>
              <Text style={styles.menuItemText}>Full Name</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={styles.menuItemValue}>Andrew John</Text>
              <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: Colors.lightYellow }]}>
                <Icon name="mail" size={20} color={Colors.text} />
              </View>
              <Text style={styles.menuItemText}>Email</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={styles.menuItemValue}>andrew@email.com</Text>
              <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: '#FFE5E5' }]}>
                <Icon name="call" size={20} color={Colors.text} />
              </View>
              <Text style={styles.menuItemText}>Phone</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={styles.menuItemValue}>+1 234 567 890</Text>
              <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: '#E5F5E5' }]}>
                <Icon name="location" size={20} color={Colors.text} />
              </View>
              <Text style={styles.menuItemText}>Address</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={styles.menuItemValue}>New York, USA</Text>
              <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: Colors.primary }]}>
                <Icon name="card" size={20} color={Colors.text} />
              </View>
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: '#E5E5FF' }]}>
                <Icon name="shield-checkmark" size={20} color={Colors.text} />
              </View>
              <Text style={styles.menuItemText}>Security</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIcon, { backgroundColor: '#FFE5F5' }]}>
                <Icon name="notifications" size={20} color={Colors.text} />
              </View>
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemValue: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  logoutButton: {
    marginHorizontal: 16,
    backgroundColor: '#FF4444',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 40,
  },
});
