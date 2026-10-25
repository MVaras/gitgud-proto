import { describe, expect, it } from 'vitest';
import { getMobileNavigation } from './appNavigation';

describe('getMobileNavigation', () => {
  it('gives athletes direct access to progress and tournaments', () => {
    expect(getMobileNavigation('athlete').map((item) => item.id)).toEqual(['progress', 'courts', 'tournaments']);
  });

  it('gives coaches direct access to their daily management views', () => {
    expect(getMobileNavigation('coach').map((item) => item.id)).toEqual(['summary', 'students', 'tournaments']);
  });

  it('keeps the administrator navigation concise', () => {
    expect(getMobileNavigation('admin').map((item) => item.id)).toEqual(['overview', 'tournaments']);
  });
});
