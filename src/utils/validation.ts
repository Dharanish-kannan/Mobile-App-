export const VALIDATION_LIMITS = {
  name: {
    min: 3,
    max: 50,
  },
  tagline: {
    min: 10,
    max: 100,
  },
  description: {
    min: 20,
    max: 500,
  },
} as const;

export interface FormValidationState {
  isValid: boolean;
  errors: {
    name?: string;
    tagline?: string;
    description?: string;
  };
}

export function validateStartupForm(
  name: string,
  tagline: string,
  description: string
): FormValidationState {
  const errors: { name?: string; tagline?: string; description?: string } = {};

  const trimmedName = name.trim();
  const trimmedTagline = tagline.trim();
  const trimmedDescription = description.trim();

  if (!trimmedName) {
    errors.name = 'Startup name is required.';
  } else if (trimmedName.length < VALIDATION_LIMITS.name.min) {
    errors.name = `At least ${VALIDATION_LIMITS.name.min} characters required.`;
  } else if (trimmedName.length > VALIDATION_LIMITS.name.max) {
    errors.name = `Maximum ${VALIDATION_LIMITS.name.max} characters allowed.`;
  }

  if (!trimmedTagline) {
    errors.tagline = 'A punchy tagline is required.';
  } else if (trimmedTagline.length < VALIDATION_LIMITS.tagline.min) {
    errors.tagline = `At least ${VALIDATION_LIMITS.tagline.min} characters required.`;
  } else if (trimmedTagline.length > VALIDATION_LIMITS.tagline.max) {
    errors.tagline = `Maximum ${VALIDATION_LIMITS.tagline.max} characters allowed.`;
  }

  if (!trimmedDescription) {
    errors.description = 'A detailed description is required.';
  } else if (trimmedDescription.length < VALIDATION_LIMITS.description.min) {
    errors.description = `At least ${VALIDATION_LIMITS.description.min} characters required.`;
  } else if (trimmedDescription.length > VALIDATION_LIMITS.description.max) {
    errors.description = `Maximum ${VALIDATION_LIMITS.description.max} characters allowed.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
