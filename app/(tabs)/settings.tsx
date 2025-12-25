import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: 'person', title: 'Profile', subtitle: 'Manage your profile information' },
        { icon: 'card', title: 'Payment Methods', subtitle: 'Manage cards and accounts' },
        { icon: 'shield-checkmark', title: 'Security', subtitle: 'Password and security settings' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'moon', title: 'Dark Mode', subtitle: 'Enable dark theme', hasSwitch: true, value: darkModeEnabled, onToggle: setDarkModeEnabled },
        { icon: 'notifications', title: 'Notifications', subtitle: 'Push notification settings', hasSwitch: true, value: notificationsEnabled, onToggle: setNotificationsEnabled },
        { icon: 'finger-print', title: 'Biometric Login', subtitle: 'Use fingerprint or Face ID', hasSwitch: true, value: biometricsEnabled, onToggle: setBiometricsEnabled },
        { icon: 'language', title: 'Language', subtitle: 'English (US)' },
        { icon: 'globe', title: 'Currency', subtitle: 'USD ($)' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle', title: 'Help Center', subtitle: 'Get help and support' },
        { icon: 'chatbubble', title: 'Contact Us', subtitle: 'Send us a message' },
        { icon: 'star', title: 'Rate App', subtitle: 'Rate us on the App Store' },
        { icon: 'document-text', title: 'Terms of Service', subtitle: 'Read our terms' },
        { icon: 'lock-closed', title: 'Privacy Policy', subtitle: 'Read our privacy policy' },
      ]
    }
  ];

  const renderSettingItem = (item: any, index: number) => (
    <TouchableOpacity key={index} style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={item.icon as any} size={20} color="#4CAF50" />
      </View>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      {item.hasSwitch ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
          thumbColor={item.value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileImage}>
          <Ionicons name="person" size={40} color="white" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@email.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={16} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {settingsGroups.map((group, groupIndex) => (
        <View key={groupIndex} style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <View style={styles.groupItems}>
            {group.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out" size={20} color="#FF6B6B" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={styles.version}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsGroup: {
    marginBottom: 30,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 20,
    marginBottom: 10,
  },
  groupItems: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f9f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF6B6B',
    marginLeft: 10,
  },
  version: {
    alignItems: 'center',
    padding: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#999',
  },
});