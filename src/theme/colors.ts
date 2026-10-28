export interface ElevationLevel {
  bg: string;
  border: string;
  shadow: { shadowColor: string; shadowOffset: { width: number; height: number }; shadowOpacity: number; shadowRadius: number; elevation: number };
}

export interface ColorPalette {
  background: string;
  backgroundSecondary: string;
  backgroundGradient: [string, string];
  topGlow: string;
  surface: string;
  surfaceRaised: string;
  surfaceHover: string;
  surfaceElevated: string;
  surfaceSubtle: string;
  elevation: { card: ElevationLevel; raised: ElevationLevel; floating: ElevationLevel };
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  textMuted: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  accentSubtle: string;
  accentBorderSubtle: string;
  onAccent: string;
  buttonPrimaryGradient: [string, string];
  buttonDisabledBg: string;
  buttonDisabledText: string;
  border: string;
  borderSubtle: string;
  borderHairline: string;
  borderFocus: string;
  overlayBackdrop: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  error: string;
  errorBg: string;
  info: string;
  infoBg: string;
  scoreTierUnicorn: { text: string; bg: string; border: string; gradient: [string, string] };
  scoreTierSeriesA: { text: string; bg: string; border: string; gradient: [string, string] };
  scoreTierPromising: { text: string; bg: string; border: string; gradient: [string, string] };
  scoreTierHighRisk: { text: string; bg: string; border: string; gradient: [string, string] };
  podiumGold: { accent: string; border: string; borderTop: string; badgeBg: string; cardGradient: [string, string] };
  podiumSilver: { accent: string; border: string; borderTop: string; badgeBg: string; cardGradient: [string, string] };
  podiumBronze: { accent: string; border: string; borderTop: string; badgeBg: string; cardGradient: [string, string] };
  cardShadow: { shadowColor: string; shadowOffset: { width: number; height: number }; shadowOpacity: number; shadowRadius: number; elevation: number };
  accentGlow: { shadowColor: string; shadowOffset: { width: number; height: number }; shadowOpacity: number; shadowRadius: number; elevation: number };
}

export const darkColors: ColorPalette = {
  background: '#0B0B0F',
  backgroundSecondary: '#111117',
  backgroundGradient: ['#0B0B0F', '#12141F'],
  topGlow: 'rgba(255, 90, 54, 0.08)',
  surface: '#13131A',
  surfaceRaised: '#1B1B24',
  surfaceHover: '#1F1F2B',
  surfaceElevated: '#242432',
  surfaceSubtle: '#16161F',
  elevation: {
    card: { bg: '#13131A', border: 'rgba(255, 255, 255, 0.08)', shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 2 } },
    raised: { bg: '#1B1B24', border: 'rgba(255, 255, 255, 0.08)', shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 4 } },
    floating: { bg: 'rgba(27, 27, 36, 0.94)', border: 'rgba(255, 255, 255, 0.08)', shadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 8 } },
  },
  textPrimary: '#F7F7FA',
  textSecondary: '#A6A6B5',
  textTertiary: '#767686',
  textInverse: '#0B0B0F',
  textMuted: '#585868',
  accent: '#FF5A36',
  accentLight: '#FF7757',
  accentDark: '#E0411F',
  accentSubtle: 'rgba(255, 90, 54, 0.12)',
  accentBorderSubtle: 'rgba(255, 90, 54, 0.35)',
  onAccent: '#FFFFFF',
  buttonPrimaryGradient: ['#FF5A36', '#FF8A3D'],
  buttonDisabledBg: '#242432',
  buttonDisabledText: '#767686',
  border: '#23232E',
  borderSubtle: '#1A1A23',
  borderHairline: 'rgba(255, 255, 255, 0.08)',
  borderFocus: '#FF5A36',
  overlayBackdrop: 'rgba(11, 11, 15, 0.85)',
  success: '#10B981',
  successBg: 'rgba(16, 185, 129, 0.14)',
  warning: '#F59E0B',
  warningBg: 'rgba(245, 158, 11, 0.14)',
  error: '#EF4444',
  errorBg: 'rgba(239, 68, 68, 0.14)',
  info: '#38BDF8',
  infoBg: 'rgba(56, 189, 248, 0.14)',
  scoreTierUnicorn: { text: '#10B981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.32)', gradient: ['#065F46', '#047857'] },
  scoreTierSeriesA: { text: '#38BDF8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.32)', gradient: ['#0369A1', '#0284C7'] },
  scoreTierPromising: { text: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.32)', gradient: ['#92400E', '#B45309'] },
  scoreTierHighRisk: { text: '#F87171', bg: 'rgba(248, 113, 113, 0.12)', border: 'rgba(248, 113, 113, 0.32)', gradient: ['#991B1B', '#B91C1C'] },
  podiumGold: { accent: '#FBBF24', border: 'rgba(251, 191, 36, 0.55)', borderTop: '#FDE047', badgeBg: 'rgba(251, 191, 36, 0.2)', cardGradient: ['#4D3814', '#1F1708'] },
  podiumSilver: { accent: '#E2E8F0', border: 'rgba(203, 213, 225, 0.5)', borderTop: '#F8FAFC', badgeBg: 'rgba(203, 213, 225, 0.2)', cardGradient: ['#3E4656', '#1A1D24'] },
  podiumBronze: { accent: '#FB923C', border: 'rgba(249, 115, 22, 0.55)', borderTop: '#FDBA74', badgeBg: 'rgba(249, 115, 22, 0.2)', cardGradient: ['#4E2816', '#1E1008'] },
  cardShadow: { shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 3 },
  accentGlow: { shadowColor: '#FF5A36', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.38, shadowRadius: 16, elevation: 8 },
};

export const lightColors: ColorPalette = {
  background: '#F8FAFC',
  backgroundSecondary: '#EEF2F6',
  backgroundGradient: ['#F8FAFC', '#EEF2F6'],
  topGlow: 'rgba(255, 90, 54, 0.05)',
  surface: '#FFFFFF',
  surfaceRaised: '#FFFFFF',
  surfaceHover: '#F1F5F9',
  surfaceElevated: '#F1F5F9',
  surfaceSubtle: '#F8FAFC',
  elevation: {
    card: { bg: '#FFFFFF', border: 'rgba(15, 23, 42, 0.08)', shadow: { shadowColor: '#0F172A', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 } },
    raised: { bg: '#FFFFFF', border: 'rgba(15, 23, 42, 0.08)', shadow: { shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 } },
    floating: { bg: 'rgba(255, 255, 255, 0.96)', border: 'rgba(15, 23, 42, 0.08)', shadow: { shadowColor: '#0F172A', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 20, elevation: 6 } },
  },
  textPrimary: '#0F172A',
  textSecondary: '#334155',
  textTertiary: '#475569',
  textInverse: '#FFFFFF',
  textMuted: '#64748B',
  accent: '#FF5A36',
  accentLight: '#FF7757',
  accentDark: '#E0411F',
  accentSubtle: 'rgba(255, 90, 54, 0.08)',
  accentBorderSubtle: 'rgba(255, 90, 54, 0.28)',
  onAccent: '#FFFFFF',
  buttonPrimaryGradient: ['#FF5A36', '#FF8A3D'],
  buttonDisabledBg: '#E2E8F0',
  buttonDisabledText: '#64748B',
  border: '#CBD5E1',
  borderSubtle: '#E2E8F0',
  borderHairline: 'rgba(15, 23, 42, 0.08)',
  borderFocus: '#FF5A36',
  overlayBackdrop: 'rgba(15, 23, 42, 0.5)',
  success: '#059669',
  successBg: '#ECFDF5',
  warning: '#D97706',
  warningBg: '#FFFBEB',
  error: '#DC2626',
  errorBg: '#FEF2F2',
  info: '#0284C7',
  infoBg: '#F0F9FF',
  scoreTierUnicorn: { text: '#059669', bg: '#ECFDF5', border: '#A7F3D0', gradient: ['#10B981', '#059669'] },
  scoreTierSeriesA: { text: '#0284C7', bg: '#F0F9FF', border: '#BAE6FD', gradient: ['#38BDF8', '#0284C7'] },
  scoreTierPromising: { text: '#D97706', bg: '#FFFBEB', border: '#FDE68A', gradient: ['#FBBF24', '#D97706'] },
  scoreTierHighRisk: { text: '#DC2626', bg: '#FEF2F2', border: '#FECACA', gradient: ['#F87171', '#DC2626'] },
  podiumGold: { accent: '#B45309', border: '#F59E0B', borderTop: '#D97706', badgeBg: '#FEF3C7', cardGradient: ['#FEF3C7', '#FDE68A'] },
  podiumSilver: { accent: '#334155', border: '#CBD5E1', borderTop: '#94A3B8', badgeBg: '#F1F5F9', cardGradient: ['#F1F5F9', '#E2E8F0'] },
  podiumBronze: { accent: '#9A3412', border: '#FB923C', borderTop: '#EA580C', badgeBg: '#FFEDD5', cardGradient: ['#FFEDD5', '#FED7AA'] },
  cardShadow: { shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  accentGlow: { shadowColor: '#FF5A36', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.28, shadowRadius: 16, elevation: 6 },
};
