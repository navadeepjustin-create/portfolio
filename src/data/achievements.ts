import type { Achievement } from '../types';
import { site } from './site';

/**
 * Verified awards, hackathon results, published work and recognitions.
 * Leave empty if you have none yet: the section stays hidden once
 * site.showPlaceholders is false.
 */
export const achievements: Achievement[] = [];

export const showAchievements = achievements.length > 0 || site.showPlaceholders;
