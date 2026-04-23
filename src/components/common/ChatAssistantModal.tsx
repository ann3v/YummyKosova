import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useDiscovery } from '../../lib/discovery-state';
import { theme } from '../../theme';

const quickPrompts = [
  'Show me the best traditional food',
  'What is popular tonight?',
  'Help me book a table',
];

export function ChatAssistantModal() {
  const insets = useSafeAreaInsets();
  const {
    chatMessages,
    closeChat,
    isAssistantTyping,
    isChatOpen,
    selectedLocation,
    sendMessage,
  } = useDiscovery();
  const [draft, setDraft] = useState('');

  const handleSend = () => {
    if (!draft.trim()) {
      return;
    }

    sendMessage(draft);
    setDraft('');
  };

  return (
    <Modal visible={isChatOpen} transparent animationType="slide" onRequestClose={closeChat}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeChat} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[styles.sheetWrap, { paddingBottom: Math.max(insets.bottom, theme.spacing.lg) }]}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Yummy AI Assistant</Text>
              <Text style={styles.subtitle}>Helping around {selectedLocation.label}</Text>
            </View>
            <Pressable onPress={closeChat} style={styles.closeButton}>
              <Ionicons name="close" size={22} color={theme.colors.heading} />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContent}>
            <View style={styles.quickPromptsRow}>
              {quickPrompts.map((prompt) => (
                <Pressable key={prompt} onPress={() => sendMessage(prompt)} style={styles.quickPrompt}>
                  <Text style={styles.quickPromptText}>{prompt}</Text>
                </Pressable>
              ))}
            </View>

            {chatMessages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageBubble,
                  message.role === 'assistant' ? styles.assistantBubble : styles.userBubble,
                ]}>
                <Text
                  style={[
                    styles.messageText,
                    message.role === 'assistant' ? styles.assistantText : styles.userText,
                  ]}>
                  {message.text}
                </Text>
              </View>
            ))}

            {isAssistantTyping ? (
              <View style={[styles.messageBubble, styles.assistantBubble]}>
                <Text style={[styles.messageText, styles.assistantText]}>Typing...</Text>
              </View>
            ) : null}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Ask about food, offers, or reservations..."
              placeholderTextColor={theme.colors.subtle}
              style={styles.input}
              multiline
            />
            <Pressable onPress={handleSend} style={styles.sendButton}>
              <Ionicons name="arrow-up" size={20} color={theme.colors.surface} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(12, 18, 30, 0.28)',
  },
  sheetWrap: {
    maxHeight: '78%',
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.xxl,
    borderTopRightRadius: theme.radius.xxl,
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
  },
  handle: {
    alignSelf: 'center',
    width: 64,
    height: 6,
    borderRadius: theme.radius.round,
    backgroundColor: '#D7DCE7',
    marginBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.sizes.title,
    lineHeight: theme.typography.lineHeights.title,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  subtitle: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.mutedText,
    marginTop: 2,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: theme.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  messagesContent: {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  quickPromptsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  quickPrompt: {
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  quickPromptText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  messageBubble: {
    maxWidth: '84%',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.lg,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F6FB',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
  },
  messageText: {
    fontSize: theme.typography.sizes.body,
    lineHeight: theme.typography.lineHeights.body,
  },
  assistantText: {
    color: theme.colors.heading,
  },
  userText: {
    color: theme.colors.surface,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 96,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.heading,
    backgroundColor: theme.colors.background,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: theme.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
});
