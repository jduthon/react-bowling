import { roll } from './bowling';

describe('roll', () => {
  it('works correctly from empty state', () => {
    const frames = [];
    expect(roll(frames, 5)).toEqual([
      {
        rolls: [5],
        score: 5,
      },
    ]);
  });
  it('adds correctly to current frame', () => {
    const frames = [{ rolls: [5], score: 5 }];
    expect(roll(frames, 2)).toEqual([
      {
        rolls: [5, 2],
        score: 7,
      },
    ]);
  });
  it('creates new frames correctly', () => {
    const frames = [{ rolls: [5, 2], score: 7 }];
    expect(roll(frames, 7)).toEqual([
      { rolls: [5, 2], score: 7 },
      { rolls: [7], score: 14 },
    ]);
  });
  it('handles strikes', () => {
    const frames1 = [{ rolls: [10], score: 10 }];
    const frames2 = roll(frames1, 7);
    expect(frames2).toEqual([
      { rolls: [10], score: 17 },
      { rolls: [7], score: 24 },
    ]);
    const frames3 = roll(frames2, 2);
    expect(frames3).toEqual([
      { rolls: [10], score: 19 },
      { rolls: [7, 2], score: 28 },
    ]);
  });
  it('handles spares', () => {
    const frames1 = [{ rolls: [7, 3], score: 10 }];
    const frames2 = roll(frames1, 5);
    expect(frames2).toEqual([
      { rolls: [7, 3], score: 15 },
      { rolls: [5], score: 20 },
    ]);
    const frames3 = roll(frames2, 2);
    expect(frames3).toEqual([
      { rolls: [7, 3], score: 15 },
      { rolls: [5, 2], score: 22 },
    ]);
  });
});
