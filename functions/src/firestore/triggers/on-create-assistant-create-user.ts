import * as functions from 'firebase-functions';
import { auth } from '../../init';
import { Assistant } from '../../utils/assistant-utils';
import { generateWeakPassword } from '../../utils/utils';
import { setUser } from '../database/set-users';

export async function onCreateAssistantCreateUser(
  snapshot: functions.firestore.QueryDocumentSnapshot,
  _context: functions.EventContext<{
    id: string;
  }>
) {
  try {
    const assistant = snapshot.data() as Assistant;
    const password = generateWeakPassword();

    const user = await auth.createUser({
      email: assistant.email,
      password,
    });

    if (!user) {
      throw new Error('could not create user');
    }

    await setUser(user.uid);

    return;
  } catch (error) {
    functions.logger.error(error);

    return;
  }
}
