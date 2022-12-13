export interface DataSourceCsv {
  header: string[];
  body: string[][];
}

export function parseToCsv(dataSource: DataSourceCsv): string {
  let parsedData: string;

  parsedData = dataSource.header.join() + '\n';

  dataSource.body.forEach((row) => {
    parsedData += row.join() + '\n';
  });

  return parsedData;
}
