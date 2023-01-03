export interface CsvDataSource {
  header: string[];
  body: string[][];
}

export function parseDataSourceToCsv(dataSource: CsvDataSource): string {
  let parsedData: string;

  parsedData = dataSource.header.join() + '\n';

  dataSource.body.forEach((row) => {
    parsedData += row.join() + '\n';
  });

  return parsedData;
}
