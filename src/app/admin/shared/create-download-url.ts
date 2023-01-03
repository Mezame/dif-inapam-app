import { ChangeDetectorRef, Renderer2 } from '@angular/core';
import { Report } from '@features/reports/report.interface';
import { Document } from '@features/documents/document.interface';
import { MatAnchor } from '@angular/material/button';
import { DataSourceCsv, parseToCsv } from '@shared/utils/parse-to-csv';
import { AlertsService } from '@shared/components/alert/services/alerts.service';

export function createDownloadUrl(
  el: MatAnchor,
  data: { report: Report; documents?: Document[] },
  objectUrl: string | null,
  renderer: Renderer2,
  cDRef: ChangeDetectorRef,
  alertsService: AlertsService
) {
  let dataSource: DataSourceCsv;
  let parsedData: string;
  let blob: Blob;
  let fileName: string;
  let isMonthlyReport: boolean;
  let isDocumentsReport: boolean;
  const anchor = el._elementRef.nativeElement as HTMLAnchorElement;
  const reportLocaleMonth = new Date(data.report.date).toLocaleDateString(
    'es-MX',
    { month: 'long' }
  );
  const reportYear = new Date(data.report.date).getFullYear().toString();

  if (anchor.href) return;

  if (data) {
    isMonthlyReport = !data.documents;
    isDocumentsReport = !!data.documents;

    if (isMonthlyReport) {
      fileName = `reporte-mensual-${reportLocaleMonth}-${reportYear}`;

      dataSource = {
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
      };
    }

    if (isDocumentsReport) {
      fileName = `reporte-oficios-${reportLocaleMonth}-${reportYear}`;

      dataSource = {
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
      };

      data.documents!.forEach((document) => {
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
    }
  }

  if (dataSource!) {
    parsedData = parseToCsv(dataSource);

    blob = new Blob([parsedData], {
      type: 'text/csv;charset=utf-8,',
    });

    objectUrl = URL.createObjectURL(blob);

    renderer.setAttribute(anchor, 'href', objectUrl);

    renderer.setAttribute(anchor, 'download', fileName!);

    anchor.click();

    renderer.setProperty(el, 'disabled', 'true');

    setTimeout(() => {
      if (isMonthlyReport) {
        alertsService.setAlert(
          `Se ha descargado el reporte mensual de ${reportLocaleMonth}, ${reportYear}`
        );
      }

      if (isDocumentsReport) {
        alertsService.setAlert(
          `Se ha descargado el reporte de oficios de ${reportLocaleMonth}, ${reportYear}`
        );
      }
    }, 1500);

    setTimeout(() => {
      URL.revokeObjectURL(objectUrl as string);

      objectUrl = null;

      renderer.removeAttribute(anchor, 'href');

      renderer.removeAttribute(anchor, 'download');

      renderer.setProperty(el, 'disabled', 'false');

      cDRef.markForCheck();
    }, 2500);
  }
}
