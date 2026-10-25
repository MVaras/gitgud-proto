import { describe, expect, it } from 'vitest';
import { getDesktopNavigation, getMobileNavigation } from './productNavigation';

describe('product navigation', () => {
  it('exposes all structural athlete features on desktop', () => {
    expect(getDesktopNavigation('athlete').map((item) => item.id)).toEqual([
      'home', 'courts', 'classes', 'rivals', 'tournaments', 'marketplace', 'messages', 'notifications', 'profile',
    ]);
  });

  it('keeps mobile navigation compact while making explore, messages and profile available', () => {
    expect(getMobileNavigation('athlete').map((item) => item.id)).toEqual([
      'home', 'courts', 'explore', 'messages', 'profile',
    ]);
  });
});
