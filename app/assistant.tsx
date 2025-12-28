import { useState, useRef, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import geminiService from '../services/gemini';
import Icon from '@expo/vector-icons/MaterialIcons';

type Message = { 
  id: string; 
  text: string; 
  sender: 'user' | 'ai'; 
  timestamp: Date;
};

export default function AssistantScreen() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    if (keyboardHeight > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [keyboardHeight]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    inputRef.current?.blur();

    try {
      const aiResponseText = await geminiService.generateFinancialAdvice(inputText.trim());
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I\'m sorry, I\'m having trouble connecting to my AI services right now. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicPress = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
  };

  const askPresetQuestion = async (question: string) => {
    setInputText(question);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiResponseText = await geminiService.generateFinancialAdvice(question);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I\'m sorry, I\'m having trouble connecting to my AI services right now. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Assistant</Text>
        <View style={styles.headerStatus}>
          <View style={[styles.statusDot, { backgroundColor: geminiService.isGeminiEnabled() ? '#4CAF50' : '#FF9800' }]} />
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 && (
          <>
            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/pay-bills')}
              >
                <Icon name="receipt" size={20} color={Colors.text} />
                <Text style={styles.quickActionText}>Pay Bills</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/transfer')}
              >
                <Icon name="swap-horiz" size={20} color={Colors.text} />
                <Text style={styles.quickActionText}>Transfer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/balance')}
              >
                <Icon name="account-balance" size={20} color={Colors.text} />
                <Text style={styles.quickActionText}>Balance</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/invest')}
              >
                <Icon name="trending-up" size={20} color={Colors.text} />
                <Text style={styles.quickActionText}>Invest</Text>
              </TouchableOpacity>
            </View>

            {/* Future Snapshot Card */}
            <View style={styles.futureSnapshotCard}>
              <View style={styles.futureSnapshotHeader}>
                <Text style={styles.futureSnapshotTitle}>Future Snapshot</Text>
                <Text style={styles.futureSnapshotAmount}>$1400.00</Text>
                <Text style={styles.futureSnapshotGrowth}>+15%</Text>
              </View>
              <Text style={styles.futureSnapshotSubtitle}>Projected Balance over the next 3 months</Text>
              
              <View style={styles.currentBalanceChip}>
                <Text style={styles.currentBalanceText}>$540.00</Text>
              </View>
              
              {/* Simple chart representation */}
              <View style={styles.futureChartContainer}>
                <View style={styles.futureChartPattern} />
                <View style={styles.futureChartLabels}>
                  <Text style={styles.futureChartLabel}>Jan</Text>
                  <Text style={styles.futureChartLabel}>Feb</Text>
                  <Text style={styles.futureChartLabel}>Mar</Text>
                </View>
              </View>
            </View>

            {/* Emotional Check-in */}
            <View style={styles.emotionalCard}>
              <Text style={styles.emotionalTitle}>Emotional Finance Tracker</Text>
              <View style={styles.emotionalContent}>
                <View style={styles.emotionalIcon}>
                  <Text style={styles.emotionalEmoji}>😊</Text>
                </View>
                <View style={styles.emotionalText}>
                  <Text style={styles.emotionalStatus}>Feeling Good</Text>
                  <Text style={styles.emotionalDescription}>Your financial health is on track</Text>
                </View>
              </View>
            </View>

            {/* Suggested Questions */}
            <View style={styles.questionsCard}>
              <TouchableOpacity 
                style={styles.questionButton}
                onPress={() => askPresetQuestion("Can I afford a new laptop?")}
              >
                <Icon name="help-outline" size={16} color={Colors.textSecondary} />
                <Text style={styles.questionText}>Can I afford a new laptop?</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.questionButton}
                onPress={() => askPresetQuestion("Remind me to")}
              >
                <Icon name="notifications" size={16} color={Colors.textSecondary} />
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

        {isLoading && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingMessage}>
              <Text style={styles.loadingText}>AI is thinking...</Text>
            </View>
          </View>
        )}
        
        <View style={[styles.bottomPadding, { height: 100 + keyboardHeight }]} />
      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.select({ ios: 'padding', android: 'height' })}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Type Here..."
            placeholderTextColor={Colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
            editable={!isLoading && !isRecording}
            multiline={true}
            returnKeyType="send"
            textAlignVertical="top"
          />
          <TouchableOpacity 
            style={[styles.micButton, isRecording && styles.micButtonRecording]}
            onPress={handleMicPress}
            disabled={isLoading}
          >
            <Icon name="mic" size={20} color={isRecording ? '#FF4444' : Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sendButton, (isLoading || !inputText.trim()) && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
          >
            <Icon name="send" size={20} color={Colors.background} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  headerStatus: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
    height: 80,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  futureSnapshotCard: {
    backgroundColor: '#B8E986',
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  futureSnapshotHeader: {
    marginBottom: 8,
  },
  futureSnapshotTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  futureSnapshotAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  futureSnapshotGrowth: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  futureSnapshotSubtitle: {
    fontSize: 12,
    color: '#000',
    opacity: 0.7,
    marginBottom: 16,
  },
  currentBalanceChip: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  currentBalanceText: {
    color: '#B8E986',
    fontSize: 12,
    fontWeight: '600',
  },
  futureChartContainer: {
    marginTop: 8,
  },
  futureChartPattern: {
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    marginBottom: 8,
    // Add diagonal stripes pattern
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  futureChartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  futureChartLabel: {
    fontSize: 12,
    color: '#000',
    opacity: 0.7,
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
    fontWeight: '700',
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
    fontWeight: '600',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  questionText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  bottomPadding: {
    height: 120,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.select({ ios: 12, android: 16 }),
    backgroundColor: Colors.background,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 44,
    maxHeight: 100,
    textAlignVertical: 'center',
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333',
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
  loadingContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  loadingMessage: {
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});