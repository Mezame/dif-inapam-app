import * as functions from 'firebase-functions';
import { Document } from '../../utils/document-utils';
import { Report } from '../../utils/report-utils';
import { deleteReport } from '../database/delete-reports';
import { getReport } from '../database/get-reports';
import { updateReport } from '../database/update-reports';

export async function onDeleteDocumentUpdateReport(
  snapshot: functions.firestore.QueryDocumentSnapshot,
  _context: functions.EventContext<{
    id: string;
  }>
) {
  try {
    const document = snapshot.data() as Document;
    const documentCreateDate = new Date(document.createDate) as Date;
    const documentYear = documentCreateDate.getFullYear();
    const documentMonthNumber = documentCreateDate.getMonth();
    const reportDate = new Date(documentYear, documentMonthNumber, 15);
    const reportId = `VER-TUXPAN-${reportDate.toLocaleDateString('es-MX', {
      month: 'long',
    })}-${documentYear}`;

    const report = (await getReport(reportId)) as Readonly<Report>;

    if (!report) {
      return;
    }

    const updatedReport = { ...report };

    if (
      updatedReport.cardsStats.newRecord == 0 &&
      updatedReport.cardsStats.replacement == 0 &&
      updatedReport.cardsStats.change == 0
    ) {
      return;
    }

    if (
      updatedReport.cardsStats.newRecord == 1 ||
      updatedReport.cardsStats.replacement == 1 ||
      updatedReport.cardsStats.change == 1
    ) {
      await deleteReport(reportId);

      return;
    }

    if (document.operationCode == 'NUEVO REG') {
      updatedReport.cardsStats.newRecord--;
    }

    if (document.operationCode == 'REPOSICION') {
      updatedReport.cardsStats.replacement--;
    }

    if (document.operationCode == 'CANJE') {
      updatedReport.cardsStats.change--;
    }

    if (document.isCardCanceled) {
      updatedReport.cardsStats.cancel--;
    }

    if (
      updatedReport.cardCodesRange[0] == document.cardCode &&
      updatedReport.cardCodesRange[1] == document.cardCode
    ) {
      updatedReport.cardCodesRange[0] = '';
      updatedReport.cardCodesRange[1] = '';
    }

    if (
      updatedReport.cardCodesRange[0] == document.cardCode &&
      updatedReport.cardCodesRange[1] != document.cardCode
    ) {
      updatedReport.cardCodesRange[0] = setCardCodesRangeLeftZeros(
        document.cardCode,
        'first'
      );
    }

    if (
      updatedReport.cardCodesRange[0] != document.cardCode &&
      updatedReport.cardCodesRange[1] == document.cardCode
    ) {
      updatedReport.cardCodesRange[1] = setCardCodesRangeLeftZeros(
        document.cardCode,
        'last'
      );
    }

    if (document.sex == 'Hombre') {
      updatedReport.sexStats.male--;
    }

    if (document.sex == 'Mujer') {
      updatedReport.sexStats.female--;
    }

    await updateReport(updatedReport);

    return;
  } catch (error) {
    functions.logger.error(error);

    return;
  }
}

function setCardCodesRangeLeftZeros(
  cardCode: string,
  position: 'first' | 'last'
): string {
  const cardCodeLastFourDigits = cardCode.slice(6);
  const cardCodeLastFourDigitsContainer = ['0', '0', '0', '0'];
  let newCardCodeLastFourDigits: string[];

  if (position == 'first') {
    newCardCodeLastFourDigits = (parseInt(cardCodeLastFourDigits) + 1)
      .toString()
      .split('');
  }

  if (position == 'last') {
    newCardCodeLastFourDigits = (parseInt(cardCodeLastFourDigits) - 1)
      .toString()
      .split('');
  }

  newCardCodeLastFourDigits!.reverse();

  for (let i = 0; i < newCardCodeLastFourDigits!.length; i++) {
    cardCodeLastFourDigitsContainer[i] = newCardCodeLastFourDigits![i];
  }

  const newCardCodeRange =
    cardCode.slice(0, 6) +
    cardCodeLastFourDigitsContainer.reverse().toString().replace(/,/g, '');

  return newCardCodeRange;
}
