export function createCsvDownloadUrl(parsedCsvData: string): string {
  const blob = new Blob([parsedCsvData], {
    type: 'text/csv;charset=utf-8,',
  }) as Blob;

  const objectUrl = URL.createObjectURL(blob) as string;

  return objectUrl;
}
