import { AlertCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { CharacterCounter } from './CharacterCounter';
import { useTheme } from '../theme';

export interface InputFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  hint?: string;
  minLength?: number;
  showCounter?: boolean;
}

export const InputField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputFieldProps
>(
  (
    {
      label,
      value = '',
      onChangeText,
      placeholder,
      error,
      hint,
      multiline = false,
      numberOfLines = 1,
      maxLength,
      minLength,
      showCounter = false,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const hasError = Boolean(error);

  let borderColor = theme.colors.border;
  if (hasError) {
    borderColor = theme.colors.error;
  } else if (isFocused) {
    borderColor = theme.colors.accent;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text
          style={[
            styles.label,
            {
              color: hasError ? theme.colors.error : theme.colors.textPrimary,
              fontFamily: theme.typography.fonts.bodyBold,
              fontSize: theme.typography.sizes.sm,
            },
          ]}
        >
          {label}
        </Text>

        {showCounter && maxLength !== undefined && (
          <CharacterCounter
            current={value.length}
            min={minLength}
            max={maxLength}
          />
        )}
      </View>

      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        onFocus={handleFocus}
        onBlur={handleBlur}
        accessibilityLabel={label}
        accessibilityHint={hint || placeholder}
        aria-invalid={hasError}
        style={[
          styles.input,
          multiline && styles.multilineInput,
          {
            backgroundColor: theme.colors.surface,
            borderColor,
            color: theme.colors.textPrimary,
            fontFamily: theme.typography.fonts.body,
            fontSize: theme.typography.sizes.md,
            borderRadius: theme.radii.md,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: multiline ? theme.spacing.sm : theme.spacing.md,
          },
        ]}
        {...rest}
      />

      {hasError ? (
        <View style={styles.errorRow}>
          <AlertCircle
            size={13}
            color={theme.colors.error}
            strokeWidth={2.4}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.errorText,
              {
                color: theme.colors.error,
                fontFamily: theme.typography.fonts.body,
                fontSize: theme.typography.sizes.xs,
              },
            ]}
            accessibilityRole="alert"
          >
            {error}
          </Text>
        </View>
      ) : hint ? (
        <Text
          style={[
            styles.hintText,
            {
              color: theme.colors.textTertiary,
              fontFamily: theme.typography.fonts.body,
              fontSize: theme.typography.sizes.xs,
              marginTop: theme.spacing.xxs,
            },
          ]}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
});

InputField.displayName = 'InputField';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {},
  input: {
    borderWidth: 1.5,
  },
  multilineInput: {
    minHeight: 104,
    textAlignVertical: 'top',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  errorText: {},
  hintText: {},
});
