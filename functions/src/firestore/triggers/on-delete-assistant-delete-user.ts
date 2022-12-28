import * as functions from 'firebase-functions';
import { auth } from '../../init';
import { Assistant } from '../../utils/assistant-utils';
import { deleteUser } from '../database/delete-users';

export async function onDeleteAssistantDeleteUser(
  snapshot: functions.firestore.QueryDocumentSnapshot,
  _context: functions.EventContext<{
    id: string;
  }>
) {
  try {
    const assistant = snapshot.data() as Assistant;

    await auth.deleteUser(assistant.metadata.id);

    await deleteUser(assistant.metadata.id);

    return;
  } catch (error) {
    functions.logger.error(error);

    return;
  }
}