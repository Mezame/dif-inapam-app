import * as functions from 'firebase-functions';
import { Document } from '../../utils/document-utils';
import { Report } from '../../utils/report-utils';
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

    const report = (await getReport(reportId)) as Report;

    if (!report) {
      return;
    }

    if (
      report.cardsStats.newRecord == 0 &&
      report.cardsStats.replacement == 0 &&
      report.cardsStats.change == 0
    ) {
      return;
    }

    if (document.operationCode == 'NUEVO REG') {
      report.cardsStats.newRecord--;
    }

    if (document.operationCode == 'REPOSICION') {
      report.cardsStats.replacement--;
    }

    if (document.operationCode == 'CANJE') {
      report.cardsStats.change--;
    }

    if (document.isCardCanceled) {
      report.cardsStats.cancel--;
    }

    if (
      report.cardCodesRange[0] == document.cardCode &&
      report.cardCodesRange[1] == document.cardCode
    ) {
      report.cardCodesRange[0] = '';
      report.cardCodesRange[1] = '';
    }

    if (
      report.cardCodesRange[0] == document.cardCode &&
      report.cardCodesRange[1] != document.cardCode
    ) {
      report.cardCodesRange[0] = setCardCodesRangeLeftZeros(
        document.cardCode,
        'first'
      );
    }

    if (
      report.cardCodesRange[0] != document.cardCode &&
      report.cardCodesRange[1] == document.cardCode
    ) {
      report.cardCodesRange[1] = setCardCodesRangeLeftZeros(
        document.cardCode,
        'last'
      );
    }

    if (document.sex == 'Hombre') {
      report.sexStats.male--;
    }

    if (document.sex == 'Mujer') {
      report.sexStats.female--;
    }

    await updateReport(report);

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
