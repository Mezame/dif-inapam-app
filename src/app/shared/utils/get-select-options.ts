export interface SelectOptions {
  value: string;
  viewValue: string;
}

export function getSelectOptions(
  values: string[],
  viewValues: string[]
): SelectOptions[] {
  if(values.length != viewValues.length) return [];

  const selectOptions: SelectOptions[] = [];

  values.forEach((value, i) => {
    selectOptions.push({ value, viewValue: viewValues[i] });
  });

  return selectOptions;
}
