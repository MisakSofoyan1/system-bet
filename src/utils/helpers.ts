import type { IOdds } from "../components/InputSystem/InputSystem";

interface ISystemOption {
  id: string;
  label: string;
}

export const getSystemOptions = (selectionCount: number): ISystemOption[] => {
  const options: ISystemOption[] = [];

  for (let total = 3; total <= selectionCount; total++) {
    for (let picks = 2; picks < total; picks++) {
      options.push({
        id: `${picks}_${total}`,
        label: `${picks} from ${total}`,
      });
    }
  }

  return options;
};

export const combinationsCount = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  if (k > n / 2) k = n - k;

  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = (result * (n - i + 1)) / i;
  }

  return result;
};

function getCombinations(n: number, k: number): number[][] {
  const result: number[][] = [];

  const backtrack = (start: number, currentCombo: number[]) => {
    if (currentCombo.length === k) {
      result.push([...currentCombo]);
      return;
    }

    for (let i = start; i < n; i++) {
      currentCombo.push(i);
      backtrack(i + 1, currentCombo);
      currentCombo.pop();
    }
  };

  backtrack(0, []);
  return result;
}

export const calculateSystemResults = (
  odds: IOdds[],
  picks: number,
  totalStake: number,
  combinationsCount: number,
) => {
  const stakePerCombo = totalStake / combinationsCount;
  const indexCombos = getCombinations(odds.length, picks);

  let totalWinnings = 0;

  const tableRows = indexCombos.map((comboIndices) => {
    let comboMultiplier = 1;
    let isLost = false;

    const items = comboIndices.map((idx) => {
      const item = odds[idx];
      let multiplier = 1;
      let colorClass = "win";

      if (item.status === "lost") {
        multiplier = 0;
        isLost = true;
        colorClass = "lost";
      } else if (item.status === "return") {
        multiplier = 1;
        colorClass = "return";
      } else {
        multiplier = parseFloat(item.value) || 0;
        colorClass = "win";
      }

      comboMultiplier *= multiplier;
      return { val: item.value, colorClass };
    });

    const winnings = isLost ? 0 : comboMultiplier * stakePerCombo;
    totalWinnings += winnings;

    return { items, comboMultiplier, winnings, isLost };
  });

  return { tableRows, totalWinnings, stakePerCombo };
};
