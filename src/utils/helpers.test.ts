import {
  getSystemOptions,
  combinationsCount,
  calculateSystemResults,
} from "./helpers";
import type { IOdds } from "../components/InputSystem/InputSystem";

describe("System Bet Helper Functions", () => {
  describe("getSystemOptions", () => {
    test("should generate correct options for a selectionCount of 4", () => {
      const options = getSystemOptions(4);
      expect(options).toHaveLength(3);
      expect(options[0]).toEqual({ id: "2_3", label: "2 from 3" });
      expect(options[2]).toEqual({ id: "3_4", label: "3 from 4" });
    });

    test("should return an empty array if selectionCount is less than 3", () => {
      expect(getSystemOptions(2)).toEqual([]);
    });
  });

  describe("combinationsCount", () => {
    test("correctly calculates 2 from 3 (3 combinations)", () => {
      expect(combinationsCount(3, 2)).toBe(3);
    });

    test("correctly calculates 3 from 7 (35 combinations)", () => {
      expect(combinationsCount(7, 3)).toBe(35);
    });

    test("Edge Case: returns 1 when n equals k", () => {
      expect(combinationsCount(5, 5)).toBe(1);
    });

    test("Edge Case: returns 0 when k > n", () => {
      expect(combinationsCount(3, 5)).toBe(0);
    });
  });

  describe("calculateSystemResults", () => {
    const mockOdds: IOdds[] = [
      { value: "2.00", status: "win" },
      { value: "2.00", status: "win" },
      { value: "2.00", status: "win" },
    ];

    test("All Wins: calculates correct payout for 2/3 system with 300 stake", () => {
      const result = calculateSystemResults(mockOdds, 2, 300, 3);

      expect(result.stakePerCombo).toBe(100);
      expect(result.totalWinnings).toBe(1200);
      expect(result.tableRows).toHaveLength(3);
    });

    test("Partial Wins/Losses: 1 lost match in 2/3 system", () => {
      const partialOdds: IOdds[] = [
        { value: "2.00", status: "win" },
        { value: "2.00", status: "win" },
        { value: "2.00", status: "lost" },
      ];
      // Combos: [W,W], [W,L], [W,L]
      // Only [W,W] wins: 2 * 2 * 100 = 400. Others = 0.
      const result = calculateSystemResults(partialOdds, 2, 300, 3);
      expect(result.totalWinnings).toBe(400);
    });

    test("Return (Void) Logic: returns 1.00 multiplier", () => {
      const voidOdds: IOdds[] = [
        { value: "2.00", status: "return" },
        { value: "2.00", status: "win" },
        { value: "2.00", status: "win" },
      ];
      // Combo 1 [R, W]: (1 * 2) * 100 = 200
      // Combo 2 [R, W]: (1 * 2) * 100 = 200
      // Combo 3 [W, W]: (2 * 2) * 100 = 400
      // Total = 800
      const result = calculateSystemResults(voidOdds, 2, 300, 3);
      expect(result.totalWinnings).toBe(800);
    });

    test("Total Loss: 0 winnings if all matches are lost", () => {
      const allLost = mockOdds.map((o) => ({ ...o, status: "lost" }));
      const result = calculateSystemResults(allLost, 2, 300, 3);
      expect(result.totalWinnings).toBe(0);
    });

    test("Handling invalid odds values (strings/NaN)", () => {
      const invalidOdds: IOdds[] = [
        { value: "abc", status: "win" },
        { value: "2.00", status: "win" },
      ];
      const result = calculateSystemResults(invalidOdds, 2, 100, 1);
      expect(result.totalWinnings).toBe(0);
    });
  });
});
