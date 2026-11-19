import { describe, expect, test } from 'vitest';

import { getElapsedSeconds } from './timer';

describe('getElapsedSeconds', () => {
  test('returns whole seconds rather than tenths', () => {
    expect(
      getElapsedSeconds(
        '2026-11-19T13:00:00.000Z',
        Date.parse('2026-11-19T13:00:02.999Z'),
      ),
    ).toBe(2);
  });

  test('returns zero for invalid or earlier timestamps', () => {
    expect(getElapsedSeconds('not-a-date', Date.now())).toBe(0);
    expect(
      getElapsedSeconds('2026-11-19T13:00:02.000Z', Date.parse('2026-11-19T13:00:00.000Z')),
    ).toBe(0);
  });
});
