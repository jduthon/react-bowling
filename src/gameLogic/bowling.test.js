import { roll } from "./bowling";

const finalState = {
  frames: new Array(9).fill([5, 2]),
  score: 9 * (5 + 2)
};

describe("roll", () => {
  it("works correctly from empty state", () => {
    const state = {
      frames: []
    };
    expect(roll(state, 5)).toEqual({
      frames: [
        {
          rolls: [5],
          score: 5
        }
      ]
    });
  });
  it("adds correctly to current frame", () => {
    const state = {
      frames: [{ rolls: [5], score: 5 }]
    };
    expect(roll(state, 2)).toEqual({
      frames: [
        {
          rolls: [5, 2],
          score: 7
        }
      ]
    });
  });
  it("creates new frames correctly", () => {
    const state = {
      frames: [{ rolls: [5, 2], score: 7 }]
    };
    expect(roll(state, 7)).toEqual({
      frames: [{ rolls: [5, 2], score: 7 }, { rolls: [7], score: 14 }]
    });
  });
  it("handles strikes", () => {
    const state1 = {
      frames: [{ rolls: [10], score: 10 }]
    };
    const state2 = roll(state1, 7);
    expect(state2).toEqual({
      frames: [{ rolls: [10], score: 17 }, { rolls: [7], score: 24 }]
    });
    const state3 = roll(state2, 2);
    expect(state3).toEqual({
      frames: [{ rolls: [10], score: 19 }, { rolls: [7, 2], score: 28 }]
    });
  });
  it("handles spares", () => {
    const state1 = {
      frames: [{ rolls: [7, 3], score: 10 }]
    };
    const state2 = roll(state1, 5);
    expect(state2).toEqual({
      frames: [{ rolls: [7, 3], score: 15 }, { rolls: [5], score: 20 }]
    });
    const state3 = roll(state2, 2);
    expect(state3).toEqual({
      frames: [{ rolls: [7, 3], score: 15 }, { rolls: [5, 2], score: 22 }]
    });
  });
});
