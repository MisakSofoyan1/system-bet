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
