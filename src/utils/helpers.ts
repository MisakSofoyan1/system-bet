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
