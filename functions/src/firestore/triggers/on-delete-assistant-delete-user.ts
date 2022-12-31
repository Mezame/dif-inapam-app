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

    const id = assistant.metadata.id;

    await auth.deleteUser(id);

    await deleteUser(id);

    return;
  } catch (error) {
    functions.logger.error(error);

    return;
  }
}