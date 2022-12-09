export function getSelectOptions(values: string[], viewValues: string[]) {
  const selectOptions: { value: string; viewValue: string }[] = [];

  values.forEach((value, i) => {
    selectOptions.push({ value: value, viewValue: viewValues[i] });
  });

  return selectOptions;
}
