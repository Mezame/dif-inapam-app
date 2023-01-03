import { Document } from '@features/documents/document.interface';
import { Report } from '@features/reports/report.interface';
import { CsvDataSource } from '@shared/utils/parse-data-source-to-csv';

export function generateMonthlyReportDataSource(data: {
  report: Report;
}): CsvDataSource {
  const dataSource = {
    header: [
      'FOLIO DE CREDENCIALES',
      '',
      'HOMBRES',
      'MUJERES',
      'NUEVO REGISTRO',
      'CANJE',
      'REPOSICION',
      'CANCELADAS',
      'TOTAL',
    ],
    body: [
      [
        data.report.cardCodesRange[0],
        data.report.cardCodesRange[1],
        data.report.sexStats.male.toString(),
        data.report.sexStats.female.toString(),
        data.report.cardsStats.newRecord.toString(),
        data.report.cardsStats.change.toString(),
        data.report.cardsStats.replacement.toString(),
        data.report.cardsStats.cancel.toString(),
        (
          data.report.cardsStats.newRecord +
          data.report.cardsStats.change +
          data.report.cardsStats.replacement
        ).toString(),
      ],
    ],
  } as CsvDataSource;

  return dataSource;
}

export function generateDocumentsReportDataSource(data: {
  documents: Document[];
}): CsvDataSource {
  const dataSource = {
    header: [
      'FECHA DE ELABORACION',
      'FOLIO',
      'CLAVE MOV',
      'MODULO',
      'REVISO DOCUMENTOS',
      'ELABORO TARJETA',
      'ENTIDAD FEDERATIVA',
      'APELLIDO PATERNO',
      'APELLIDO MATERNO',
      'NOMBRE',
      'SEXO H/M',
      'FECHA DE NACIMIENTO',
      'ENTIDAD DE NACIMIENTO',
      'CURP',
      'ESTADO CIVIL',
    ],
    body: [],
  } as CsvDataSource;

  data.documents.forEach((document) => {
    const dateOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions;
    const createDate = new Date(document.createDate).toLocaleDateString(
      'es-MX',
      dateOptions
    );
    const cardCode = document.cardCode;
    const operationCode = document.operationCode;
    const branchOffice = document.branchOffice;
    const reviewDocument = document.reviewDocument.toUpperCase();
    const makeCard = document.makeCard.toUpperCase();
    const fathersLastname = document.fathersLastname.toUpperCase();
    const mothersLastname = document.mothersLastname.toUpperCase();
    const name = document.name.toUpperCase();
    const sex = document.sex.slice(0, 1).toUpperCase();
    const birthdate = new Date(document.birthdate).toLocaleDateString(
      'es-MX',
      dateOptions
    );
    const birthplace = document.birthplace.toUpperCase();
    const curp = document.curp;
    const maritalStatus = document.maritalStatus.slice(0, 1).toUpperCase();

    const body = [
      createDate,
      cardCode,
      operationCode,
      branchOffice,
      reviewDocument,
      makeCard,
      'VERACRUZ',
      fathersLastname,
      mothersLastname,
      name,
      sex,
      birthdate,
      birthplace,
      curp,
      maritalStatus,
    ] as string[];

    dataSource.body = [...dataSource.body, body];
  });

  return dataSource;
}
