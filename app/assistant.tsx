import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Colors from '@/constants/Colors';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AssistantScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I\'m your AI financial assistant. How can I help you today?',
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const startRecording = async () => {
    try {
      if (Platform.OS !== 'web') {
        const permission = await Audio.requestPermissionsAsync();
        if (permission.status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Please allow microphone access to record audio'
          );
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      setRecording(null);

      const newMessage: Message = {
        id: Date.now().toString(),
        text: '🎤 Voice message recorded',
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);

      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I received your voice message. How can I assist you?',
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const handleMicPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'AI assistant',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {messages.length === 0 && (
          <>
            <View style={styles.quickActions}>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/pay-bills' as any)}
              >
                <Ionicons name="receipt" size={24} color={Colors.text} />
                <Text style={styles.quickActionText}>Pay Bills</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/transfer')}
              >
                <Ionicons name="swap-horizontal" size={24} color={Colors.text} />
                <Text style={styles.quickActionText}>Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/balance' as any)}
              >
                <Ionicons name="wallet" size={24} color={Colors.text} />
                <Text style={styles.quickActionText}>Balance</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/invest' as any)}
              >
                <Ionicons name="bulb" size={24} color={Colors.text} />
                <Text style={styles.quickActionText}>Invest</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.snapshotCard}>
              <View style={styles.snapshotHeader}>
                <View>
                  <Text style={styles.snapshotTitle}>Future Snapshot</Text>
                  <Text style={styles.snapshotSubtitle}>
                    Projected Balance over the next 3 months
                  </Text>
                </View>
                <View style={styles.snapshotAmount}>
                  <Text style={styles.snapshotAmountText}>$1400.00</Text>
                  <Text style={styles.snapshotPercentage}>+15%</Text>
                </View>
              </View>

              <View style={styles.chartContainer}>
                <View style={styles.chartBars}>
                  <View style={[styles.chartBar, { height: '40%' }]} />
                  <View style={[styles.chartBar, { height: '55%' }]} />
                  <View style={[styles.chartBar, { height: '70%' }]} />
                </View>
                <View style={styles.chartLabels}>
                  <Text style={styles.chartLabel}>Jan</Text>
                  <Text style={styles.chartLabel}>Feb</Text>
                  <Text style={styles.chartLabel}>Mar</Text>
                </View>
              </View>
            </View>

            <View style={styles.emotionalCard}>
              <Text style={styles.emotionalTitle}>Emotional Finance Tracker</Text>
              <View style={styles.emotionalContent}>
                <View style={styles.emotionalIcon}>
                  <Text style={styles.emotionalEmoji}>😊</Text>
                </View>
                <View style={styles.emotionalText}>
                  <Text style={styles.emotionalStatus}>Feeling Good</Text>
                  <Text style={styles.emotionalDescription}>
                    Your financial health is on track
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.questionsCard}>
              <TouchableOpacity style={styles.questionButton}>
                <Text style={styles.questionText}>Can I afford a new laptop?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.questionButton}>
                <Text style={styles.questionText}>Remind me to</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.sender === 'user'
                ? styles.userMessageContainer
                : styles.aiMessageContainer,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.sender === 'user'
                  ? styles.userMessageBubble
                  : styles.aiMessageBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.sender === 'user'
                    ? styles.userMessageText
                    : styles.aiMessageText,
                ]}
              >
                {message.text}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type Here..."
          placeholderTextColor={Colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity 
          style={[styles.micButton, isRecording && styles.micButtonRecording]}
          onPress={handleMicPress}
        >
          <Ionicons name="mic" size={20} color={isRecording ? '#FF4444' : Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <Ionicons name="send" size={20} color={Colors.cardBackground} />
        </TouchableOpacity>
      </View>
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
  scrollContent: {
    flexGrow: 1,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
    marginBottom: 24,
  },
  quickActionButton: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.text,
    textAlign: 'center',
  },
  snapshotCard: {
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  snapshotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  snapshotTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  snapshotSubtitle: {
    fontSize: 12,
    color: Colors.text,
    opacity: 0.7,
  },
  snapshotAmount: {
    alignItems: 'flex-end',
  },
  snapshotAmountText: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  snapshotPercentage: {
    fontSize: 12,
    color: Colors.text,
    opacity: 0.7,
  },
  chartContainer: {
    marginTop: 16,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 8,
  },
  chartBar: {
    width: 60,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 8,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chartLabel: {
    fontSize: 12,
    color: Colors.text,
    width: 60,
    textAlign: 'center',
  },
  emotionalCard: {
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  emotionalTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  emotionalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  emotionalIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionalEmoji: {
    fontSize: 32,
  },
  emotionalText: {
    flex: 1,
  },
  emotionalStatus: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  emotionalDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  questionsCard: {
    paddingHorizontal: 16,
    gap: 12,
  },
  questionButton: {
    backgroundColor: Colors.cardBackground,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  questionText: {
    fontSize: 14,
    color: Colors.text,
  },
  bottomPadding: {
    height: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 14,
    color: Colors.text,
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonRecording: {
    backgroundColor: '#FFE5E5',
  },
  messageContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userMessageBubble: {
    backgroundColor: Colors.text,
    borderBottomRightRadius: 4,
  },
  aiMessageBubble: {
    backgroundColor: Colors.cardBackground,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: Colors.background,
  },
  aiMessageText: {
    color: Colors.text,
  },
});
