import * as Clipboard from 'expo-clipboard';
import { Share, Platform } from 'react-native';

import { Idea } from '../store/types';
import { triggerHaptic } from './haptics';

export async function copyIdeaToClipboard(idea: Idea): Promise<boolean> {
  const content = `🚀 ${idea.name} — "${idea.tagline}"\n⭐ AI Score: ${idea.rating}/100\n💡 "${idea.feedback}"\n\n${idea.description}\n\n— Evaluated via Startup Idea Evaluator`;

  try {
    await Clipboard.setStringAsync(content);
    await triggerHaptic.selection();
    return true;
  } catch (error) {
    console.warn('Failed to copy to clipboard', error);
    return false;
  }
}

export async function shareIdea(idea: Idea): Promise<boolean> {
  const message = `Check out this startup idea:\n\n🚀 ${idea.name} — ${idea.tagline}\n⭐ AI Score: ${idea.rating}/100\n💬 "${idea.feedback}"\n\n${idea.description}`;

  try {
    const result = await Share.share(
      Platform.select({
        ios: {
          title: idea.name,
          message,
        },
        default: {
          title: idea.name,
          message,
        },
      })
    );

    if (result.action === Share.sharedAction) {
      await triggerHaptic.success();
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Failed to share idea', error);
    return false;
  }
}
