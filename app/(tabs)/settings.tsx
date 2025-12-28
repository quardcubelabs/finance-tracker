import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import Avatar from '@/components/Avatar';
import Colors from '@/constants/Colors';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const {
    notificationsEnabled,
    biometricsEnabled,
    darkModeEnabled,
    toggleNotifications,
    toggleBiometrics,
    toggleDarkMode,
  } = usePreferences();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    Alert.alert('Edit Profile', 'Profile editing feature');
  };

  const handlePersonalInfo = () => {
    console.log('Personal info clicked');
    Alert.alert('Personal Information', 'View and edit your personal details');
  };

  const handlePaymentMethods = () => {
    console.log('Payment methods clicked');
    Alert.alert('Payment Methods', 'Manage your payment methods');
  };

  const handleChangePassword = () => {
    console.log('Change password clicked');
    Alert.alert('Change Password', 'Update your account password');
  };

  const handleHelpCenter = () => {
    console.log('Help center clicked');
    Alert.alert('Help Center', 'Get help and support');
  };

  const handleTermsPrivacy = () => {
    console.log('Terms & Privacy clicked');
    Alert.alert('Terms & Privacy', 'View our terms of service and privacy policy');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Settings',
        }}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Avatar name={user?.name || 'Andrew John'} size={64} variant="user" />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'Andrew John'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'andrew.john@email.com'}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingItem} onPress={handlePersonalInfo}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: Colors.lightBlue }]}>
                <Icon name="person" size={20} color={Colors.text} />
              </View>
              <Text style={styles.settingText}>Personal Information</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={handlePaymentMethods}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: Colors.lightYellow }]}>
                <Icon name="card" size={20} color={Colors.text} />
              </View>
              <Text style={styles.settingText}>Payment Methods</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#FFD0E0' }]}>
                <Icon name="notifications" size={20} color={Colors.text} />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.cardBackground}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#E0D5FF' }]}>
                <Icon name="moon" size={20} color={Colors.text} />
              </View>
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={toggleDarkMode}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.cardBackground}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: Colors.lightBlue }]}>
                <Icon name="shield-checkmark" size={20} color={Colors.text} />
              </View>
              <Text style={styles.settingText}>Biometric Authentication</Text>
            </View>
            <Switch
              value={biometricsEnabled}
              onValueChange={toggleBiometrics}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.cardBackground}
            />
          </View>
          <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: Colors.lightYellow }]}>
                <Icon name="lock-closed" size={20} color={Colors.text} />
              </View>
              <Text style={styles.settingText}>Change Password</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.settingItem} onPress={handleHelpCenter}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#FFD0E0' }]}>
                <Icon name="help-circle" size={20} color={Colors.text} />
              </View>
              <Text style={styles.settingText}>Help Center</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={handleTermsPrivacy}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#E0D5FF' }]}>
                <Icon name="document-text" size={20} color={Colors.text} />
              </View>
              <Text style={styles.settingText}>Terms & Privacy</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" size={20} color="#FF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>

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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  editButton: {
    backgroundColor: Colors.text,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.cardBackground,
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
    paddingLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#FF4444',
  },
  version: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 24,
  },
  bottomPadding: {
    height: 40,
  },
});
