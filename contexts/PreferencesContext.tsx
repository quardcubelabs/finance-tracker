import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const [PreferencesContext, usePreferences] = createContextHook(() => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const prefs = await AsyncStorage.getItem('user_preferences');
      if (prefs) {
        const parsed = JSON.parse(prefs);
        setNotificationsEnabled(parsed.notifications ?? true);
        setBiometricsEnabled(parsed.biometrics ?? false);
        setDarkModeEnabled(parsed.darkMode ?? false);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async (prefs: {
    notifications?: boolean;
    biometrics?: boolean;
    darkMode?: boolean;
  }) => {
    try {
      const current = {
        notifications: notificationsEnabled,
        biometrics: biometricsEnabled,
        darkMode: darkModeEnabled,
        ...prefs,
      };
      await AsyncStorage.setItem('user_preferences', JSON.stringify(current));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    await savePreferences({ notifications: value });
    console.log('Notifications:', value ? 'enabled' : 'disabled');
  };

  const toggleBiometrics = async (value: boolean) => {
    setBiometricsEnabled(value);
    await savePreferences({ biometrics: value });
    console.log('Biometrics:', value ? 'enabled' : 'disabled');
  };

  const toggleDarkMode = async (value: boolean) => {
    setDarkModeEnabled(value);
    await savePreferences({ darkMode: value });
    console.log('Dark mode:', value ? 'enabled' : 'disabled');
  };

  return {
    notificationsEnabled,
    biometricsEnabled,
    darkModeEnabled,
    toggleNotifications,
    toggleBiometrics,
    toggleDarkMode,
    isLoading,
  };
});
