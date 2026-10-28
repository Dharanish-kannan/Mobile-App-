import { router } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';

import { AnalyzingOverlay } from '../../components/AnalyzingOverlay';
import { AppBackground } from '../../components/AppBackground';
import { Button } from '../../components/Button';
import { InputField } from '../../components/InputField';
import { useToast } from '../../components/toast/ToastContext';
import { ApiError, evaluateIdea } from '../../services/ideaApi';
import { useIdeaStore } from '../../store';
import { useTheme } from '../../theme';
import { EvaluationResult } from '../../utils/evaluator';
import { triggerHaptic } from '../../utils/haptics';
import { VALIDATION_LIMITS, validateStartupForm } from '../../utils/validation';

export default function SubmitScreen() {
  const { theme } = useTheme();
  const toast = useToast();
  const addIdea = useIdeaStore((state) => state.addIdea);

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);

  const taglineRef = useRef<React.ElementRef<typeof TextInput>>(null);
  const descriptionRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const validation = validateStartupForm(name, tagline, description);
  const isFormValid = validation.isValid;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    if (isAnalyzing) return;
    setSubmittedAttempt(true);

    if (!isFormValid) {
      await triggerHaptic.error();
      return;
    }

    Keyboard.dismiss();
    await triggerHaptic.medium();
    setIsAnalyzing(true);

    try {
      const result = await evaluateIdea({ name, tagline, description });
      setEvalResult(result);
    } catch (err) {
      setIsAnalyzing(false);
      setEvalResult(null);
      await triggerHaptic.error();
      const message =
        err instanceof ApiError ? err.message : 'Evaluation failed. Please try again.';
      toast.show({ message, type: 'error' });
    }
  };

  const handleAnalysisComplete = () => {
    if (!evalResult) return;

    const savedIdea = addIdea({
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      rating: evalResult.rating,
      feedback: evalResult.feedback,
    });

    toast.show({
      message: `"${savedIdea.name}" evaluated (${savedIdea.rating}/100) and added!`,
      type: 'success',
    });

    // Reset form state
    setName('');
    setTagline('');
    setDescription('');
    setTouched({});
    setSubmittedAttempt(false);
    setIsAnalyzing(false);
    setEvalResult(null);

    // Navigate to Ideas feed
    router.navigate('/(tabs)');
  };

  return (
    <AppBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { padding: theme.spacing.lg, paddingBottom: 120, gap: theme.spacing.lg },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <InputField
            label="Startup Name"
            value={name}
            onChangeText={setName}
            placeholder="e.g. Supabase, Retool, Cursor"
            error={(touched.name || submittedAttempt) ? validation.errors.name : undefined}
            minLength={VALIDATION_LIMITS.name.min}
            maxLength={VALIDATION_LIMITS.name.max}
            showCounter
            returnKeyType="next"
            onSubmitEditing={() => taglineRef.current?.focus()}
            onBlur={() => handleBlur('name')}
          />

          <InputField
            ref={taglineRef}
            label="One-line Tagline"
            value={tagline}
            onChangeText={setTagline}
            placeholder="e.g. The Open Source Firebase Alternative"
            error={(touched.tagline || submittedAttempt) ? validation.errors.tagline : undefined}
            minLength={VALIDATION_LIMITS.tagline.min}
            maxLength={VALIDATION_LIMITS.tagline.max}
            showCounter
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            onBlur={() => handleBlur('tagline')}
          />

          <InputField
            ref={descriptionRef}
            label="Pitch & Solution Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Detail your unfair advantage, target customer pain, and how it prints revenue..."
            error={(touched.description || submittedAttempt) ? validation.errors.description : undefined}
            minLength={VALIDATION_LIMITS.description.min}
            maxLength={VALIDATION_LIMITS.description.max}
            showCounter
            multiline
            numberOfLines={4}
            onBlur={() => handleBlur('description')}
          />

          <Button
            title={isAnalyzing ? 'Analyzing...' : 'Evaluate my idea'}
            onPress={handleSubmit}
            disabled={!isFormValid || isAnalyzing}
            variant="primary"
            icon={<Sparkles size={18} color={isFormValid ? theme.colors.onAccent : theme.colors.textMuted} strokeWidth={2.4} />}
            accessibilityLabel={isAnalyzing ? 'Analyzing...' : 'Evaluate my idea'}
            style={styles.submitButton}
          />
        </ScrollView>

        <AnalyzingOverlay visible={isAnalyzing} result={evalResult} onComplete={handleAnalysisComplete} />
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  submitButton: { marginTop: 8 },
});
