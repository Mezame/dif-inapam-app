export interface SelectOptions {
  value: string;
  viewValue: string;
}

export function getSelectOptions(values: string[], viewValues: string[]) {
  const selectOptions: SelectOptions[] = [];

  values.forEach((value, i) => {
    selectOptions.push({ value, viewValue: viewValues[i] });
  });

  return selectOptions;
}
