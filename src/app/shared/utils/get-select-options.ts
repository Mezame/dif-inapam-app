export interface SelectOptions {
  value: string | number;
  viewValue: string;
}

export function getSelectOptions(
  values: string[] | number[],
  viewValues: string[]
): SelectOptions[] {
  if(values.length != viewValues.length) return [];

  const selectOptions: SelectOptions[] = [];

  values.forEach((value, i) => {
    selectOptions.push({ value, viewValue: viewValues[i] });
  });

  return selectOptions;
}
